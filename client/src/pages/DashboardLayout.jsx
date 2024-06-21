import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, SmallSidebar, Navbar } from '../components'
import { createContext, useState } from 'react'
//Creating global state management using Context
const DashboardContext = createContext();
const DashboardLayout = () => {
  //FOR USER USERNAME AT NAVBAR
  const user = {name:'Harwinder'}
  const[showSidebar,setShowSidebar] = useState(false);
  const[isDarkTheme,setIsDarkTheme] = useState(true);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme) //Vanilla js
    console.log('Toggle Dark Theme');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('Logout User');
  };

  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  )
}
//custom hook
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;