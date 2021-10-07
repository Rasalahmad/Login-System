import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeFirebaseAuthentication from './firebase/firebase.init';

initializeFirebaseAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


function App() {
  const auth = getAuth();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, SetIsLogin] = useState(false);
  
  const handleRegistration = (e) => {
    e.preventDefault();
    if(password.length < 6){
      setError('Your password must contained at least 6 character');
      return;
    };
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Your password must contain at least 2 uppercase letter');
      return;
    };
    if(!/(?=.*[0-9].*[0-9])/.test(password)){
      setError('Your password must contain at least two number');
      return;
    }
    isLogin? processLogin(email, password) : registerNewUser(email, password);

  }
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user
      console.log(user);
    })
    .catch(error => {
      setError(error.message);
    })
  }
 
  const setUserName = () => {
    updateProfile(auth.currentUser, {displayName: name})
    .then(result => {

    })
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setError('');
      verifyEmail();
      setUserName();
    })
    .catch(error => setError(error.message));
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(result => {
      console.log(result);
    })
    .then(error => setError(error.message));
  }



  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
  };
  const toggleLogin = (e) => {
    SetIsLogin(e.target.checked);
  };
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(result => {

    })
  }
  return (
    <div className = 'm-5'>
      <form onSubmit = {handleRegistration}>
        <h3 className = 'text-primary'>Please {isLogin ? 'Login': 'Register'}</h3>
        {!isLogin && <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input onBlur={handleNameChange} type="text" className="form-control" id="inputName" placeholder = 'your name' required/>
          </div>
        </div>}
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur ={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange = {toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registerd?
        </label>
      </div>
    </div>
  </div>
  <div className = 'col-sm-10 text-danger p-3'>{error}</div>
  <button type="submit" className="btn btn-primary">{isLogin ? 'Login': 'Register'}</button>
  <button type = 'button' onClick = {handleResetPassword} className = 'btn btn-secondary btn-sm m-2'>Forget Password?</button>
</form>
    </div>
  );
}

export default App;



/* 
  {!user.name ?
          <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>:
        <button onClick={handleSignOut}>Sign Out</button>}
      
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
*/


/* 
const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedInUser);
    })
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
  };
  const handleSignOut = () => {
    signOut(auth)
    .then(()=> {
      setUser({})
    });
  }

*/