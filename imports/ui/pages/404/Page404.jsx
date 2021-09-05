import React from 'react';
import { useHistory } from 'react-router-dom';

const Page404 = () => {
    const history = useHistory();
    return ( 
        <>
            <div className="container h-100-custom d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <h2 className="f-bold">404 Error</h2>
                    <p className="mb-4">Page not found</p>
                    <button
                        className="btn btn-secondary"
                        onClick={() => { history.push("/") }}
                    >
                        Go to Home page
                    </button>
                </div>
        </div>
        </>
     );
}
 
export default Page404;