//
// The credentials object
//
export function getCredentials() {
    if (typeof window !== 'undefined') {
        const credentialsString = sessionStorage.getItem('credentials');
        if (credentialsString) {
            const userCredentials = JSON.parse(credentialsString);
            return userCredentials
            }
    }
    return initialCredentials()
  };
  export function saveCredentials(credentials){
    sessionStorage.setItem('credentials', JSON.stringify(credentials));
  };
  export function initialCredentials() {
    return {
      centerId: '',
      email: '',
      cellPhone: '',
      studentId: '',
      firstName: '',
      lastName: '',
      code: '',
      error: 'ERR000'
    }
  }
  export function resetCredentials(credentials) {
    const initCredentials = Object.entries(initialCredentials())
    initCredentials.map((credential) => {
      credentials[credential[0]] = credential[1]
    })
    return credentials
  }
//
// Database
//
  export function saveDB(DB){
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('DB', DB)
    }
  }
  export function getDB(){
    if (typeof window !== 'undefined') {
      return(sessionStorage.getItem('DB'))
    } else {
      return ''
    }
  }
//
// Current locale
//
  export function saveLocale(locale){
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('locale', locale)
    }
  }
  export function getLocale(){
    if (typeof window !== 'undefined') {
      return(sessionStorage.getItem('locale'))
    } else {
      return ''
    }
  }
