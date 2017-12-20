import React, { Component } from "react";
import * as styles from "./css";
import ArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import ArrowRight from "material-ui-icons/KeyboardArrowRight";
import { formatDate } from "../../utils";
import { getMsg } from "../../msgs";
import toLower from "ramda/src/toLower";
import Dialog from "../../components/Dialog";

const viewPerPageArr = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50];

class Table extends Component {
  state = {
    limit: 5,
    page: 1,
    order: "Newest to Oldest",
    filterStatus: "ACTIVE",
    openDialog: false,
  };

  handleChangeLimit = ({ target }) => {
    const { setLimit } = this.props;
    setLimit(+target.value);
  };

  handChangeOffset = (maxPages, direction) => {
    const { setOfsset, filters: { offset } } = this.props;
    setOfsset(offset + direction);
  };

  dataToEdit = obj => ({
    id: obj.id,
    nameValue: obj.name,
    prizeValue: obj.prizeName,
    startsValue: obj.startTime,
    endsValue: obj.endTime,
    termsValue: obj.shareUrl,
    path: obj.media.uri,
    contestType: obj.contestType,
    winners: obj.winners,
    status: obj.status,
  });

  actionsInfo = dataToEdit => {
    const { account: { role }, drawContest } = this.props;
    const alreadyDraw = dataToEdit.winners ? dataToEdit.winners.length : 0;
    let obj = { name: "", actions: () => null };
    if (role === "admin") {
      const valid = dataToEdit.startsValue > Date.now();
      obj.classN = valid ? "" : "noActive";
      obj.name = "Delete";
      obj.action = () =>
        valid && this.setState({ contestName: dataToEdit.nameValue, openDialog: true, idToDelete: dataToEdit.id });
    } else if (role === "legal") {
      const valid = dataToEdit.endsValue < Date.now() && !alreadyDraw && dataToEdit.status === "EXPIRED";
      obj.classN = valid ? "" : "noActive";
      obj.name = "Draw";
      obj.action = () => valid && drawContest(dataToEdit.id);
    }
    return obj;
  };

  showItem = (obj, key) => {
    const { exportFile, statusClass } = styles;
    const { tmpData: { view }, download } = this.props;
    switch (key) {
      case "startTime":
      case "endTime":
      case "contestDate":
      case "date":
        const date = new Date(obj[key]);
        return formatDate(date, "MMM  d yyyy H:mm");
      case "filePath":
        return (
          <img
            title="Download"
            onClick={() => download(`${obj[key]}`)}
            className={exportFile}
            src="/images/export.png"
            alt="export"
          />
        );
      case "status":
        return <div className={`${statusClass} ${toLower(obj[key])}`}>{obj[key]}</div>;

      case "actions":
        const dataToEdit = view === "allContests" ? this.dataToEdit(obj) : {};
        const { name, action, classN } = this.actionsInfo(dataToEdit);
        return (
          <div onClick={action} className={`${statusClass} ${classN} edit`}>
            {name}
          </div>
        );

      default:
        const str = obj[key] ? "" + obj[key] : "0";
        return str.replace(/_/g, " ");
    }
  };

  componentDidMount() {
    const { tableFilters, order } = this.props.filters;
    this.setState({ ...tableFilters, order: order.name });
  }

  handleOrder = ({ target }) => {
    const { setOrder } = this.props;
    const dir = target.value === "Newest to Oldest" ? "DESC" : "ASC";
    setOrder({ name: target.value, dir });
  };

  handleFilterStatus = ({ target }) => {
    const { setStatusFilter } = this.props;
    const filter = target.value === "All" ? "" : target.value;
    setStatusFilter(filter);
  };

  renTableHeader() {
    const { col, item } = styles;
    const { flamesTab, whatToShow = [], total } = this.props;
    return total ? (
      <div className={`${col}  ${flamesTab ? "flames" : ""} head`}>
        {whatToShow.map((label, key) => (
          <div key={key} className={`${item}  ${flamesTab ? "flames" : ""}`}>
            {getMsg("en", label)}
          </div>
        ))}
      </div>
    ) : (
      <div />
    );
  }

  renFooter() {
    const { col, item, select, p, pointer } = styles;
    const { filters: { offset, limit }, total } = this.props;
    const maxPages = limit > total ? 1 : Math.ceil(total / limit);
    const canShowLeft = offset > 0;
    const canShowRight = offset + 1 < maxPages;
    return total ? (
      <div className={col}>
        <div className={`${item} footer`}>
          <p className={p}>Rows per Page:</p>
          <select onChange={this.handleChangeLimit} value={limit} className={select}>
            {viewPerPageArr.map((option, key) => <option key={key}>{option}</option>)}
          </select>
          {canShowLeft && <ArrowLeft className={pointer} onClick={() => this.handChangeOffset(maxPages, -1)} />}
          <p className={p}>
            page <b style={{ color: "black" }}>{offset + 1}</b> of {maxPages}
          </p>
          {canShowRight && <ArrowRight className={pointer} onClick={() => this.handChangeOffset(maxPages, 1)} />}
        </div>
      </div>
    ) : (
      <div />
    );
  }

  renBody() {
    const { col, item, msg } = styles;
    const { dataArr, flamesTab, whatToShow = [], dataError, tmpData: { view } } = this.props;
    if (dataError)
      return <b className={`${msg} ${col} error`}>{`Something went wrong and your search couldn't be completed`}</b>;
    if (dataArr.length === 0) return <b className={`${msg} ${col} error`}>{`No ${view} found`}</b>;
    return dataArr.map((obj, i) => (
      <div key={i} className={`${col}  ${flamesTab ? "flames" : ""}`}>
        {whatToShow.map((key, j) => (
          <div key={j} className={`${item}  ${flamesTab ? "flames" : ""}`}>
            {this.showItem(obj, key)}
          </div>
        ))}
      </div>
    ));
  }

  handleAgreeToDelete = () => {
    const { deleteContest, initArraysData } = this.props;
    const { idToDelete } = this.state;
    Promise.resolve(initArraysData())
      .then(deleteContest(idToDelete))
      .then(this.setState({ openDialog: false }));
  };

  handleNotAgree = () => Promise.resolve(this.setState({ openDialog: false }));

  render() {
    const { container, col, infoItem, entriesClass, filter, select } = styles;
    const { filters: { statusFilter }, total, tmpData: { view } } = this.props;
    const { order, contestName, openDialog } = this.state;
    const msg = view === "contests" ? "contests" : view === "flames" ? "Flames Events" : "entries";
    const status = ["All", "Active", "Expired"];
    return (
      <div className={container}>
        <div className={`${col} info`}>
          <div className={infoItem}>
            {getMsg("en", "Total")} <b className={entriesClass}>{total}</b> {getMsg("en", msg)}
          </div>
          <div className={infoItem}>
            {total ? (
              <div className={filter}>
                <label>{getMsg("en", "Sort By")}:</label>
                <select value={order} onChange={this.handleOrder} className={select}>
                  <option>{getMsg("en", "Newest to Oldest")}</option>
                  <option>{getMsg("en", "Oldest to Newest")}</option>
                </select>
              </div>
            ) : (
              <div className={filter} />
            )}
            {view === "contests" && (
              <div className={filter}>
                <label>{getMsg("en", "Display")}:</label>
                <select value={statusFilter} onChange={this.handleFilterStatus} className={select}>
                  {status.map((s, i) => <option key={i}>{s}</option>)}
                </select>
              </div>
            )}
          </div>
        </div>
        <Dialog
          {...this.props}
          name={contestName}
          open={openDialog}
          handleAgree={this.handleAgreeToDelete}
          handleNotAgree={this.handleNotAgree}
        />
        {this.renTableHeader()}
        {this.renBody()}
        {this.renFooter()}
      </div>
    );
  }
}

export default Table;
