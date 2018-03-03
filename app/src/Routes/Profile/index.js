import React, { Component } from "react";
import ReactTable from "react-table";
import * as styles from "./css";

const data = [
  {
    name: "Tanner Linsley",
    age: 26,
    friend: {
      name: "Jason Maurer",
      age: 23
    }
  }
];

const columns = [
  {
    Header: "Name",
    accessor: "name" // String-based value accessors!
  },
  {
    Header: "Age",
    accessor: "age",
    Cell: props => <span className="number">{props.value}</span> // Custom cell components!
  },
  {
    id: "friendName", // Required because our accessor is not a string
    Header: "Friend Name",
    accessor: d => d.friend.name // Custom value accessors!
  },
  {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: "friend.age"
  }
];

class Profile extends Component {
  componentDidMount() {
    this.props.getWallet();
  }

  render() {
    const { container, balanceCont, item } = styles;
    const { account: { Role } } = this.props;
    return (
      <div className={container}>
        <div className={item}>
          <h3>Balance</h3>
          <div />
        </div>

        <div className={item}>
          <h3>History</h3>
          <ReactTable data={data} columns={columns} defaultPageSize={10} />
        </div>
      </div>
    );
  }
}

export default Profile;
