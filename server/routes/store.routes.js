const StoreController = require("../controllers/store.controller");

module.exports = (app) => {
    
    app.get("/api/stores/:id", StoreController.getOneStore);
    app.post("/api/stores", StoreController.createStore);
    app.delete("/api/stores/:id", StoreController.deleteExistingStore);
    app.put("/api/stores/:id", StoreController.updateStore);
    app.get("/api/stores", StoreController.getAllStores);

};