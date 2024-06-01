// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChart from '../PieChart'

import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: {}}

  componentDidMount() {
    this.getMatchesDetails()
  }

  getMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    // console.log(fetchedData)
    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        id: fetchedData.latest_match_details.id,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }
    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  getNoOfMatches = value => {
    const {teamMatchesData} = this.state
    const {latestMatchDetails, recentMatches} = teamMatchesData
    const currentMatch = value === latestMatchDetails.matchStatus ? 1 : 0
    const result =
      recentMatches.filter(match => match.matchStatus === value).length +
      currentMatch
    return result
  }

  getPieChart = () => [
    {name: 'Won', value: this.getNoOfMatches('Won')},
    {name: 'Lost', value: this.getNoOfMatches('Lost')},
    {name: 'Drawn', value: this.getNoOfMatches('Drawn')},
  ]

  renderRecentMatches = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchDataDetails={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatchesData

    return (
      <>
        <div className="team-matches-container">
          <img src={teamBannerUrl} alt="team banner" className="team-banner" />
          <LatestMatch latestMatch={latestMatchDetails} />
          {this.renderRecentMatches()}
        </div>
        <h1 className="team-stats-heading">Team Statistics</h1>
        <PieChart data={this.getPieChart()} />
        <Link to="/" className="alignment">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
      </>
    )
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoading = () => (
    // eslint-disable-next-line
    <div testid="loader" className="load-container">
      <Loader type="BallTriangle" color="#ffffff" height={50} width={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className={`ipl-team-matches-container ${this.getRouteClassName()}`}>
        {isLoading ? this.renderLoading() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
