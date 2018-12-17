import React, { Component } from 'react';
import './App.css';
// import * as myLocations from './locations.json';
import styles from './Styles';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import escapeRegExp from 'escape-string-regexp';
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
      markers: [],
      searchVenues: [], // using for filtering when search
      search: '',
      selectCafe: null
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
        // console.log(data.response.groups[0].items)
        // put callback fce from componentDidMount
        this.setState({
          venues: data.response.groups[0].items,
          // added searchVenues -> using filter for search with RegExp
          searchVenues: data.response.groups[0].items
           },
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

    const { venues, markers } = this.state;
    const latLng = {lat: 48.208176, lng: 16.373819};

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 15,
      styles: styles,
      mapTypeControl: false, // hide satelite, terene option
      streetViewControl: true,
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_TOP
          } // enable street view - icon is in top-left
    });

    // Create 1 infowindow - outside of looping/maping
    let infowindow = new window.google.maps.InfoWindow();

    // Choose icon of marker - when hover on sidebar
    let defaultIcon = this.makeMarkerIcon('e6005c');
    let activeIcon = this.makeMarkerIcon('d4c382');

    // INSIDE OF VENUES WANT TO CREATE MARKER
      // renderMap runs before we get our updated venues
      // from foursquare.com - in state venues are []
      // => render map after setState venues in fetchVenues
    venues.map(item => {
      var position = {lat: item.venue.location.lat, lng: item.venue.location.lng}
      var title = item.venue.name;
        // console.log(title);
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
        icon: defaultIcon
      });

      // Added marker to array
      markers.push(marker);
      // console.log(markers);
      this.setState({
        markers: markers
      })

      // display markers for handleClick for sidebar - one by one added
      // console.log(markers);

      // infowindow.setContent('<div>' +
      // '<h3>' + marker.title + '</h3>' + '</div>')
      let infoContent = `
       <div class="card">
        <h2>${title}</h2>
        <p><strong>Address:</strong> ${address}, <strong>ZIP:</strong> ${postal}</p>
        <p><strong>Location:</strong> lat: ${position.lat}, lng: ${position.lng}</p>
       </div>
      `
      // Click event listener on Marker
      marker.addListener('click', function () {
        // Change the content
        infowindow.setContent(infoContent);
        // open the infowindow on map with marker
        infowindow.open(map, marker);
        // marker.setIcon(activeIcon); nope
      });
        infowindow.addListener('clickout', function () {
        // marker.setIcon(defaultIcon);
        infowindow.setMarker(null);
        // window.google.maps.event.clearInstanceListeners(marker);
        });
    }) // end of mapping
  }

  // Create shape and colors of markers - image
  makeMarkerIcon = (markerColor) => {
    let markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(22, 30), //top part
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(22,30));
    return markerImage;
  }

  handleSearch = (event) => {
    this.setState({
      search: event,
      venues: this.state.searchVenues.filter((searchVenue) =>
            // console.log(searchVenue.venue.name)
            new RegExp(event, "i").exec(searchVenue.venue.name))
    });
    // console.log("after filter: " + this.state.venues);
  }

// 1. approach
// - empty array for selectMarker [] in state
// - compare id of marker with id of Cafe
// - when click on cafe - change color of marker
// - push that marker to the selectMarker [...] setState({})
// => solve remove color of marker and change to default again

// 2. approach
// - empty selectCafe as null in state
// - check clickedCafe (id) with cafe (list of in Sidebar)
// - push to that to setState({}) - change its state...


  handleClick = (clickedCafe) => {
    // I FORGOT .map
    // handleClick i wrote this.props???
    this.setState({
      selectCafe: clickedCafe
    })

    this.state.markers.map(marker => {
      if(marker.id_marker === clickedCafe) {
        // add class to marker or change him
         window.google.maps.event.trigger(marker, 'click');
        marker.setIcon(this.makeMarkerIcon('80ffff'))
        // change color of marker icon to default
        setTimeout(() =>
          { marker.setIcon(this.makeMarkerIcon('e6005c'))}, 2500);
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar />
      <div className="App">
        <Sidebar
          venues={this.state.venues}
          search={this.state.search}
          searchVenues={this.state.venues}
          handleSearch={this.handleSearch}
          handleClick={this.handleClick}
        />
        <main>
          <div id="map" role="application"></div>
        </main>
      </div>
      </div>
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

// structure of marker - 128 line
// 0: _.gf
// address: "Salztorbrücke"
// anchorPoint: _.N {x: -0.5, y: -43, j: true}
// animating: false
// animation: null
// changed: ƒ (a)
// clickable: true
// closure_uid_471573339: 12
// gm_accessors_: {map: null, position: null, title: null, address: null, postal: null, …}
// gm_bindings_: {map: {…}, position: {…}, title: {…}, address: {…}, postal: {…}, …}
// id_marker: "4bebe0036295c9b634278808"
// internalPosition: _.P {lat: ƒ, lng: ƒ}
// map: Pg {gm_bindings_: {…}, __gm: rg, gm_accessors_: {…}, center: _.P, zoom: 15, …}
// position: _.P {lat: ƒ, lng: ƒ}
// postal: "1020"
// title: "Adria"
// visible: true
// __e3_: {mouseover: {…}, click: {…}}
// __gm: {set: _.Sd, qe: null, cc: {…}}
// __proto__: ff
