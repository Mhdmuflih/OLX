import { useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home";
import Footer from "./Footer";

const Main = () => {

    const [prod , setProd] = useState([]);
    const [search , setSearch] = useState("");
    const [menu , setMenu] = useState("");
 
    const getProdect = () => {
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(json => setProd(json))
    }

    useEffect(()=> {
        getProdect();
    },[])

    return (
        <div>
            <Navbar setSearch={setSearch} />
            <Menubar setMenu={setMenu} />
            <Home products={prod} search={search} menu={menu} />
            <Footer />
        </div>
    )
}

export default Main