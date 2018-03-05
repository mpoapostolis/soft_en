import React, { Component } from "react";
import ReactTable from "react-table";
import { css } from "emotion";

const container = css`
  margin-top: 75px;
`;

const columns = [
  {
    Header: "Income",
    accessor: "Income" // String-based value accessors!
  },
  {
    Header: "Month",
    accessor: "Month" // String-based value accessors!
  },
  {
    Header: "Tickets",
    accessor: "Tickets"
  }
];

class Statistics extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    const param = window.location.search.split(/\?|&/)[1] || "";
    this.props.getStatistics(param);
  }
  render() {
    const { statistics = [] } = this.props.owner;
    return (
      <div className={container}>
        <ReactTable defaultPageSize={30} data={statistics} columns={columns} />
      </div>
    );
  }
}

export default Statistics;
