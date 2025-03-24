
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCzOlezKYTxpYuT3203x3lcIZVaS1unduQ",
  authDomain: "chat-app-gs-e579e.firebaseapp.com",
  projectId: "chat-app-gs-e579e",
  storageBucket: "chat-app-gs-e579e.firebasestorage.app",
  messagingSenderId: "320553436429",
  appId: "1:320553436429:web:f0f17d8736e27cb4251c44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//authentication metid

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id:user.uid,
            username:username.toLowerCase(),
            email:email,
            name:"",
            avtar:"",
            bio:"Hey, There i am using chat app",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData:[]
        });

    }
    catch (error){
        console.error(error);
        toast.error(error.code);

    }
  
};


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
        toast.success("Login Successfully");
    }
    catch (error){
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));

    }
  
};


const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logout Successfully");
    }
    catch (error){
        console.error(error);
        toast.error(error.code.split('/')[1].split("-").join(" "));

    }
}
export {signup, login, logout, auth, db};