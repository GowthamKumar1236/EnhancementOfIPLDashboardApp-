// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import TeamCard from '../TeamCard'

const apiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {teamData: [], isLoading: true}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)
    const formatData = data.teams.map(eachGroup => ({
      name: eachGroup.name,
      id: eachGroup.id,
      teamImageUrl: eachGroup.team_image_url,
    }))
    this.setState({
      teamData: formatData,
      isLoading: false,
    })
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoading = () => (
    // eslint-disable-next-line
    <div testid="loader" className="load-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamsList = () => {
    const {teamData} = this.state
    return (
      <ul className="teams-list">
        {teamData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <div className="ipl-container">
          <div className="alignment-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="logo"
              alt="ipl logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoading() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
