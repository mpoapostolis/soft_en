import React, {Component} from 'react';
import * as styles from './css';

class TextField extends Component {
  state = {
    value: '',
    errorClass: '',
  };

  isValid = ({currentTarget}) => {
    let isValid;
    const {saveinput} = this.props;
    const value = currentTarget.value;
    const _opts = currentTarget.getAttribute('options');
    const samepass = currentTarget.getAttribute('samepass');
    const validator = currentTarget.getAttribute('validator');
    const field = currentTarget.getAttribute('data-field');
    const options = _opts ? _opts.split(',') : [];
    switch (validator) {
      case 'email':
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        isValid = Boolean(value.match(pattern));
        break;
      case 'no-empty':
        isValid = value.length > 0;
        break;
      case 'password':
        isValid = samepass && value.length > 0;
        break;

      case 'select':
        isValid = Boolean(options.find(e => e === value));
        break;
      default:
        isValid = true;
        break;
    }

    if (!isValid) this.setState({value: '', errorClass: 'error'});
    else {
      this.setState({errorClass: ''});
      saveinput({[field]: value});
    }
  };

  handleInput = ({currentTarget}) =>
    this.setState({value: currentTarget.value});

  render() {
    const {
      options,
      label,
      klass,
      errMsg,
      field,
      validator,
      samepass,
    } = this.props;
    const {inputCont, input} = styles;
    const _id = options ? Date.now() : undefined;
    const {value, errorClass} = this.state;
    const labelExtraClass = value ? 'notEmpty' : '';
    return (
      <div className={inputCont}>
        <label className={`inputLabel ${labelExtraClass} ${errorClass}`}>
          {errorClass ? errMsg : label}
        </label>
        <input
          samepass={samepass}
          options={options}
          validator={validator}
          data-field={field}
          onBlur={this.isValid}
          value={value}
          onChange={this.handleInput}
          list={_id}
          className={`${input} ${klass} ${errorClass}`}
        />
        {options && (
          <datalist id={_id}>
            {options.map((opt, key) => <option key={key} value={opt} />)}
          </datalist>
        )}
      </div>
    );
  }
}

export default TextField;
