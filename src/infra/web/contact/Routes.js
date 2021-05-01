class ContactRouter{
    constructor(controller){
        this.controller = controller;

        this.config = this.config.bind(this);
    }

    config(app){
        app.post("/api/v1/contacts", this.controller.insert);
        app.get("/api/v1/contacts", this.controller.findAll);
        app.get("/api/v1/contacts/:id", this.controller.findById);
        app.put("/api/v1/contacts/:id", this.controller.update);
        app.delete("/api/v1/contacts/:id", this.controller.remove);
    }

}

module.exports = ContactRouter;