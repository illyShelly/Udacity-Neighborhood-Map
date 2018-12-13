import React, { Component } from 'react';
import './App.css';
import keys from './Keys';
import * as myLocations from './locations.json';

const API_KEY = keys.api;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: myLocations,
      map: '',
      infoWindow: ''
      // markers: [],
      // data: ''
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
  //     lng: 16.373819,
  //      v: "20181312"
  //   }

  //   // fetch(url + param)
  //   // .then(response => response.json())
  //   // .then(data => console.log(data))
  // }

  renderMap = () => {
    const url = "https://maps.googleapis.com/maps/api/js?key=${API}&v=3&callback=initMap";
    runScript(url)
    window.initMap = this.initMap
  }

  // function initMap() {}
  initMap = () => {
    const latLng = {lat: 48.208176, lng: 16.373819};

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 13
    });

    const { locations } = this.state;
    let largeInfoWindow = new window.google.maps.InfoWindow();


    console.log(locations.default[0]);
    for (let i = 0; i < locations.default.length; i++) {

      let position = locations.default[i].location;
      let title = locations.default[i].title;
      let img = locations.default[i].image;
      let id = i;

      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        image: img,
        id_marker: id,
        animation: window.google.maps.Animation.DROP,
      });
    }
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

export default App;

function runScript(url) {
  // var reference = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url
  script.async = true
  script.defer = true
  document.body.appendChild(script);
  // reference.insertBefore(script, reference.childNodes[0])
}
