import styles from '../styles/login.module.css'
import Center from 'react-center';
import { getCredentials, saveCredentials } from '../libs/storage';
import {resendDRCode, logout} from '../libs/APIs';
import PagesContainer from '../components/PagesContainer'
import LanguageDropDown from '../components/LanguageDropDown'

function Login({props}) {
    const T = props.T
    //
    // *** SETUP THE CENTERS DROP-DOWN
    //
    let optionItems = props.centers.map((center) => {
        return <option value={center[0] + ' - ' + center[1]["LocationName"] } key={center[0]}>{center[1]["DhammaName"]}</option>
        });
    function handleEmailChange(value) {
        const credentials = getCredentials()
        credentials.email = value
        if (credentials.centerId) {
            document.getElementById("btn-submit-id").disabled = false
        } else {
            document.getElementById("btn-submit-id").disabled = true
        }
        saveCredentials(credentials)
    }
    function handleCellPhoneChange(value) {
        const credentials = getCredentials()
        credentials.cellPhone = value
        if (credentials.centerId) {
            document.getElementById("btn-submit-id").disabled = false
        } else {
            document.getElementById("btn-submit-id").disabled = true
        }
        saveCredentials(credentials)
    }
    function handleCenterChange(value) {
        const key = value.split(' ')
        const credentials = getCredentials()
        credentials.centerId = key[0]
        if (credentials.email || credentials.cellPhone) {
            document.getElementById("btn-submit-id").disabled = false
        } else {
            document.getElementById("btn-submit-id").disabled = true
        }
        saveCredentials(credentials)
    }
    const handleCodeChange = e => {
        const credentials = getCredentials()
        credentials.code = e.target.value
        saveCredentials(credentials)
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
                <label htmlFor="centerList" className="form-label">{T.Center}</label>
                <input className="form-control" 
                    list="centerlistOptions" 
                    onBlur={(e) => handleCenterChange(e.target.value)} 
                    id="centerList" 
                    placeholder={T.TypeToSearch} 
                    type="text" 
                    size="50" />
                <datalist id="centerlistOptions">
                    {optionItems}
                </datalist>
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
                        disabled={true}
                        className={styles.button} 
                        onClick={ () => {const credentials = getCredentials(); 
                                        credentials.email = document.getElementById("email-input-id").value; 
                                        credentials.cellPhone = document.getElementById("cell-input-id").value; 
                                        saveCredentials(credentials)}}>
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
                    <button  type="submit" 
                        className={styles.button} 
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
                        onClick={ () => {
                        const credentials = getCredentials(); 
                        credentials.code = document.getElementById("code-input-id").value; 
                        saveCredentials(credentials)
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
