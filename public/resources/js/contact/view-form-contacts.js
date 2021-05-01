class FormContact {
    constructor(repository, viewContacts) {
        this.repository = repository;
        this.viewContacts = viewContacts;
        this.saveHandler = this.saveHandler.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    render() {
        this.elId = document.querySelector('input[name="id"]');
        this.elName = document.querySelector('input[name="name"]');
        this.elEmail = document.querySelector('input[name="email"]');
        this.elPhone = document.querySelector('input[name="phone"]');
        this.btnSave = document.getElementById('btnSave');
        this.btnSave.addEventListener('click', this.saveHandler);
    }

    saveHandler(event) {
        event.preventDefault();
        const id = parseInt(this.elId.value) || null;
        const name = this.elName.value;
        const email = this.elEmail.value;
        const phone = this.elPhone.value;

        const contact = new Contact({ id, name, email, phone });
        if (!contact.id) {
            this.repository.insert(contact)
                .then(data => {
                    this.clearForm();
                    alert('Dados inserido com sucesso')
                    this.viewContacts.render();
                })
                .catch(error => {
                    alert(error);
                    alert('não foi possível salvar o contato')
                })
        } else {
            this.repository.update(contact)
                .then((ok) => {
                    this.clearForm();
                    alert('Dados atualizado com sucesso')
                    this.viewContacts.render();
                })
                .catch(error => {
                    alert('não foi possível atualizar o contato')
                })
        }
    }

    clearForm() {
        this.elId.value = "";
        this.elName.value = "";
        this.elEmail.value = "";
        this.elPhone.value = "";
    }
}