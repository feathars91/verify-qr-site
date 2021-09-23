let knex = require('knex');
let dbConfig = {
	client: 'mysql',

	connection: {
		user: 'admin',
		password: 'Abel3186',
		database: 'contacts',
		host: 'database-1-instance-1.cb6w4rmtcnig.us-east-2.rds.amazonaws.com',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};


module.exports = knex(dbConfig);
