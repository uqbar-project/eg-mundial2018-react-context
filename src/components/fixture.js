import React from 'react'
import { Results } from './results'
import { PositionTable } from './positionTable'
import Grid from '@material-ui/core/Grid'

function Fixture() {
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={7}>
                    <Results />
                </Grid>
                <Grid item xs={5}>
                    <PositionTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default Fixture