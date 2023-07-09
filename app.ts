import { PrismaClient, Prisma } from '@prisma/client'
import express from 'express'
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const prisma = new PrismaClient()
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get(`/ruc/:ruc`, async (req, res) => {
  const { ruc }: { ruc?: string } = req.params

  const listadoArray = ruc?.split(';')

  const query = listadoArray?.map(item => ({
    ruc_numero: +item
  }))

  try {
    const contribuyentes = await prisma.ruc.findMany({
      where: {
        OR: query
      },
      orderBy: {
        ruc_numero: 'desc'
      }
    })
    res.json(contribuyentes)
  } catch (error) {
    res.status(500).json({ msg: 'error en el servidor' })
  }
})

app.get(`/ruc/razon-social/:datos`, async (req, res) => {
  const { datos }: { datos?: string } = req.params

  const listadoArray = datos?.split(';')

  const query = listadoArray?.map(item => ({
    ruc_nombre: {
      contains: item,
      mode: Prisma.QueryMode.insensitive
    }
  }))

  try {
    const contribuyentes = await prisma.ruc.findMany({
      where: {
        OR: query
      },
      orderBy: {
        ruc_numero: 'desc'
      }
    })
    res.json(contribuyentes)
  } catch (error) {
    res.status(500).json({ msg: 'error en el servidor' })
  }
})

app.get(`/ruc/full/:datos`, async (req, res) => {
  const { datos }: { datos?: string } = req.params

  const listadoArray = datos?.split(';')

  const query = listadoArray?.map(item => ({
    fulltext: {
      contains: item,
      mode: Prisma.QueryMode.insensitive
    }
  }))

  try {
    console.log('entro en await')

    const contribuyentes = await prisma.v_ruc.findMany({
      where: {
        OR: query
      },
      orderBy: {
        ruc_numero: 'asc'
      }
    })

    res.json(contribuyentes)
  } catch (error) {
    res.status(500).json({ msg: 'error en el servidor' })
  }
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Api server runing in port ${process.env.PORT}`)
})
