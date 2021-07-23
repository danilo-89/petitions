import QRCode from 'qrcode'

// With promises

const makeQR = (linkText) => {

    if (!linkText.trim()) {return ""}

    QRCode.toDataURL(linkText)
    .then(url => {
        console.log(url)
    })
    .catch(err => {
        console.error(err)
    })

    // With async/await
    const generateQR = async text => {
        try {
            console.log(await QRCode.toDataURL(text))
        } catch (err) {
            console.error(err)
        }
    }

    return generateQR;
}

export default makeQR;