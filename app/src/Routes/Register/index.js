import React, {Component} from 'react';
import TextField from '../../components/TextField';
import * as styles from './css';

class Register extends Component {
  state = {};

  schema = () => {
    const {type, password1, password2} = this.state;
    const samePass = password1 && password2 && password1 === password2;
    console.log(samePass);
    const noSamePassMsg = 'Password does not match the confirm password';
    const schema = [
      {
        errMsg: 'select one of from the list',
        type: 'select',
        validator: 'select',
        dataField: 'type',
        label: 'Type',
        options: ['owner', 'parrent'],
      },
      {
        errMsg: 'email format must be xx@xxx.xxx',
        type: 'email',
        validator: 'email',
        dataField: 'email',
        label: 'Email',
      },
      {
        errMsg: 'this field cannot be empty',
        type: '',
        validator: 'no-empty',
        dataField: 'address',
        label: 'Address',
      },
      {
        samePass,
        errMsg: !samePass ? noSamePassMsg : 'this field cannot be empty',
        type: 'password',
        validator: 'no-empty',
        dataField: 'password1',
        label: 'Password',
      },
      {
        samePass,
        errMsg: !samePass ? noSamePassMsg : 'this field cannot be empty',
        type: 'password',
        validator: 'password',
        dataField: 'password2',
        label: 'Repeat Password',
      },
    ];
    const extraOwnerInfo = [
      {
        errMsg: 'this field cannot be empty',
        type: '',
        validator: 'no-empty',
        dataField: 'iban',
        label: 'IBAN',
      },
      {
        errMsg: 'this field cannot be empty',
        type: '',
        validator: 'no-empty',
        dataField: 'bic',
        label: 'BIC',
      },
      {
        errMsg: 'this field cannot be empty',
        type: '',
        validator: 'no-empty',
        dataField: 'swift',
        label: 'SWIFT',
      },
      {
        errMsg: 'this field cannot be empty',
        type: '',
        validator: 'no-empty',
        dataField: 'taxNumber',
        label: 'Tax Number',
      },
    ];
    if (type === 'owner') return [...schema, ...extraOwnerInfo];
    return schema;
  };

  handleEnter = evt => (evt.key === 'Enter' ? this.handleSubmit() : null);

  handleSubmit = () => {
    const {callToLogin, history: {push}} = this.props;
    const {username, password} = this.state;
    console.log(username, password);
  };

  handleSaveState = obj => this.setState(obj);

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
    const fields = this.schema();
    const {password1, password2} = this.state;

    return (
      <div className={container}>
        <div className={loginBox}>
          <div className={header}>
            <img src="/images/logo.svg" alt=":)" />
            <div className={`${item} label`}>
              <label className={label}>{`Sign in`}</label>
              <p>to continue to goKiddo</p>
            </div>
          </div>
          <div>
            <div className={loginBody}>
              {fields.map((obj, i) => (
                <div className={item} key={i}>
                  <TextField
                    samepass={obj.samePass}
                    errMsg={obj.errMsg}
                    options={obj.options}
                    type={obj.type}
                    validator={obj.validator}
                    field={obj.dataField}
                    label={obj.label}
                    saveinput={this.handleSaveState}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={footer}>
            <button className={btn}>SIGNUP</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
