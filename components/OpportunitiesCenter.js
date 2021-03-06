import { getLocation, saveLocation, resetLocation } from '../libs/storage'
import Center from 'react-center'
import styles from '../styles/login.module.css'

const OpportunitiesCenter = ({props}) => {
    const T = props.T
    //
    // *** SETUP THE CENTERS DROP-DOWN
    //
    let optionItems = props.centers.map((center) => {
        return <option value={center[0] + ' - ' + center[1]["LocationName"] } key={center[0]}>{center[1]["DhammaName"]}</option>
        });
    function handleCenterChange(value) {
        const key = value.split(' ')
        console.log('key:' + key[0])
        let locationFound = false
        props.centers.map((center) => {
            if(center[0] === key[0]) {
                const location = {
                    locationId: key[0],
                    locationName: center[1]["LocationName"],
                    dhammaName: center[1]["DhammaName"]
                }
                saveLocation(location)
                locationFound = true
            }
        }) 
        if (!locationFound) {
            console.log('reset')
            resetLocation()}
    }
    const locationName = () => {
        const location = getLocation()
        if (location.locationId === '') {
            return ''
        } else {
            return (location.locationId + ' - ' + location.locationName)
        }
    }

    return (
        <div>
            <Center>
            <form className={styles.center} onSubmit={(e) => {
                const center = document.getElementById('centerList').value
                handleCenterChange(center)}}>
            <br/>
            <label htmlFor="centerList" className="form-label">{T.Center}</label>
            <input className="form-control" 
                list="centerlistOptions" 
                onBlur={(e) => {handleCenterChange(e.target.value); window.location.reload()}} 
                id="centerList" 
                defaultValue = {getLocation().locationDisplayName}
                placeholder={T.TypeToSearch} 
                type="text" 
                size="50" />
            <datalist id="centerlistOptions">
                {optionItems}
            </datalist>
            </form>
            </Center>
        </div>
    )
}

export default OpportunitiesCenter
