import {Spinner} from 'react-bootstrap'
import styles from '../styles/login.module.css'
import Center from 'react-center';

const PortalSpinner = () => {
    return (
      <Center>
        <Spinner 
            className = {styles.spinner}
            name = "portal-spinner"
            animation="border" 
            variant="secondary" 
            role="status" 
            hidden={true}>
                <span className="sr-only">Loading...</span>
        </Spinner> 
      </Center>
    )
}

export default PortalSpinner

