class ContactRepository {

    async findAll() {
        const response = await fetch('/api/v1/contacts')
        return response.json();
    }

    async findById(id) {
        const response = await fetch('/api/v1/contacts/' + id);
        return response.json();
    }

    async insert(contact) {
        const response = await fetch('/api/v1/contacts', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        return response.json();
    }

    async update(contact) {
        const ok = await fetch('/api/v1/contacts/' + contact.id, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        return ok;
    }

    async remove(id) {
        const ok = await fetch(`/api/v1/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
        })
        return ok;
    }



}