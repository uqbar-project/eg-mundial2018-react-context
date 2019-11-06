import React, { useState, useContext } from 'react'
import MatchRow from '../components/matchRow'
import { CountryService } from '../services/countryService'
import { Select, MenuItem, FormHelperText, FormControl } from '@material-ui/core'
import { Context } from '../context/Context'

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
                <FormHelperText>Grupo</FormHelperText>
                <Select
                    id='group'
                    value={group}
                    onChange={filterGroup}
                    inputProps={{
                        name: 'group',
                        id: 'group'
                    }}
                >
                    <MenuItem value="">
                        <em>Todos</em>
                    </MenuItem>
                    {groups.map(group => <MenuItem value={group} key={group}>{group}</MenuItem>)}
                </Select>
            </FormControl>
            {matches.filter((match) => match.matchesGroup(group)).map(match => <MatchRow id={match.key} match={match} key={match.key} />)}
        </div>
    )
}
