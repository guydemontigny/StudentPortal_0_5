import {Accordion, Card, Button, ToggleButtonGroup, ToggleButton, Spinner} from 'react-bootstrap'
import {getSkills, setSkillValue} from '../libs/storage'

const Skills = ({props}) => {
    const T = props.T
    // Create the list of skills
    let skillCategories = Object.entries(getSkills()).map((skillCategory) => {
      // We have the category
      let skillItems = Object.entries(skillCategory[1]).map((skillItem) => {
        return (
          <Card className="ml-1">
            <Card.Title className="ml-2">{skillItem[0]}</Card.Title>
            <Card.Text className="ml-2 mb-3">{T.OfferService} &ensp;
              <ToggleButtonGroup 
                  type="radio" 
                  size="sm" 
                  name={skillItem[0]} 
                  defaultValue={skillItem[1]} 
                  onChange={(value) => {setSkillValue(skillCategory[0], skillItem[0], value)}}>
                <ToggleButton value={3} variant = {"outline-info"}>{T.Professional}</ToggleButton>{' '}
                <ToggleButton value={2} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 2)}} >{T.Experienced}</ToggleButton>{' '}
                <ToggleButton value={1} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 1)}} >{T.ICanLearn}</ToggleButton>{' '}
                &ensp;
                <ToggleButton value={0} variant = {"outline-info"} onClick={() => {setSkillValue(skillCategory[0], skillItem[0], 0)}} >{T.None}</ToggleButton>{' '}
              </ToggleButtonGroup>
            </Card.Text>
          </Card> 
        )
      })
      return (
        <Card>
          <Card.Header>
            <Accordion.Toggle 
              as={Button} 
              variant="outline-secondary" 
              size="sm" 
              className="font-weight-bold" 
              eventKey={skillCategory[0]}>
              {skillCategory[0]}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={skillCategory[0]}>
            <Card.Body>
              {skillItems}
            </Card.Body>
          </Accordion.Collapse>
        </Card>)

      })


    return(
      <div>
        <Spinner animation="border" className="ml-3 font-weight-bold" variant="secondary" role="status" id="skills-spinner" hidden={true}>
          <span className="sr-only">Loading...</span>
        </Spinner> 
        <br/><p className="ml-4 font-weight-bold">{T.ListOfSkills}</p>
        <Accordion >
          {skillCategories}
        </Accordion>
      </div>    )
  }
  
  export default Skills