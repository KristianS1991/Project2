import React from 'react'
import 'bulma'

import SquadCard from './SquadCard'

class Squads extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      squadsData: [],
      classLoaded: false,
      id: props.location.state.id,
      data: {}
    }
  }

  componentDidMount() {
    fetch(`https://api.football-data.org/v2/teams/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '4c4008915f684e03bb77b3e11617f599'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ squadsData: data.squad, data: data }))
      .then(this.setState({ classLoaded: true }))
      .catch(err => console.log(err))
  }

  render() {
    const classes = 'column is-multiline is-one-quarter-desktop is-one-third-tablet animated fadeInUp'
    return (
      <div>
        <section className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-primary">
                {this.state.data.name}
              </h1>
              <h2 className="subtitle">
                Venue: {this.state.data.venue}
              </h2>
              <h2 className="subtitle">
                Founded: {this.state.data.founded}
              </h2>
              <h2 className="subtitle">
                <img src={this.state.data.crestUrl} alt="Crest" className="crest"/>
              </h2>
            </div>
          </div>
        </section>
        <section className="section background-style">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.classLoaded && this.state.squadsData.map(player => {
                return (
                  <div key={player.id} className={classes}>
                    <SquadCard
                      {...player}
                    />
                  </div>
                )
              }
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Squads
