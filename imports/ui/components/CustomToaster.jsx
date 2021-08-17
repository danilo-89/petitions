import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
    return ( 
        <Toaster
            toastOptions={{
                // Define default options
                className: '',
                duration: Infinity,
                position:"center",
                style: {
                },
                // Default options for specific types
                success: {
                    duration: 2000,
                    position:"top-center",
                },
                error: {
                    duration: 2000,
                    position:"top-center",
                },
            }}
        />
     );
}
 
export default CustomToaster;