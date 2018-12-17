import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
      this.state = {
      }
  }

  render() {
    return (
      <aside>
        <div className="search">
          <input
            type='text'
            placeholder='Search café...'
            onChange={(event) => this.props.handleSearch(event.target.value) }
            value={this.props.search}
            aria-label="Filter Cafés"
            tabIndex='0'
          />
        </div>

      {this.props.venues.length !== 0 && (
        <ul className="cafe-list">
          { this.props.venues.map((cafe) => (
            // onClick event listener takes cafe's id
            <li
              key={cafe.venue.id}
              role="Menuitem"
              onClick={() => this.props.handleClick(cafe.venue.id)}
              tabIndex='0'
            >
              {cafe.venue.name}
            </li>
            ))}
        </ul>
        )
      }
      {this.props.venues.length === 0 && this.props.search !== '' && (
        <p className="alert">This café isn't in our DB</p>
        )
       }

      </aside>
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
