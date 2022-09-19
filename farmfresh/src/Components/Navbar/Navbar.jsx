import React from 'react'
import './Navbar.css'





const Navbar = () => {
  return (
    <header>
      <div id="navbar" className="navbar top">
        <div className="logo">
        <a href="/Home"><h1 >
            <span className="text-primary"> Farm</span>Fresh
          </h1></a>
          
        </div>
        <nav className="navi">
          <ul>
            <li className='navbutton'><a href="/Home"><button>Home</button></a></li>
            <li className='navbutton'><a href="/Profile"><button>Profile</button></a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar