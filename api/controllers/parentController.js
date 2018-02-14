function parentController(app, db) {

  app.post('/wallet', app.loggedIn, (req, res) => {
      // TODO Top up should be a transaction.
    db.parent.findById(req.header.UserID).then((p) => {
      p.Balance += req.body.Amount
      p.save().then(() => {
        res.send("Succesfull.")
      })
    })
  })

  app.get('/wallet', app.loggedIn, (req, res) => {
      // TODO Respond according to spec.
    console.log(req.headers.UserID)
    db.parent.findById(req.headers.UserID, {
      include: [
        {
          model: db.books,
          as: 'books',
          include: [
            {
              model: db.listing,
              as: 'listing',
              include: [
                {
                  model: db.activity,
                  attributes: ['Name'],
                  as: 'activity'
                }
              ]
            }
          ]
        }
      ]
    })
    .then( (r) => {
      res.send(r)
    })
/*
    db.sequelize.query("SELECT 'Books.Quantity', 'Listing.EndDate', 'Listing.Price', 'Ativity.Name' FROM Books INNER JOIN Listing ON 'Books.ListingID'='listing.ListingID' INNER JOIN Activity ON 'Listing.ActivityID'='Activity.ActivityID' WHERE 'Books.ParentID'='4'", { type: db.sequelize.QueryTypes.SELECT}).then(history => {
      console.log(history)
      res.send(history);
    })*/
  })
}

module.exports = parentController
