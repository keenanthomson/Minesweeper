import React from 'react';
import MineBoard from './mineboard.jsx';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='gamebox'>
        <MineBoard/>
      </div>
    )
  };
};