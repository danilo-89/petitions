import React, { useState } from 'react';
import QRCode from 'qrcode'
import { Facebook, Whatsapp, Twitter, Linkedin, At, Link45deg } from 'react-bootstrap-icons';
import './SharePetition.css';
import toast from 'react-hot-toast';
import CustomToaster from './CustomToaster';

const SharePetition = () => {
    
    const [QRData, setQRData] = useState('');
    const myRef = React.useRef(null);

    // With promises
    QRCode.toDataURL(window.location.href)
    .then(url => {
        setQRData(url)
    })
    .catch(err => {
        console.error(err)
    })

    const downloadQR = () => {
        const a = document.createElement("a"); //Create <a>
        a.href = QRData; //Image Base64 Goes here
        a.download = "QR_Code.png"; //File name Here
        a.click(); 
    }

    const copyLink = () => {
       const copyText = myRef.current;
       /* Select the text field */
       copyText.select();
       copyText.setSelectionRange(0, 99999); /*For mobile devices*/
       /* Copy the text inside the text field */
       document.execCommand("copy");
       toast.success('Petition link copied to clipboard');
    }

    return ( 
        <div>
            <div className="soc-share-container d-flex align-items-center justify-content-center">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" className="soc-share-btn soc-fb">
                    <Facebook />
                </a>

                <a href="whatsapp://send?text={props.petitionId}" target="_blank" className="soc-share-btn soc-wapp">
                    <Whatsapp />
                </a>
                
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" className="soc-share-btn soc-twitter">
                    <Twitter />
                </a>

                <a href="https://www.linkedin.com/shareArticle?url={props.petitionId}" target="_blank" className="soc-share-btn soc-linkd">
                    <Linkedin />
                </a>

                <a href="mailto:?&subject=&body={props.petitionId}" target="_blank" className="soc-share-btn soc-mail">
                    <At />
                </a>

                <div 
                    onClick={() => copyLink()}
                    className="soc-share-btn soc-link">
                    <Link45deg />
                </div>
                <input ref={myRef} className="resetinput w-100" type="text" name="" id="addressLinkInput" value={window.location.href} readOnly/>

                {QRData && <img src={QRData} alt="QR code" />}
                <button 
                className="btn mb-3"
                onClick={downloadQR}
                >
                    Download QR Code
                </button>

                <CustomToaster />
                
            </div>

        </div>
    );
}

export default SharePetition;