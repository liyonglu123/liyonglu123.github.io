import React, { Component } from 'react';
import {Button, Icon} from 'antd';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <Icon type="swap" />
      </div>
    );
  }
}

export default App;
