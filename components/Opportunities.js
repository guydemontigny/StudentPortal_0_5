import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { getLocation, saveLocation, getStudent, getStudentAvailability, saveStudentAvailabilityField, resetLocation, saveCenterOpportunities, getCenterOpportunities, getLocale } from '../libs/sessionStorage'
import Center from 'react-center'
import styles from '../styles/login.module.css'
import {Card, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {Now} from '../libs/system'

const Opportunities = ({props}) => {
    const T = props.T
    const [center, setCenter] = useState(getLocation())
    const [centerOpportunities, setCenterOpportunities] = useState(getCenterOpportunities())
    const [OpportunitiesToApply, setOpportunitiesToApply] = useState()
    const [applyPressed, setApplyPressed] = useState(false)
    const [contactOnNewServiceOpportunity, setContactOnNewServiceOpportunity] = useState()
    const [opportunityComment, setOpportunityComment] = useState('')
    useEffect( () => {
        const studentAvailability = getStudentAvailability()
        setContactOnNewServiceOpportunity(studentAvailability.ContactOnNewServiceOpportunity)
        setOpportunityComment(studentAvailability.OpportunityComment)
    }) 
    useEffect( () => {
        if (getLocation().locationId && centerOpportunities[getLocation().locationId]) {
            setOpportunitiesToApply(Object.entries(centerOpportunities[getLocation().locationId]).map((opportunity) => {
                let Title = ''
                let Description = ''
                if (opportunity[1][getLocale()]) {
                    Title = opportunity[1][getLocale()].title
                    Description =  opportunity[1][getLocale()].description
                } else {
                    Title = opportunity[1]['--'].title
                    Description =  opportunity[1]['--'].description
                }
                return (
                    <Card.Body key={opportunity[0]}>
                        <Card.Title>{Title}</Card.Title>
                        <Card.Text>{Description}</Card.Text>
                        <Button variant="primary" 
                            onClick = {()=>applyOpportunity(opportunity[0], opportunity[1].apply ? 0 : 1)}>
                                {centerOpportunities[getLocation().locationId][opportunity[0]].apply ? T.UnApply : T.Apply}
                        </Button>
                    </Card.Body>)
            }))
        } else {
            setOpportunitiesToApply(null)
        }}
        , [center, applyPressed]
    )
    
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
                let comment =  getStudentAvailability().OpportunityComment
                if (!comment) {comment = ''}
                if (document.getElementById("opportunity-comment-id")) {
                    document.getElementById("opportunity-comment-id").value = comment
                }
                locationFound = true
            }
        }) 
        if (!locationFound) {
            resetLocation()
            setCenter(getLocation())
        }
        event.preventDefault()
    }
    function applyOpportunity(opportunityId, value) {
        const newCenterOpportunities = centerOpportunities
        newCenterOpportunities[getLocation().locationId][opportunityId].apply = value
        if (value) {
            newCenterOpportunities[getLocation().locationId][opportunityId].ApplicationDate = Now()
        }  else {
            newCenterOpportunities[getLocation().locationId][opportunityId].ApplicationDate = null
        }
        saveCenterOpportunities(newCenterOpportunities)
        setCenterOpportunities(newCenterOpportunities)
        setApplyPressed(!applyPressed)
      }
      
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
                    <Form.Group  className={styles.body} controlId="contact-on-new-opportunity">
                        <Form.Check type="checkbox" label={T.ContactOnNewOpportunity}
                            checked = {contactOnNewServiceOpportunity == 1}
                            onChange = {(e)=>{saveStudentAvailabilityField("ContactOnNewServiceOpportunity", e.target.checked? 1 : 0);
                                              setContactOnNewServiceOpportunity(e.target.checked)}} />
                    </Form.Group>
                    <br/>
                    <Form.Group className={styles.body}>
                        <Form.Label >{T.Comment}</Form.Label>
                        <Form.Control as="textarea" rows={5}
                            id = "opportunity-comment-id"
                            onChange = {(e)=>{setOpportunityComment(e.target.value); saveStudentAvailabilityField("OpportunityComment", e.target.value)}}
                            value = {opportunityComment}/>
                    </Form.Group>

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