import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

  // const inputProps = {
  //   value:    // `value` is required
  //   onChange: //
  //   onBlur: () => {
  //     console.log('blur!')
  //   },
  //   type: 'search',
  //   placeholder: 'Search Cities...',
  //   autoFocus: true,
  // };


// React Google-Places-Autocomplete code to get the searchbar to render on the map

// NPM install react-p
class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'Chicago, IL' }
    this.onChange = (address) => {
      this.setState({ address })
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    let newSearch = geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.changeCity(latLng);
        this.props.breweryCity(this.state.address)
      })
      .catch(error => console.error('Error', error))

      
      console.log(newSearch)
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SimpleForm