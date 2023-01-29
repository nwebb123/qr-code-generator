const formEl = document.getElementById('generate-form')
const qrEl = document.getElementById('qrcode')

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    
   

    if (url === "") {
        alert('Please enter a URL')
    } else {
        showSpinner()

        setTimeout(() => {
            hideSpinner(); 

             generateQRCode(url, size);

             setTimeout(()=> {
                const saveURL = qrEl.querySelector('img').src;
                saveQRCodeBtn(saveURL)
             }, 20)

        }, 1500)
    }   
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    });
   
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

// Clear out QR Code
const clearUI = () => {
    qrEl.innerHTML= "";
    const saveBtn = document.getElementById('save-link')
    if(saveBtn) saveBtn.remove();
}

const saveQRCodeBtn = (saveURL) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-auto my-5 rounded w-1/3';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save QR Code';
    document.getElementById('generated').appendChild(link)
};

//Calling hideSpinner function as another layer to ensure Spinner is not showing upon load. Style is also set to display:none in html
hideSpinner();

formEl.addEventListener('submit', onGenerateSubmit)