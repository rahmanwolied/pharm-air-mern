const path = require('path')

exports.getHome = (res, req) =>{
    res.status = 200
    res.sendFile(path.join(__dirname, '../views/index.html'))
}