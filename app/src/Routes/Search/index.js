import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Map from '../../components/Map';
import Card from '../../components/Card';
import TextField from '../../components/TextField';
import Filters from '../../components/Filters';
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
    const {
      container,
      filter,
      main,
      outCont,
      mapCont,
      activityCont,
    } = styles;

    return (
      <div>
        <div className={container}>
          <div className={filter}>
            <Filters />
          </div>
          <div className={main}>
            <div className={outCont}>
              <div className={activityCont}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            <div className={mapCont}>
              <Map isMarkerShown {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
