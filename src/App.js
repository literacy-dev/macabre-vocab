import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } 
from 'react-router-dom';

// import NavBar from './components/nav';
import Heading from './components/header';
import Game from './pages/game';
import WordDay from './pages/word-day';
import AllVocab from './pages/list';
import About from './pages/about';
import Runner from './components/footer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      dateIndex: null,
      halloIndex: null,
    }
  }

  async getDateIndex() {
  
    //TODAY'S DATE
    var todayDate = new Date();

    //FIRST DAY OF CURRENT YEAR
    var startDay = new Date(todayDate.getFullYear(), 0, 0);
    
    //HALLOWEEN DATE
    var halloweenDay = new Date(todayDate.getFullYear(), 9, 31);
    
    //LAST DAY OF CURRENT YEAR
    var lastDay = new Date(todayDate.getFullYear(), 11, 31);
    
    //MILLISECONDS FOR ONE DAY
    var oneDay = 1000 * 60 * 60 * 24;

    //CALCULATE DATE INDEX
    var dayDiff = todayDate - startDay;
    var todayDateNum = Math.floor(dayDiff / oneDay);
    
    //CHECK WHETHER TODAY'S DATE IS BEFORE
    var halloCheck = todayDate - halloweenDay;
    
    //DATES BEFORE HALLOWEEN
    if (halloCheck <= 0) {
      var halloTotal = halloweenDay - todayDate;
      var halloDaysLeft = Math.floor(halloTotal / oneDay);
    } //DATES AFTER HALLOWEEN
    else if (halloCheck > 0) {
      var lastDiff = lastDay - todayDate;
      var halloDiff = halloweenDay - startDay;
      halloTotal = lastDiff + halloDiff;
      halloDaysLeft = Math.floor(halloTotal / oneDay);
    } 
    
    this.setState({
      dateIndex: todayDateNum,
      halloIndex: halloDaysLeft,
    })

  }

  async getTodayStr() {
    //GET DATE OBJECT
    var todayDate = new Date();

    //GET DAY OF THE WEEK AS INT
    var daynum = todayDate.getDay();
    
    //ARRAY OF WEEKDAY NAMES
    var weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    //GET WEEKDAY NAME FROM DAYNUM INT
    var wkday = weekdays[daynum];

    //GET AND FORMAT CURRENT DATE FOR DISPLAY
    var todayDateTime = todayDate.toString();
    var today = todayDateTime
      .substring(4, 15);

    //FORMAT WEEKDAY NAME AND CURRENT DATE AS STRING
    var dateStrFormat = wkday + ', ' + today;

    this.setState({
      dateString: dateStrFormat,
    })

  }

  async componentDidMount() {
    this.getDateIndex();
    this.getTodayStr();
  }

  render() {
    return(
      <Router>
        <Heading dateString={this.state.dateString} halloIndex={this.state.halloIndex} />
        
        <Routes>
          <Route exact path='/' element={<WordDay dateIndex={this.state.dateIndex}/>} />
          <Route path='/game' element={<Game />} />
          <Route path='/list' element={<AllVocab />} />
          <Route path='/about' element={<About />} />
        </Routes>
  
        <Runner />
      </Router>
    ); 
  }
  
}

export default App;