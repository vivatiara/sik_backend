const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../../helper/ResponsHandler')
const dateHelper = require('../../helper/DateHelper')

exports.inputTriDharma = async (req,res) => {
    try {
        const dataInput = {
            lampiran1a: req.files[0] ? req.files[0].filename : null,
            lampiran1b: req.files[1] ? req.files[1].filename : null,
          }
        console.log(dataInput)
        await prisma.tridharma.create({
            data: dataInput
          }).then(async result => {
            res.json(response.commonSuccess())
          })
    } catch (error) {
      console.log(error)
    }
  
  }