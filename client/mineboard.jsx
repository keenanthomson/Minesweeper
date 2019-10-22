import React, {Component} from 'react';
import './app.css';

export default class MineBoard extends Component {
  constructor(props) {
    super (props);
    this.state = {
      gridSize: 10,
      mineLocations: [],
      checkedBoxes: [],
      grid: [],
      remainingSquares: null,
    }
    this.renderGrid = this.renderGrid.bind(this);
    this.checkForMines = this.checkForMines.bind(this);
  }

  componentDidMount() {
    this.renderMines();
    this.renderGrid();
  };

  resetBoard() {
    this.renderMines();
    this.resetGrid();
    this.calcRemainingSquares();
  };

  renderMines() {
    let newMines = [];
    for (let i = 0; i < this.state.gridSize; i++) {
      newMines.push(Math.floor(Math.random() * 100));
    };
    this.setState({mineLocations: newMines});
  };

  renderGrid() {
    let newGrid = [];
      for (let i = 0; i < Math.pow(this.state.gridSize, 2); i++) {
        newGrid.push(<div className='box' id={i} key={i} onClick={() => this.toggleSquare(i)}><span className="numSpan"></span></div>)
      };
    this.setState({grid: newGrid});
    this.calcRemainingSquares();
  };

  resetGrid() {
    this.resetSquare('box-toggled');
    this.resetSquare('mine');
  };

  resetSquare(elemName) {
    let nodes = Array.from(document.getElementsByClassName(elemName));
    nodes.forEach(elem => {
      elem.className = 'box';
      elem.getElementsByTagName('span')[0].innerText = null;
    });
  };

  calcRemainingSquares() {
    let toggledSquares = document.getElementsByClassName('box-toggled');
    let remainingSquaresCalc = Math.pow(this.state.gridSize, 2) - toggledSquares.length - this.state.gridSize;
    this.setState({remainingSquares: remainingSquaresCalc});
    if (remainingSquaresCalc === 0) {
      setTimeout(() => alert('You won, great job!'), 50);
      return setTimeout(() => this.resetBoard(), 5000);
    }
  }

  toggleSquare(e) {
    let node = document.getElementById(e)
    if (node.className === 'box') {
      node.className = 'box-toggled';
      this.checkForMines(e);
    };
  };

  checkForMines(e) {
      let mineCount = 0;
      let mineChecks;

      if (this.state.mineLocations.includes(e)) {
        alert('You Hit a Bomb :('); // change this to an transparent overlay over board but not over reset button / timer
        // add background bomb image for all mine locations
        this.state.mineLocations.forEach(elem => {
          document.getElementById(elem).className = 'mine';
        });
        return setTimeout(() => this.resetBoard(), 5000); // change this to button and otherwise leave bombs on board
      } else {
        this.calcRemainingSquares();
      };

      if (e === 0) { // top-left
        mineChecks = [e + 1, e + this.state.gridSize, e + this.state.gridSize + 1];
      } else if (e === this.state.gridSize - 1) { // top-right
        mineChecks = [e - 1, e + this.state.gridSize, e + this.state.gridSize - 1];
      } else if (e === (Math.pow(this.state.gridSize, 2) - this.state.gridSize)) { // bottom-left
        mineChecks = [e + 1, e - this.state.gridSize, e - this.state.gridSize + 1];
      } else if (e === (Math.pow(this.state.gridSize, 2) - 1)) { // bottom-right
        mineChecks = [e - 1, e - this.state.gridSize, e - this.state.gridSize - 1];
      } else if (e % 10 === 0) { // left side
        mineChecks = [e + 1, e - this.state.gridSize, e - this.state.gridSize + 1, e + this.state.gridSize, e + this.state.gridSize + 1];
      } else if (Number(e.toString().split('').pop()) === 9) { // right side
        mineChecks = [e - 1, e - this.state.gridSize, e - this.state.gridSize - 1, e + this.state.gridSize, e + this.state.gridSize - 1];
      } else if (e.toString().length === 1) { // first row
        mineChecks = [e - 1, e + 1, e + this.state.gridSize - 1, e + this.state.gridSize, e + this.state.gridSize + 1];
      } else if (e.toString().split('').shift() === (Math.pow(this.state.gridSize, 2) - 1).toString().split('').shift()) { // last row
        mineChecks = [e - 1, e + 1, e - this.state.gridSize - 1, e - this.state.gridSize, e - this.state.gridSize + 1];
      } else {
        mineChecks = [e + 1, e - 1, e - this.state.gridSize, e - this.state.gridSize - 1, e - this.state.gridSize + 1, e + this.state.gridSize, e + this.state.gridSize + 1, e + this.state.gridSize - 1];
      };

      mineChecks.forEach(elem => {
        this.state.mineLocations.includes(elem) ? mineCount++ : null;
      });
      if (mineCount > 0) {
        document.getElementById(e).getElementsByTagName('span')[0].innerText = mineCount;
      } else {
        mineChecks.forEach(elem => {
          document.getElementById(elem).className === 'box' ? this.toggleSquare(elem) : null;
        });
      };
  };

  render() {
    return(
      <div className="border-box">
        <div><h3>Total Mines: {this.state.gridSize}</h3></div>
        <div><h3>Remaining Spaces to Clear: {this.state.remainingSquares}</h3></div>
        <div className='minegrid'>
          {this.state.grid}
        </div>
      </div>
    )
  };
};