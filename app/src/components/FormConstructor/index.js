import React, {Component} from 'react';
import TextField from '../TextField';
import * as styles from './css';

class FormConstructor extends Component {
  constructor(props) {
    super(props);
    const state = {};
    props.schema.map(obj => {
      state[obj.field] = '';
    });
    this.state = state;
  }
  componentWillUnmount() {
    this.props.clearTmp;
  }

  handleEnter = evt => (evt.key === 'Enter' ? this.handleSubmit() : null);

  handleSubmit = () => {
    const {callToLogin, history: {push}} = this.props;
    const {username, password} = this.state;
    console.log(username, password);
  };

  changeParrentState = obj => this.setState(obj);

  samePass = () => {
    const {password1, password2} = this.state;
    const bothFilled =
      password1 && password2 && password1.length <= password2.length;
    return bothFilled ? password1 === password2 : true;
  };

  render() {
    const {
      container,
      item,
      header,
      loginBox,
      label,
      btn,
      loginBody,
      footer,
    } = styles;

    const {schema, setTmpData} = this.props;
    const {firstMsg, secondMsg, btnMsg} = this.props;
    const samepass = this.samePass();

    return (
      <div className={container}>
        <div className={loginBox}>
          <div className={header}>
            <img src="/images/logo.svg" alt=":)" />
            <div className={`${item} label`}>
              <label className={label}>{firstMsg}</label>
              <p>{secondMsg}</p>
            </div>
          </div>
          <div>
            <div className={loginBody}>
              {schema.map((obj, i) => (
                <div className={item} key={i}>
                  <TextField
                    {...obj}
                    samepass={samepass}
                    value={this.state[obj.field]}
                    changeParrentState={this.changeParrentState}
                    saveField={setTmpData}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={footer}>
            <button className={btn}>{btnMsg}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FormConstructor;
