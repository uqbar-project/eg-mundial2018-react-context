import React, { useState, useContext } from 'react'
import MatchRow from '../components/matchRow'
import { CountryService } from '../services/countryService'
import { FormControl } from '@material-ui/core'
import { Context } from '../context/Context'
import { SelectGroup } from './selectGroup'

export function Results() {
    const { matches } = useContext(Context)
    const [group, setGroup] = useState('')
    const countryService = new CountryService()
    const groups = countryService.getGroups()
    const filterGroup = (event) => {
        const group = event.target.value
        setGroup(group)
    }
    return (
        <div>
            <FormControl className="formControl">
                <SelectGroup
                    value={group}
                    onChange={filterGroup}
                    groups={groups}
                />
            </FormControl>
            {matches.filter((match) => match.matchesGroup(group)).map(match => <MatchRow id={match.key} match={match} key={match.key} />)}
        </div>
    )
}
