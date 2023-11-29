import { useRef, useState, useEffect } from "react";
import { useUserContext } from './UserContext';
import { updateUser } from "./api/axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

const UpdateUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const { user } = useUserContext();

  const [originalUser, setOriginalUser] = useState({});
  const [name, setName] = useState(user?.name || '');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState(user?.email || '');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [formChanged, setFormChanged] = useState(false);
  const [userTitle, setUserTitle] = useState("");
  

  useEffect(() => {
    nameRef.current.focus();
    setOriginalUser({ name: user.name, email: user.email });
  }, [user]);

  useEffect(() => {
    setUserTitle();
  }, [setUserTitle]);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    setValidName(result);
    setFormChanged(originalUser.name !== name);
  }, [name, originalUser.name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    setFormChanged(originalUser.email !== email);
  }, [email, originalUser.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
    setFormChanged(originalUser.password !== pwd);
  }, [pwd, matchPwd, originalUser.password]);

  useEffect(() => {
    setErrMsg('');
  }, [name, pwd, matchPwd]);

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`);
      const data = await response.json();
  
      const name = data.name;
      setUserTitle(name);
  
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (event) => {
    try {
        event.preventDefault();

        // Check if each field is empty, and if so, use the corresponding value from user context
        const updatedName = name.trim() !== '' ? name : user.name;
        const updatedEmail = email.trim() !== '' ? email : user.email;
        const updatedPassword = pwd.trim() !== '' ? pwd : user.password;
    
        const userData = {
          name: updatedName,
          email: updatedEmail,
          password: updatedPassword,
          admin: user.admin
        };
    
      updateUser(user.id, userData);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating/updating user:', error);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h2 id="h2-profile">Success!</h2>
          <p>
            <Link to="/profile">Return to Profile</Link>
          </p>
        </section>
      ) : (
        <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "ofscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 id="register-h1">Edit profile</h1>
                    <form onSubmit={handleSubmit}>

                        <label id="register-label" htmlFor="email">Name:</label>
                        <input type="text" placeholder={user.name}ref={nameRef} autoComplete="off" onChange={(e) => setName(e.target.value)}
                            aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            4-24 letters. <br />
                            Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label id="register-label" htmlFor="email">Email:</label>
                        <input type="email" placeholder={user.email} ref={emailRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && name && !validName ? "instructions" : "offscreen"}>
                            4-24 letters. <br />
                            Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label id="register-label" htmlFor="password">New password:</label>
                        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)}
                            aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote"
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
                            aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field. <br />
                        </p>
                        <button disabled={!formChanged} >Edit profile</button>

                   
          </form>
        </section>
      )}
    </>
  );
};

export default UpdateUser;
