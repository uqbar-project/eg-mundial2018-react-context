import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import React, { useContext, useState } from 'react'

import { Context } from '../context/Context'
import { CountryRow } from './countryRow'

const MatchRow = ({ match: matchProps }) => {
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
                <Grid container item xs={12}>
                    <MatchTeam item xs={6} match={match} team={match.teamA} goal={match.goalsA} changeGoal={changeGoal} />
                    <MatchTeam item xs={6} match={match} team={match.teamB} goal={match.goalsB} changeGoal={changeGoal} />
                </Grid>
            </CardContent>
        </Card>
    )
}
export default MatchRow
const MatchTeam = ({ match, team, goal, changeGoal }) => {
    return (
        <>
            <Grid item xs={9} sm={4}>
                <CountryRow country={team} />
            </Grid>
            <Grid item xs={3} sm={2}>
                <TextField
                    required
                    inputProps={{ 'data-testid': `${match.key}_${team.key}_goles` }}
                    type="number"
                    className="goles"
                    value={goal}
                    onChange={(event) => changeGoal(team, event.target.value)}
                    margin="normal"
                />
            </Grid>
        </>
    )
}