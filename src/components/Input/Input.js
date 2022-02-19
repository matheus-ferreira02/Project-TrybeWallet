import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const {
      labelText,
      id,
      name,
      type,
      value,
      dataTest,
      placeholder,
      onChange } = this.props;

    return (
      <label htmlFor={ id }>
        <p className="labelText">{ labelText }</p>
        <input
          id={ id }
          name={ name }
          type={ type }
          data-testid={ dataTest }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  dataTest: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;
