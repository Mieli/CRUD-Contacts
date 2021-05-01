const repository = new ContactRepository();

const viewTableContacts = new ViewTableContacts(repository);
const viewFormContact = new FormContact(repository, viewTableContacts);

viewTableContacts.render();
viewFormContact.render();