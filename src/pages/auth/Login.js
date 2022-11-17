import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import { doc, updateDoc } from "firebase/firestore";
import { LOGIN } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../firebase/config";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();



  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Update isLoggedIn to true
        updateDoc(doc(db, 'users', user.uid), {
          isLoggedIn: true,
        })
        setIsLoading(false);
        dispatch(LOGIN(true));
        toast.success("Login Successful...");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast.error("The Password is Incorrect!");
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("The User Not Found!");
        }
      });
  };

  // Login with Google
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        
        console.log('Login User => ', user);
        // dispatch(LOGIN(true));
        toast.success("Login Successfully...");
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                required
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Forgot Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle />
              &nbsp;Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
