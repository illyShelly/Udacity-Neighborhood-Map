import React, { Component } from 'react';
import './App.css';
// import './Keys.js';
import keys from './Keys';
import * as myLocations from './locations.json';

const API_KEY = keys.api;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: myLocations,
      markers: [],
      data: ''
    }
  }
  // calling renderMap
  componentDidMount() {
    this.renderMap()
  }
  // fetchVenues = () => {
  //   const url = 'https://api.foursquare.com/v2/venues/explore';
  //   const param = {
  //     my_id: '',
  //     my_secret: '',
  //     query: 'coffee',
  //     lat: 48.208176,
  //     lng: 16.373819
  //   }
  // }
  renderMap = () => {
    const url = "https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3&callback=initMap";
    runScript(url)
    window.initMap = this.initMap
  }

  // function initMap() {}
  initMap = () => {
    const vienna = {lat: 48.208176, lng: 16.373819};

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: vienna,
      zoom: 13
    });

    let marker = new window.google.maps.Marker({
      position: vienna,
      map: map,
      title: 'Aloha noha'
    });

    // let infoWindow = new window.google.infoWindow({
    // })

  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

function runScript(url) {
  // var reference = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url
  script.async = true
  script.defer = true
  document.body.appendChild(script);
  // reference.insertBefore(script, reference.childNodes[0])
}

export default App;
