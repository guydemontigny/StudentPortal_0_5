import { useRouter } from 'next/dist/client/router'
import { NavDropdown } from 'react-bootstrap'
import { showPortalSpinner } from '../libs/system';

const LanguageNavDropDown = ({props}) => {
    //
    // *** SETUP THE LANGUAGES DROP-DOWN
    //
    const router = useRouter()
    const uiLangs = Object.entries(props.UILangs);
    let optionItems = uiLangs.map((uiLang) => {
        return <NavDropdown.Item onClick = { () => {handleLanguage({uiLang})}} href="" value={uiLang['0']} key={uiLang['0']}>{uiLang['1']}</NavDropdown.Item>
        });
    const handleLanguage = ({uiLang}) => {
        showPortalSpinner(true)
        const locale = uiLang[0]
        router.push(`/${props.DB}/${locale}`)
        }
    return (
        <NavDropdown 
            title={props.UILangs[props.locale]} 
            defaultValue = {props.locale} 
            id="select-lang-id">
                {optionItems}
        </NavDropdown>)
}

export default LanguageNavDropDown
