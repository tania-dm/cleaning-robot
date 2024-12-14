import 'reflect-metadata'
import dotenvx from '@dotenvx/dotenvx'
import express from 'express'
import appSetup from './startup/init'
import routerSetup from './startup/router'
import expressStatusMonitor from 'express-status-monitor'

dotenvx.config()
const app = express()
app.use(expressStatusMonitor())
appSetup(app)
app.use(express.json())
routerSetup(app)
