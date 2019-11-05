import React, { useContext } from 'react'
import { Results } from './results'
import { PositionTable } from './positionTable'
import Grid from '@material-ui/core/Grid'
import { Context } from '../context/Context'

function Fixture() {
    const { matches } = useContext(Context)

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={7}>
                    <Results matches={matches} />
                </Grid>
                <Grid item xs={5}>
                    <PositionTable matches={matches} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Fixture