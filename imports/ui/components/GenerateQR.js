import QRCode from 'qrcode'

// With promises

const makeQR = (linkText) => {

    if (!linkText.trim()) {return ""}

    // With async/await
    const generateQR = async linkText => {
        try {
            console.log(await QRCode.toDataURL(linkText))
        } catch (err) {
            console.error(err)
        }
    }

    return generateQR;
}

export default makeQR;