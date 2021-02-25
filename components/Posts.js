import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { getSPContacts } from '../libs/spcontact'

const Posts = ({props}) => {
    const T = props.T
    const byEmail = getSPContacts().contactOnNewPostByMail
    const bySMS = getSPContacts().contactOnNewPostBySMS
    return(
        <div>
            <br/>
            {T.ContactMeOnNewPost}
            <div className="form-check">
            <input className="form-check form-check-inline" type="checkbox" defaultChecked={byEmail} id="contact-by-email" />
                <label className="form-check-label" htmlFor="contact-by-email">
                    {T.ContactByEmail}
                </label>
                &emsp;&emsp;
            <input className="form-check form-check-inline" type="checkbox" defaultChecked={bySMS} id="contact-by-sms" />
                <label className="form-check-label" htmlFor="contact-by-sms">
                    {T.ContactBySMS}
                </label>
            </div>
            <br/>

        </div>
    )
}

export default Posts

export async function getServerSideProps(props) {
    return(getStaticInfo(props.query.uiLang, props.resolvedUrl))
  } 