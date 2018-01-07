import React, { Component } from 'react';
import dateformat from 'dateformat';

class Meetupcard extends Component {
  render() {
    let startDate = dateformat(new Date(this.props.event.start_time), "mmmm dS, yyyy, h:MM:ss TT");
    let endDate = dateformat(new Date(this.props.event.stop_time), "mmmm dS, yyyy, h:MM:ss TT");
    return (
        <div className="event-wrapper panel panel-default panel-profile m-b-0">
          <div className={ "panel-heading " + this.props.custom_class }></div>
          <div className="panel-body text-center">
            <img className="panel-profile-img" src = { this.props.image } alt = { this.props.event.title } />
            <h5 className="panel-title p-2"> { this.props.event.title } </h5>
            <p className="event-date"> <b>Start Date:</b> { startDate } </p>
            <p className="event-date"> <b>End Date:</b> { endDate } </p>
            <div className="event-address m-b p-1">
              <p className="venue-address p-1">{ this.props.event.venue_address }</p>
              <div className="city-country p-1">
                <span className="city"><b>City: </b>{ this.props.event.city_name }</span>
                <span className="state country"><b>State: </b>{ this.props.event.region_name }</span>
                <span className="country"><b>Country: </b>{ this.props.event.country_name }</span>
              </div>
            </div>
            <a className="btn btn-primary-outline btn-sm m-b" target="_blank" href={ this.props.event.url }>
              <span className="icon icon-add-user">More Info</span>
            </a>
          </div>
        </div>
    )
  }
}

export default Meetupcard;
