import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { getLocation, getStudent, getStudentPerCenter, resetLocation, getCenterOpportunities, getLocale } from '../libs/storage'
import Center from 'react-center'
import styles from '../styles/login.module.css'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import OpportunitiesCenter from '../components/OpportunitiesCenter'

const Opportunities = ({props}) => {
    const T = props.T

    // If no location selected -->  Display location selection drop-down only
    if(getLocation().locationId === ''){ return (
        <OpportunitiesCenter props = {props} />
    )}

    // Create the list of opportunities for the selected centre
    let currentOpportunities = []
    Object.entries(getCenterOpportunities()).map((center) => {
            if (center[0] === getLocation().locationId) {
                // We have the current center opportunities
                Object.entries(center[1]).map((opportunity) => {
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
    const student = getStudent()  
    return(
        <div>
            <OpportunitiesCenter props = {props} />
            <Center>
            <form className={styles.center} >
            <br/>{student.firstName}{' '}{student.lastName}{', '}
                <br/>{T.Welcome}
                <br/>{getLocation().locationName}
                <br/><br/>
            </form>
            </Center>
            
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
        </div>
    )
}

export default Opportunities