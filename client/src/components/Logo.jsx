import logo from '../assets/images/newLogo.png';
import React from 'react'
import Wrapper from '../assets/wrappers/Logo';
const Logo = () => {
  return (
    <Wrapper>
          <img src={logo} alt="JobScunt" className='logo'></img>
    </Wrapper>
  )
}

export default Logo