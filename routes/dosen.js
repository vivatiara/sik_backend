const router = require('express').Router()
const dosen = require('../controller/dosen/tri_dharma')
const {upload} = require('../uploadconfig')

const field =  upload.array('lampiran', 2)
// const field1 =  upload.array('lampiran1b')
router.post('/create', field, dosen.inputTriDharma)

module.exports = router