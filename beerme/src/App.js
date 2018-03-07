import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent'; 
import './Map';


class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  // breweryDB API AJAX call to get locations
  componentDidMount(){
    console.log(request)
    request
    .get('http://localhost:9292/locations')
    // .withCredentials()
    .end((err, data) => {
      console.log(err);
      console.log(data);
    })
  };






  render() {
    return (
      <div className="App">
          hey i'm a app.js component
      </div>
    );
  }


}

export default App;
