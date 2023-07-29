const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../../helper/ResponsHandler')
const { join } = require('@prisma/client/runtime')

exports.inputJabatan_Karyawan = async (req,res) => {
  try {
    await prisma.jabatan_karyawan.create({
      data:{
        ...req.body,
        id_karyawan: Number(req.body.id_karyawan),
        tgl_sk: new Date(req.body.tgl_sk),
        unit_kerja: Number(req.body.unit_kerja)
      }
    }) 
    res.json(response.commonSuccess())
  } catch (error) {
    console.log(error)
  }
  
}

exports.getJabatanKaryawan = async (req,res) =>{
  // console.log(req.params)
  var id_karyawan_ = parseInt(req.params.id)
  try {
    var JOIN = ["JOIN"];
    const data = await prisma.jabatan_karyawan.findMany({
      where: {
        id_karyawan: id_karyawan_
      }
    })
    const joinData = await prisma.jabatan_karyawan.findMany({
      where: {
       unit_kerja: data[0].unit_kerja
      }
    })
      for (var a =0; a <= joinData.length; a++) {
        const join = await prisma.karyawan.findMany({
          where: {
            id_karyawan: joinData[a].id_karyawan
          }
        })
        console.log(join)
      }
      // console.log(JOIN)
  } catch (error) {
    res.json(response.serverError())
  }
}

// exports.getbyid = async (req,res) =>{
//   try {
//     const data = await prisma.jabatan.findUnique({
//       where:{
//         kode_jabatan:req.params.kode
//       }
//     })
//     res.json(response.successWithData(data))
//   } catch (error) {
//     res.json(response.serverError())
//   }
// }

exports.editJabatan_Karyawan = async (req,res) =>{
  const tgl = new Date(req.body.tgl_sk)
  const a = tgl.toLocaleDateString().split('T')[0]
  // console.log(a)
  // console.log(new Date(req.body.tgl_sk))
  // // console.log(req.body.tgl_sk)
  await prisma.jabatan_karyawan.update({
    where:{
      id_jabatan_karyawan: Number(req.params.id)
    }, 
    data: {
      ...req.body,
      id_karyawan: Number(req.body.id_karyawan),
      tgl_sk: new Date(a),
      // tgl_sk: new Date(req.body.tgl_sk),
      unit_kerja: Number(req.body.unit_kerja),
      
    }
  })
  res.json(response.commonSuccess())
}

exports.deleteJabatan_Karyawan = async (req,res) =>{
  await prisma.jabatan_karyawan.delete({
    where:{
      id_jabatan_karyawan: Number(req.params.id)
    }
  })
  res.json(response.commonSuccess())
}

exports.getKepalaBiro = async (req,res) =>{
  const data = await prisma.$queryRawUnsafe(`SELECT * FROM jabatan_karyawan
    INNER JOIN jabatan ON jabatan.kode_jabatan = jabatan_karyawan.id_jabatan
    INNER JOIN karyawan ON karyawan.id_karyawan = jabatan_karyawan.id_karyawan
    INNER JOIN unit_kerja ON unit_kerja.id_unit_kerja = jabatan_karyawan.unit_kerja
    WHERE jabatan.level = 2
  `)
  res.json(response.successWithData(data))
}