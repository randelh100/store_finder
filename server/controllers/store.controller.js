const Store = require("../models/store.model");

const getAllStores = (req, res) => {
    Store.find()
        .then((allStores) => res.json(allStores))
        .catch((err) => res.json(err));
};

const createStore = (req, res) => {
    Store.create(req.body)
        .then((newStore) => res.json(newStore))
        .catch((err) => res.status(400).json({ message: "An error has occured", error: err }));
};


const getOneStore = (req, res) => {
    Store.findById(req.params.id)
        .then((oneStore) => res.json(oneStore))
        .catch((err) => res.json(err));
};


const deleteExistingStore = (req, res) => {
    Store.deleteOne({ _id: req.params.id })
        .then((deletedStore) => res.json(deletedStore))
        .catch((err) => res.json(err));
};


const updateStore = (req, res) => {
    Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedStore) => {
            res.json({ updatedStore });
        }
        )
        .catch((err) => {
            res.status(400).json({ message: "An error has occured", error: err })
        }
        );
};



module.exports = {
    createStore,
    getAllStores,
    getOneStore,
    updateStore,
    deleteExistingStore,
};
