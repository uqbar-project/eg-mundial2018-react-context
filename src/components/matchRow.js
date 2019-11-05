import React, { useState, useContext } from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CountryRow } from "./countryRow"
import TextField from '@material-ui/core/TextField'
import { Context } from '../context/Context'

function MatchRow({ match: matchProps }) {
    const { updateMatch } = useContext(Context)
    const [match, setMatch] = useState(matchProps)

    const changeGoal = (match, team, goals) => {
        match.updateScore(team.name, Math.trunc(goals))
        updateMatch(match)
        setMatch(match)
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={8}>
                    <Grid item xs={6} sm={3} style={{ textAlign: 'left' }}>
                        <CountryRow country={match.teamA} key={match.teamA.name} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            required
                            id={match.teamA.key + '_goles'}
                            type="number"
                            style={{ width: '2rem' }}
                            value={match.goalsA}
                            onChange={(event) => changeGoal(match, match.teamA, event.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3} style={{ textAlign: 'left' }}>
                        <CountryRow country={match.teamB} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            required
                            id={match.teamB.key + '_goles'}
                            type="number"
                            style={{ width: '2.5rem' }}
                            onChange={(event) => changeGoal(match, match.teamB, event.target.value)}
                            value={match.goalsB}
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MatchRow