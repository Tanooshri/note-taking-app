import { NavLink } from "react-router-dom"
export const NavBar = ()=>{
    return (<>
    <h2>I am Navbarr</h2>
       <NavLink to="/">Home</NavLink>
       <br />
       <NavLink to="/add">Add</NavLink>
       <br />
       <NavLink to="/view">View All</NavLink>
    </>)
}