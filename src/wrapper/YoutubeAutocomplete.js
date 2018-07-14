import React from 'react'
import PropTypes from 'prop-types'
import Core from '../components/Core'

/*
  Kind of a wrapper. Provided for future extension to other functions. 
*/

const YoutubeAutocomplete = ({
  useMui,
  inputId,
  menuId,
  itemClassName,
  theme,
}) => {
  return (
    <Core
      useMui={useMui}
      inputId={inputId}
      menuId={menuId}
      itemClassName={itemClassName}
      theme={theme}
    />
  )
}

YoutubeAutocomplete.propTypes = {
  theme: PropTypes.func.isRequired,
}

export default YoutubeAutocomplete
