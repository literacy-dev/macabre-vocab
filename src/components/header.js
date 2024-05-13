import React from 'react';
import '../App.css';
import logo from '../media/darkSantQW.png';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

//ADD FONTAWESOME LIBRARY
library.add(fab, fas);

//APP CLASS
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
    };

    this.toggleTopNav = this.toggleTopNav.bind(this);
  }

  async setNavLinks() {
    var links = document.getElementsByClassName('navLink');

    for (var m = 0; m < links.length; m++) {
        links[m].addEventListener('click', function() {
        if (document.getElementsByClassName('activePage')[0]) {
          var current = document.getElementsByClassName('activePage');
          current[0].className = current[0].className.replace('activePage', '');
        }
        this.className += ' activePage';
      });
    }
  }

  async toggleTopNav() {
    var navMenuList = document.getElementById('navMenuList');
    var patty1 = document.getElementById('patty1');
    var patty2 = document.getElementById('patty2');
    var patty3 = document.getElementById('patty3');

    if (navMenuList.style.transform === 'translateX(0rem)') {
      navMenuList.style.transform = 'translateX(40rem)';
      patty2.style.width = '65%'
      patty2.style.transform = 'rotate(0deg)';
      patty1.style.width = '65%'
      patty1.style.transform = 'rotate(0deg)';
      patty3.style.opacity = '100%';

    } else {
      navMenuList.style.transform = 'translateX(0rem)';
      patty1.style.width = '50%'
      patty1.style.transform = 'translateY(0.75rem) rotate(45deg)';
      patty2.style.width = '50%'
      patty2.style.transform = 'rotate(-45deg)';
      patty3.style.opacity = '0%';
    }
  }
  

  //ADD EVENT LISTENER TO HIGHLIGHT ACTIVE NAV BUTTON
  async componentDidMount() {
    this.setNavLinks();
  }


  async componentDidUpdate(prevProps) {
    if (this.props.dateIndex !== prevProps.dateIndex) {
      await this.getDaysTilHallo();
    }
  }


  //JSX
  render() {
    return (
      <div> 
        {/* HEADER BAR */}
          <header>
            {/* MOBILE NAVIGATION MENU */}
            <nav id='navMobile' onClick={this.toggleTopNav}>
                <ul>
                    <li id='patty1' key='patty1'></li>
                    <li id='patty2' key='patty2'></li>
                    <li id='patty3' key='patty3'></li>
                </ul>
            </nav>

            {/* NAVIGATION MENU */}
            <nav id='navMenu'>
                <ul id='navMenuList'>
                  {/* GAME LINK */}
                  <li id='wordDayLink' className='navLink'>
                        <Link to="/">
                          <FontAwesomeIcon className='navIcon' icon='home' />{' '}
                          <span className='navText'>home</span>
                        </Link>
                    </li>

                    {/* WORD of the DAY LINK */}
                    <li id='gameLink' className='navLink'>
                        <Link to="/game">
                          <FontAwesomeIcon className='navIcon' icon='gamepad' />{' '}
                          <span className='navText'>ouija words</span>
                        </Link>
                    </li>
                    
                    {/* ALL VOCAB WORDS LINK */}
                    <li id='listLink' className='navLink'>
                        <Link to='/list'>
                          <FontAwesomeIcon className='navIcon' icon='list' />{' '}
                          <span className='navText'>vocab list</span>
                        </Link>
                    </li>

                    {/* ABOUT APP */}
                    <li id='aboutLink' className='navLink'>
                        <Link to='/about'>
                          <FontAwesomeIcon className='navIcon' icon='info-circle' />{' '}
                          <span className='navText'>about</span>
                        </Link>
                    </li>
                </ul>
            </nav> 
        
            <img src={logo} alt='woman holding raven and book in space' 
            width='1920' height='795'/>
            
            {/* APP TITLE */}
            <h2><span id='redLetters'>Macabre</span>{' '}Vocab</h2>

            <section id='halloweenClock'>
              {/* FORMATTED DATE FOR WORD-OF-THE-DAY */}
              <p id='todayDate' key={this.props.dateString}>{this.props.dateString}</p>

              {/* DAYS REMAINING UNTIL HALLOWEEN */}
              <p id='hwClock' key={this.props.halloIndex}>{this.props.halloIndex} days until Halloween</p>
            </section>
          </header>
        </div>
    );
    }
  }
export default Header;
