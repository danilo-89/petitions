import { red } from '@material-ui/core/colors';
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
            // containerStyle={{
            //     top: 20,
            //     left: 20,
            //     bottom: 20,
            //     right: 20,
            //     background: 'red',
            // }}
        />
     );
}
 
export default CustomToaster;