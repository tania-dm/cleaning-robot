import http from 'k6/http'

export const options = {
  stages: [
    { duration: '5m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 5 minutes.
    { duration: '5m', target: 200 }, // stay at higher 200 users for 5 minutes
    { duration: '2m', target: 0 }, // ramp-down to 0 users
  ],
}

const payload = JSON.stringify({
  start: {
    x: 11,
    y: 22,
  },
  commands: [
    {
      direction: 'east',
      steps: 2,
    },
    {
      direction: 'north',
      steps: 1,
    },
  ],
})

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export default () => {
  http.post('http://localhost:5000/clean', payload, params)
}
