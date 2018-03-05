import React, { Component } from "react";
import ReactTable from "react-table";
import Card from "../../components/Card";
import * as styles from "./css";
import Button from "material-ui/Button";

const columns = [
  {
    Header: "Name",
    accessor: "Name" // String-based value accessors!
  },
  {
    Header: "ActivityName",
    accessor: "ActivityName" // String-based value accessors!
  },
  {
    Header: "Price",
    accessor: "Price"
  },
  {
    Header: "EventDate",
    accessor: "EventDate"
  }
];

class Profile extends Component {
  state = {
    value: ""
  };
  componentDidMount() {
    this.props.getParentWallet();
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ value: parseInt(currentTarget.value) });
  };

  handleSubmit = ({ currentTarget }) => {
    const { value } = this.state;
    const { topUp } = this.props;
    if (value) topUp(value);
    this.setState({ value: "" });
  };

  render() {
    const { bookings } = this.props.parent;
    const {
      container,
      outCont,
      activityCont,
      item,
      balance,
      booking,
      btn,
      input
    } = styles;
    const { activities } = this.props.owner;
    const { t } = this.props;
    return (
      <div className={container}>
        <div className={balance}>
          <div>
            <h3>
              {t("Balance")}: {this.props.parent[`Balance`]}
            </h3>
            <p>
              {t("Bonus Points")}: {this.props.parent[`BonusPoints`]}
            </p>
          </div>
          <div />

          <div className={booking}>
            <h1>{t("ADD MONEY")} ¥</h1>
            <input
              placeholder="enter money"
              type="number"
              value={this.state.value}
              min={0}
              className={input}
              onChange={this.handleChange}
            />
            <Button
              className={btn}
              onClick={this.handleSubmit}
              variant="raised"
            >
              {t("ADD")}
            </Button>
          </div>
        </div>

        <div className={item}>
          <h3>{t("History")}</h3>
          <ReactTable defaultPageSize={10} data={bookings} columns={columns} />
        </div>
      </div>
    );
  }
}

export default Profile;
