import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'

import { CountryRow } from './countryRow'

export class CountryList extends Component {

    render() {
        const countryList = this.props.countries.map(country =>
            <Grid item xs={2} key={'grid' + country.name}>
                <Card key={'card' + country.name}>
                    <CardContent key={'content' + country.name}>
                        <CountryRow country={country} key={country.name} />
                    </CardContent>
                </Card>
            </Grid>
        )

        return (
            <Grid container fluid="true" item xs={12} spacing={3}>
                {countryList}
            </Grid>
        )
    }

}