import React, { Component } from 'react';
import './App.css';
// import './Keys.js';
import keys from './Keys';

const API_KEY = keys.api;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.208176, lng: 16.373819},
    zoom: 13
  })
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
