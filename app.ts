import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/ruc', async (req, res) => {
  const contribuyentes = await prisma.ruc.findMany()
  res.json(contribuyentes)
})

app.get(`/ruc/apellido-nombre`, async (req, res) => {
  const { listado }: { listado?: string } = req.params

  const contribuyentes = await prisma.ruc.findMany({
    where: {
      OR: [
        {
          ruc_nombre: {
            contains: 'bernatto colman',
            mode: 'insensitive'
          }
        },
        {
          ruc_nombre: {
            contains: 'nora yamile',
            mode: 'insensitive'
          }
        }
      ]
    }
  })
  res.json(contribuyentes)
})

app.get(`/ruc/ci`, async (req, res) => {
  const { listado }: { listado?: string } = req.query

  const listadoArray = listado?.split(';')

  const contribuyentes = await prisma.ruc.findMany({
    where: {
      OR: [
        {
          ruc_ci: 5353277
        },
        {
          ruc_ci: 4536259
        }
      ]
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
