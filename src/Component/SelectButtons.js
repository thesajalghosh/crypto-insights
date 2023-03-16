import React from 'react'

const SelectButtons = ({children, selected ,onclick}) => {
  return (
    <div className='btn'  onClick={onclick}>
      {children}
    </div>
  )
}

export default SelectButtons
