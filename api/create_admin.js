// Require the password encryption module.
const bcrypt = require('bcrypt')
const saltRounds = 10

// Require the database module.
const db = require('./db')

// Helper print error function.
const printErrors = function(err) {
    for(let i=0, k=err.errors.length; i<k; i++) {
        console.log(err.errors[i].message)
    }
}

// Check for proper usage, ignore any further checks.
if (process.argv.length != 4) {
    console.log('Usage:     node create_admin.js email password')
} else {
    // Conenct to the database.
    db.sequelize.sync( { logging: false } )
    .then(() => {
        let email = process.argv[2]
        let password = process.argv[3]

        // Create password hash.
        bcrypt.hash(password,saltRounds)
        .then((hash) => {
            // Attempt to create admin user.
            db.user.create({
                Email: email,
                Password: hash,
                Role: 'Admin',
                Status: 'Active'
            }, { logging: false })
            .then((user) => {
                // Log credentials on success.
                console.log(`Registered admin @ ${ user.Email } : ${ password }`)
                process.exit()
            })
            .catch((err) => {
                // Log error on error.
                printErrors(err)
                process.exit()
            })
        })
        .catch((err) => {
            console.log('Some freak password hashing error.')
        })
    })
    .catch( (err) => {
        // TODO Find a more elegant way to deal with db connection errors.
        printErrors(err)
        process.exit()
    })
}
