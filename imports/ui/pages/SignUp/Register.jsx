import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/CustomToaster';
import { Button, Modal } from 'react-bootstrap';
import About from '../About/About';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkAbout, setCheckAbout] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showAbout, setShowAbout] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkAbout) {
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
        } else {
            toast.error('You must read and agree About terms');
        }
        
    }

    return (

        <div className="form-wrapper mx-auto">
            <CustomToaster />

            <Modal show={showAbout} onHide={() => setShowAbout(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <About />
                    <div className="text-center pt-4">
                        <Button variant="primary" onClick={() => setShowAbout(false)}>
                                Close
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

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

                    <div className="text-center mb-4"> 
                        <input 
                        type="checkbox" 
                        name="checkboxRegister" 
                        id="checkboxRegister" 
                        className="mr-1"
                        value={!!checkAbout}
                        onChange={() => {setCheckAbout((currValue)=>!currValue)}}
                        />
                        I have read the <span className="text-blue cursor-pointer" onClick={() => setShowAbout(true)}>About</span>
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