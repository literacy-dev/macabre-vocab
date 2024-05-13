import React from 'react';
import '../App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

//ADD FONTAWESOME LIBRARY
library.add(faGithub, faLinkedin);

//APP CLASS
function Runner() {
    return (
        <footer>
            
            {/* APP TITLE */}
            <p>Macabre Vocab &copy;2024</p>

            {/* NAVIGATION BUTTONS */}
            <nav id='footerNav'>
              <ul>
                {/* GITHUB */}
                <li className='footerLink'>
                    <a href='github.com'>
                        <FontAwesomeIcon icon='fa-brands fa-github-alt' size='1x' />
                    </a>
                    <span>Github</span>
                </li>

                {/* ABOUT APP */}
                <li id='aboutLink' className='footerLink'>
                    <a href='linkedin.com/carolinereedc'>
                    <FontAwesomeIcon icon='fa-brands fa-instagram' size='1x' />
                    </a>
                    <span>Instagram</span>
                </li>
              </ul>
            </nav>
        </footer>
    );
    }
  
export default Runner;
