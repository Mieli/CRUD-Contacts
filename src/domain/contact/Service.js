class ContactService {
    constructor(repository) {
        this.repository = repository;

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
    }

    findAll() {
       return this.repository.findAll();
    }

    findById(id) {
        return this.repository.findById(id);
    }

    save(contact) {
        if (!contact.id) {
            return this.repository.insert(contact);
        } else {
            return this.repository.update(contact);
        }
    }

    remove(id) {
        return this.repository.remove(id);
    }

}

module.exports = ContactService;