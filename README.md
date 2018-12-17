# MyReads Udacity Project

This is Final **Project #8** which is developed for Google Front-End Nanodegree Program at Udacity. This project was made from scratch in React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).made with REACT.  <!-- Web application is available on **[GithubPages](https://illyShelly.github.io/udacity-final-myreads)** -->

## Table of Contents

* [Project Overview](#overview)
* [Get Started](#get-started)
* [About The Project](#about-the-project)

## Project Overview

This is the FINAL Project #8 made for Udacity classroom on FEND+React track. To achieve the requirements - students must develop single page application featuring map of neighborhood with these functionality: highlighted locations, using third party data API about these locations and posibility to browse this content.

#### From Scratch
Starting app from scratch in React > link https://github.com/facebook/create-react-app


#### Folder Structure
```

my-map
  public/
    index.html
    manifest.json
  src
    components/
      Navbar.js
      Sidebar.js
    App.css
    App.js
    App.test.js
    index.css
    serviceWorker.js
    Styles.js
  .env
  .gitignore
  .package-lock.json
  package.json
  README.md
  yarn.lock

```

## Get Started

#### Interact directly on GithubPages - in progress
**[GithubPages]()**

#### Locally on your machine
* Download or clone the repo
* `cd` _Udacity-Neighborhood-Map_ folder
* Install all dependencies with `yarn install or npm install`
* Start the server with `yarn start or npm start`
* If not opening automatically in your browser, visit `http://localhost:3000`

## About The Project

This application is using third party API's. Goodle Maps JS, Foursquare getting data about the best cafés located in the historic center of Vienna (Austria). The web application is fully responsive with the opportunity to toggle the sidebar to interact only with the map.

Important: To run smoothly this application using Foursquare data, you need to provide client ID and Client Secret. At the same time to display and work with Google Maps is necessary to get API key.

Because this application does not have any images when providing data, after display particular Café is implemented Google Map feature of Street view and discover more particular location.

### Dependencies

* Escape RegExp - [`escape-string-regexp`](https://www.npmjs.com/package/escape-string-regexp)
* Data fetched with Foursquare.com
