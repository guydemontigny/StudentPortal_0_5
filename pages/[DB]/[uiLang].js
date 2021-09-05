import {getStaticInfo} from '../../libs/getStaticInfo'
import Opportunities from '../../components/Opportunities'
import Availability from '../../components/Availability'
import Skills from '../../components/Skills'
import {getCredentials, saveCredentials, saveDB, saveLocale, saveStudent, saveSkills, getCurrentTab, saveCurrentTab, 
    saveCenterOpportunities, saveLocation, saveWasModified, saveStudentAvailability, getWasModifiedColor} from '../../libs/sessionStorage'
import Login from '../../components/Login'
import {apiUrl} from '../../appConfigs/config'
import useSWR from "swr";
import LanguageNavDropDown from '../../components/LanguageNavDropDown'
import SaveAllToDR from '../../components/SaveAllToDR'
import { logout } from '../../libs/DRCodeManagement'
import React, { useState, useEffect } from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { showPortalSpinner } from '../../libs/system'
import PortalSpinner from '../../components/PortalSpinner'


export default function App(props) {
    const [currentTab, setCurrentTab] = useState(getCurrentTab())
    const [expanded, setExpanded] = useState(false)
    const [fileMenuColor, setFileMenuColor] = useState(getWasModifiedColor())

    useEffect(() => {
        showPortalSpinner(false)
        setFileMenuColor(getWasModifiedColor())
    })
    
    saveDB(props.DB)
    saveLocale(props.locale)
    //
    // CHECK CREDENTIALS
    //
    const credentials = getCredentials()
    if (credentials.email || credentials.cellPhone){
        const useStaleSWR = (dataKey) => {
            const revalidationOptions = {
              revalidateOnMount: true , //!cache.has(dataKey), //here we refer to the SWR cache
              revalidateOnFocus: false,
              revalidateOnReconnect: true,
            };
          
            return useSWR(
                dataKey, 
                (url) => fetch(url).then(res => res.json()))
          }

        const dhammaRegAPILogin = apiUrl()  + 'StudentLogin'
        const { data, error } = useStaleSWR(dhammaRegAPILogin + '?credentials=' + JSON.stringify(credentials))

        if (error) return (<div>An error has occurred: {error}</div>)
        if (!data) {
            return null
        } else {
            saveCredentials(data.credentials) // Save returned credentials
            if (credentials.error) {
                // Note that credentials contains the previous data before the read
                // If, before the read, the credentials were fine (credentials.error === ''), this
                //     is a refresh. In that case, do not update data with what comes from the server.
                saveWasModified(false)
                if (data.student) {saveStudent(data.student)}
                if (data.studentAvailability) {saveStudentAvailability(data.studentAvailability)}
                if (data.centerOpportunities) {saveCenterOpportunities(data.centerOpportunities)}
                if (data.location) {saveLocation(data.location)}
                if (data.skills) {saveSkills(data.skills)}
            }   
        }
    }

    if (getCredentials().error){
        return <Login props = {props} />
    }
    const T = props.T
    return(
      <div>
        <div className="row">
            <div className="col-md-12">
                <Navbar bg="dark" variant="dark" sticky="top" expanded = {expanded} expand='sm' >
                    <Navbar.Brand href="">   
                        <img src="/img/Wheel2-blue-gold.gif"
                            width="60" height="60"
                            className="d-inline-block align-top"
                            alt="Vipassana"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => {setExpanded(!expanded)}}>
                        <span className="navbar-toggle-label">{T.Menu}{' '}</span>
                        <span className="navbar-toggle-icon" />
                        <img src="/img/Hamburger_icon.png"
                            width="30" height="30"
                            className="d-inline-block align-top"
                            alt=""/>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"  >
                        <NavDropdown title={<span className={fileMenuColor}>{T.File}</span>}>
                            <NavDropdown.Item  href="" key='save'
                                onClick = { () => {
                                    setExpanded(false)
                                    setCurrentTab("save")
                                }}>
                                {T.Save}
                                </NavDropdown.Item>
                            <NavDropdown.Item  href="" key='save-exit'
                                onClick = { () => {
                                    setExpanded(false)
                                    setCurrentTab("saveAndExit")
                                    }}>
                                {T.SaveAndExit}
                                </NavDropdown.Item>
                            <NavDropdown.Item href="" key='exit'
                                onClick = { () => {
                                    logout()
                                    }}>
                                {T.Logout}
                                </NavDropdown.Item>
                        </NavDropdown>)
                        <Nav.Link href="" active={getCurrentTab() === 'skills'}
                            onClick={() => {
                                setExpanded(false)
                                setCurrentTab("skills")
                                saveCurrentTab("skills")
                                }}>
                            {T.Skills}
                            </Nav.Link>
                        <Nav.Link href="" active={getCurrentTab() === 'opportunities'} 
                            onClick={() => {
                                setExpanded(false)
                                setCurrentTab("opportunities")
                                saveCurrentTab("opportunities")
                                }}>
                            {T.Opportunities
                            }</Nav.Link>
                        <Nav.Link href="" active={getCurrentTab() === 'availability'} 
                            onClick={() => {
                                setExpanded(false)
                                setCurrentTab("availability")
                                saveCurrentTab("availability")
                                }}>
                            {T.Availability}
                            </Nav.Link>
                        <LanguageNavDropDown props = {props}/>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {(getCurrentTab() === 'skills') && <Skills props = {{...props, setFileMenuColor}} />}
                {(getCurrentTab() === 'opportunities') && <Opportunities props = {{...props, setFileMenuColor}}/>}
                {(getCurrentTab() === 'availability') && <Availability props = {{...props, setFileMenuColor}}/>}
                {(currentTab === 'save' || currentTab === 'saveAndExit') && <SaveAllToDR props = {{...props, setFileMenuColor, currentTab, setCurrentTab}}/>}
            </div>
        </div>
        <PortalSpinner /> 
      </div>
    )}

export async function getServerSideProps(props) {
    return(getStaticInfo(props.query.DB, props.query.uiLang, props.resolvedUrl))
  } 