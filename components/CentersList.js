import Select from 'react-select'
import Center from 'react-center'
import { getLocation, saveLocation, getStudent, resetLocation} from '../libs/sessionStorage' 
import styles from '../styles/login.module.css'


const CentersList = ({props})=> {
    //
    // *** SETUP THE CENTERS DROP-DOWN
    //
    const T = props.T
    const centerList = []
    var index = 0
    let centerListIndex = getLocation().locationId
    props.centers.map((center) => {
        centerList.push({value: center[0], 
                         label: center[1]["LocationName"] + ', ' + center[1]["DhammaName"], 
                         dhammaname: center[1]["DhammaName"],
                         centername: center[1]["LocationName"]})
        const locationId = getLocation().locationId
        if (locationId === center[0]) 
            {centerListIndex = index
            }
        index++
        })
    const centerListItemFormat = ({ value, label, dhammaname, centername, index }) => (
      <div style={{ textAlign: "left" }}>
        <div>{centername}</div>
        <div style={{ color: "#aaa" }}>
          {dhammaname}
        </div>
      </div>
    )
    const centerListControlStyle = {
      control: base => ({
        ...base,
        height: 60
      })
    } 
    function handleCenterChange(e) {
        const key = e.value
        let locationFound = false
        props.centers.map((center) => {
            if(center[0] === key) {
                const location = {
                    locationId: key,
                    locationName: center[1]["LocationName"],
                    dhammaName: center[1]["DhammaName"],
                }
                saveLocation(location)
                props.setCenter(getLocation())
                locationFound = true
            }
        }) 
        if (!locationFound) {
            resetLocation()
            props.setCenter(getLocation())
        }
    }
    // The welcome block is shown only if a valid center is selected  
    const welcome = () => {
        if (props.center.locationId) {
            return(
                <div>
                <br/>{T.Availability}{' '}{T.Of}{' '}{getStudent().firstName}{' '}{getStudent().lastName}
                <br/>
                </div>
            )
        } else {
            return null
        }
    }
    const plsSelectCenter = () => {
        if (!props.center.locationId) {
            return(
                <div>
                    <label htmlFor="centerList" className="form-label">{T.Center}</label>
                </div>
            )
        } else {
            return null
        }
      }

    return (
        <Center>
        <form className={styles.center}>
          <br/>
          {plsSelectCenter()}
          <Select options={centerList}
                  onChange = {(e)=>handleCenterChange(e)} 
                  defaultValue = {centerList[centerListIndex]} 
                  formatOptionLabel = {centerListItemFormat}
                  maxMenuHeight = {400}
                  placeholder = {T.Center}
                  styles={centerListControlStyle}
          />
          {welcome()}
          <br/>
        </form>
      </Center>


    )
}

export default CentersList