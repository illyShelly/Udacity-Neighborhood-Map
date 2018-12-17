import React, { Component } from 'react';
// import React from 'react';

// function Navbar(props) {
class Navbar extends Component {

  toggleSide = () => {
    const sidebar = document.querySelector('aside')
    sidebar.classList.toggle('toggle-off')
  }

  render() {
    return (
        <nav aria-label="Cafés in Historic Center of Vienna">
          <span className="hamburger fas fa-bars" onClick={this.toggleSide}></span>
          <h1>Best Cafés in Historic Vienna</h1>
        </nav>
    )
  }
}

export default Navbar;
