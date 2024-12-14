export type Coordinate = {
  x: number
  y: number
}

type Direction = 'north' | 'south' | 'east' | 'west'

export default function calculateAllCoordinates(body: { start: Coordinate, commands: { direction: Direction, steps: number }[] }) {
  return body.commands.reduce((acc, current) => {
    const commandCoordinates = calculateCoordinatesPerCommand(acc.coordinates[acc.coordinates.length - 1], current.direction, current.steps)

    acc.coordinates = acc.coordinates.concat(commandCoordinates)

    commandCoordinates.forEach(coordinate => acc.uniqueCoordinates.add(stringifyCoordinate(coordinate)))

    return acc
  }, {
    coordinates: [body.start],
    uniqueCoordinates: new Set([stringifyCoordinate(body.start)]),
  } as { coordinates: Coordinate[], uniqueCoordinates: Set<string> })
}

export function calculateCoordinatesPerCommand(
  start: Coordinate,
  direction: Direction,
  steps: number,
): Coordinate[] {
  const coordinates: Coordinate[] = []

  for (let index = 0; index < steps; index++) {
    if (coordinates.length === 0) {
      coordinates.push(moveCoordinateByOne(start, direction))
    }
    else {
      coordinates.push(moveCoordinateByOne(coordinates[index - 1], direction))
    }
  }

  return coordinates
}

export function moveCoordinateByOne(start: Coordinate, direction: Direction): Coordinate {
  switch (direction) {
    case 'north':
      return {
        x: start.x,
        y: start.y + 1,
      }
    case 'south':
      return {
        x: start.x,
        y: start.y - 1,
      }
    case 'east':
      return {
        x: start.x + 1,
        y: start.y,
      }
    case 'west':
      return {
        x: start.x - 1,
        y: start.y,
      }
  }
}

export function stringifyCoordinate(obj: Coordinate): string {
  return `${obj.x},${obj.y}`
}
