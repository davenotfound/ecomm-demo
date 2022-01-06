import React from "react";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";

import { auth, createUserProfileDoc, signUpWithEmailAndPassword } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";

class SignUp extends React.Component {
  constructor() {
    super();
 
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    auth.tenantId = null;

    const {displayName, email, password, confirmPassword} = this.state;
    console.log(email, password, auth.tenantId);
    if(password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await signUpWithEmailAndPassword(email, password);
      console.log(user);
      await createUserProfileDoc(user, { displayName});

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch(error) {
      console.log('error creating user with email and password', error);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state;

    return(
      <div className="sign-up">
        <h2 className="title">I already have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput type="text" name="displayName" value={displayName} onChange={this.handleChange} label="Display Name" required></FormInput>
          <FormInput type="email" name="email" value={email} onChange={this.handleChange} label="Email" required></FormInput>
          <FormInput type="password" name="password" value={password} onChange={this.handleChange} label="Password" required></FormInput>
          <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} label="Confirm Password" required></FormInput>
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignUp;