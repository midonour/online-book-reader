import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc,setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHkZLW9RrdT66bDuKaqjbs0fnXj38JWwg",
    authDomain: "book-reader-3df57.firebaseapp.com",
    projectId: "book-reader-3df57",
    storageBucket: "book-reader-3df57.appspot.com",
    messagingSenderId: "628158631727",
    appId: "1:628158631727:web:fcaaf70872412fd4149bda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);           
const storage = getStorage(app);
const colRef=collection(db,'books')


const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'bookreader_login.html';
        })
        .catch((error) => {
            console.error('Error logging out: ', error);
        });
});

async function renderBooks() {
    bookList.innerHTML = '';
    try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        querySnapshot.forEach((docSnapshot) => {
            const book = docSnapshot.data();
            const li = document.createElement('li');
            let str=book.title + "\nby " + book.author;
            li.textContent = str;
            const readbutton=document.createElement('button');
            readbutton.textContent='Read';
            readbutton.addEventListener('click',()=>{
                const link=book.url;
                window.open(link,'_blank')
            });
            li.appendChild(readbutton);
            bookList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
}

// Load Books on Page Load
window.onload = renderBooks;
