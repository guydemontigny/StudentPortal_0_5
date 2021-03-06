import styles from '../styles/login.module.css'
import Center from 'react-center';
import { getCredentials, saveCredentials } from '../libs/storage';
import {resendDRCode, logout} from '../libs/APIs';
import PagesContainer from '../components/PagesContainer'
import LanguageDropDown from '../components/LanguageDropDown'

function Login({props}) {
    const T = props.T
    function handleEmailChange(value) {
        const credentials = getCredentials()
        credentials.email = value
        saveCredentials(credentials)
    }
    function handleCellPhoneChange(value) {
        const credentials = getCredentials()
        credentials.cellPhone = value
        saveCredentials(credentials)
    }
    const handleCodeChange = e => {
        const credentials = getCredentials()
        credentials.code = e.target.value
        saveCredentials(credentials)
        const resendBtn = document.getElementById("resendbtn-id")
        if (e.target.value){
            resendBtn.disabled = true
        } else {
            resendBtn.disabled = false
        }
    }


    //
    // INITIAL LOGIN: Enter Email or Cell Phone Number
    //
    if (getCredentials().error < 'ERR010') {
      return (
        <div>
        <PagesContainer T={props.T}/>
        <ul className="nav nav-tabs " >
              <li className="nav-item dropdown" >
                  <LanguageDropDown props = {props} />
              </li>
        </ul>
        <Center >
        <div className={styles.center}>
            <h1 className={styles.title}>
                {T.LoginTitle}
            </h1>
            <form className={styles.center}>
                <br/>

                <label htmlFor="email-input-id" className="form-label">{T.EmailAddress}</label>
                <input className="form-control" 
                    type="email" 
                    onBlur={(e) => handleEmailChange(e.target.value)} 
                    id="email-input-id"/>

                <label htmlFor="cell-input-id" className="form-label">{T.Or}{' '}{T.CellNumber}</label>
                <input className="form-control" 
                    type="tel" 
                    placeholder="999-999-9999" 
                    pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                    onBlur={(e) => handleCellPhoneChange(e.target.value)} 
                    id="cell-input-id"/>
                <div>
                    <br/>
                </div>
                <div>
                    <br/><br/>
                    <button id="btn-submit-id" 
                        className={styles.button}>
                            {T.Submit}
                    </button>
                </div>
            </form>
        </div>
        </Center>
        </div>
    )}
    //
    // NEED TO ENTER CODE
    //
    const credentialsReturned = getCredentials()
    const errorCode = credentialsReturned.error.split(' ')[0]
    let errorMessage = T[errorCode]
    if (errorCode === "ERR011") {errorMessage = credentialsReturned.code + ': ' + errorMessage}
    if (credentialsReturned.code === "resent"){ errorMessage = T.ResentCode}
    credentialsReturned.error = "ERR011 Code is not valid"
    saveCredentials(credentialsReturned);
    return( 
      <div>
      <PagesContainer T={props.T}/>
      <ul className="nav nav-tabs " >
            <li className="nav-item dropdown" >
                <LanguageDropDown props = {props} />
            </li>
      </ul>
      <Center >
        <div className={styles.center}>
        <h1 className={styles.title}>
            {T.LoginTitle}
        </h1>
        <form className={styles.center}>
            <label>
                <p>{T.Code1} {credentialsReturned.email}{credentialsReturned.cellPhone}</p>
                <div className="input-group"  >
                    <div className={styles.center} >
                    <button  
                        className={styles.button} 
                        id = "resendbtn-id"
                        onClick={resendDRCode}>
                            {T.ResendCode}
                    </button>
                    </div>
                    <input type="text" 
                        onChange={handleCodeChange} 
                        id="code-input-id" 
                        placeholder={T.Code2} 
                        autoFocus="autofocus"/>
                </div>
            </label>
            <div>
                <br/><div className={styles.error}>{errorMessage}</div>
                <br/><br/>{credentialsReturned.firstName} {' '} {credentialsReturned.lastName}
            </div>
            <div>
                <br/><br/>
                <button className={styles.button} 
                        type = "submit"
                        onClick={ () => {
                        const credentials = getCredentials(); 
                        credentials.code = document.getElementById("code-input-id").value; 
                        saveCredentials(credentials);
                        window.location.reload(false);
                        }}>
                    {T.Submit}
                </button>
            </div>
        </form>
        </div>
      </Center>
      </div>
    )
}
export default Login
