import React from 'react'
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="harwinderiam@gmail.com" />
        <FormRow type="password" name="password" defaultValue="123456" />
        <button type='submit' className='btn btn-block'>Submit</button>
        <button type='button' className='btn btn-block'>Explore the APP</button>
        <p>
            Not a member Yet?
            <Link to='/register' className='member-btn'>register</Link>
          </p>
      </form>
    </Wrapper>
  )
}

export default Login