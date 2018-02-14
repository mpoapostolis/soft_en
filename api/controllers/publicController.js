function publicController(app,db) {

  app.get('/activity/:id', (req,res) => {
    db.activity.findById(req.params.id,{
      include: [
        {
          model: db.listing
        }
      ]
    }).then( (result) => {
      res.send(result)
    })
  })
}


module.exports = publicController
