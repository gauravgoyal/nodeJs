import React, { Component } from 'react';
import Meetupcard from './Meetupcard.js';

class Meetupgrid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      paging: false,
      page: 1,
    };
    this.onScroll = this.onScroll.bind(this);
    this.createURL = this.createURL.bind(this);
  }

  createURL() {
    let app_key = "nV8cJ95kVwdcVQH2";
    let where = this.props.coordinates.latitude + "," + this.props.coordinates.longitude;
    let page_number = this.state.page;
    let category = this.props.category;
    let baseURL = "http://api.eventful.com/json/events/search";
    let finalURL = baseURL + "?"
      + "app_key=" + app_key
      + "&where=" + where
      + "&page_number=" + page_number
      + "&cateogory=" + category
      + "page_size=32&sort_direction=descending";
    return finalURL;
  }

  onScroll() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) {
      if (!this.state.paging) {
        this.setState((prevState) => ({
          paging: true,
          page: prevState.page + 1
        }));
        fetch(this.createURL())
        .then(res => res.json())
        .then(
          (result) => {
            if (result.events === null) {
              this.setState({
                paging: true
              });
            }
            else {
              this.setState((prevState) => ({
                paging: false,
                events: prevState.events.concat(result.events.event)
              }));
            }
          },
          (error) => {
            this.setState({
              paging: false,
              error
            });
          }
        )
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.category !== prevProps.category) {
      fetch(this.createURL())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            events: result.events.event
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
  }

  componentDidMount() {
    this.createURL();
    fetch(this.createURL())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            events: result.events.event
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { error, isLoaded, events } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="loader"></div>;
    } else {
      return (
        <div className="row row-bordered row-centered">
          <div className="col-sm-12">
            <div className="row">
              {events.map((item, index) => (
                <div key={ item.id } className="col-md-4 m-b-lg">
                <Meetupcard
                  image = { item.image !== null ? item.image.medium.url : 'http://www.pixesocial.com/custom/images/pixe-event-marketer-icon.png' }
                  title = { item.title }
                  link = { item.url }
                  city_name = { item.city_name }
                  country_name = { item.country_name }
                  venue_address = { item.venue_address }
                  custom_class = { index % 2 === 0 ? 'even' : 'odd' }
                ></Meetupcard>
                </div>
              ))}
            </div>
          </div>
          { this.state.paging ? (<div className="loader"></div>) : ''}
        </div>
      );
    }
  }
}

export default Meetupgrid;
