import styles from './SignIn.module.css';
import image from '../images/image.png'
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from './loadingPage';
import useInput from '../Hooks/inputHook';
import AuthContext from '../Store/Auth/AuthContext';
import useHttp from '../Hooks/httpHook';
import { postSignIn } from '../library/authFns';

const isEmail = (value) => value.includes('@') && value.trim().length > 3;
const isEmpty = (value) => value.trim() !== "" && value.trim().length >= 3; 

const SignIn = () => {
    const ctx = useContext(AuthContext);  

    const {value: email, 
            valueChangeHandler: emailChangehandler, 
            blurHandler: emailBlurHandler, 
            isValid: emailValid, 
            isTouched: emailTouched} = useInput(isEmail);
    const {value: password, 
            valueChangeHandler: passwordChangehandler, 
            blurHandler: passwordBlurHandler, 
            isValid: passwordValid, 
            } = useInput(isEmpty);

    const { isLoading, error, sendRequest } = useHttp(postSignIn, false);

    const signInhandler = (e) => {
        e.preventDefault();
        if(emailValid && passwordValid) {
            const signInObj = {
                email,
                password
            }
            sendRequest(signInObj, (data)=> {
                ctx.signIn(data);
            });
        }
    };

    return <Fragment> 
                <div className={styles.signup}><button> <Link to="/signup">SIGN UP</Link> </button></div>
                <main className={styles.signinContainer}>
                  { isLoading && <LoadingPage/>}
                    <section className={styles.form}>
                        <div className={styles["form-detail"]}>
                            <h1>Sign in</h1>
                            <p>to access CRM.</p>
                        </div>
                    <form onSubmit={signInhandler}>
                        <div className={styles["form-control"]}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" onChange={emailChangehandler} onBlur={emailBlurHandler}/>
                            { !emailValid && emailTouched && <p className={styles.error}>Please enter a valid email</p> }
                            { !error.isValid && error.value==="email" && <p className={styles.error}>{error.message}</p> }
                        </div>
                        <div className={styles["form-control"]}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={passwordChangehandler} onBlur={passwordBlurHandler}/>
                            { !error.isValid && error.value==="password" && <p className={styles.error}>{error.message}</p> }
                        </div>
                        <button className={styles.submitBtn}>Sign In</button>
                    </form>
                </section>
                <section className={styles.rightContainer}> 
                   <img src={image} alt="CRM"/>
                 </section>
             </main>
             </Fragment>
}

export default SignIn;