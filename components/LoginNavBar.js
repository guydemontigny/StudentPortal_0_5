import {Navbar, Nav} from 'react-bootstrap'
import LanguageNavDropDown from '../components/LanguageNavDropDown'
import {logout} from '../libs/DRCodeManagement'
import PortalSpinner from '../components/PortalSpinner'

const LoginNavBar = ({props})=> {
    const T = props.T
    return (
       <div>
        <PortalSpinner />
        <Navbar bg="dark" variant="dark" sticky="top" defaultExpanded={true} collapseOnSelect={true} expand={true} >
        <Navbar.Brand href="">   
            <img src="/img/Wheel2-blue-gold.gif"
                width="60" height="60"
                className="d-inline-block align-top"
                alt="Vipassana"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
                <Nav.Link href="" onClick={() => logout()}>{T.Quit}</Nav.Link>
                <LanguageNavDropDown props = {props} />
            </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    )
}

export default LoginNavBar