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
      email: '',
      cellPhone: '',
      studentId: '',
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
//
// The student table
//
export function getStudent() {
  if (typeof window !== 'undefined') {
      const studentString = sessionStorage.getItem('student');
      if (studentString) {
          const student = JSON.parse(studentString);
          return student
          }
  }
  return initialStudent()
}
export function saveStudent(student){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('student', JSON.stringify(student))
  }
}
export function initialStudent() {
  return {
    studentId: ''
  }
}
//
// The student per Center table
//
export function getStudentPerCenter() {
  if (typeof window !== 'undefined') {
      const studentPerCenterString = sessionStorage.getItem('studentPerCenter');
      if (studentPerCenterString) {
          const studentPerCenter = JSON.parse(studentPerCenterString);
          return studentPerCenter
          }
  }
  return ''
}
export function saveStudentPerCenter(studentPerCenter){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('studentPerCenter', JSON.stringify(studentPerCenter))
  }
}
export function initialStudentPerCenter() {
  return {
    SYST: {}
  }
}
//
// The CenterOpportunities object
//
export function getCenterOpportunities() {
  if (typeof window !== 'undefined') {
      const CenterOpportunitiesString = sessionStorage.getItem('centerOpportunities');
      if (CenterOpportunitiesString) {
          const CenterOpportunities = JSON.parse(CenterOpportunitiesString);
          return CenterOpportunities
          }
  }
  return null
}
export function saveCenterOpportunities(CenterOpportunities){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('centerOpportunities', JSON.stringify(CenterOpportunities))
  }
}
//
// The student skills object
//
export function getSkills() {
  if (typeof window !== 'undefined') {
      const skillsString = sessionStorage.getItem('skills');
      if (skillsString) {
          const skills = JSON.parse(skillsString);
          return skills
          }
  }
  return null
}
export function saveSkills(skills){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('skills', JSON.stringify(skills))
  }
}
export function setSkillValue(categoryId, skillId, value) {
  const skills = getSkills()
  skills[categoryId][skillId] = value
  saveSkills(skills)
}
//
// The location object
//
export function getLocation() {
  if (typeof window !== 'undefined') {
      const locationString = sessionStorage.getItem('location');
      if (locationString) {
          const location = JSON.parse(locationString);
          return location
          }
  }
  return {
    locationId:'',
    locationDisplayName: ''
  }
}
export function saveLocation(location){
  if (typeof window !== 'undefined') {
    if (location.locationId) {
      location.locationDisplayName = location.locationId + ' - ' + location.locationName
    } else {
      location.locationDisplayName = ''
    }
    sessionStorage.setItem('location', JSON.stringify(location))
  }
}
export function resetLocation() {
  sessionStorage.removeItem('location')
}

