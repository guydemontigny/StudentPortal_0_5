import {Accordion, Card, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {getSkills, getStudent, setSkillValue, saveWasModified, getWasModifiedColor} from '../libs/sessionStorage'
import PortalSpinner from './PortalSpinner'

const Skills = ({props}) => {
    const T = props.T
    // Create the list of skills
    let skillCategories = Object.entries(getSkills()).map((skillCategory) => {
      // We have the category
      let skillItems = Object.entries(skillCategory[1]).map((skillItem) => {
        return (
          <Card className="ml-1" key={skillItem[0]}>
            <Card.Title className="ml-2">{T[skillItem[0]]}</Card.Title>
            <Card.Text className="ml-2 mb-3">{T.OfferService} &ensp;
              <ToggleButtonGroup 
                  type="radio" 
                  size="sm" 
                  name={skillItem[0]} 
                  defaultValue={skillItem[1].SkillLevel} 
                  onChange={(value) => {setSkillValue(skillCategory[0], skillItem[0], value)
                                        saveWasModified(true)
                                        props.setFileMenuColor(getWasModifiedColor())
                                        }}>
                <ToggleButton value={3} key={skillItem[0] + "3"} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 2)}} >{T.Professional}</ToggleButton>{' '}
                <ToggleButton value={2} key={skillItem[0] + "2"} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 2)}} >{T.Experienced}</ToggleButton>{' '}
                <ToggleButton value={1} key={skillItem[0] + "1"} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 1)}} >{T.ICanLearn}</ToggleButton>{' '}
                &ensp;
                <ToggleButton value={0} key={skillItem[0] + "0"} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 0)}} >{T.None}</ToggleButton>{' '}
              </ToggleButtonGroup>
            </Card.Text>
          </Card> 
        )
      })
      return (
        <Card key={skillCategory[0]}>
          <Card.Header>
            <Accordion.Toggle 
              as={Button} 
              variant="outline-secondary" 
              size="sm" 
              className="font-weight-bold" 
              eventKey={skillCategory[0]}>
              {T[skillCategory[0]]}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={skillCategory[0]} key={skillCategory[0]}>
            <Card.Body>
              {skillItems}
            </Card.Body>
          </Accordion.Collapse>
        </Card>)

      })


    return(
      <div>
        <PortalSpinner/> 
        <br/><div className="ml-4 font-weight-bold">{T.ListOfSkills}{' '}{getStudent().firstName}{' '}{getStudent().lastName}</div>
        <Accordion >
          {skillCategories}
        </Accordion>
      </div>    )
  }
  
  export default Skills