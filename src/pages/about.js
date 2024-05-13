import React from 'react';
import '../App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

//ADD FONTAWESOME LIBRARY
library.add(fab);


class About extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
      
    render() {
        return(
          // ABOUT PAGE
          <div>
            <main id='aboutPage'>              
              <h1>about</h1>

              {/* APP DESCRIPTION AND DIRECTIONS */}
              <section id='blurb'>
                  <p id='blurbP1'>This app provides daily and randomized vocabulary
                    prompts for a year of Halloween-themed English words.
                  </p>
                    
                  <p id='blurbP2'>You can also search the dictionary
                    for definitions, pronunciations, and
                    example sentences of thousands more words!
                  </p>

                {/* TECHNOLOGIES USED TO BUILD THIS APP */}
                  <h4>Credits</h4>
                  
                  <ul id='creditList'>
                      <li key='apiCred' id='apiCred'>
                        <a href='https://dictionaryapi.dev/'>
                          <FontAwesomeIcon icon={['fas', 'book']} />{' '}
                          Free Dictionary API
                        </a>
                      </li>
                      <li key='imgCred1'>
                        Image by <a href="https://pixabay.com/users/overjupiter-4670306/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4973914">P T</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4973914">Pixabay
                        </a>
                      </li>
                      <li key='imgCred2'>
                        Image by <a href="https://pixabay.com/users/darkmoon_art-1664300/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6709350">Dorothe</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6709350">Pixabay
                        </a>
                      </li>
                      <li key='imgCred3'>
                        Image by <a href="https://pixabay.com/users/gdj-1086657/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5161228">Gordon Johnson</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5161228">Pixabay
                        </a>
                      </li>
                      <li key='imgCred4'>
                        Image by <a href="https://pixabay.com/users/fluf-4254822/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5278134">fluf</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5278134">Pixabay
                        </a>
                      </li>
                      <li key='imgCred5'>
                        Image by <a href="https://pixabay.com/users/gdj-1086657/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4248037">Gordon Johnson</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4248037">Pixabay
                        </a>
                      </li>
                      <li key='imgCred6'>
                        Image by <a href="https://pixabay.com/users/fotshot-401149/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=457849">Michael Drummond</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=457849">Pixabay
                        </a>
                      </li>
                      <li key='imgCred7'>
                        Image by <a href="https://pixabay.com/users/tapojusti-5376320/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2317091">TapoJusti</a>{' '}
                        from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2317091">Pixabay
                        </a>
                      </li>
                  </ul>                
              </section>
            </main>
          </div>
        );
      }
    }

    export default About;