import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from './components';
import { auth, db } from "./firebase/config";
import { Home, Contact, OrdersHistory, Cart, Login, Register, Reset } from './pages';
import { LOGIN } from "./redux/slice/authSlice";



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If User is signed in


          const usersRef = collection(db, 'users');
          getDoc(doc(usersRef, user.uid))
          .then(doc => {
            // Check if the user is exist and loggedin
            if (doc.exists() && doc.data().isLoggedIn) {
              
              dispatch(LOGIN(doc.data().isLoggedIn));
            }
          })

      }else {
        // If user is Signed out
        dispatch(LOGIN(false));
      }
    })
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders-history" element={<OrdersHistory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}


export default App;
