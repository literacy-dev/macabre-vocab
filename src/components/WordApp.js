import React from 'react';
import '../App.css';

// IMPORT { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

//ADD FONTAWESOME LIBRARY
library.add(fab, fas);

//APP CLASS
class WordApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //PROPS FOR WORD DEFINITION WINDOW
      merWebURL: '',
      gotPhon: '',
      gotAudio: '',
      gotPart: '',
      gotDef: '',
      gotExample: '',
      displayRes: 'none',
      displayError: 'none',
      loading: 'block',
      loadMsg: 'Loading',
    };    
  }

  
  //PARSE JSON FILE AND ASSIGN PARTS OF DEFINITION TO PROPS 
  async getDef(word) {
    console.log("THE word: ", word);
    this.setState({
      //SET EXTERNAL LINK TO SEARCH WORD ON MERRIAM-WEBSTER ONLINE DICTIONARY
      merWebURL: 'https://www.merriam-webster.com/dictionary/' + word,
    })

    //TRY TO FETCH DATA FROM FREEDICTIONARY API
    try {
      // await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
          if (response.status >= 300 && response.status < 600) {
            //RETURN 1 TO INDICATE ERROR
            return 1;
          }
          return response.json();
        })

        //ASSIGN DATA TO WORD, PART OF SPEECH, AND DEFINITION PROPS
        .then(defData => {
          this.setState({
            gotPart: defData[0]['meanings'][0].partOfSpeech,
            gotDef: defData[0]['meanings'][0]['definitions'][0].definition,
          });

          //IF DATA CONTAINS PHONETICS, ASSIGN TO PHONETIC PROP
          if (defData[0].phonetic) {
            this.setState({
              gotPhon: defData[0].phonetic
            });
          }

          //IF DATA CONTAINS AUDIO SAPLE, ASSIGN TO AUDIO PROP
          //CHECK MULTIPLE DATA LOCATIONS FOR AUDIO FILE
          if (defData[0]['phonetics'][0].audio) {
            this.setState({
              gotAudio: defData[0]['phonetics'][0].audio,
            });
          } else if (defData[0]['phonetics'][1].audio) {
            this.setState({
              gotAudio: defData[0]['phonetics'][1].audio,
            });
          } else if (defData[0]['phonetics'][2].audio) {
            this.setState({
              gotAudio: defData[0]['phonetics'][2].audio,
            });
          } else {
            this.setState({
              gotAudio: '',
            });
          }

          //IF DATA CONTAINS EXAMPLE, ASSIGN TO EXAMPLE PROP
          if (defData[0]['meanings'][0]['definitions'][0].example) {
            var exampleString = defData[0]['meanings'][0]['definitions'][0].example;

            this.setState({
              gotExample: exampleString[0].toUpperCase() + exampleString.substring(1)
            });
          } else {
            this.setState({gotExample: ''});
          }
      });
      //CATCH ERRORS INCLUDING UNRESPONSIVE SERVER AND NON-EXISTENT ENTRIES
    } catch (Error) {
      console.log(Error);

      // RETURN 1 TO INDICATE ERROR
      return 1;
    }
  }

  async runLoader() {
    var dotCount = 0;
    
    console.log('LOADING');

    if (this.state.loading === 'block') {
        var loadIntervalId = setInterval(() => {
            if (dotCount < 3) {
                this.setState(prevState => {
                    return {
                        ...prevState, 
                        loadMsg: prevState.loadMsg + '.'
                    }
                })
                dotCount += 1;
            
    
            } else if (dotCount === 3) {
                this.setState({loading: 'Loading'});
                dotCount = 0;
            }
        }, 250);

    } else {
        clearInterval(loadIntervalId);
        this.setState({loading: 'none'});
    }
  }

  //ADD EVENT LISTENER TO HIGHLIGHT ACTIVE NAV BUTTON
  async componentDidMount() {
    this.setState({
      merWebURL: '',
      gotPhon: '',
      gotAudio: '',
      gotPart: '',
      gotDef: '',
      gotExample: '',
      displayRes: 'none',
      loading: 'block',
      loadMsg: 'Loading',
      displayError: 'none',
    });

    if (this.props.displayWord) {
      let res = await this.getDef(this.props.displayWord);
    
      if (res === 1) {
        this.setState({
          loading: 'none',
          displayRes: 'none',
          displayError: 'block',
        });
        } else {
        this.setState({
          loading: 'none',
          displayError: 'none',
          displayRes: 'block',
        });
      }
    }
    
  }

  async componentDidUpdate(prevProps) {
    if (this.props.displayWord !== prevProps.displayWord) {
      this.setState({
        merWebURL: '',
        gotPhon: '',
        gotAudio: '',
        gotPart: '',
        gotDef: '',
        gotExample: '',
        displayRes: 'none',
        loading: 'block',
        loadMsg: 'Loading',
        displayError: 'none',
      });
      
      let res = await this.getDef(this.props.displayWord);
      
      if (res === 1) {
        this.setState({
          loading: 'none',
          displayRes: 'none',
          displayError: 'block',
        });
        } else {
        this.setState({
          loading: 'none',
          displayError: 'none',
          displayRes: 'block',
        });
      }
    }
  }
    

  //JSX
  render() {
    return (
      <div id='wordApp'>   
        
        {/* PROPS FOR WORD AND PART OF SPEECH */}
        <ul style={{display: this.state.displayRes}}>
            <li id='dictWord' key={this.props.displayWord}><b>{this.props.displayWord}</b></li>
            
            <li id='dictSpeech' key='wordData2'><i>{this.state.gotPart}</i></li>
        
            <li id='dictPhon' key='wordData3'>{this.state.gotPhon}</li>
            
            <li id='dictAudio' key='wordData4'><audio controls src={this.state.gotAudio} type='audio/mpeg'>
            Your browser does not support HTML5 audio</audio></li>

            <li id='dictDef' key='wordData5'>{this.state.gotDef}</li>

            <li id='dictExample' key='wordData6'><i>{this.state.gotExample}</i></li>
        </ul>

        <section id='loadPage'
          style={{display: this.state.loading}}>
              <p>{this.state.loadMsg}</p>
        </section>

        <section id='errorPage' style={{display: this.state.displayError}}>
            <p>Oops, <b>{this.props.displayWord}</b> not found.</p>
            <p><a href={this.state.merWebURL} alt='merriam-webster dictionary' target='_blank' rel='noreferrer'>
            Search <b>{this.props.displayWord}</b> in Merriam-Webster's Online Dictionary</a></p>
        </section>
    </div>
    );
  }

}

export default WordApp;