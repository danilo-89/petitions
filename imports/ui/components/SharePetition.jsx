import React, {useState} from 'react';
import QRCode from 'qrcode'
import { Facebook, Whatsapp, Twitter, Linkedin, At, Link45deg } from 'react-bootstrap-icons';
import './SharePetition.css'

const SharePetition = () => {
    
    const [QRData, setQRData] = useState('');

    // With promises
    QRCode.toDataURL(window.location.href)
    .then(url => {
        console.log(url)
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

                <div className="soc-share-btn soc-link">
                    <Link45deg />
                </div>
                <input className="resetinput w-100" type="text" name="" id="addressLinkInput" value={window.location.href} readOnly/>

                {QRData && <img src={QRData} alt="QR code" />}
                <button 
                className="btn mb-3"
                onClick={downloadQR}
                >
                    Download QR Code
                </button>
                
            </div>

        </div>
    );
}

export default SharePetition;