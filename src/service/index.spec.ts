import { describe } from 'node:test'
import calculateAllCoordinates, { Coordinate, calculateCoordinatesPerCommand, moveCoordinateByOne, stringifyCoordinate } from './index'

const coordinate1: Coordinate = {
  x: 10,
  y: 22,
}
const coordinate2: Coordinate = {
  x: -10,
  y: 22,
}
const coordinate3: Coordinate = {
  x: 10,
  y: -22,
}
const coordinate4: Coordinate = {
  x: 0,
  y: 22,
}

describe('Execution service', () => {
  describe('stringifyCoordinate', () => {
    it('should transform a coordinate object into a string', () => {
      expect(stringifyCoordinate(coordinate1)).toBe('10,22')
      expect(stringifyCoordinate(coordinate2)).toBe('-10,22')
      expect(stringifyCoordinate(coordinate3)).toBe('10,-22')
      expect(stringifyCoordinate(coordinate4)).toBe('0,22')
    })
  })

  describe('moveCoordinateByOne', () => {
    it('should move coordinate one step north', () => {
      expect(moveCoordinateByOne(coordinate1, 'north')).toEqual({ x: 10, y: 23 })
    })
    it('should move coordinate one step south', () => {
      expect(moveCoordinateByOne(coordinate3, 'south')).toEqual({ x: 10, y: -23 })
    })
    it('should move coordinate one step east', () => {
      expect(moveCoordinateByOne(coordinate2, 'east')).toEqual({ x: -9, y: 22 })
    })
    it('should move coordinate one step west', () => {
      expect(moveCoordinateByOne(coordinate1, 'west')).toEqual({ x: 9, y: 22 })
    })
  })

  describe('calculateCoordinatesPerCommand', () => {
    it('should return a list of new coordinates according to step number', () => {
      expect(calculateCoordinatesPerCommand(coordinate1, 'north', 2)).toEqual([{ x: 10, y: 23 }, { x: 10, y: 24 }])
      expect(calculateCoordinatesPerCommand(coordinate2, 'west', 1)).toEqual([{ x: -11, y: 22 }])
    })
  })

  describe('calculateAllCoordinates', () => {
    it('should return an object with a list of travel coordinates and a list of unique coordinates', () => {
      expect(calculateAllCoordinates({
        start: coordinate1,
        commands: [{ direction: 'east', steps: 2 }, { direction: 'north', steps: 1 }],
      })).toEqual({
        coordinates: [
          { x: 10, y: 22 },
          { x: 11, y: 22 },
          { x: 12, y: 22 },
          { x: 12, y: 23 },
        ],
        uniqueCoordinates: new Set(['10,22', '11,22', '12,22', '12,23']),
      })
    })
  })
})
