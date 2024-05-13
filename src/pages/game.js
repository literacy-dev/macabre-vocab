import React from 'react';
import '../App.css';

//IMPORT JSON FILE OF VOCABULARY WORDS
import vocabListObject from '../media/halloweenWords.json';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

//ADD FONTAWESOME LIBRARY
library.add(fab, fas);

//APP CLASS
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
          //PROPS FOR WORD DEFINITION WINDOW
          gameWord: '',
          gameDef: '',
          gamePartofSpeech: '',
          canvasWidth: window.screen.width,
          canvasHeight: window.screen.height,
        };
    
        //BUTTON METHODS

      }

  async getGameWord() {
    var gameIndex = Math.floor(Math.random() * 365);
    var word = vocabListObject.wordbank[gameIndex].word;
    var def = vocabListObject.wordbank[gameIndex].definition
    var speech = vocabListObject.wordbank[gameIndex].partofspeech

    this.setState({
      gameWord: word,
      gameDef: def,
      gamePartofSpeech: speech
    })

  }

  // DRAW ON CANVAS
  async draw() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set maximum screen and word widths for text wrapping
    const maxWidth = this.state.canvasWidth;
    const wordWidth = ctx.measureText(`${this.state.gamePartofSpeech}`).width;
    
    // Set number and length of blanks to display word
    var blankNums = this.state.gameWord.length;
    // var blankStart = (this.state.canvasWidth / blankNums);
    var blankStart = 50;
    var blankWidth = ((this.state.canvasWidth - 100) / blankNums) - 20
    
    var defY = this.state.canvasHeight - 100;
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set line properties
    ctx.strokeStyle = 'white'; // Set line color
    ctx.lineWidth = 4; // Set line width

    // Draw blanks for each letter of the word
    for (var i = 0; i < blankNums; i++) {
      
      // Begin drawing the line
      ctx.beginPath();

      // Move the pen to the starting point of the line
      ctx.moveTo(blankStart, (defY - 75)); // Starting point coordinates (x, y)

      // Draw a line to the ending point
      ctx.lineTo(blankStart + blankWidth, (defY - 75)); // Ending point coordinates (x, y)

      // Finish drawing the line
      ctx.stroke();

      blankStart += (blankWidth + 20);
    }

    // Set part of speech text properties
    ctx.font = '35px Arial';
    ctx.fillStyle = 'white';

    // Draw the part of speech
    this.wrapText(ctx,`${this.state.gameDef}`, (85 + wordWidth), defY, (maxWidth - 150), 35);

    // Draw the part of speech
    ctx.fillText(`(`, 50, defY);

    // Draw the part of speech
    ctx.fillText(`)`, (60 + wordWidth), defY);

    // Set part of speech text properties
    ctx.font = 'italic 35px Arial';
    ctx.fillStyle = 'white';

    // Draw the part of speech
    ctx.fillText(`${this.state.gamePartofSpeech}`, 60, defY);
    
  }

  // WRAP TEXT TO NEXT LINE ON CANVAS
  async wrapText(context, text, x, y, maxW, lineHeight) {
    let words = text.split(' ');
    let line = '';
  
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxW && i > 0) {
        context.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }


  //ADD EVENT LISTENER TO HIGHLIGHT ACTIVE NAV BUTTON
  async componentDidMount() {
    //FETCH DATA FOR WORD GAME ON PAGE LOAD
    if (this.state.gameWord === '') {
      await this.getGameWord();
    }
    
    await this.draw();
  }

  //UPDATE GAME WORD ON RESTART
  async componentDidUpdate() {
    if (this.state.gameWord === '') {
      await this.getGameWord();
    }

    await this.draw();
  }
    

  //JSX
  render() {
    return (
      <div>  
        <main id='wordGame'>
          <h1>Ouija Words</h1>

          <section id="gameWindow">
            <canvas id="gameCanvas"
              ref={this.canvasRef}
              width={this.state.canvasWidth} height={this.state.canvasHeight}>
              Your browser does not support HTML5
            </canvas>

            <section id="startMenu">
              <button id="startButton" class="startMenuButton"
                type="button" name="startButton">
                Restart
              </button>

              <button id="directionsButton" class="startMenuButton"
                type="button" name="directionsButton">
                How to Play
              </button>
            </section>

				  </section>
        </main>
      </div>
    );
  }

}

export default Game;