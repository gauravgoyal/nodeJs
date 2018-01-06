import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Distanceslider extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      reverseValue: 10
    }
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeReverse = (value) => {
    this.setState({
      reverseValue: value
    })
  }

  handleChangeComplete = (value) => {
    this.props.onSliderStop(this.state.reverseValue);
  }

  render () {
    const { reverseValue } = this.state
    return (
      <div className='slider orientation-reversed'>
        <div className='slider-group'>
          <div className='slider-horizontal'>
            <Slider
              min={0}
              max={200}
              value={reverseValue}
              orientation='horizontal'
              onChange={this.handleChangeReverse}
              onChangeComplete={this.handleChangeComplete}
            />
            <p><b>Current Radius:</b> {reverseValue} KM. <small>Please use slider to change the radius to search for events.</small></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Distanceslider
