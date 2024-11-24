import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDfQ1nlAxr9LSXgVh7mhSgT2LSd97Zkkng",
  authDomain: "olx-clone-8da3d.firebaseapp.com",
  projectId: "olx-clone-8da3d",
  storageBucket: "olx-clone-8da3d.appspot.com",
  messagingSenderId: "689963893798",
  appId: "1:689963893798:web:9e7c585825fc6deeed12e7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);


const signup = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const responce = await createUserWithEmailAndPassword(auth, email, password);
    const user = responce.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error: any) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error: any) {
    console.log(error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = () => {
  try {
    signOut(auth);
  } catch (error: any) {
    console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

type productData = {
  name: string;
  category: string;
  price: number;
  description:string;
  image: File | string;
}

const addProduct = async (productData: productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID: ", docRef.id);
  } catch (error: any) {
    toast.error(error.code.split('/')[1].split('-').join(' '));

  }
}

export {
  auth,
  googleProvider,
  signup,
  login,
  logout,
  addProduct,
  storage,
  db
}
