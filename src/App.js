import React, { Component } from 'react';
import './App.css';
import * as myLocations from './locations.json';
import styles from './Styles';

// console.log(process.env.REACT_APP_xxx);

 const API_KEY =`${process.env.REACT_APP_API_KEY}`
 const MY_ID =`${process.env.REACT_APP_ID}`
 const MY_SECRET =`${process.env.REACT_APP_SECRET}`

// const API_KEY = keys.api;
// You're adding a <script> tag to your document to load the Google Maps API, but you aren't waiting for it to actually load before running your initMap method. Since it hasn't loaded yet, the google variable doesn't yet exist.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mapIsReady: false,
      locations: myLocations,
      map: '',
      infoWindow: '',
      venues: [],
      // markers: [],
    }
  }
  // calling renderMap
  componentDidMount() {
    this.fetchVenues()
    this.renderMap()
    this.fetchVenues()
  }

// https://api.foursquare.com/v2/venues/VENUE_ID
// https://api.foursquare.com/v2/venues/explore?near=Vienna&q=coffee

  // Get venues (caffe's in Vienna) from foursquere - requirement 2x id, place, # result, radius in meters
  fetchVenues = () => {
    const param = {
      query: 'coffee',
      near: 'Vienna',
      lat: 48.208176,
      lng: 16.373819,
      radius: 300,
      locale: 'en',
      limit: 100,
      v: "20181412"
    }

    let baseUrl = 'https://api.foursquare.com/v2/venues/explore?';
    let url = baseUrl + `client_id=${MY_ID}&client_secret=${MY_SECRET}&v=${param.v}&query=${param.query}&ll=${param.lat},${param.lng}&radius=${param.radius}&limit=${param.limit}&locale=${param.locale}&intent=browse`;

    // fetch data from set url with parameters
    fetch(url)
      .then(response =>
        response.json())
      .then(info =>
        console.log(info.response.groups[0].items))
      .then(data =>
        // change of state
        this.setState({
          venues: data })
        )
      .catch(err => console.log('Error occurs ' + err))
  }
  // Render map using API key from google, set up script for React
  renderMap = () => {
    // to work ${} use backticks
    const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3&callback=initMap`;
    runScript(url)
    window.initMap = this.initMap
  }

  // Initialize map - Google web quide
  // function initMap() {}
  initMap = () => {
           // if (this.state.mapIsReady) {
           //  console.log(this.state.mapIsReady)

    // helps run event listener for marker
    let anchorShow = this;

    const latLng = {lat: 48.208176, lng: 16.373819};

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 13,
      styles: styles
    });

    const { locations } = this.state;

    let infoWindow = new window.google.maps.InfoWindow();

    this.setState({ map, infoWindow });

    console.log(locations.default[0]);
    // for loop - to display local data Christmas Markets from locations.json
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
        animation: window.google.maps.Animation.DROP, //marker falls down
      });

      // add event listener when moving through mouse on marker
      marker.addListener('mouseover', function () {
        anchorShow.showInfoWindow(this, infoWindow);
      });
    }
    // }
  }

    // Get infowindow to marker
    showInfoWindow(marker, infowindow) {
      const { map, infoWindow } = this.state;

      if(infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' +
          '<h3>' + marker.title  + '</h3>' +
          '<img width="300" src="' + marker.image + '"/>'
          + '</div>');
        infowindow.open(map,marker);
        infoWindow.addListener('mouseout', function () {
          infoWindow.setMarker = null;
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
  // document.head.appendChild(script)
  // reference.insertBefore(script, reference.childNodes[0])
}
