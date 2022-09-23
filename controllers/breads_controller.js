const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//INDEX
breads.get('/', (req, res)=>{
 Bread.find()
  .then(foundBreads => {
    console.log(foundBreads)
    res.render('Index', {
      breads: foundBreads,
      title: 'Index Page'
    })
  })
})

//NEW
breads.get('/new', (req, res) => {
    res.status(303).render('new');
})


// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })


//EDIT 
breads.get('/:indexArray/edit', (req, res) => {
  console.log('you have reached the /Edit')
  console.log(req.params.indexArray)
  console.log(Bread[req.params.indexArray])
  res.status(303).render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

  //SHOW Changing :arrayIndex to :id
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
   .then(foundBread => {
     res.render('show', {
       bread: foundBread
    })
  })
  .catch(err => {
    res.render('error404')
  })
})


//UPDATE
breads.put('/:arrayIndex', (req, res) => {
  console.log('hit /Update')
  console.log(Bread[req.params.arrayIndex])
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.status(303).redirect(`/breads/${req.params.arrayIndex}`)
})

  //DELETE 
  breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
  })


module.exports = breads