import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'
const register = () => {
  return (
    <Wrapper>
        <form className='form'>
          <Logo />
          <h4>Register</h4>
          <FormRow type="text" name="name" defaultValue="Harwinder"/>
          <FormRow type="text" name="lastName" defaultValue="Kaur" labelText="Last Name"/>
          <FormRow type="text" name="location" defaultValue="Chandigarh" />
          <FormRow type="email" name="email" defaultValue="Harwinder" />
          <FormRow type="password" name="password" defaultValue="123456"/>
          <button type='submit' className='btn btn-block'>Submit</button>
          <p>
            Already a member?
            <Link to='/login' className='member-btn'>Login</Link>
          </p>
        </form>
    </Wrapper>
  )
}

export default register