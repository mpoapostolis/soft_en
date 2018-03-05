import React, {Component} from 'react';
import * as styles from './css';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Alert from '../../components/Alert';
import SnackBar from '../../components/SnackBar';

class Booking extends Component {
  state = {bookingInf: {}};
  componentDidMount() {
    const {ActivityID} = this.props.parent;
    const param = window.location.search.split(/\?|&/)[1];
    const id = ActivityID || param || '';
    const {account: {Role}, getParentWallet, getOwnerWallet} = this.props;
    if (Role === 'Parent') getParentWallet();
    else getOwnerWallet();
    fetch(`/activity/${id}`)
      .then(e => e.json())
      .then(activity => this.setState(activity));
  }

  componentWillUnmount() {
    this.props.clearTmp();
  }

  handleChange = ({currentTarget}, ListingID) => {
    const {setTmpData} = this.props;
    this.setState({
      dialog: false,
      snackBar: false,
      bookingInf: {[ListingID]: parseInt(currentTarget.value)},
    });
  };

  handleSubmit = () => {
    const {Balance} = this.props.parent;
    const {Price} = this.state;
    const {push} = this.props.history;
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    if (Balance < Price) return this.setState({dialog: true});
    this.props.booking(this.state.bookingInf).then(e => {
      console.log(e[0].status);
      if (e[0].status === 201) {
        this.setState({snackBar: true});
        setTimeout(() => push('/'), 4000);
      }
    });
  };

  close = () => this.setState({dialog: false});

  render() {
    const {
      inputCont,
      container,
      box,
      imageCont,
      infoCont,
      info,
      input,
      booking,
      btn,
    } = styles;
    const {t} = this.props;
    const {
      ActivityName,
      Description,
      Duration,
      Listings = [],
      Price,
      Pictures = [],
      owner = {CompanyName: '', Address: ''},
      value = '',
    } = this.state;
    const availableDate = Listings.map(o => o.availableDate);
    return (
      <div className={container}>
        <div className={imageCont}>
          {Pictures.map((path, i) => (
            <img key={i} src={`https://191.232.161.178:4001${path}`} alt="" />
          ))}
          <img
            src="https://a0.muscache.com/im/pictures/6310c62f-b893-450b-9d7b-f7de0fb752d1.jpg?aki_policy=large"
            alt=""
          />
          <img
            src="https://a0.muscache.com/im/pictures/6174781/a369cfe7_original.jpg?aki_policy=large"
            alt=""
          />
        </div>
        <div className={infoCont}>
          <div className={info}>
            <h1>{ActivityName}</h1>
            <label htmlFor="">
              {owner.CompanyName}
              {owner.Address}
            </label>
            <p>
              <br /> {Description}
            </p>
            <p>
              {t('Duration')}: {Duration} {t('minutes')}
            </p>
          </div>
          <div className={booking}>
            <h1 htmlFor="">{Price} ¥</h1>
            {Listings.map((obj, key) => (
              <div key={key} className={inputCont}>
                <div>{moment(obj.EventDate).format('LLL')}</div>
                <input
                  onChange={e => this.handleChange(e, obj.ListingID)}
                  className={input}
                  placeholder={`max ${obj.Remaining}`}
                  type="number"
                  max={parseInt(obj.Remaining)}
                />
              </div>
            ))}
            <Button
              className={btn}
              onClick={this.handleSubmit}
              variant="raised">
              {t('BOOK')}
            </Button>
          </div>
        </div>
        <Alert
          close={this.close}
          open={this.state.dialog}
          push={this.props.history.push}
          t={this.props.t}
        />
        <SnackBar open={this.state.snackBar} />
      </div>
    );
  }
}

export default Booking;
