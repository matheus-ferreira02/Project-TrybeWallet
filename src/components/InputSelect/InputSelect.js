import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSelect extends Component {
  render() {
    const { array, labelText, id, dataTest, onChange, name, selected } = this.props;

    return (
      <label htmlFor={ id }>
        <p className="labelText">{ labelText }</p>
        <select
          className="input_select"
          value={ selected }
          data-testid={ dataTest }
          id={ id }
          name={ name }
          onChange={ onChange }
        >
          { array.map((element, index) => (
            <option
              key={ `${id}-${element}-${index}` }
              className="option_select"
              value={ element }
              data-testid={ element }
            >
              { element }
            </option>
          )) }
        </select>
      </label>
    );
  }
}

InputSelect.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any),
  labelText: PropTypes.string,
  dataTest: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default InputSelect;
