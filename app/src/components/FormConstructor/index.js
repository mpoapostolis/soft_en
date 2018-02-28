import React, {Component} from 'react';
import TextField from '../TextField';
import * as styles from './css';

class FormConstructor extends Component {
  constructor(props) {
    super(props);
    const state = {};
    this.state = state;
  }

  componentWillUnmount() {
    this.props.clearTmp();
  }

  handleEnter = evt => (evt.key === 'Enter' ? this.handleSubmit() : null);

  handleSubmit = () => {
    const {action, history: {push}} = this.props;
    const {username, password} = this.state;
    const body = JSON.stringify(this.props.tmpData);
    action(body);
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

    const {
      schema,
      setTmpData,
      firstMsg,
      secondMsg,
      btnMsg,
      tmpData,
    } = this.props;
    const shadowClass = schema.length > 4 ? 'shadow' : '';
    return (
      <div className={container}>
        <div className={loginBox}>
          <div className={header}>
            <img src="/images/logo.png" alt=":)" />
            <div className={`${item} label`}>
              <label className={label}>{firstMsg}</label>
              <p>{secondMsg}</p>
            </div>
          </div>
          <div>
            <div className={`${loginBody} ${shadowClass}`}>
              {schema.map((obj, i) => (
                <div className={item} key={i}>
                  <TextField
                    {...obj}
                    allField={tmpData}
                    setTmpData={setTmpData}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={footer}>
            <button onClick={this.handleSubmit} className={btn}>
              {btnMsg}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FormConstructor;
