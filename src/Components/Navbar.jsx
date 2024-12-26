import {  NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Navbar = () => {
  const {user, logOutUser ,loading} = useAuth();
  console.log(user)
	const links = <>
	<li><NavLink to="/">Home</NavLink></li>
	
	<li><NavLink to='/availableFoods'>Available Foods</NavLink></li>
	{
    user&& (<><li><NavLink to='/addFood'>Add Food</NavLink></li>
      <li><NavLink to='/myFood'>My Food</NavLink></li>
      <li><NavLink to='/myRequest'>My Request</NavLink></li></>)
  }


{
  !user &&(  <>
	<li><NavLink to='/register'>Register</NavLink></li></>)
}
        
    
	</>
	return (
		<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">AL-MADINA Foods</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
     user && user?.email ? (
        <div className="flex items-center gap-2" title={user.displayName}>
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-cyan-400"
            src={user.photoURL}
            alt="User"
          />
          <button onClick={logOutUser} className="btn btn-outline">
            Logout
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="btn btn-outline">
          Login
        </NavLink>
      )
    }
        
      </div>
  
</div>
	);
};

export default Navbar;