import React, { Component } from 'react';
import './App.css';
// import * as myLocations from './locations.json';
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
      // locations: myLocations,
      venues: [],
      marker: [],
   }
  }

  // Calling renderMap
  componentDidMount() {
    // fetchVenues before others
    this.fetchVenues()
  }

// https://api.foursquare.com/v2/venues/VENUE_ID
// https://api.foursquare.com/v2/venues/explore?near=Vienna&q=coffee

  // Get venues (caffe's in Vienna) from foursquere - requirement 2x id, place, # result, radius in meters
  fetchVenues = () => {
    const param = {
      query: 'coffee',
      section: 'topPicks',
      secTwo: 'nextVenue',
      near: 'Vienna',
      lat: 48.208176,
      lng: 16.373819,
      radius: 800,
      locale: 'en',
      limit: 50,
      v: "20181412"
    }

    let baseUrl = 'https://api.foursquare.com/v2/venues/explore?';
    let url = baseUrl + `client_id=${MY_ID}&client_secret=${MY_SECRET}&v=${param.v}&query=${param.query}&section=${param.section}&section=${param.secTwo}&ll=${param.lat},${param.lng}&radius=${param.radius}&limit=${param.limit}&locale=${param.locale}&intent=browse`;

    // Fetch data from set url with parameters
    fetch(url)
      .then(response =>
        response.json())
      .then(data => { // curly brackets for 2 commands
        console.log(data.response.groups[0].items)
        // put callback fce from componentDidMount
        this.setState({
          venues: data.response.groups[0].items },
          this.renderMap())
      })
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

    const { venues } = this.state;
    const latLng = {lat: 48.208176, lng: 16.373819};

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 15,
      styles: styles
    });

    // Create 1 infowindow - outside of looping/maping
    let infowindow = new window.google.maps.InfoWindow();

    // INSIDE OF VENUES WANT TO CREATE MARKER
      // renderMap runs before we get our updated venues
      // from foursquare.com - in state venues are []
      // => render map after setState venues in fetchVenues

    venues.map(item => {
      var position = {lat: item.venue.location.lat, lng: item.venue.location.lng}
      var title = item.venue.name;
      var address = item.venue.location.address;
      var postal = item.venue.location.postalCode;
      var id = item.venue.id;

      // Display and create marker - in 'loop'
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        address: address,
        postal: postal,
        id_marker: id,
        animation: window.google.maps.Animation.DROP, //marker falls down
      });

      // infowindow.setContent('<div>' +
      // '<h3>' + marker.title + '</h3>' +
      // '<h4>' + marker.address + ', ' + marker.postal + '</h4>' + '</div>')
      let infoContent = `
       <div class="card">
        <h2>${title}</h2>
        <p><strong>Address:</strong> ${address}, <strong>ZIP:</strong> ${postal}</p>
        <p><strong>Location:</strong> lat: ${position.lat}, lng: ${position.lng}</p>
       </div>
      `
      // Click event listener on Marker
      marker.addListener('mouseover', function () {
        // Change the content
        infowindow.setContent(infoContent);
        // open the infowindow on map with marker
        infowindow.open(map, marker);
      });
        infowindow.addListener('mouseout', function () {
         infowindow.setMarker = null;
        });
    }) // end of mapping
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
