let knex = require('knex');
let dbConfig = {
	client: 'mysql',

	connection: {
		user: 'sql3464813',
		password: 'ls1vpU1S2A',
		database: 'sql3464813',
		host: 'sql3.freesqldatabase.com',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};


module.exports = knex(dbConfig);
