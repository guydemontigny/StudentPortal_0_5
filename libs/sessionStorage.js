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
// Current tab
//
export function saveCurrentTab(currentTab){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('currentTab', currentTab)
  }
}
export function getCurrentTab(){
  if (typeof window !== 'undefined') {
    const currentTab = sessionStorage.getItem('currentTab')
    if (!currentTab) {
      return 'skills'
    } else {
      return currentTab
    }
  } else {
    return 'skills'
  }
}
//
// Was modified
//
export function saveWasModified(modified){
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('wasModified', modified)
  }
}
export function getWasModified(){
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('wasModified')
  }
}
export function getWasModifiedColor(){
  if (typeof window !== 'undefined') {
    return (getWasModified()==='true' ? "text-danger" : "text-muted")
  }
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
// The student availability table
//
export function getStudentAvailability() {
  if (typeof window !== 'undefined') {
      const studentAvailabilityString = sessionStorage.getItem('studentAvailability')
      if (studentAvailabilityString) {
          const studentAvailability = JSON.parse(studentAvailabilityString)
          if (studentAvailability[getLocation().locationId])
            return studentAvailability[getLocation().locationId]
          }
  }
  return initialStudentAvailability()
}
export function saveStudentAvailability(studentAvailability){
  if (typeof window !== 'undefined') {
    let studentAvailabilityTotal = {}
    let studentAvailabilityString = sessionStorage.getItem('studentAvailability')
    if (studentAvailabilityString) {
      studentAvailabilityTotal = JSON.parse(studentAvailabilityString)
    }
    Object.entries(studentAvailability).map((locationAvailability) => {
      studentAvailabilityTotal[locationAvailability[0]] = locationAvailability[1]
    })
//    sessionStorage.setItem('studentAvailability', JSON.stringify(studentAvailabilityTotal).replace(/"0"/g, '0').replace(/"1"/g, '1'))
    sessionStorage.setItem('studentAvailability', JSON.stringify(studentAvailabilityTotal))
  }
}
export function saveStudentAvailabilityField(fieldName, fieldValue){
  if (typeof window !== 'undefined') {
    const studentAvailability = JSON.parse(sessionStorage.getItem('studentAvailability'))
    const currentLocation = getLocation().locationId
    if (!studentAvailability[currentLocation]){studentAvailability[currentLocation]= initialStudentAvailability()}
    studentAvailability[currentLocation][fieldName] = fieldValue
    sessionStorage.setItem('studentAvailability', JSON.stringify(studentAvailability))
  }
}
export function initialStudentAvailability() {
  return {
    StudentId : getStudent().studentId,
    LocationId : getLocation().locationId,
    ContactOnNewServiceOpportunity : 0,
    OpportunityComment :"",
    NotAvailable : 0,
    AvailableFromHome : 0,
    AvailableForCourses : 0,
    AvailableForChildCourses : 0,
    AvailableBetweenCourses : 0,
    AvailableWorkPeriod : 0,
    AvailableLongTerm : 0,
    AvailableLongTermFrom : null,
    AvailableLongTermTo : null,
    AvailabilityComment : "", 
    rowid : ""
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
  skills[categoryId][skillId].SkillLevel = value
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
      location.locationDisplayName = location.locationName + (location.dhammaName ? ', ' : '') + location.dhammaName
    } else {
      location.locationDisplayName = ''
    }
    sessionStorage.setItem('location', JSON.stringify(location))
  }
}
export function resetLocation() {
  sessionStorage.removeItem('location')
}

