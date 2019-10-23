require('dotenv').config()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const ldClient = require('./utils/launchDarkley')

app.prepare().then(() => {
  const server = express()

  server.get('/simplepage', async (req, res) => {
    return app.render(req, res, '/simplepage', req.query)
  })
  
  server.get('/launchDarkley',  async (req, res) => {
    try {
      const result = await ldClient.getLdClient().allFlagsState(ldClient.user)
      const flags = await result.allValues()
      res.send(flags)

    }
    catch {
      req.flags = null
      res.send({flags: null})
    }
    
  })

  server.get('/posts/:id', (req, res) => {

    return app.render(req, res, '/posts', { id: req.params.id })
  })

  server.all('*', (req, res) => {
    
    return handle(req, res)

  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})