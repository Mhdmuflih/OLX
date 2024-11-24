import guitar from '../assets/guitar.png';
import google from '../assets/google.png';
import phone from '../assets/phone.png';
import backArrow from '../assets/arrow-back-icon-which-is-suitable-for-commercial-work-and-easily-modify-or-edit-it-vector.jpg';
import olxlogo from '../assets/olx-logo-vector.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/Firebase';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';


type popupProps = {
    setLoginPop: Dispatch<SetStateAction<boolean>>;
    onLoginSuccess: () => void;
}

const Login = ({setLoginPop , onLoginSuccess}: popupProps) => {

    const [mobileLogin, setMobileLogin] = useState(false);

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            onLoginSuccess();
            setLoginPop(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {mobileLogin ? (
                <>

                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="flex items-center justify-between">
                                            <img src={backArrow} onClick={() => setMobileLogin(false)} className='w-5 cursor-pointer' alt="Back" />
                                            <button className='font-semibold text-3xl' onClick={() => setLoginPop(false)}>X</button>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <div className="mt-2">
                                                    <img src={olxlogo} alt="" className='w-13 h-10 ml-32 ' />
                                                    <h1 className="font-bold text-[20px] mt-2 text-center"> Enter your phone number </h1>
                                                    <div className='flex border-2 border-green-300 p-3 rounded-md mt-5 shadow-md hover:border-green-500 transition-all'>
                                                        <div className="flex items-center w-110 h-10" >
                                                            <select className="border-none bg-transparent focus:outline-none text-sm" name="countryCode">
                                                                <option value="+1">+91</option>
                                                                <option value="+91">+1</option>
                                                                <option value="+44">+44</option>
                                                            </select>

                                                            <input
                                                                className=" bg-none border-none text-black block text-[16px] h-12 box-border outline-none px-3 w-full"
                                                                type="text"
                                                                placeholder="Phone Number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button className='w-full bg-white text-green-950 mt-20 p-3 font-semibold border-4 border-green-950 hover:bg-green-950 hover:text-white transition-colors duration-300'>
                                                        Next
                                                    </button>

                                                    <h1 className='text-center text-xs mt-2'>Your contact number is never shared with external parties nor do we use it to spam you in any way.</h1>
                                                    <h1 className='text-center mt-4 cursor-pointer'>  </h1>
                                                    <h1 className='text-center mt-60 text-xs'></h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <button onClick={() => setLoginPop(false)} className='font-semibold text-3xl'> X </button>
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <div className="mt-2">
                                                    <img src={guitar} alt="" className='w-20 h-20 ml-32 ' />
                                                    <p className="text-base font-medium mt-5 text-center"> Help us become one of the safest places <br /> to buy and sell </p>
                                                    <div onClick={() => setMobileLogin(true)} className='flex border-2 border-black p-2 rounded-md mt-12 cursor-pointer'>
                                                        <img src={phone} alt="" className='w-6 h-6' />
                                                        <h1 className='font-semibold ml-3'>Continue with Phone</h1>
                                                    </div>
                                                    <div onClick={googleSignIn} className='flex border-2 border-gray-300 p-2 rounded-md mt-4 cursor-pointer'>
                                                        <img src={google} alt="" className='w-6 h-6' />
                                                        <h1 className='font-semibold ml-12'> Continue with Google </h1>
                                                    </div>
                                                    <h1 className='text-center mt-4 cursor-pointer'> OR </h1>
                                                   <Link to={'/signup'} > <h1 className='text-center mt-4 underline cursor-pointer'>Login with Email</h1> </Link>
                                                    <h1 className='text-center mt-28 text-xs'>All your personal details are safe with us.</h1>
                                                    <h1 className='text-center mt-4 text-xs'>If your continue, you are accepting <span className='text-blue-600'> OLX Terms and <br /> Coorditions and Privacy Policy </span> </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    )
}

export default Login;