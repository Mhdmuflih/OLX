import olx from '../assets/olx.png';
import lens from '../assets/lens.png';
import arrow from '../assets/arrow.png';
import search from '../assets/search.png';
import Login from './Login';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type searchProps = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = (props: searchProps) => {
    const [loginPop, setLoginPop] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoginPop(true);
    }

    const handleLogout = () => {
        setLoggedIn(false); // Corrected to set loggedIn to false
    }

    const onLoginSuccess = () => {
        setLoggedIn(true);
        setLoginPop(false);
    }

    return (
        <>
            <div className='flex p-4 bg-slate-100 shadow-md'>
                <img src={olx} alt="" className='w-11 h-9' />
                <div className='flex border-2 border-spacing-1 w-64 p-2 border-black ml-5 bg-white'>
                    <img src={lens} alt="" className='w-6 h-5 mt-1' />
                    <input type="text" placeholder='Location' className='ml-3 outline-none' />
                    <img src={arrow} alt="" className='w-8 h-7' />
                </div>
                <div className='flex h-12 ml-4 border-2 border-black bg-white'>
                    <input onChange={(event) => props.setSearch(event.target.value)} type="text" placeholder='Find Cars, Mobile phones and more' className='ml-3 w-96 outline-none' />
                    <img src={search} alt="" />
                </div>
                <div className='flex h-12 p-3 ml-10 cursor-pointer'>
                    <h1 className='font-semibold'>ENGLISH</h1>
                    <img src={arrow} alt="" className='w-8 h-7' />
                </div>
                <div onClick={loggedIn ? handleLogout : handleLogin} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
                    <h1 className='font-bold text-lg'>{loggedIn ? "Logout" : "Login"}</h1>
                </div>
                <div className='w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500'>
                    <Link to={'/sell'}><h1 className='font-bold text-lg ml-3'>+ SELL</h1></Link>
                </div>
            </div>

            {loginPop && <Login setLoginPop={setLoginPop} onLoginSuccess={onLoginSuccess} />}
        </>
    );
}

export default Navbar;
