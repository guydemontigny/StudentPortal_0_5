import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { getLocation, saveLocation, getStudent, getStudentPerCenter, resetLocation, getCenterOpportunities, getLocale } from '../libs/storage'
import Center from 'react-center'
import styles from '../styles/login.module.css'
import {Card, Button} from 'react-bootstrap'
import {useState} from 'react'

const Opportunities = ({props}) => {
    const T = props.T
    const [center, setCenter] = useState(getLocation())
    //
    // *** SETUP THE CENTERS DROP-DOWN
    //
    let optionItems = props.centers.map((center) => {
        return <option value={center[0] + ' - ' + center[1]["LocationName"] } key={center[0]}>{center[1]["DhammaName"]}</option>
        });
    function handleCenterChange(value) {
        const key = value.split(' ')
        let locationFound = false
        props.centers.map((center) => {
            if(center[0] === key[0]) {
                const location = {
                    locationId: key[0],
                    locationName: center[1]["LocationName"],
                    dhammaName: center[1]["DhammaName"]
                }
                saveLocation(location)
                setCenter(location)
                locationFound = true
            }
        }) 
        if (!locationFound) {
            resetLocation()
            setCenter(getLocation())
        }
    }

    // Create the list of opportunities for the selected centre
    let currentOpportunities = []
    Object.entries(getCenterOpportunities()).map((centerItem) => {
            if (centerItem[0] === center.locationId) {
                // We have the current center opportunities
                Object.entries(centerItem[1]).map((opportunity) => {
                    // Here we have a single opportunity for the current center
                    currentOpportunities.push(opportunity)
                })
            }
        }) 
    let OpportunitiesToApply = currentOpportunities.map((opportunity) => {
        let Title = ''
        let Description = ''
        if (opportunity[1][getLocale()]) {
            Title = opportunity[1][getLocale()].title
            Description =  opportunity[1][getLocale()].description
        } else {
            Title = opportunity[1].defaultLanguage.title
            Description =  opportunity[1].defaultLanguage.description
        }
        return (
            <Card.Body>
                <Card.Title>{Title}</Card.Title>
                <Card.Text>{Description}</Card.Text>
                <Button variant="primary">Apply</Button>
            </Card.Body>)
      })
        
    const contactStudent = getStudentPerCenter().contactOnNewServiceOpportunity

    const plsSelectCenter = () => {
        if (!center.locationId) {
            return(
                <div>
                    <label htmlFor="centerList" className="form-label">{T.Center}</label>
                </div>
            )
        } else {
            return null
        }
    }

    // The welcome block is shown only if a valid center is selected  
    const welcome = () => {
        if (center.locationId) {
            return(
                <div>
                <br/>{getStudent().firstName}{' '}{getStudent().lastName}{', '}
                <br/>{T.Welcome}
                <br/>{center.locationName}
                <br/>
                </div>
            )
        } else {
            return null
        }
    }

    // The opportunities section is shown only if a valid center is selected
    const opportunitiesList = () => {
        if (center.locationId) {
            return(
                <div>
                    <br/>
                    <Card>
                        <Card.Body>
                            <Card.Title>{T.ListOfOpportunities}</Card.Title>
                        {OpportunitiesToApply}
                        </Card.Body>
                    </Card>
                    <br/>
                    <div className="form-check">
                    <input className="form-check form-check-inline" type="checkbox" defaultChecked={contactStudent} id="contact--on-new-opportunity" />
                    <label className="form-check-label" htmlFor="contact--on-new-opportunity">
                        {T.ContactOnNewOpportunity}
                    </label>
                    </div>
                    <br/>
                </div>) 
            } else {
                return null
            }
        }

    return(
        <div>
            <Center>
            <form className={styles.center} onSubmit={(e) => {
                const centerSelected = document.getElementById('centerList').value
                handleCenterChange(centerSelected)}}>
            <br/>
            {plsSelectCenter()}
            <input className="form-control" 
                list="centerlistOptions" 
                onBlur={(e) => {handleCenterChange(e.target.value)}} 
                id="centerList" 
                defaultValue = {center.locationDisplayName}
                placeholder={T.TypeToSearch} 
                type="text" 
                size="50" />
            <datalist id="centerlistOptions">
                {optionItems}
            </datalist>
            {welcome()}
            </form>
            </Center>
            {opportunitiesList()}
        </div>
    )
}

export default Opportunities