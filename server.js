require('dotenv').config()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const ldClient = require('./utils/launchDarkley')

app.prepare().then(() => {
  const server = express()

  server.all('*', async (req, res) => {

    try {
      const result = await ldClient.getLdClient().allFlagsState(ldClient.user)
      const flags = await result.allValues()
      req.flags = flags
      return app.render(req, res, '/', req.query)
    }
    catch {
      req.flags = {flags: null}
      return app.render(req, res, '/', req.query)
    }
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})