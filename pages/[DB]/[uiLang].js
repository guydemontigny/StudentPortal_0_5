import {getStaticInfo} from '../../libs/getStaticInfo'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import PagesContainer from '../../components/PagesContainer'
import Posts from '../../components/Posts'
import Availability from '../../components/Availability'
import Skills from '../../components/Skills'
import {getCredentials, saveCredentials, saveDB, saveLocale} from '../../libs/storage'
import Login from '../../components/Login'
import {apiUrl} from '../../appConfigs/config'
import useSWR from "swr";
import LanguageDropDown from '../../components/LanguageDropDown'
import { logout } from '../../libs/APIs'

export default function App(props) {
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
                (url) => fetch(url).then(res => res.json()), 
                revalidationOptions)
          }
        const { data, error } = useStaleSWR(apiUrl() + 'FindStudentByEmail?credentials=' + JSON.stringify(credentials))

        if (error) return (<div>An error has occurred: {error}</div>)
        if (!data) return (<div>Loading...</div>)

        saveCredentials(data) // Save returned credentials
        }

    const credentialsReturned = getCredentials()

    if (getCredentials().error){
        return <Login props = {props} />
    }
    const T = props.T
    //
    // *** MANAGE TABS ***
    //
    function TabClick(Tab) {
        if (Tab !== "languages") {
            const tabContents = document.getElementsByClassName("tab-pane");
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove("show")
                tabContents[i].classList.remove("active")
            }
            const tabButtons = document.getElementsByClassName("nav-link");
            for (let i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove("active")
            }
            document.getElementById("button-" + Tab).classList.add("active")
            const contentDoc = document.getElementById("content-" + Tab)
            if (contentDoc){
                contentDoc.classList.add("active")
                contentDoc.classList.add("show")
            }
        }
    }
  //
  // *** RETURN THE MAIN PAGE
  //
  return(
    <div>
        <PagesContainer T={props.T}/>
        <ul className="nav nav-tabs nav-fill" >
            <li className="nav-item dropdown" >
                <LanguageDropDown props = {props} />
            </li>
            <li className="nav-item"  onClick={() => TabClick("posts")}>
                <a href="#"  className="nav-link " data-toggle="tab" id="button-posts">{T.Posts}</a>
            </li>
            <li className="nav-item" onClick={() => TabClick("availability")}>
                <a href="#" className="nav-link " data-toggle="tab" id="button-availability">{T.Availability}</a>
            </li>
            <li className="nav-item" onClick={() => TabClick("skills")}>
                <a href="#" className="nav-link" data-toggle="tab" id="button-skills">{T.Skills}</a>
            </li>
            <li className="nav-item" onClick={ () => {logout()}}>
                <a href="#" className="nav-link" data-toggle="tab" id="button-skills">{T.Logout}</a>
            </li>

        </ul>
        <div className="tab-content">
            <div className="tab-pane fade" id="content-posts">
                <Posts props = {props} />
            </div>
            <div className="tab-pane fade" id="content-availability">
                <Availability props = {props} />
            </div>
            <div className="tab-pane fade" id="content-skills">
                <Skills props = {props} />
            </div>
        </div>
    </div>
    )
}

export async function getServerSideProps(props) {
    return(getStaticInfo(props.query.DB, props.query.uiLang, props.resolvedUrl))
  } 