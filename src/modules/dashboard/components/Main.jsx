import { Route, Routes } from "react-router-dom"
import { Home } from "../../notes/components/Home"
import { Add } from "../../notes/components/Add"
import { List } from "../../notes/components/List"

export const Main = ()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
        <Routes>
            <Route path="/add" element={<Add/>}/>
        </Routes>
        <Routes>
            <Route path="/view" element={<List/>}/>
        </Routes>
        </>
    )
} 