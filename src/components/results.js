import React, { useContext } from 'react'

import MatchRow from '../components/matchRow'
import { Context } from '../context/Context'

export function Results({ group }) {
    const { matches } = useContext(Context)
    return (
        <div>
            {matches.filter((match) => match.matchesGroup(group)).map(match => <MatchRow data-testid={match.key} match={match} key={match.key} />)}
        </div>
    )
}
