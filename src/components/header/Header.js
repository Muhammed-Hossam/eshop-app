import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  LOGIN,
  SET_USERNAME,
} from "../../redux/slice/authSlice";
import { getDoc, doc, collection } from "firebase/firestore";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <NavLink
      to="/cart"
      className={({ isActive }) => (isActive ? `${styles.active}` : "")}
    >
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
);

// Style Link when Clicked
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        if (user.displayName === null) {
          const usersRef = collection(db, "users");
          getDoc(doc(usersRef, user.uid)).then((doc) => {
            // Check if the user is exist and loggedin
            if (doc.exists() && doc.data().isLoggedIn) {
              dispatch(SET_USERNAME(doc.data().userName));
            }
          });
        } else {
          dispatch(SET_USERNAME(user.displayName));
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userID: user.uid,
          })
        );
      } else {
        // User is signed out
      }
    });

    console.log("authState =>", authState);
  }, [dispatch, userName, isLoggedIn, authState]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Auth =>", auth);
        dispatch(LOGIN(false));
        toast.success("Logout Successful!");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <>
      <header>
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                {isLoggedIn && (
                  <>
                    <span style={{ fontSize: "1.4rem", color: "#ff7722" }}>
                      <FaUserCircle />
                      Hi, {userName}
                    </span>
                    <NavLink to="/orders-history" className={activeLink}>
                      Orders History
                    </NavLink>
                  </>
                )}
                {isLoggedIn && (
                  <NavLink to="/login" onClick={logoutUser}>
                    Logout
                  </NavLink>
                )}
                {!isLoggedIn && (
                  <>
                    <NavLink to="/login" className={activeLink}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className={activeLink}>
                      register
                    </NavLink>
                  </>
                )}
              </span>
              {cart}
            </div>
          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
      <ToastContainer limit={2} style={{ fontSize: "16px" }} />
    </>
  );
};

export default Header;
