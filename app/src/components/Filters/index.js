import React, {Component} from 'react';
import * as styles from './css';

class Filters extends Component {
  render() {
    const {container} = styles;
    return (
      <div className={container}>
        <input />
        <input type="range" />
      </div>
    );
  }
}

export default Filters;
