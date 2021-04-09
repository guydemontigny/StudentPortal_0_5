import { getLocation, saveLocation, getStudent, resetLocation, saveStudentAvailabilityField, getStudentAvailability } from '../libs/sessionStorage'
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
    const [notAvailable, setNotAvailable] = useState(false)
    const [availableFromHome, setAvailableFromHome] = useState(false)
    const [availableBetweenCourses, setAvailableBetweenCourses] = useState(false)
    const [availableForChildCourses, setAvailableForChildCourses] = useState(false)
    const [availableForCourses, setAvailableForCourses] = useState(false)
    const [availableLongTerm, setAvailableLongTerm] = useState(false)
    const [availableWorkPeriod, setAvailableWorkPeriod] = useState(false)
    const [availabilityComment, setAvailabilityComment] = useState('')

    useEffect( () => {
      const studentAvailability = getStudentAvailability()
      setAvailableBetweenCourses(studentAvailability.AvailableBetweenCourses)
      setAvailableForChildCourses(studentAvailability.AvailableForChildCourses)
      setAvailableForCourses(studentAvailability.AvailableForCourses)
      setAvailableLongTerm(studentAvailability.AvailableLongTerm)
      setAvailableWorkPeriod(studentAvailability.AvailableWorkPeriod)
      setAvailabilityComment(studentAvailability.AvailabilityComment)
      setNotAvailable(studentAvailability.NotAvailable)
      setAvailableFromHome(studentAvailability.AvailableFromHome)
      setStartDate(studentAvailability.AvailableLongTermFrom)
      setEndDate(studentAvailability.AvailableLongTermTo)
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
//        event.preventDefault()
    }
    function longTermChange(e) {
      setDateDisabled(!e.target.checked)
      setStartDate(null)
      setEndDate(null)
      saveStudentAvailabilityField("AvailableLongTerm", e.target.checked? 1 : 0)
      setAvailableLongTerm(!e.target.checked)
      saveStudentAvailabilityField("AvailableLongTermFrom",null)
      saveStudentAvailabilityField("AvailableLongTermTo",null)
    }
    function notAvailableChange(e) {
      setNotAvailable(!e.target.checked)
      saveStudentAvailabilityField("NotAvailable", e.target.checked? 1 : 0)    }
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
                checked = {notAvailable == 1}
                onChange = {(e)=>notAvailableChange(e)} />
            </Form.Group>
            <br/>
              <Form.Group  className={styles.body} controlId="work-home">
                <Form.Check type="checkbox" label={T.WorkFromHome} 
                  checked = {availableFromHome == 1}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("AvailableFromHome", e.target.checked? 1 : 0)
                                    setAvailableFromHome(!e.target.checked)}}/>
                <br/>
              </Form.Group>
              <Form.Group  className={styles.body} controlId="work-on-site">
                <Form.Label size="lg">{T.WorkOnSite}</Form.Label>
              </Form.Group>
              <Form.Group  className={styles.body} controlId="work-courses">
                <Form.Check className={styles.indented} type="checkbox" label={T.Courses}
                  checked = {availableForCourses == 1} 
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("AvailableForCourses", e.target.checked? 1 : 0)
                                    setAvailableForCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-child-courses">
                <Form.Check className={styles.indented} type="checkbox" label={T.ChildCourses}
                  checked = {availableForChildCourses == 1}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("AvailableForChildCourses", e.target.checked? 1 : 0)
                                    setAvailableForChildCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-betwwen">
                <Form.Check className={styles.indented} type="checkbox" label={T.BetweenCourses}
                  checked = {availableBetweenCourses == 1}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("AvailableBetweenCourses", e.target.checked? 1 : 0)
                                    setAvailableBetweenCourses(!e.target.checked)}} />
                </Form.Group>
              <Form.Group  className={styles.body} controlId="work-period">
                <Form.Check className={styles.indented} type="checkbox" label={T.WorkingPeriod}
                  checked = {availableWorkPeriod == 1}
                  disabled = {notAvailable}
                  onChange = {(e)=>{saveStudentAvailabilityField("AvailableWorkPeriod", e.target.checked? 1 : 0)
                                    setAvailableWorkPeriod(!e.target.checked)}} />
                </Form.Group>
              <Form inline>
                <Form.Group  className={styles.body} controlId="work-long-term">
                  <Form.Check className={styles.indented} type="checkbox" label={T.LongTerm}
                    checked = {availableLongTerm == 1}
                    onChange = {(e)=>longTermChange(e)} 
                    disabled = {notAvailable} />
                </Form.Group>
                <Form.Group  className={styles.body} controlId="work-long-term">
                  <DatePicker
                    dateFormat = 'yyyy-MM-dd'
                    selected={startDate ? new Date(startDate) : null}
                    disabled = {dateDisabled}
                    onChange={date => {setStartDate(date); saveStudentAvailabilityField("AvailableLongTermFrom", date)}}
                    isClearable
                    placeholderText = {T.EnterStartDate}
                    minDate = {new Date()}
                  />
                  &ensp;{T.To}&ensp;
                  <DatePicker
                    dateFormat = 'yyyy-MM-dd'
                    selected={endDate? new Date(endDate): null}
                    disabled = {dateDisabled}
                    onChange={date => {setEndDate(date); saveStudentAvailabilityField("AvailableLongTermTo", date)}}
                    isClearable
                    placeholderText = {T.EnterEndDate}
                    minDate = {startDate}
                  />
                </Form.Group>
              </Form> 
              <br/>
              <Form.Group className={styles.body} id="availabilityComment">
                  <Form.Label >{T.Comment}</Form.Label>
                  <Form.Control as="textarea" rows={5}
                      id = "availability-comment-id"
                      onChange = {(e)=>{setAvailabilityComment(e.target.value); saveStudentAvailabilityField("AvailabilityComment", e.target.value)}}
                      value = {availabilityComment}/>
              </Form.Group>
            </>}
        </div>
    )
}

export default Availability