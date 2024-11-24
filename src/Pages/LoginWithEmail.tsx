import React, { useState, ChangeEvent, FormEvent } from 'react';
import { login, signup } from '../Firebase/Firebase'; // Import login and signup from Firebase
import { toast } from 'react-toastify'; // Toast to display notifications
import { useNavigate } from 'react-router-dom';

type Errors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

const LoginWithEmail: React.FC = () => {
    const [signState, setSignState] = useState<'Sign In' | 'Sign Up'>('Sign In');
    const [name, setName] = useState<string>(''); // For sign up only
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // For sign up only
    const [errors, setErrors] = useState<Errors>({});

    const navigate = useNavigate();

    // Validation methods
    const validateEmail = (email: string): boolean => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validatePassword = (password: string): boolean => password.length >= 6;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let formErrors: Errors = {};

        // Email validation
        if (!validateEmail(email)) {
            formErrors.email = 'Invalid email address';
        }

        // Password validation
        if (!validatePassword(password)) {
            formErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation for sign-up
        if (signState === 'Sign Up' && password !== confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }

        // If there are errors, set them and stop submission
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Handle Firebase authentication
        try {
            if (signState === 'Sign In') {
                await login(email, password);
                toast.success('Logged in successfully!');
            } else {
                await signup(name, email, password);
                toast.success('Signed up successfully!');
            }
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/');
        } catch (error: any) {
            // Handle Firebase authentication errors here
            toast.error(error.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">{signState}</h2>
                <form onSubmit={handleSubmit}>
                    {signState === 'Sign Up' && (
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    {signState === 'Sign Up' && (
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                required
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {signState}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    {signState === 'Sign In' ? (
                        <p>New to OLX? <span className="text-blue-600 cursor-pointer" onClick={() => setSignState('Sign Up')}>Sign Up Now</span></p>
                    ) : (
                        <p>Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setSignState('Sign In')}>Sign In Now</span></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginWithEmail;



