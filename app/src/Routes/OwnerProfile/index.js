import React, { Component } from "react";
import ReactTable from "react-table";
import Card from "../../components/Card";
import * as styles from "./css";

const columns = [
  {
    Header: "Name",
    accessor: "ActivityName" // String-based value accessors!
  },
  {
    Header: "Price",
    accessor: "Price"
  }
];

class Profile extends Component {
  componentDidMount() {
    this.props.getOwnerWallet();
  }

  render() {
    const { container, outCont, activityCont, item, balance } = styles;
    const { activities } = this.props.owner;
    const { t } = this.props;

    return (
      <div className={container}>
        <div className={balance}>
          <h3>
            {t("Monthly Balance")}: {this.props.owner[`Monthly Balance`]}
          </h3>
          <div />
        </div>

        <div className={item}>
          <h3>{t("My Activities")}</h3>
          <div className={outCont}>
            <div className={activityCont}>
              {activities.map((obj, key) => (
                <Card owner {...obj} {...this.props} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
