import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import { createUser } from "./db";
// creating context for authentication
const authContext = createContext();

// creating function to provide auth context
export function AuthProvider({ children }) {
  // auth is an object to allow for multiple auth methods
  const auth = useProvideAuth();
  // returning a jsx component with auth context and auth as props to the children
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGithub = () => {
    return (
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GithubAuthProvider()) // sign in with popup
        // reslolving the promise with the user
        .then((response) => {
          handleUser(response.user);
        })
    );
  };

  // signout function, to clear the stored cookies/signout
  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect to either set the user depending on the signin status
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // cherry pick the user details.
  const formatUser = (user) => {
    return {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
    };
  };

  return {
    // returning useful functions and members.
    user,
    signinWithGithub,
    signout,
  };
}
