// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = latestMatch

  return (
    <div className="lm-card-container">
      <h1 className="lm-heading">Latest Matches</h1>
      <div className="lm-card">
        <div className="lm-logo-container">
          <div className="lm-details-left-side">
            <p className="lm-team-name">{competingTeam}</p>
            <p className="lm-team-date">{date}</p>
            <p className="lm-team-venue">{venue}</p>
            <p className="lm-team-status">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            className="lm-logo"
            alt={`latest match ${competingTeam}`}
          />
        </div>
        <div className="lm-details-right-side">
          <div className="lm-info">
            <p className="lm-label">First Innings</p>
            <p className="lm-value">{firstInnings}</p>
          </div>
          <div className="lm-info">
            <p className="lm-label">Second Innings</p>
            <p className="lm-value">{secondInnings}</p>
          </div>
          <div className="lm-info">
            <p className="lm-label">Man Of the Match</p>
            <p className="lm-value">{manOfTheMatch}</p>
          </div>
          <div className="lm-info">
            <p className="lm-label">Umpires</p>
            <p className="lm-value">{umpires}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LatestMatch
