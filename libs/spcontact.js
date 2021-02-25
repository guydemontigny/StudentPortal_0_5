  export function getSPContacts() {
    if (typeof window !== 'undefined') {
        const spcontactsString = sessionStorage.getItem('spcontacts');
        if (spcontactsString) {
            const userSPContacts = JSON.parse(spcontactsString);
            return userSPContacts
            }
    }
    return initialSPContacts()
  };

  export function saveSPContacts(spcontacts){
    sessionStorage.setItem('spcontacts', JSON.stringify(spcontacts));
  };

  export function initialSPContacts() {
    return {
        studentId: '',
        centerId: '',
        contactOnNewPostByMail: false,
        contactOnNewPostBySMS: false
    }
  }

  export function resetSPContacts(spcontacts) {
    const initSPContacts = Object.entries(initialSPContacts())
    initSPContacts.map((contact) => {
        spcontacts[contact[0]] = contact[1]
    })
    return spcontacts
  }