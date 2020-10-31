import { FormControl } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { useState } from 'react'

import { countryService } from '../services/countryService'
import { PositionTable } from './positionTable'
import { Results } from './results'
import { SelectGroup } from './selectGroup'


const Fixture = () => {
    const [group, setGroup] = useState('')
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
            <Grid container spacing={0}>
                <Grid item xs={7}>
                    <Results group={group} />
                </Grid>
                <Grid item xs={5}>
                    <PositionTable group={group} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Fixture