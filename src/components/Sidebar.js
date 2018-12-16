import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
      // this.state = {

      // }
  }

  render() {
    return (
    // <div >
      <aside>
        <div className="search">
          <input
            type='text'
            placeholder='Search café...'
            onChange={(event) => this.props.handleSearch(event.target.value) }
            value={this.props.search}
          />
        </div>

        <ul className="cafe-list">
          { this.props.venues.map((cafe) => (
            <li key={cafe.venue.id}
            >
              {cafe.venue.name}
            </li>
            ))}
        </ul>

      </aside>
      // </div>
    )
  }
}

export default Sidebar;

// console.log(searchVenue)
// {reasons: {…}, venue: {…}, referralId: "e-1-4c0635d4191f20a15b20e414-49"}
// reasons: {count: 0, items: Array(1)}
// referralId: "e-1-4c0635d4191f20a15b20e414-49"
// venue:
// categories: [{…}]
// id: "4c0635d4191f20a15b20e414"
// location: {address: "Dr. Karl Lueger Platz 3", lat: 48.20754928109485, lng: 16.379431899181323, labeledLatLngs: Array(1), distance: 422, …}
// name: "Coffeeshop Company"
// photos: {count: 0, groups: Array(0)}
// __proto__: Object
// __proto__: Object
