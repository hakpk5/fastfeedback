// import React, { useState, useEffect, useContext, createContext } from "react";
// import firebase from "./firebase";
// // creating context for authentication
// const authContext = createContext();

// // creating function to provide auth context
// export function ProvideAuth({ children }) {
//   // auth is an object to allow for multiple auth methods
//   const auth = useProvideAuth();
//   // returning a jsx component with auth context and auth as props to the children
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }
// export const useAuth = () => {
//   return useContext(authContext);
// };

// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signinWithGithub = () => {
//     var provider = new firebase.auth.GithubAuthProvider(); // instance of the github auth provider object
//     return (
//       firebase
//         .auth()
//         .signinWithPopUp(provider) // sign in with popup
//         // reslolving the promise with the user
//         .then((response) => {
//           setUser(response.user); // setting the user
//           return response.user; // returning the user
//         })
//     );
//   };

//   // signout function, to clear the stored cookies/signout
//   const signout = () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(false);
//       });
//   };
//   // useEffect to either set the user depending on the signin status
//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return {
//     user,
//     signinWithGithub,
//     signout,
//   };
// }
