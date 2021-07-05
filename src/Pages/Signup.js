import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../Hooks/httpHook';
import useInput from '../Hooks/inputHook';
import { postSignUp } from '../library/authFns';
import LoadingPage from './loadingPage';
import styles from './Signup.module.css';

//helper functions
const isEmpty = (value) => value.trim() !== "" && value.trim().length >= 3; 
const isContactNumber = (value) => !isNaN(value) && value.trim().length >= 10;
const isEmail = (value) => value.includes('@') && value.trim().length > 3;

const Signup = () => {

   const [signIn, setSignIn] = useState("");
    
   const { isLoading, error, sendRequest } = useHttp(postSignUp, false);

   const { value: first_name, 
            valueChangeHandler: firstNameHandler, 
            blurHandler: fNameBlurHandler,
            isValid: fNameValid , isTouched: fNameTouched } = useInput(isEmpty);
            
    const { value: last_name, 
           valueChangeHandler: lastNameHandler, 
           blurHandler: lNameBlurHandler, 
           isValid: lNameValid, isTouched : lNameTouched} = useInput(isEmpty);

   const { value: email, 
         valueChangeHandler: emailHandler, 
         blurHandler: emailBlurHandler, 
         isValid: emailValid, isTouched: emailTouched } = useInput(isEmail);

   const { value: contact, 
        valueChangeHandler: contactHandler, 
        blurHandler: contactBlurHandler, 
        isValid: contactValid, isTouched: contactTouched } = useInput(isContactNumber);

   const { value: org_name, 
           valueChangeHandler: orgNameHandler, 
           blurHandler: orgBlurHandler, 
           isValid: orgNameValid, isTouched: orgNameTouched } = useInput(isEmpty);

   const { value: password, 
         valueChangeHandler: passwordHandler, 
         blurHandler: passwordBlurHandler, 
         isValid: passwordValid, isTouched: passwordTouched } = useInput(isEmpty);

    const signUphandler =  (event) => {
        event.preventDefault();
        if(fNameValid && lNameValid && emailValid && contactValid && orgNameValid && passwordValid) {
            const signUpObj = { first_name, last_name, email, contact, org_name, password };

            sendRequest(signUpObj, (data) => {
                setSignIn(data.message);
            });
        }
    }

    return (<Fragment>
                <div className={styles.signin}> <p> Already have an account? </p><Link to="/">SIGN IN</Link></div>
                <main className={styles.signupContainer}>
                {isLoading && <LoadingPage/>}
                {! error.isValid && <p className={styles.signUp}>{error.message} </p>}
                <section className={styles.form}>
                    <div className={styles["form-detail"]}>
                        <h1>Sign up. For Free</h1>
                        <p>to access CRM.</p>
                    </div>
                    <form onSubmit={signUphandler} autoComplete="false">
                        <div className={styles["form-control"]}>
                            <label htmlFor="f_name">First Name</label>
                            <input type="text" id="f_name" name="first_name" onChange={(event)=> firstNameHandler(event)} onBlur={fNameBlurHandler}/>
                            { !fNameValid && fNameTouched && <p className={styles.error}>Please enter a valid First Name.</p> }
                        </div>
                        <div className={styles["form-control"]}>
                            <label htmlFor="l_name">Last Name</label>
                            <input type="text" id="l_name" name="last_name" onBlur={lNameBlurHandler} onChange={lastNameHandler}/>
                            { !lNameValid && lNameTouched && <p className={styles.error}>Please enter a valid Last Name.</p> }
                        </div>
                        <div className={styles["form-control"]}>
                            <label htmlFor="email">Work Email</label>
                            <input type="text" id="email" name="email" onBlur={emailBlurHandler}  onChange={emailHandler}/>
                            { !emailValid && emailTouched && <p className={styles.error}>Please enter a valid Email.</p> }
                        </div>
                        <div className={styles["form-control"]}>
                            <label htmlFor="contact">Contact</label>
                            <input type="text" id="contact" name="contact"  onBlur={contactBlurHandler} onChange={contactHandler}/>
                            { !contactValid && contactTouched && <p className={styles.error}>Please enter a valid Contact number.</p> }
                        </div>
                        <div className={styles["form-control"]}>
                            <label htmlFor="orgname">Organizations Name</label>
                            <input type="text" id="orgname" name="org_name"  onBlur= {orgBlurHandler} onChange={orgNameHandler}/>
                            { !orgNameValid && orgNameTouched && <p className={styles.error}>Please enter a valid organizations name.</p> }
                        </div>
                        <div className={styles["form-control"]}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password"  autoComplete="false" onBlur={passwordBlurHandler} onChange={passwordHandler}/>
                            { !passwordValid && passwordTouched && <p className={styles.error}>Please enter a valid password. Should be of length 3.</p> }
                        </div>
                        <button className={styles.submitBtn}>Sign Up</button>
                        { signIn.length > 0 && <p className={styles.signinSuccess}>{signIn} <Link to="/">Sign In</Link></p> }
                    </form>
                </section>
            </main>
        </Fragment>
    );

}

export default Signup;