import React, { Component } from 'react';
import './App.css';
import Meetupgrid from './components/Meetupgrid.js';
import Eventcategories from './components/Eventcategories.js';
import {geolocated} from 'react-geolocated';
// import Distanceslider from './components/Distanceslider.js';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      category: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Nearby Events</h1>
            <p className="lead text-muted">Come and find events around you!</p>
          </div>
        </section>

        <div className="filters container">
          { this.props.coords !== null ?
            <Eventcategories onChange= { this.handleChange }/> : ''}
        </div>
        <div className="container">
          { this.props.coords !== null ?
            <Meetupgrid
              category= { this.state.category }
              coordinates = { this.props.coords }
              /> :
            this.props.isGeolocationEnabled ?
              <div>Please wait while we fetch your location and show you nearby events...</div>:
              <div>Please allow browser to detect your location.</div>
          }
        </div>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
