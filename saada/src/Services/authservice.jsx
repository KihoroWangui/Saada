
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config"; 


export const signup = (email,password) => {
	return createUserWithEmailAndPassword(auth,email, password);
};
export const login = (email,password) => {
	return signInWithEmailAndPassword(auth,email, password);
};
export const signout = (email,password) => {
	return signOut(auth);
};
