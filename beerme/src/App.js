import React, { Component } from 'react';
// import APIKEY from './config.js'
import GoogleMapReact from 'google-map-react'
import SimpleForm from './autocomplete.js'
import './map.css'; 
import Footer1 from './Footer/footer.js'
import Header1 from './Header/header.js'

const request = require('superagent');
const defaultZoom = 11;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedPlace: "",
      submittedAddress: this.props.address,
      latitudes: [],
      longitudes: [],
      center: {lat: 41.8781136, lng: -87.62979819999998},
      defaultMapCenter: {lat: 41.8781136, lng: -87.62979819999998},
      zoom: 11,
      addressToBeGeocoded: "",
      reRender: false,
      markers: [],
      map: '',
      maps: ''
    }
  }
  toggleState = () => {
    this.setState({reRender: !this.state.reRender})
  }

  changeCity = (newcity)=>{
    console.log('hit', newcity)
    this.setState({center: newcity})
  }

  // Used to immediately add new markers created by the user
  addCoordinate =(lat,long)=>{
    this.setState({
      latitudes: [...this.state.latitudes, lat],
      longitudes: [...this.state.longitudes, long]
    })
  }

// renders markers on map per breweries' lat and lon
  renderMarkers = (map, maps, latitude, longitude) => {
        const state = this.state;
        state.map = map;
        state.maps = maps;
        this.setState(state)
  }

  handleChange = (e) =>{  
    this.setState({addressToBeGeocoded: e.currentTarget.value})

  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({addressToBeGeocoded: e.currentTarget.value});

    this.getCoordinates();  
  }

  breweryCity = (location)=>{
    let responseJSON = []
    request
      .get('http://localhost:9292/breweries/in/'+location)
      .end((error, response)=>{
        let responseJSONn = JSON.parse(response.text)
        // console.log(responseJSON)
        const state = this.state;
        for(let i = 0; i<responseJSONn.length; i++){ 
         state.latitudes.push(responseJSONn[i].latitude)
         state.longitudes.push(responseJSONn[i].longitude)
        }
        this.setState(state)
      })
  }
  componentWillMount() {

    let responseJSON = []
    request
      .get('http://localhost:9292/unitedstates')
      .end((error, response)=>{
        let responseJSON = JSON.parse(response.text)
        let responseArray = responseJSON.data
        // console.log(responseJSON.data)
        const state = this.state;
        for(let i = 0; i<responseArray.length; i++){ 
         state.latitudes.push(responseArray[i].latitude)
         state.longitudes.push(responseArray[i].longitude)
        }
        this.setState(state)
      })
  }
  render() {
    if(this.state.map !== ''){
      const maps = this.state.maps
      const map = this.state.map
      const markers = this.state.latitudes.map((lat, i) => {
        return  new maps.Marker({          
            position: {lat: lat, lng: this.state.longitudes[i]},
              map
              });
      })
    }
      return (
        <div className='google-map'>
        <Header1/>
        <SimpleForm changeCity={this.changeCity} breweryCity={this.breweryCity}/>
        <GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} center={this.state.center} defaultCenter={this.state.defaultMapCenter} defaultZoom={ defaultZoom }
             bootstrapURLKeys={{
                   key: 'AIzaSyCcpo5qaMbxdYeCRnWMxm9VvV03INVLxF0',
                   language: 'en'
                 }}
                 onGoogleApiLoaded={({map, maps}) => {
                  for (let i = 0; i < this.state.latitudes.length; i++) {
                    this.renderMarkers(map, maps, this.state.latitudes[i], this.state.longitudes[i])
                  }
                 }}
         >  
         {this.state.markers}
       </GoogleMapReact>
       <Footer1/>
       </div>
      )
  }
}

export default App;












