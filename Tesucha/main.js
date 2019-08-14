// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCSGEj3KXaF5ccsTFP-phHRJiGKf0cLXY8",
    authDomain: "tesucha-contact-form.firebaseapp.com",
    databaseURL: "https://tesucha-contact-form.firebaseio.com",
    projectId: "tesucha-contact-form",
    storageBucket: "",
    messagingSenderId: "227803743541",
    appId: "1:227803743541:web:0c28ef70304a75ad"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Reference Messages Collection
var messagesRef = firebase.database().ref('messages');

/* listen for form submit */
document.getElementById('contactForm').addEventListener('submit', submitForm);

//submitForm function
function submitForm(e){
    e.preventDefault();
    
  //get values
  const name = getInputVal('name');
  const email = getInputVal('email');
  const phone = getInputVal('tel');
  const message = getInputVal('message');

  saveMessage(name, email, phone, message);

  //Show Alert
  document.querySelector('.alert').style.display = 'block';

  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  //reset input fields
  document.querySelector('#contactForm').reset();


}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save the message to Firebase
function saveMessage(name, email, phone, message){
    const newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
}
