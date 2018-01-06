import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Distanceslider extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      reverseValue: 0
    }
  }

  handleChangeReverse = (value) => {
    this.setState({
      reverseValue: value
    })
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
            />
            <div className='value'>{reverseValue}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Distanceslider
