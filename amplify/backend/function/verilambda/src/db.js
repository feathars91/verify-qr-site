let knex = require('knex');
let dbConfig = {
	client: 'mysql',

	connection: {
		user: '1hgFV788Nj',
		password: 'Ome5S6Rz8J',
		database: '1hgFV788Nj',
		host: 'remotemysql.com',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};


module.exports = knex(dbConfig);
