function parentController(app, db) {

  app.post('/wallet', (req, res) => {
    db.parent.findById(req.body.ParentID).then((p) => {
      p.Balance += req.body.Amount
      p.save().then(() => {
        res.send("Succesfull.")
      })
    })
  })

  app.get('/wallet', (req, res) => {

    db.sequelize.query("SELECT 'Books.Quantity', 'Listing.EndDate', 'Listing.Price', 'Ativity.Name' FROM Books INNER JOIN Listing ON 'Books.ListingID'='listing.ListingID' INNER JOIN Activity ON 'Listing.ActivityID'='Activity.ActivityID' WHERE 'Books.ParentID'='4'", { type: db.sequelize.QueryTypes.SELECT}).then(history => {
      console.log(history)
      res.send(history);
    })
  })
}

module.exports = parentController
