import React, { useState, useEffect } from 'react'
import { getCenterOpportunities, getCredentials, getCurrentTab, getSkills } from '../libs/sessionStorage'
import {apiUrl} from '../appConfigs/config'
import {getDB} from '../libs/sessionStorage'
import { logout } from '../libs/DRCodeManagement'

const SaveAllToDR = ({props}) => {
    const [errorMessageSaveStudentLocationService, setErrorMessageSaveStudentLocationService] = useState(null);
    const [errorMessageSaveStudentServiceOpportunities, setErrorMessageSaveStudentServiceOpportunities] = useState(null);
    const [errorMessageSaveStudentSkills, setErrorMessageSaveStudentSkills] = useState(null);
    const T = props.T
    //
    // *** SAVE STUDENT LOCATION SERVICE ***
    // 
    useEffect(() => {
        const credentials = getCredentials()
        fetch(apiUrl(getDB()) + 'SaveStudentLocationService' + 
                '?code=' + credentials.code +
                '&studentId=' + credentials.studentId +
                '&studentAvailability=' + sessionStorage.getItem('studentAvailability'))
            .then(async response => {
                const data = await response.json()
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.status) || response.status;
                    return Promise.reject(error);
                }
                setErrorMessageSaveStudentLocationService('SaveStudentLocationService: ' + data.status);
            })
            .catch(error => {
                if (error) {
                    setErrorMessageSaveStudentLocationService('SaveStudentLocationService: ' + error)
                } else {
                    setErrorMessageSaveStudentLocationService('SaveStudentLocationService: ' + data.status)
                }
             }
             );
    }, []);
    //
    // *** SAVE STUDENT SERVICE OPPORTUNITIES ***
    // 
    useEffect(() => {
        const credentials = getCredentials()
        const studentServiceOpportunities = {}
        const centersOpportunities = Object.entries(getCenterOpportunities())
        centersOpportunities.map((centerOpportunities) => {
            const studentOpportunities = Object.entries(centerOpportunities[1])
            studentOpportunities.map((studentOpportunity) => {
                studentServiceOpportunities[studentOpportunity[0]] = {}
                studentServiceOpportunities[studentOpportunity[0]].OpportunityId = studentOpportunity[0]
                studentServiceOpportunities[studentOpportunity[0]].StudentId = getCredentials().studentId
                studentServiceOpportunities[studentOpportunity[0]].ApplicationDate = studentOpportunity[1].ApplicationDate
                studentServiceOpportunities[studentOpportunity[0]].rowid = studentOpportunity[1].rowid
            })
        })
        fetch(apiUrl(getDB()) + 'SaveStudentOpportunities' + 
                '?code=' + credentials.code +
                '&studentId=' + credentials.studentId +
                '&studentServiceOpportunities=' + JSON.stringify(studentServiceOpportunities))
            .then(async response => {
                const data = await response.json()
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.status) || response.status;
                    return Promise.reject(error);
                }
                setErrorMessageSaveStudentServiceOpportunities('SaveStudentServiceOpportunities: ' + data.status);
            })
            .catch(error => {
                if (error) {
                    setErrorMessageSaveStudentServiceOpportunities('SaveStudentServiceOpportunities: ' + error)
                } else {
                    setErrorMessageSaveStudentServiceOpportunities('SaveStudentServiceOpportunities: ' + data.status)
                }
             }
             );
    }, []);

    //
    // *** SAVE STUDENT SKILLS ***
    // 
    useEffect(() => {
        const credentials = getCredentials()
        const studentSkills = {}
        const skillCategories = Object.entries(getSkills())
        skillCategories.map((skillCategory) => {
            const skills = Object.entries(skillCategory[1])
            skills.map((skill) => {
                studentSkills[skill[0]] = {}
                studentSkills[skill[0]].SkillId = skill[0]
                studentSkills[skill[0]].StudentId = getCredentials().studentId
                studentSkills[skill[0]].SkillLevel = skill[1].SkillLevel
                studentSkills[skill[0]].rowid =  skill[1].rowid
            })
        })
        fetch(apiUrl(getDB()) + 'SaveStudentSkills' + 
                '?code=' + credentials.code +
                '&studentId=' + credentials.studentId +
                '&studentSkills=' + JSON.stringify(studentSkills))
            .then(async response => {
                const data = await response.json()
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.status) || response.status;
                    return Promise.reject(error);
                }
                setErrorMessageSaveStudentSkills('SaveStudentSkills: ' + data.status);
            })
            .catch(error => {
                if (error) {
                    setErrorMessageSaveStudentSkills('SaveStudentSkills: ' + error)
                } else {
                    setErrorMessageSaveStudentSkills('SaveStudentSkills: ' + data.status)
                }
             }
             );
    }, []);

    let message = ''
    let messageError1 = ''
    let messageError2 = ''
    let messageError3 = ''
    if (!errorMessageSaveStudentLocationService 
        || !errorMessageSaveStudentServiceOpportunities
        || !errorMessageSaveStudentSkills) {
        message = T.Saving
    } else if(errorMessageSaveStudentLocationService.endsWith('Success') &&
            errorMessageSaveStudentServiceOpportunities.endsWith('Success') &&
            errorMessageSaveStudentSkills.endsWith('Success')) {
        message = T.Success
        if (getCurrentTab() === "saveAndExit"){logout()}
    }else {
        message = T.Error
        messageError1 = '\n' + errorMessageSaveStudentLocationService
        messageError2 = '\n' + errorMessageSaveStudentServiceOpportunities
        messageError3 = '\n' + errorMessageSaveStudentSkills
    }
    return (
        <div className="card text-center m-3">
            <div className="card-body">
            <p>{message}</p>
            <p>{messageError1}</p>
            <p>{messageError2}</p>
            <p>{messageError3}</p>
            </div>
        </div>
    );
}

export default SaveAllToDR