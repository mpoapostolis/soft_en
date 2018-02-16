import React, {Component} from 'react';
import * as styles from './css';

class TextField extends Component {
  state = {
    errorClass: '',
  };

  isValid = ({currentTarget}) => {
    let isValid;
    const {
      saveField,
      type,
      validator,
      field,
      list,
      samepass,
      changeParrentState,
    } = this.props;
    const value = currentTarget.value;
    const options = list || [];
    switch (validator) {
      case 'email':
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        isValid = Boolean(value.match(pattern));
        break;

      case 'no-empty':
        isValid = value.length > 0;
        break;

      case 'select':
        isValid = Boolean(options.find(e => e === value));
        break;
      default:
        isValid = true;
        break;
    }

    if (!isValid) this.setState({errorClass: 'error'});
    else this.setState({errorClass: ''});
  };

  saveState = ({currentTarget}) => {
    const {changeParrentState, field} = this.props;
    const value = currentTarget.value;
    changeParrentState({[field]: value});
  };

  render() {
    const {errmsg, type, list, label, value, field, samepass} = this.props;
    const {inputCont, input} = styles;
    const _id = list ? Date.now() : undefined;
    const {errorClass} = this.state;
    const labelExtraClass = value ? 'notEmpty' : '';
    const notSamePass = !samepass && field.match(/password/) ? 'error' : '';
    return (
      <div className={inputCont}>
        <label
          className={`inputLabel ${labelExtraClass} ${errorClass} ${notSamePass}`}>
          {errorClass ? errmsg : label}
        </label>
        <input
          className={`${input} ${errorClass}`}
          onBlur={this.isValid}
          onChange={this.saveState}
          type={type}
          list={list}
          value={value}
        />
        {list && (
          <datalist id={list}>
            {list.map((opt, key) => <option key={key} value={opt} />)}
          </datalist>
        )}
      </div>
    );
  }
}

export default TextField;
