import React from 'react';
import '../App.css';
import WordApp from '../components/WordApp'

//IMPORT JSON FILE OF VOCABULARY WORDS
import vocabListObject from '../media/halloweenWords.json';

class AllVocab extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayDef: 'none',
      };
    }

      //DISPLAY RANDOM WORD DATA IF SUCCECSSFULLY FETCHED FROM API
    async showAllVocabDef(word) {
      this.setState({
        displayWord: word,
        displayDef: 'block',
      });
    }

    render() {
    return(
        // LIST OF ALL VOCABULARY WORDS 
        <div>
          <main id='vocabList'>
            <h1>words: a - z</h1>

            {/* ALL VOCAB WORDS WITH ARRAY VALUES MAPPED TO GRID */}
            {/* EACH WORD HAS EVENT LISTENER TO REQUEST AND DISPLAY WORD DATA */}
            <section id='allVocabGrid' className='wordWindow'>
              {vocabListObject.wordbank.map((o) => {
                  return (
                      <p className='allVocabItem'
                      key={'list' + o.word}
                      onClick={() => this.showAllVocabDef(o.word)}>
                          {o.word}
                      </p>
                  );
              })}
            </section>
            
            <section id='allVocabDef' style={{display: this.state.displayDef}}>
              <h2>Definition</h2>
              
              <WordApp displayWord={this.state.displayWord}/>
            </section>
          </main>
        </div>
    );

  }
}

export default AllVocab;
