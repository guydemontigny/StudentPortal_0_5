import { getLocation, saveLocation, getStudent, resetLocation, saveStudentAvailabilityField, getStudentAvailability } from '../libs/storage'
import Center from 'react-center'
import {Form} from 'react-bootstrap'
import styles from '../styles/login.module.css'
import {useState, useEffect} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Availability = ({props}) => {
    const T = props.T
    const [center, setCenter] = useState(getLocation())
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dateDisabled, setDateDisabled] = useState(true)
    const [notAvailable, setNotAvailable] = useState(true)
    const [availableFromHome, setAvailableFromHome] = useState(true)
    const [availableBetweenCourses, setAvailableBetweenCourses] = useState(true)
    const [availableForChildCourses, setAvailableForChildCourses] = useState(true)
    const [availableForCourses, setAvailableForCourses] = useState(true)
    const [availableLongTerm, setAvailableLongTerm] = useState(true)
    const [availableWorkPeriod, setAvailableWorkPeriod] = useState(true)

    useEffect( () => {
      setNotAvailable(getStudentAvailability().notAvailable)
      setAvailableFromHome(getStudentAvailability().availableFromHome)
      setAvailableBetweenCourses(getStudentAvailability().availableBetweenCourses)
      setAvailableForChildCourses(getStudentAvailability().availableForChildCourses)
      setAvailableForCourses(getStudentAvailability().availableForCourses)
      setAvailableLongTerm(getStudentAvailability().availableLongTerm)
      setAvailableWorkPeriod(getStudentAvailability().availableWorkPeriod)
    }) 
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
    function longTermChange(e) {
      setDateDisabled(!e.target.checked)
      setStartDate(null)
      setEndDate(null)
      saveStudentAvailabilityField("availableLongTerm", e.target.checked? 1 : 0)
      setAvailableLongTerm(!e.target.checked)
      saveStudentAvailabilityField("availableLTFrom",null)
      saveStudentAvailabilityField("availableLTTo",null)
    }
    function notAvailableChange(e) {
      setNotAvailable(!e.target.checked)
      saveStudentAvailabilityField("notAvailable", e.target.checked? 1 : 0)    }
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
                <br/>{T.Availability}{' '}{T.Of}{' '}{getStudent().firstName}{' '}{getStudent().lastName}
                <br/>
                </div>
            )
        } else {
            return null
        }
    }

    // The availability section is shown only if a valid center is selected

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
            <br/>
            </form>
          </Center>

          {center.locationId && 
            <>
            <Form.Group  className={styles.body} controlId="not-available" >
              <Form.Check type="checkbox" label={T.NotAvailable} 
                checked = {notAvailable}
                onChange = {(e)=>notAvailableChange(e)} />
            </Form.Group>
            <br/>
              <Form.Group  className={styles.body} controlId="work-home">
                <Form.Check type="checkbox" label={T.WorkFromHome} 
                  checked = {availableFromHome}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("availableFromHome", e.target.checked? 1 : 0)
                                    setAvailableFromHome(!e.target.checked)}}/>
                <br/>
              </Form.Group>
              <Form.Group  className={styles.body} controlId="work-on-site">
              </Form.Group>
              <Form.Group  className={styles.body} controlId="work-courses">
                <Form.Label size="lg">{T.WorkOnSite}</Form.Label>
                <Form.Check className={styles.indented} type="checkbox" label={T.Courses}
                  checked = {availableForCourses} 
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("availableForCourses", e.target.checked? 1 : 0)
                                    setAvailableForCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-child-courses">
                <Form.Check className={styles.indented} type="checkbox" label={T.ChildCourses}
                  checked = {availableForChildCourses}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("availableForChildCourses", e.target.checked? 1 : 0)
                                    setAvailableForChildCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-betwwen">
                <Form.Check className={styles.indented} type="checkbox" label={T.BetweenCourses}
                  checked = {availableBetweenCourses}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("availableBetweenCourses", e.target.checked? 1 : 0)
                                    setAvailableBetweenCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-period">
                <Form.Check className={styles.indented} type="checkbox" label={T.WorkingPeriod}
                  checked = {availableWorkPeriod}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("availableWorkPeriod", e.target.checked? 1 : 0)
                                    setAvailableWorkPeriod(!e.target.checked)}} />
                </Form.Group>
              <Form inline>
                <Form.Group  className={styles.body} controlId="work-long-term">
                  <Form.Check className={styles.indented} type="checkbox" label={T.LongTerm}
                    checked = {availableLongTerm}
                    onChange = {(e)=>longTermChange(e)} 
                    disabled = {notAvailable} />
                </Form.Group>
                <Form inline>
                <DatePicker
                  dateFormat = 'yyyy-MM-dd'
                  selected={startDate}
                  disabled = {dateDisabled}
                  onChange={date => {setStartDate(date); saveStudentAvailabilityField("availableLTFrom", date)}}
                  isClearable
                  placeholderText = {T.EnterStartDate}
                  minDate = {new Date()}
                />
                &ensp;{T.To}&ensp;
                <DatePicker
                  dateFormat = 'yyyy-MM-dd'
                  selected={endDate}
                  disabled = {dateDisabled}
                  onChange={date => {setEndDate(date); saveStudentAvailabilityField("availableLTTo", date)}}
                  isClearable
                  placeholderText = {T.EnterEndDate}
                  minDate = {startDate}
                />
                </Form>
              </Form> 
              <br/>
              <Form.Group className={styles.body} controlId="availabilityComment">
                  <Form.Label >{T.Comment}</Form.Label>
                  <Form.Control as="textarea" rows={5}
                      id = "availability-comment-id"
                      onChange = {(e)=>saveStudentAvailabilityField("availabilityComment", e.target.value)}/>
              </Form.Group>
            </>}
        </div>
    )
}

export default Availability