import React, {Component} from 'react';
import TextField from '../../components/TextField';
import * as styles from './css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleEnter = evt => (evt.key === 'Enter' ? this.handleSubmit() : null);

  handleSubmit = () => {
    const {callToLogin, history: {push}} = this.props;
    const {username, password} = this.state;
    console.log(username, password);

    // callToLogin({ username, password }, push);
  };

  handleSaveState = obj => this.setState(obj);

  render() {
    const {container, item, loginBox, label, btn} = styles;
    const schema = [
      {
        errMsg: 'this field cannot be empty',
        type: '',
        validator: 'no-empty',
        dataField: 'username',
        label: 'username',
      },
      {
        errMsg: 'this field cannot be empty',
        type: 'password',
        validator: 'no-empty',
        dataField: 'password',
        label: 'password',
      },
    ];
    return (
      <div className={container}>
        <div className={loginBox}>
          <div className={item}>
            <img src="/images/logo.svg" alt=":)" />
          </div>
          <div className={`${item} label`}>
            <label className={label}>{`Sign in`}</label>
            <p>to continue to goKiddo</p>
          </div>
          {schema.map((obj, i) => (
            <div key={i} className={item}>
              <TextField
                autoFocus
                saveinput={this.handleSaveState}
                errMsg={obj.errMsg}
                field={obj.field}
                label={obj.label}
                validator={obj.validator}
              />
            </div>
          ))}
          <div className={`${item} btn`}>
            <button className={btn}>LOGIN</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
