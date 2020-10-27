import React, { createContext, useState } from 'react'

import { MatchService } from '../services/matchService'

export const Context = createContext()

export const Provider = ({ children }) => {
    const [matches, setMatches] = useState(new MatchService().getMatches())
    const value = {
        matches,
        updateMatch: (matchToUpdate) => {
            const indexMatchToReplace = matches.findIndex((match) => match.key === matchToUpdate.key)
            matches[indexMatchToReplace] = matchToUpdate
            setMatches([...matches])
        }
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}