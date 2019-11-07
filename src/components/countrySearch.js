import React, { Component } from 'react'
import { CountryService } from '../services/countryService'
import { CountryList } from './countryList'
import { Country } from '../domain/country'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { SelectGroup } from './selectGroup'

export class CountrySearch extends Component {

    constructor(props) {
        super(props)
        this.countryService = new CountryService()
        this.groups = this.countryService.getGroups()
        this.state = {
            search: new Country("", ""),
            countries: this.countryService.getAllCountries()
        }
    }

    handleChange(property, event) {
        event.preventDefault()
        const search = this.state.search
        search[property] = event.target.value
        this.setState({
            search: search,
            countries: this.countryService.getCountries(search)
        })
    }

    render() {
        return (
            <div>
                <div className="search">
                    <FormControl className="formControl">
                        <FormHelperText>País</FormHelperText>
                        <TextField
                            id="country"
                            value={this.state.search.name}
                            onChange={this.handleChange.bind(this, 'name')}
                        />
                        <br />
                        <SelectGroup
                            value={this.state.search.group}
                            onChange={this.handleChange.bind(this, 'group')}
                            groups={this.groups}
                        />
                    </FormControl>
                </div>
                <CountryList countries={this.state.countries} />
            </div>
        )
    }

}
