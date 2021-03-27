import { useRouter } from 'next/dist/client/router'
import { NavDropdown } from 'react-bootstrap'

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
        let doc = document.getElementById("spinner-id")
        if (!doc) {doc = document.getElementById("spinner-login-id")}
        doc.hidden = false
        const locale = uiLang[0]
        router.push(`/${props.DB}/${locale}`)
        doc.hidden = false
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
