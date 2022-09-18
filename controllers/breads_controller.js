const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//INDEX
breads.get('/', (req, res)=>{
  //Changed Index to upperCase
    res.status(303).render('Index', {
        breads: Bread,
        title: 'Index Page'
    }                               
    )
})

//NEW
breads.get('/new', (req, res) => {
    res.status(303).render('new');
})


// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.status(303).redirect('/breads')
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

  //SHOW 
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
      res.render('Show', {
          bread:Bread[req.params.arrayIndex],
          index: req.params.arrayIndex,
      })
  } else {
      res.render('error404')
  }
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