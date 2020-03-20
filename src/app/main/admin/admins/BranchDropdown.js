import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames'

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
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.name}
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

function getSuggestions(value, branches, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : branches.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing[1],
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing[0.5, 0.25],
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
  const {classes, branches, handleChange, className } = props;

  return (
    <div className={classNames(classes.root, className)}>
      <Downshift
        id="downshift-simple"
        onChange={handleChange}
      >
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
            placeholder: 'Search for a branch (start with a)',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Branch',
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps,
                variant: 'outlined'
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, branches).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.name }),
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

const mapStateToProps = ({ adminApp }) => {
  const { admins } = adminApp;
  return {
      branches: admins.branch
  }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(IntegrationDownshift))