import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

renderInput.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
};

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.username) > -1;

  console.log(suggestion, "selectedItem")

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.firstName} {suggestion.lastName}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

function getSuggestions(value, customers, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : customers.filter(suggestion => {
        const keep =
          (count < 5 && suggestion.firstName.slice(0, inputLength).toLowerCase() === inputValue) ||
          (count < 5 && suggestion.lastName.slice(0, inputLength).toLowerCase() === inputValue);

        if (keep) {
          count += 1;
        }

        return keep;
      });
}


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '30px 0',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 9999,
    marginTop: theme.spacing[1],
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing[2]
  },
});


function IntegrationDownshift(props) {
  const {classes, customers, handleChange} = props;

  return (
    <div className={classes.root}>
      <Downshift id="downshift-simple" onChange={handleChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Search for a customer (start with a)',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Customer',
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps,
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, customers).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.username }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
      <div className={classes.divider} />
    </div>
  );
}

const mapStateToProps = ({ UserNotificationApp }) => {
  return {
    customers: UserNotificationApp.customers.data
  }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(IntegrationDownshift))