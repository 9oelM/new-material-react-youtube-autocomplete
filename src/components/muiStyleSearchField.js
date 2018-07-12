import React from 'react'

const muiStyleSearchField = ({
  isOpen,
  getInputProps,
  getMenuProps,
  getItemProps,
  searchSuggestions,
}) => {
  return (
    <React.Fragment>
      <Input
        {...getInputProps({
          placeholder: 'Search Youtube',
          fullWidth: true,
        })}
      />
      {isOpen ? (
        <Paper square {...getMenuProps()}>
          {searchSuggestions.map((item, index) => (
            <MenuItem
              {...getItemProps({
                key: item.id,
                index,
                item,
              })}
            >
              {item.text}
            </MenuItem>
          ))}
        </Paper>
      ) : null}
    </React.Fragment>
  )
}

export default muiStyleSearchField
