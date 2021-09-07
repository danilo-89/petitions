import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/CustomToaster';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(password===repeatPassword) {
            Accounts.createUser({username, password}, (err, res) => {
                if (err) {
                    toast.error(err.reason);
                } else {
                    toast.success('Account created');
                }
            });
        } else {
            toast.error('Repeated password not same as password!');
        }
    }

    return (

        <div className="form-wrapper mx-auto">
            <CustomToaster />
            <div className="form-wrapper__title">Register</div>
            <div className="p-3">
                <form id="registerForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">User name</label>
                        <div className="mb-3 input-group">
                            <input
                                required=""
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                autoComplete="on"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="passsword">Password</label>
                        <div className="mb-3 input-group">
                            <input
                                required=""
                                type="password"
                                id="passsword"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="on"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="repeatPasssword">Repeat password</label>
                        <div className="mb-3 input-group">
                            <input
                                required=""
                                type="password"
                                id="repeatPasssword"
                                className="form-control"
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                        type="submit"
                        className="btn btn-primary min-w-105px px-4 py-2"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;