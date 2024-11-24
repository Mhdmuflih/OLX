import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import SignUp from "./Pages/LoginWithEmail";
import SellProduct from "./Pages/SellProduct";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<Details />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sell" element={<SellProduct />} />
      </Routes>
    </div>
  )
}

export default App;