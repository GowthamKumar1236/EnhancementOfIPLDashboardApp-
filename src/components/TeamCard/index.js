// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails

  return (
    <Link to={`/team-matches/${id}`} className="item">
      <li className="team-card">
        <img className="team-img" src={teamImageUrl} alt={`${name}`} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
