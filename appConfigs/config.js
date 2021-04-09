import { getDB } from "../libs/sessionStorage"

export const defaultLocale = 'en'

export function apiUrl(currentDB) {
    if (!currentDB) { currentDB = getDB()}
    const DB = currentDB.toLowerCase()
    return (`https://${DB}.dhammareg.dhamma.org:7500/StudentOutreachJs/`)
}
