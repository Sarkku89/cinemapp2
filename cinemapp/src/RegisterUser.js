import { useRef, useState, useEffect } from "react";
import { createUser } from './api/axios';
import { Link } from "react-router-dom";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

const RegisterUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [name, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMgs] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMgs('');
    }, [name, pwd, matchPwd])


    const handleSubmit = async (event) => {       
        try {
            event.preventDefault();
            const newUser = {
                "name": name, 
                "email": email,
                "password": pwd,
                "admin": false
            }
            console.log(newUser);
            await createUser(newUser);
            setSuccess(true)
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h2 id="h2-profile">Success!</h2>
                    <p>
                    <Link to="/login" className="register-user">Log In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "ofscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 id="h2-profile">Registration</h2>
                    <form onSubmit={handleSubmit}>

                        <label id="register-label" htmlFor="email">Name:</label>
                        <input type="text" ref={nameRef} autoComplete="off" onChange={(e) => setUser(e.target.value)}
                            required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            4-24 letters. <br />
                            Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label id="register-label" htmlFor="email">Email:</label>
                        <input type="email" ref={emailRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                            required aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && name && !validName ? "instructions" : "offscreen"}>
                            4-24 letters. <br />
                            Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label id="register-label" htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)}
                            required aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            4-24 letters. <br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: !@#$%
                        </p>

                        <label id="register-label" htmlFor="confirm_pwd">Confirm password:</label>
                        <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)}
                            required aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field. <br />
                        </p>
                        <button disabled={!validName || !validEmail || !validPwd || !validMatch}>Sign Up</button>

                    </form>
                    <p>Already registered?<br />
                        <span className="line">
                            <Link to="/login" className="register-user">Log In</Link>
                        </span>
                    </p>
                </section>

            )}
        </>
    )
}

export default RegisterUser