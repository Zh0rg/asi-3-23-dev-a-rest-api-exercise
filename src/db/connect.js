const mongoose = require("mongoose")

module.exports = mongoose.connect("mongodb://localhost:27017/light-crm", {
    family: 4,
})
