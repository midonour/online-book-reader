import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAHkZLW9RrdT66bDuKaqjbs0fnXj38JWwg",
    authDomain: "book-reader-3df57.firebaseapp.com",
    projectId: "book-reader-3df57",
    storageBucket: "book-reader-3df57.appspot.com",
    messagingSenderId: "628158631727",
    appId: "1:628158631727:web:fcaaf70872412fd4149bda"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storageRef = firebaseApp.storage().ref();


const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault()
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const selectElement = document.getElementById('signupRole');
            const selectedIndex = selectElement.selectedIndex;
            const selectedValue = selectElement.options[selectedIndex].value;
            if (selectedValue === "customer")
                window.location.href = "bookreader_customer.html";
            else
                window.location.href = "bookreader_admin.html";
            //alert(selectedValue);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
})

