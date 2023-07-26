import { NavLink } from "react-router-dom"
export const NavBar = ()=>{
    return (<>
       <NavLink to="/">Home</NavLink>
       <br />
       <NavLink to="/add">Add</NavLink>
       <br />
       <NavLink to="/view">View All</NavLink>
    </>)
}