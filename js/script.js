//Assign variables to form element and QR code output element
const formEl = document.getElementById('generate-form')
const qrEl = document.getElementById('qrcode')


const onGenerateSubmit = (e) => {
    
    //Need this to prevent the default action of the form
    e.preventDefault();

    //Call this method early in order to clear out previously generated QR code and remove Save QR Code button.
    clearUI();

    //Assigning values from User's input to variables
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    
    //First condition is form validation to ensure user is entering a URL. Sweet Alert will alert user if no URL is entered.
    if (url === "") {
        Swal.fire({
            title: 'Woops!',
            text: 'Please enter a URL',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: "#24b1f1",
          });
    } else {
        //Show spinner for 1.5 seconds before transitioning to the generated QR code.
        showSpinner()
        setTimeout(() => {
            hideSpinner(); 
             generateQRCode(url, size);
             
             //Need SetTimeout function for slight delay to add src data from QR code to Save QR Code button. 
             setTimeout(()=> {
                const saveURL = qrEl.querySelector('img').src;
                saveQRCodeBtn(saveURL)
             }, 20)

        }, 1500)
    }   
};

//Utilizing QRCode.js library to generate QR code and assign it's img to the div with id of 'qrcode' based on options passed in. 
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

// Clear out QR Code and save button
const clearUI = () => {
    qrEl.innerHTML= "";
    const saveQRBtn = document.getElementById('save-link')
    if(saveQRBtn) saveQRBtn.remove();
}

//Creating custom link element that will allow user to download QR code. href == (src from QR code's img.src ). Passed into function from as parameter since it's defined by user.
const saveQRCodeBtn = (saveURL) => {
    const saveQRBtn = document.createElement('a');
    saveQRBtn.id = 'save-link';
    saveQRBtn.classList = 'text-white font-semibold md:text-xl py-2 m-auto my-5 mt-10 w-2/3 rounded bg-gradient-to-b from-sky-500 to-sky-400 hover:bg-sky-600 ';
    saveQRBtn.href = saveURL;
    saveQRBtn.download = 'qrcode';
    saveQRBtn.innerHTML = 'Save QR Code';
    document.getElementById('generated').appendChild(saveQRBtn)
};

//Calling hideSpinner function as another layer to ensure Spinner is not showing upon load. Style is also set to display:none in html
hideSpinner();

formEl.addEventListener('submit', onGenerateSubmit)