import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

  // const inputProps = {
  //   value:    // `value` is required
  //   onChange: this.state.
  //   onBlur: () => {
  //     console.log('blur!')
  //   },
  //   type: 'search',
  //   placeholder: 'Search Cities...',
  //   autoFocus: true,
  // };


// React Google-Places-Autocomplete code to get the searchbar to render on the map

// NPM install react-places-autocomplete
class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: 'San Francisco, CA' }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
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