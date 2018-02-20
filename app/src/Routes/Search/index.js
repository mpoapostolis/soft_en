import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Map from '../../components/Map';
import * as styles from './css';

class Search extends Component {
  componentDidMount() {}
  componentWillUnmount() {
    this.props.clearTmp;
  }

  handleChange = ({currentTarget}) => {
    this.setState({value: currentTarget.value});
  };

  handleSubmit = () => {
    const {setTmpData, push} = this.props;
    setTmpData(this.state);
    push('/search');
  };

  clearValue = ({currentTarget}) => {
    currentTarget.value = '';
  };

  render() {
    const {container, activitiesCont, box, mapCont} = styles;

    return (
      <div>
        <input />
        <div className={container}>
          <div className={activitiesCont}>
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
            <div className={box} />
          </div>
          <div className={mapCont}>
            <Map isMarkerShown {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
