import React, { useContext } from 'react'

import MatchRow from '../components/matchRow'
import { Context } from '../context/Context'

export const Results = ({ group }) => {
    const { matches } = useContext(Context)
    const groupMatches = matches.filter((match) => match.matchesGroup(group))
    return (
        <div>
            {groupMatches.map(match => <MatchRow data-testid={match.key} match={match} key={match.key} />)}
        </div>
    )
}
