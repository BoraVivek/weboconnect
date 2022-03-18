require('dotenv').config()

const development = {
    db: process.env.DB_NAME,
    secret: process.env.SECRET_KEY
}

module.exports = development;