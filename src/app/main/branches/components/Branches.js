import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Paper } from '@material-ui/core';

const useStyles = withStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

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
  const { suggestion, index, itemProps, highlightedIndex, selectedItem, handleChangeBranch } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.code}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    // onClick={() => handleChangeBranch(suggestion)}
    >
      {suggestion.code} {' '} {suggestion.name}
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

export default function Branches({ allUBNBranches, handleChangeBranch, branch }) {
  const classes = useStyles;

  return (
    <div className={classes.root}>

      <div className={classes.divider} />
      <Downshift id="downshift-options"
        // onSelect={selection => {
        //   console.log(selection, 'selection');
        // }}>
        // {/* itemToString={item => { console.log(item, 'item item') }} */}
        >
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => {
          const { onClick, onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onChange: event => {
              if (event.target.value === '') {
                clearSelection();
              }
            },
            onFocus: openMenu,
            placeholder: 'Select Branch',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                value: branch,
                fullWidth: true,
                classes,
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, allUBNBranches, { showEmpty: true }).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.name }),
                        highlightedIndex,
                        selectedItem,
                        handleChangeBranch,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
