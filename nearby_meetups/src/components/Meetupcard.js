import React, { Component } from 'react';

class Meetupcard extends Component {
  render() {
    return (
        <div className="event-wrapper panel panel-default panel-profile m-b-0">
          <div className={ "panel-heading " + this.props.custom_class }></div>
          <div className="panel-body text-center">
            <img className="panel-profile-img" src = { this.props.image } alt = { this.props.title } />
            <h5 className="panel-title p-2"> { this.props.title } </h5>
              <div className="event-address m-b p-1">
                <span className="venue-address p-1">{ this.props.venue_address }</span>
                <div className="city-country p-1">
                  <span className="city"><b>City: </b>{ this.props.city_name }</span>
                  <span className="country"><b>Country: </b>{ this.props.country_name }</span>
                </div>
              </div>
              <a className="btn btn-primary-outline btn-sm m-b" target="_blank" href={ this.props.link }>
                <span className="icon icon-add-user">More Info</span>
              </a>
          </div>
        </div>
    )
  }
}

export default Meetupcard;
