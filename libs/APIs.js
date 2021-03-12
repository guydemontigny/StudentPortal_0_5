import {getCredentials, saveCredentials, initialCredentials } from './storage'
import {apiUrl} from '../appConfigs/config'

export function flushDRCode(){
    const studentId = getCredentials().studentId
    fetch(`${apiUrl}DrLogout?studentId=${studentId}`)
    }

export function resendDRCode(){
    const credentials = getCredentials()
    credentials.code = "resend"
    saveCredentials(credentials)
    const studentId = credentials.studentId
    fetch(`${apiUrl}DrLogout?studentId=${studentId}`)
    }
    
export function logout(){
    flushDRCode()
    const credentials = initialCredentials()
    credentials.error = "ERR020 Logout"
    saveCredentials(credentials)
    window.location.reload(false)
}