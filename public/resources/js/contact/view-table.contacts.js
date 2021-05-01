class ViewTableContacts {
    constructor(repository) {
        this.repository = repository;
        this.elTable = document.querySelector('#tableBodyContacts');
        this.render = this.render.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    render() {
        this.repository.findAll()
            .then((contacts) => {
                for (let index = this.elTable.childElementCount - 1; index > -1; index--) {
                    const line = this.elTable.children[index];
                    line.remove();
                }

                for (let index = 0; index < contacts.length; index++) {
                    const contact = contacts[index];
                    const line = document.createElement('tr');
                    const colCode = document.createElement('td');
                    const colName = document.createElement('td');
                    const colEmail = document.createElement('td');
                    const colPhone = document.createElement('td');
                    const colActions = document.createElement('td');
                    const btnEdit = document.createElement('button');
                    const btnRemove = document.createElement('button');

                    colCode.innerHTML = contact.id;
                    colName.innerHTML = contact.name;
                    colEmail.innerHTML = contact.email;
                    colPhone.innerHTML = contact.phone;

                    btnEdit.innerHTML = 'Editar';
                    btnEdit.setAttribute('data-id', contact.id);
                    btnEdit.setAttribute('class', 'btn btn-success btn-sm');
                    btnEdit.addEventListener('click', this.editHandler);
                    colActions.appendChild(btnEdit);

                    btnRemove.innerHTML = 'Excluir';
                    btnRemove.setAttribute('data-id', contact.id);
                    btnRemove.setAttribute('class', 'btn btn-danger btn-sm');
                    btnRemove.addEventListener('click', this.removeHandler);
                    colActions.appendChild(btnRemove);



                    line.appendChild(colCode);
                    line.appendChild(colName);
                    line.appendChild(colEmail);
                    line.appendChild(colPhone);
                    line.appendChild(colActions);

                    this.elTable.appendChild(line);

                }

            })
            .catch((error) => {
                alert('não foi possível carregar os dados da tabela');
            })
    }

    editHandler(event) {
        const id = event.target.getAttribute('data-id');
        this.repository.findById(parseInt(id))
            .then((contact) => {
                document.querySelector('input[name="id"]').value = contact.id
                document.querySelector('input[name="name"]').value = contact.name
                document.querySelector('input[name="email"]').value = contact.email
                document.querySelector('input[name="phone"]').value = contact.phone
                this.render();
            })
            .catch(error => {
                alert('Não foi possível carregar o contato');
            })
    }

    removeHandler(event) {
        const id = event.target.getAttribute('data-id');
        this.repository.remove(id)
            .then((ok) => {
                alert('contato removido com sucesso')
                this.render();
            })
            .catch(error => {
                alert('Não foi possível remover o contato');
            })
    }
}