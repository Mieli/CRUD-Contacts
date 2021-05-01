class ContactController {
    constructor(service) {
        this.service = service;

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async findAll(request, response) {
        const contacts = await this.service.findAll()
        if (contacts) {
            response.json(contacts);
        } else {
            response.sendStatus(404);
        }
    }

    async findById(request, response) {
        const id = parseInt(request.params.id)
        const contact = await this.service.findById(id)
        if (contact) {
            response.json(contact);
        } else {
            response.sendStatus(404);
        }

    }

    insert(request, response) {
        const { name, email, phone } = request.body;
        this.service.save({ name, email, phone })
            .then((id) => {
                response.status(201).json({ id });
            })
            .catch(() => {
                response.sendStatus(500);
            })

    }

    update(request, response) {
        const id = request.params.id;
        const { name, email, phone } = request.body;
        this.service.save({ id, name, email, phone })
            .then(ok => {
                if (ok) {
                    response.sendStatus(204);
                } else {
                    response.sendStatus(412);
                }
            })
            .catch((error) => {
                console.log(error);
                response.sendStatus(500);
            })
    }

    async remove(request, response) {
        const id = parseInt(request.params.id)
        const ok = await this.service.remove(id)
        if (ok) {
            response.json(204);
        } else {
            response.sendStatus(404);
        }

    }
}

module.exports = ContactController;