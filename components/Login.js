import styles from '../styles/login.module.css'
import Center from 'react-center';
import {getCredentials, saveCredentials} from '../libs/sessionStorage';
import {resendDRCode} from '../libs/DRCodeManagement';
import PagesContainer from '../components/PagesContainer'
import LoginNavBar from '../components/LoginNavBar'
import { showPortalSpinner } from '../libs/system';

function Login({props}) {
    const T = props.T
    function handleEmailChange(value) {
        const credentials = getCredentials()
        credentials.email = value
        saveCredentials(credentials)
    }
    function handleCellPhoneChange(value) {
        const credentials = getCredentials()
        credentials.cellPhone = formatPhoneNumber(value)
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
    const errCode = getCredentials().error.split(' ')[0]

    //
    // LOGOUT PAGE
    //
    if (errCode === "ERR020") {
        return (
            <div>
                <PagesContainer T={props.T}/>
                <Center >
                    <div className={styles.center}>
                        <form className={styles.center}>
                            <div>
                                <br/>
                                <br/>{T.LogoutMsg}
                            </div>
                            <div>
                                <br/><br/>
                                <button id="btn-return-to-login-id" 
                                    onClick = {()=>{const credentials=getCredentials(); credentials.error = "ERR000"; saveCredentials(credentials)}}
                                    className={styles.button}>
                                        {T.ReturnToLogin}
                                </button>
                            </div>
                        </form>
                    </div>
                </Center>
            </div>
        )
    }

    //
    // INITIAL LOGIN: Enter Email or Cell Phone Number
    //
    let errMessage = T[errCode]
    if (getCredentials().error < 'ERR010') {
      return (
        <div>
        <PagesContainer T={props.T}/>
        <div className="row">
            <div className="col-md-12">
                <LoginNavBar props={props}/>
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
                            defaultValue = {getCredentials().email}
                            onChange={(e) => handleEmailChange(e.target.value)} 
                            id="email-input-id"/>
                        <label htmlFor="cell-input-id" className="form-label">{T.Or}{' '}{T.CellNumber}</label>
                        <input className="form-control" 
                            type="tel" 
                            placeholder="999-999-9999" 
                            defaultValue = {getCredentials().cellPhone}
                            pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                            onChange={(e) => handleCellPhoneChange(e.target.value)} 
                            id="cell-input-id"/>
                        <div>
                            <br/>
                            <br/><div className={styles.error}>{errMessage}</div>
                        </div>
                        <div>
                            <br/><br/>
                            <button id="btn-submit-id" 
                                onClick = {()=>{showPortalSpinner(false)}}
                                className={styles.button}>
                                    {T.Submit}
                            </button>
                        </div>
                    </form>
                </div>
                </Center>
            </div>
        </div>
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
      <div className="row">
            <div className="col-md-12">
                <LoginNavBar props={props}/>
                <Center >
                    <div className={styles.center}>
                    <h1 className={styles.title}>
                        {T.LoginTitle}
                    </h1>
                    <form className={styles.center}>
                        <label>
                            <div>{T.Code1} {credentialsReturned.email}{credentialsReturned.cellPhone}</div>
                            <br/>
                            <div className="input-group"  >
                                <div className={styles.center} >
                                <button  
                                    className={styles.button} 
                                    id = "resendbtn-id"
                                    onClick={resendDRCode}>
                                        {T.ResendCode}
                                </button>
                                <input type="text" 
                                    onChange={handleCodeChange} 
                                    id="code-input-id" 
                                    placeholder={T.Code2} 
                                    autoFocus="autofocus"/>
                                </div>
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
                                        showPortalSpinner(true);
                                        const credentials = getCredentials(); 
                                        credentials.code = document.getElementById("code-input-id").value; 
                                        saveCredentials(credentials);
//                                        window.location.reload(false);
                                    }}>
                                {T.Submit}
                            </button>
                        </div>
                    </form>
                    </div>
                </Center>
            </div>
        </div>
        </div>
    )
}

function formatPhoneNumber(phoneNumber) {
    let formattedNumber = ""
    for (var j=phoneNumber.length - 1; j >= 0; j--) {
        if ((formattedNumber.length === 4) || (formattedNumber.length === 8)) {formattedNumber = "-" + formattedNumber}
        if (!isNaN(phoneNumber.substr(j,1))) {formattedNumber = phoneNumber.substr(j,1) + formattedNumber}
    }
    return formattedNumber
}

export default Login
