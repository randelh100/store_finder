const mongoose = require("mongoose");

const StoresSchema = {
    name: {
        type: String,
        required: [true, "Store name is required"],
        minlength: [3, "Name must contain 3 characters"],
    },
    number: {
        type: Number,
        required: [true, "Store number is required"],
        min: [1, "Must be a unique number greater than 0"],
    },
    open: {
        type: Boolean,
    },
}

module.exports = mongoose.model("Store", StoresSchema);