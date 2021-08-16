import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
    }

    return (
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

            <button type="submit">Submit</button>
        </form>
    );
}
 
export default Login;