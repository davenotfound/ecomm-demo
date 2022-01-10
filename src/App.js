import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector.js";
import { createStructuredSelector } from "reselect";

import SignInSignUpPage from "./pages/si-su-pages/si-su.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/signin"
            element={
              <SignInWrapper currentUser={this.props.currentUser}>
                <SignInSignUpPage />
              </SignInWrapper>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const SignInWrapper = ({ children, currentUser }) => {
  return currentUser ? <Navigate to="/" replace /> : children;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
