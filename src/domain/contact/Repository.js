class ContactRepository {
    constructor(database) {
        this.database = database;
        this.tableName = 'contacts';

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
        this.insert = this.insert.bind(this);
        this.remove = this.remove.bind(this);
    }

    async findAll() {
        const sql = `select * from ${this.tableName} order by id DESC`;
        let connection = null;
        let contacts = [];
        try {
            connection = await this.database.getConnection();
            contacts = await connection.query(sql);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            connection && connection.end();
        }
        return contacts;
    }

    async findById(id) {
        const sql = `select * from ${this.tableName} where id = ?`;
        const params = [id];
        let connection = null;
        let contact = null;
        try {
            connection = await this.database.getConnection();
            const data = await connection.query(sql, params);
            const rows = [...data]
            if (rows.length > 0) {
                contact = rows[0];
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            connection && connection.end();
        }
        return contact;
    }

    async update(contact) {
        const sql = `update ${this.tableName} set name = ?, email = ?, phone = ? where id = ?`;
        const params = [contact.name, contact.email, contact.phone, contact.id];
        let connection = null;
        let ok = false;
        try {
            connection = await this.database.getConnection();
            const result = await connection.query(sql, params);
            ok = result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            connection && connection.end();
        }
        return ok;
    }

    async insert(contact) {
        const sql = `insert into ${this.tableName} (name, email, phone) values (?, ?, ?)`;
        const params = [contact.name, contact.email, contact.phone];
        let connection = null;
        let result = null;
        try {
            connection = await this.database.getConnection();
            const { insertId } = await connection.query(sql, params);
            result = insertId;
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            connection && connection.end();
        }
        return result
    }

    async remove(id) {
        const sql = `delete from ${this.tableName} where id = ?`;
        const params = [id];
        let connection = null;
        let ok = false;
        try {
            connection = await this.database.getConnection();
            const result = await connection.query(sql, params);
            ok = (result.affectedRows > 0);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            connection && connection.end();
        }
        return ok;
    }

}

module.exports = ContactRepository;