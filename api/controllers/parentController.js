function parentController(app, db) {

  app.post('/wallet', app.loggedIn, (req, res) => {
      // Initiate transaction.
      db.sequelize.transaction( (t) => {
          // Lock parent table row.
          return db.parent.findById(
              req.headers.UserID,
              {
                  transaction: t,
                  lock: t.LOCK.UPDATE
              }
          ).then((p) => {
              // Ensure top up amount is a valid number.
              let topup = parseInt(req.body.Amount) || 0
              topup = ( topup > 0 ) ? topup : 0

              // Top up account balance.
              p.Balance += topup

              // And commit transaction.
              return p.save({ transaction: t }).then(() => {
                  res.send("Successful balance top up.")
              })
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
