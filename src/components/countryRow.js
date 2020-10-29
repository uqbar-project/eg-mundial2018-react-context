import React, { Component } from 'react'

export class CountryRow extends Component {

    render() {
        return (
            <div className="countryRow">
                <img className="flag" src={'/assets/' + this.props.country.flag} alt={this.props.country.name} />
                {this.props.country.name}
            </div>
        )
    }

}