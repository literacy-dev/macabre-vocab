import React from 'react';
import '../App.css';
import WordApp from '../components/WordApp';

//IMPORT JSON FILE OF VOCABULARY WORDS
import vocabListObject from '../media/halloweenWords.json';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

//ADD FONTAWESOME LIBRARY
library.add(fab, fas);

//APP CLASS
class WordDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //PROPS FOR WORD DEFINITION WINDOW
          wordWindowTitle: 'Word of the Day',
          dailyWord: '',
          displayWord: '',
          displayWordDetails: 'none',
          displaySearchBar: 'none',
        };
    
        //BUTTON METHODS
        this.showDailyWord = this.showDailyWord.bind(this);
        this.showWordSearch = this.showWordSearch.bind(this);
        this.showRandomWord = this.showRandomWord.bind(this);
      }

      //DISPLAY WORD-OF-THE-DAY DATA TO SCREEN
  
   async getDailyWord() {

    var wordOTD;
    console.log("date", this.props.dateIndex)
    
    if (this.props.dateIndex) {
      wordOTD = vocabListObject.wordbank[this.props.dateIndex].word;
    }
    
    this.setState({
        dailyWord: wordOTD,
        displayWord: wordOTD,
    })
  }

  async showDailyWord() {
    //DISPLAY WORD DATA
    this.setState({
      wordWindowTitle: 'Word of the Day',
      displayWordDetails: 'block',
      displaySearchBar: 'none',
    });

    //ATTEMPT TO FETCH DATA FROM API
    this.setState({displayWord: this.state.dailyWord});
  }
  
  //FETCH DATA FROM API FOR USER-INPUT WORD
  async showWordSearch() {
    //DISPLAY SEARCH BOX
    this.setState({
      wordWindowTitle: 'Dictionary Search',
      displaySearchBar: 'block',
      displayWordDetails: 'none',
    });

    //PROMPT USER TO ENTER WORD
    var searchWord = prompt('Enter a word to search: ');

    this.setState({
      displayWord: searchWord,
      displaySearchBar: 'none',
    });
  }

  //DISPLAY RANDOM WORD DATA IF SUCCECSSFULLY FETCHED FROM API
  async showRandomWord() {
    this.setState({
      wordWindowTitle: 'Random Word',
      displaySearchBar: 'none',
      displayWordDetails: 'block',
    });

     //GET RANDOM INT BETWEEN 0 AND 364
     let rIndex = Math.floor(Math.random() * 365);

     //SELECT WORD FROM vocabListObject AT RANDOM INDEX
     let randomWord = vocabListObject.wordbank[rIndex].word;

     this.setState({displayWord: randomWord});

  }


  //ADD EVENT LISTENER TO HIGHLIGHT ACTIVE NAV BUTTON
  async componentDidMount() {
    var buttons = document.getElementsByClassName('navButton');

    for (var m = 0; m < buttons.length; m++) {
      buttons[m].addEventListener('click', function() {
        if (document.getElementsByClassName('active')[0]) {
          var current = document.getElementsByClassName('active');
          current[0].className = current[0].className.replace('active', '');
        }
        this.className += ' active';
      });
    }

     //FETCH DATA FOR WORD-OF-THE-DAY ON PAGE LOAD
     if (this.state.displayWord === '') {
        await this.getDailyWord();

      }     
  }

  async componentDidUpdate(prevProps) {
    if (this.props.dateIndex !== prevProps.dateIndex) {
      await this.getDailyWord();
    }  
  }
    

  //JSX
  render() {
    return (
      <div>  
        <main id='appHome'>
          <h1>Home</h1>

          {/* TITLE FOR API RESULTS */}
          {/* CHANGES ACCORDING TO TASK (EG, 'DICTIONARY SEARCH' FOR SEARCH RESULTS) */}
          <h2 alt='title for word definition'>{this.state.wordWindowTitle}</h2>

          {/* NAVIGATION BUTTONS */}
          <nav id='navButtons'>

            {/* WORD-OF-THE-DAY BUTTON */}
            <button
              id='navButtonDaily' className='navButton active'
              type='button' name='daily'
              onClick={this.showDailyWord}>
              <FontAwesomeIcon icon='calendar-alt' size='2x'/>
              <br />
              <span className='navText'>Daily</span>
            </button>

            {/* SEARCH BUTTON */}
            <button
              id='navButtonSearch' className='navButton'
              type='button' name='search'
              onClick={this.showWordSearch}>
              <FontAwesomeIcon icon='magnifying-glass' size='2x'/>
              <br />
              <span className='navText'>Search</span>
            </button>

            {/* RANDOM WORD BUTTON */}
            <button
              id='navButtonRandom' className='navButton'
              type='button' name='random'
              onClick={this.showRandomWord}>
              <FontAwesomeIcon icon='shuffle' size='2x'/>
              <br />
              <span className='navText'>Random</span>
            </button>
          </nav>

          {/* SEARCH BOX, NOTIFIES USER IF POPUPS ARE DISABLED */}
          <p id='searchBox' style={{display: this.state.displaySearchBar}}>
              Please disable your popup blocker to search the
              dictionary.
          </p>

          <WordApp displayWord={this.state.displayWord}/>
        </main>
      </div>
    );
  }

}

export default WordDay;