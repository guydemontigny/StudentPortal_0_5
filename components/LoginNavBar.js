import {Navbar, Nav, Spinner} from 'react-bootstrap'
import LanguageNavDropDown from '../components/LanguageNavDropDown'
import {logout} from '../libs/APIs'

const LoginNavBar = ({props})=> {
    const T = props.T
    return (
        <Navbar bg="dark" variant="dark" sticky="top" defaultExpanded={true} collapseOnSelect={true} expand={true} >
        <Navbar.Brand href="">   
            <Spinner animation="border" 
                variant="secondary" 
                role="status" 
                id="spinner-login-id" 
                hidden={true}>
                    <span className="sr-only">Loading...</span>
            </Spinner> 
            <img src="/img/Wheel2-blue-gold.gif"
                width="60" height="60"
                className="d-inline-block align-top"
                alt="Vipassana"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
                <LanguageNavDropDown props = {props} />
                <Nav.Link href="" onClick={() => logout()}>{T.Logout}</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default LoginNavBar