import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import GoogleMapReact from 'google-map-react';
import './map.css'; 


const request = require('superagent');
const defaultMapCenter = {lat: 41.882059,lng: -87.627815};
const defaultZoom = 11;


class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

    render() {
      return (
        <div className='google-map'>
        <GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} defaultCenter={defaultMapCenter} defaultZoom={ defaultZoom }
             bootstrapURLKeys={{
                   key: 'AIzaSyCcpo5qaMbxdYeCRnWMxm9VvV03INVLxF0',
                   language: 'en'
                 }}
         >  
         {this.state.markers}
       </GoogleMapReact>
       </div>
      )
  }
}

export default App;
  // breweryDB API AJAX call to get locations
  // componentDidMount(){
  //   console.log(request)
  //   request
  //   .get('http://localhost:9292/locations')
  //   // .withCredentials()
  //   .end((err, data) => {
  //     console.log(err);
  //     console.log(data);
  //   })
  // };






  // render() {
  //   return (
  //     <div className="App">
  //         hey i'm a app.js component
  //     </div>
  //   );
  // }


// }

// export default App;
