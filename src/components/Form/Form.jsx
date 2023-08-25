import React from 'react'
import PropTypes from 'prop-types'

const Form = props => {
  const {children} = props;

  const [form, onChange] = useForm

  return (
    <form onChange={onChange}>
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.element
}

export default Form
