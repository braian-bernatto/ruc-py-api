import { PrismaClient, Prisma } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/ruc', async (req, res) => {
  const contribuyentes = await prisma.ruc.findMany()
  res.json(contribuyentes)
})

app.get(`/ruc/apellido-nombre`, async (req, res) => {
  const { listado }: { listado?: string } = req.query

  const listadoArray = listado?.split(';')

  const query = listadoArray?.map(item => ({
    ruc_nombre: {
      contains: item,
      mode: Prisma.QueryMode.insensitive
    }
  }))

  const contribuyentes = await prisma.ruc.findMany({
    where: {
      OR: query
    }
  })

  res.json(contribuyentes)
})

app.get(`/ruc/ci`, async (req, res) => {
  const { listado }: { listado?: string } = req.query

  const listadoArray = listado?.split(';')

  const query = listadoArray?.map(item => ({
    ruc_ci: +item
  }))

  const contribuyentes = await prisma.ruc.findMany({
    where: {
      OR: query
    }
  })
  res.json(contribuyentes)
})

app.get(`/ruc/:ci`, async (req, res) => {
  const { ci }: { ci?: string } = req.params

  const contribuyente = await prisma.ruc.findMany({
    where: { ruc_ci: Number(ci) }
  })
  res.json(contribuyente)
})

const server = app.listen(4000, () => {
  console.log(`Api server runing in port 4000`)
})
