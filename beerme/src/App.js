import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import GoogleMapReact from 'google-map-react';
// import PlacesAutocomplete from 'react-places-autocomplete'
// import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import SimpleForm from './autocomplete.js'
import './map.css'; 



const request = require('superagent');
const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;


class App extends Component {
  constructor(){
    super()
    this.state = {
      value: []
    }
  }

  // componentDidMount(){
      // breweryDB API AJAX call to get locations
  componentDidMount(){
    // console.log(request)
    request
    .get('http://localhost:9292/unitedstates')
    // .withCredentials()
    .end((err, data) => {
      
      let parsedData = JSON.parse(data.text);

      let breweries = parsedData.data;

      breweries.map((brewery,index)=>{
        console.log(brewery.latitude)
      })
      breweries.map((brewery,index)=>{
        console.log(brewery.longitude)
      })

      // for (let i = 0; i < data.text.length; i++){
      //   console.log(data.text[i])  
      // }
      // for (let brewery in data.text){
      //   console.log(brewery.id)
      // }
      // // data.map((brewery, index)=>{
      // //   console.log(brewery)
      // // })
      // let test = data.text;
      // this.setState({value: test})
      // test.forEach(()=>{
      //   console.log('worked')
      // })
      // test.map((brewery,index)=>{
      //   console.log(brewery)
      // })
      
      // console.log(err);
      // console.log(data);
      
  })
  
}

    render() {
      return (
        <div className='google-map'>
          

       </div>
      )
  }
}

export default App;







