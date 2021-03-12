
const Availability = ({props}, {currentTab}) => {
  if (props.currentTab !== 'availability') return null
  const T = props.props.T
  return(
    <div>
      {T.Availability}<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default Availability