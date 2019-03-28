var express = require('express');
var router = express.Router();
var power = require('../models/heroesModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  var tst = [
    {
      id: 1,
      name: "Shazam",
      powers: {
        intelligence: 90,
        strength: 70,
        speed: 12,
        combat: 70,
        wealth: 100,
        image: ""
      }
    }
  ];
  res.render('index', {allEntries: tst});
});

// CREATE a superHero
router.route('/createData')
    .get((req, res) =>{
      res.render('add')
    })
    .post((req,res) =>{
      power.create(req.body).then((results) =>{
          res.redirect('/');
      });
    });



// FIND a superHero
router.route('/find')
    .get( (req, res) =>{
      res.render('find')
    })
    .post((req,res) => {
      power.findOne({id: req.body.id},
          function (err, results) {
            if (err) {
              throw (err);
            } else {
              context={
                findResults: results
              };
              console.log(results);
              console.log(context);
              res.render('find',context)
            }
          });
    });

// EDIT
router.route('/editChange')
    .get((req, res) =>{
  res.render('editChange')
})
    .put((req, res) => { // UPDATE specific order
      power.updateOne({id: req.params.id}, req.body).then((err, res) => {
        if (err) {
          throw (err);
        } else {
          res.redirect('/')
        }
      });
    });

router.get('/edit', (req, res) =>{
  res.render('edit')
});


//DELETE
router.route('/delete')
  .get((req, res) =>{
    res.render('delete')
  })
    .delete(function (req, res) { // DELETE specific order
      Order.deleteOne({movie_id: req.params.id}, function (err) {
        if (err) {
          throw (err);
        } else {
          res.redirect('/')
        }
      })

    });

module.exports = router;
