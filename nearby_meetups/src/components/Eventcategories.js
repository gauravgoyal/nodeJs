import React, { Component } from 'react';

class Eventcategories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      categories: []
    };
  }

  componentDidMount() {
    let proxy_url = 'https://cors-anywhere.herokuapp.com/';
    let baseURL = "https://api.eventful.com/json/categories/list";
    let finalURL = proxy_url + baseURL + "?app_key=nV8cJ95kVwdcVQH2&sign=true";
    fetch(finalURL)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result.category
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, categories } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="categories loader"></div>;
    } else {
      return (
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label form-check-label">Select Category:</label>
            <div className="col-sm-4">
              <select className="form-control" onChange={ this.props.onChange }>
                {categories.map((category, index) => (
                  <option key={ category.id } value={ category.id }>{ category.name }</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      );
    }
  }
}

export default Eventcategories;
