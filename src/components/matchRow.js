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

    const changeGoal = (team, goals) => {
        match.updateScore(team.name, Math.trunc(goals))
        updateMatch(match)
        setMatch(match)
    }

    return (
        <Card data-testid={match.key}>
            <CardContent>
                <Grid container spacing={8}>
                    <MatchTeam team={match.teamA} goal={match.goalsA} changeGoal={changeGoal} />
                    <MatchTeam team={match.teamB} goal={match.goalsB} changeGoal={changeGoal} />
                </Grid>
            </CardContent>
        </Card>
    )
}
export default MatchRow
function MatchTeam({ team, goal, changeGoal }) {
    return <>
        <Grid item xs={6} sm={3}>
            <CountryRow country={team} />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField
                required
                id={`${team.key}_goles`}
                type="number"
                style={{ width: '2.5rem' }}
                value={goal}
                onChange={(event) => changeGoal(team, event.target.value)}
                margin="normal"
            />
        </Grid>
    </>
}