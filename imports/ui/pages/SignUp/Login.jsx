import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/CustomToaster';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password, () => {
           if(Meteor.userId()) {
                toast.success(`Welcome ${Meteor.user().username}!`)
            } else {
                toast.error('Oops... Something went wrong!')
            }
        });
    }

    return (

        <div className="form-wrapper mx-auto">

            <CustomToaster />

            <div className="form-wrapper__title">Login</div>
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

                    <div className="text-center">
                        <button 
                        type="submit"
                        className="btn btn-primary min-w-105px px-4 py-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

        
    );
}
 
export default Login;