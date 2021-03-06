import { useRouter } from 'next/dist/client/router'

const LanguageDropDown = ({props}) => {
    //
    // *** SETUP THE LANGUAGES DROP-DOWN
    //
    const router = useRouter()
    const uiLangs = Object.entries(props.UILangs);
    let optionItems = uiLangs.map((uiLang) => {
        return <option value={uiLang['0']} key={uiLang['0']}>{uiLang['1']}</option>
        });
    const handleLanguage = () => {
        const spinner = document.getElementById("skills-spinner")
        if (spinner) {spinner.hidden = false}
        const locale = document.getElementById("select-lang-id").value;
        router.push(`/${props.DB}/${locale}`)
        }
    if (typeof window !== 'undefined') {
        const spinner = document.getElementById("skills-spinner")
        if (spinner) {spinner.hidden = true}}

    return (
        <select onChange={handleLanguage} 
            defaultValue = {props.locale} 
            className="nav-link"
            id="select-lang-id">
                {optionItems}
        </select>)
}

export default LanguageDropDown

