import React, {Component} from 'react';
import * as styles from './css';

class Map extends Component {
  componentDidMount() {
    const {account: {coords}, updateCoords} = this.props;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: coords,
      zoom: 15,
    });

    var marker = new window.google.maps.Marker({
      position: coords,
      map: map,
      title: 'Click to zoom',
    });

    map.addListener('center_changed', () => {
      const lat = map.center.lat();
      const lng = map.center.lng();
      updateCoords({lat, lng});
    });
  }

  render() {
    const {map} = styles;
    return <div className={map} id="map" />;
  }
}
export default Map;
