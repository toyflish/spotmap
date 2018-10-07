import React, { Component } from 'react';
import Map from './components/Map';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentPosition: {
      //   lat: 43.3859738,
      //   lng: -4.4057574
      // }
      currentPosition: {
        lat: 54.3419319,
        lng: 9.9855943
      }
    };
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log({ coords });
        this.setState(prevState => ({
          currentPosition: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        }));
      });
    } else {
      console.log('Navigator no geolocation');
    }
  };

  handleChangedBounds = bounds => {
    console.log('toplevel handleChangedBounds', { bounds });
  };

  render() {
    const { currentPosition } = this.state;

    const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`;
    return (
      <div className="App">
        <Map
          center={currentPosition}
          onChangedBounds={this.handleChangedBounds}
          googleMapURL={mapUrl}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div className="map-container" style={{ height: `100vh` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
