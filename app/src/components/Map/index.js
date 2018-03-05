import React, { Component } from "react";
import * as styles from "./css";

let map;
let gmarkers = [];

class Map extends Component {
  componentDidMount() {
    const { filters: { Lat, Long }, updateCoords, activities } = this.props;
    const { getActivities } = this.props;
    const coords = { lat: Lat, lng: Long };
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: coords,
      zoom: 15
    });

    map.addListener("dragend", () => {
      const lat = map.center.lat();
      const lng = map.center.lng();
      Promise.resolve(updateCoords({ Lat: lat, Long: lng })).then(
        getActivities()
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextActivities = nextProps.activities.data;
    const activities = this.props.activities.data;
    if (nextActivities !== activities && nextActivities) {
      gmarkers.map((m, i) => gmarkers[i].setMap(null));
      nextActivities.map(obj => {
        const coords = {
          lat: obj.Coordinates.coordinates[0],
          lng: obj.Coordinates.coordinates[1]
        };
        let marker = new window.google.maps.Marker({
          position: coords,
          map: map,
          title: obj.ActivityName
        });
        gmarkers.push(marker);
      });
    }
  }

  render() {
    const { map } = styles;
    return <div className={map} id="map" />;
  }
}
export default Map;
