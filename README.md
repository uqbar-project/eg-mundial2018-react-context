# Mundial 2018 Rusia (React Context)

[![Build Status](https://travis-ci.org/uqbar-project/eg-mundial2018-react-context.svg?branch=master)](https://travis-ci.org/uqbar-project/eg-mundial2018-react-context)

<img src="video/demo.gif" height="130%" width="130%"/>

En la tercera iteración, vamos a modificar el caso de uso "Cargar resultados del mundial" para incorporarle una tabla de posiciones dinámica.

# Rutas

No hay nuevas rutas en nuestra aplicación, pero sí hacemos una ligera modificación:

- la ruta raíz '/' muestra la búsqueda de países que participan del mundial
- reemplazamos la ruta '/resultados' por '/fixture'

# Fixture: resultados + tabla de posiciones

## Componentes visuales

![image](images/ComponentesFixture.png)

## Armado de la tabla de posiciones

Para armar la tabla de posiciones, tomamos como input la lista de partido y hacemos un doble corte de control:

- primero por grupo
- luego por país

Es decir, tenemos un mapa:

![image](images/TablaPosiciones.png)

Recorremos los partidos generando o actualizando el mapa por grupo y país (archivo _positionTable.js_):

```javascript
const positions = new Map()
this.props.matches.forEach(match => {
    const group = match.group()
    const groupPosition = positions.get(group) || new GroupPosition(group)
    groupPosition.processMatch(match)
    positions.set(group, groupPosition)
})
```

El método processMatch de PositionGroup hace el procesamiento para el equipo local y el visitante:

```javascript
    processMatch(match) {
        this.searchPositionItem(match.teamA).processMatch(match.goalsA, match.goalsB)
        this.searchPositionItem(match.teamB).processMatch(match.goalsB, match.goalsA)
    }

    searchPositionItem(team) {
        let result = this.positionItems.find(item => item.team.matches(team))
        if (!result) {
            result = new PositionItem(team)
            this.positionItems.push(result)
        }
        return result
    }
```

Veamos el método processMatch del objeto de negocio positionItem, que representa una línea dentro de la tabla de posiciones:

```javascript
processMatch(goalsOwn, goalsAgainst) {
    if (goalsOwn === undefined || goalsAgainst === undefined) return
    this.goalsOwn += goalsOwn
    this.goalsAgainst += goalsAgainst
    if (goalsOwn > goalsAgainst) this.won++
    if (goalsOwn < goalsAgainst) this.lost++
    if (goalsOwn === goalsAgainst) this.tied++
}
```

Para mostrar la tabla, el componente PositionTable (vista) en su método render dibuja la tabla de la siguiente manera:

```javascript
return (
    <Card key={'cardPosiciones'}>
        <CardContent key={'contentPosiciones'}>
            <h3>Tabla de posiciones</h3>
            {[...positions].map((itemGroup) => {
                const group = itemGroup[0]
                const positions = itemGroup[1].positions()
                return <PositionGroupTable group={group} positions={positions} key={'positions_group_' + group} />
            }
            )}
        </CardContent>
    </Card>
)
```

Partimos de positions, que es el mapa que construimos previamente. Como el mapa de ECMAScript no conoce la función map, tenemos que pasarlo a una lista utilizando el _spread operator_ `[...positions]`. Esto nos da una lista de objetos que tiene `{grupo: nombre_grupo, groupPosition: lista_de_equipos}`. Pero como la lista de equipos no está ordenada, llamamos a un método en groupPosition que ordena los equipos por puntos:

```javascript
>>GroupPosition
positions() {
    return this.positionItems.sort((item1, item2) => item1.order <= item2.order)
}

>>PositionItem
get order() {
    return this.points * 10000 + this.goalAverage * 100 + this.goalsOwn
}
get points() {
    return this.won * 3 + this.tied
}
```

Bueno, no solo por puntos, también por diferencia de gol y goles a favor.


# React-Context: Estado compartido entre componentes

Tenemos dos componentes que tienen un estado compartido: 

- el componente Results toma como input los partidos del mundial para eventualmente filtrar los de una zona seleccionada (o directamente mostrar todos), y permite editar los resultados del mundial
- el componente PositionTable toma como input los partidos del mundial para armar las tablas de posiciones

Pero además, si alguien modifica un resultado (componente _MatchRow_ hijo del componente padre _Results_), eso debería actualizar la tabla de posiciones. React tiene mecanismos para actualizar estados desde un componente hacia otros, pero esta es una buena ocasión para incorporar **React Context** a nuestra aplicación, que nos va a permitir manejar un estado compartido entre componentes para simplificar el esquema de notificaciones ante un cambio.

Para una explicación más detallada podés consultar [el ejemplo del contador con React Context](https://github.com/uqbar-project/eg-contador-react-context)

Veamos cómo se implementa dentro del ejemplo del mundial.

## Context

El context va a guardar los resultados, inicialmente tendrá la lista de partidos vacía.

