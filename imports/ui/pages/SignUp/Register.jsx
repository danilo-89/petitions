import React, { useState } from 'react';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, repeatPassword);
        Meteor.call('create.account', username, password, (err, res) => {
            if (err) {
                // Bert.alert(err.reason, 'danger');
            } else {
                if (res.isError) {
                    // Bert.alert(res.err.reason, 'danger');
                    console.log(res.err.reason)
                } else {
                    console.log('success')
                }
            }
        });
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

            <button type="submit">Submit</button>
        </form>
    );
}

export default Register;