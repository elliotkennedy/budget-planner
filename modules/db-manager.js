'use strict';
const mongoose = require('mongoose');

class DBManager {

    connect() {
        if (this.db) {
            console.log('Connection already open');
            return;
        }

        mongoose.connect('mongodb://localhost/budget-planner');

        this.db = mongoose.connection;
        this.db.once('open', console.log);

        return this.db;
    }

    disconnect() {
        this.db && this.db.disconnect();
    }
}

module.exports = new DBManager();
