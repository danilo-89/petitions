import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginOrRegister = () => {

    const [loginDialog, setLoginDialog] = useState(true);
    const changeLoginDialog = (a) => {
        setLoginDialog((currValue)=>a)
    }

    return ( 
        <>
            {loginDialog ? <Login /> : <Register />}
            <div className="text-center pt-3">
                {loginDialog ? 
                <p>Don't have an account? <span className="text-blue f-bold cursor-pointer" onClick={() => changeLoginDialog(false)}>REGISTER</span></p> : 
                <p>Already have an account? <span className="text-blue f-bold cursor-pointer" onClick={() => changeLoginDialog(true)}>LOGIN</span></p>
                }
            </div>
        </>
     );
}
 
export default LoginOrRegister;