const db = require('../../infra/db/mariaDB');
const ContactRepository = require('./Repository');
const ContactService = require('./Service');
const ContactController = require('../../infra/web/contact/Controller');
const ContactRouter = require('../../infra/web/contact/Routes');

const repository = new ContactRepository(db)
const service = new ContactService(repository)
const controller = new ContactController(service)
const router = new ContactRouter(controller);

module.exports = {
    router
}