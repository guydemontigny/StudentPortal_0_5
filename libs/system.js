
export function Now() {
    var today = new Date()
    return (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
}

export function showPortalSpinner(show) {
    const docs = document.getElementsByName("portal-spinner")
    for (var j=0; j<docs.length; j++) {
        docs[j].hidden = !show
    }
}
