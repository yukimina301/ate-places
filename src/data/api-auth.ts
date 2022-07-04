import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { NavigateFunction } from 'react-router-dom';

// メールアドレスでユーザ作成
const createUserWithEmail = async (navigate: NavigateFunction, email: string, password: string) => {
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const uid = user.uid;
    console.log(user);
    navigate('/');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
};

// メールアドレスでログイン
const signInWithEmail = async (navigate: NavigateFunction ,email: string, password: string) => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    navigate('/');
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
  });
};

// グーグルアカウントでログイン
const signInWithGoogleAuth = async (navigate: NavigateFunction) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log(token);

      const user = result.user;
      console.log(user);
      navigate('/');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// グーグルアカウントでログイン画面にリダイレクト
const redirectSignInWithGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
};

export { createUserWithEmail, signInWithEmail, signInWithGoogleAuth }