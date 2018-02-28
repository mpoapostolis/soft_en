import React, {Component} from 'react';
import Slider, {Range} from 'rc-slider';
import * as styles from './css';

class Filters extends Component {
  state = {
    min: 0,
    max: 65,
  };

  handleChange = ({currentTarget}) => {
    const key = currentTarget.name;
    const textValue = currentTarget.value;
    const isDate = key === 'date';
    const value = isDate ? new Date(textValue).getTime() : textValue;
    this.setState({[key]: value});
  };

  render() {
    const {min, max} = this.state;
    const {container, button} = styles;
    return (
      <div className={container}>
        <button className={button}>Date</button>
        <button className={button}>Price</button>
        <button className={button}>Distance</button>
        <button className={button}>test</button>
        <button className={button}>test</button>
      </div>
    );
  }
}

export default Filters;
