// database settings for CouchDB
// exports.db = 'couchdb';
// exports.dbUrl = 'http://127.0.0.1:5984/test';

// or if you want to use MongoDB
exports.db = 'mongodb';
exports.dbUrl = 'mongodb://127.0.0.1/test';
exports.dbCollection = 'nodetest-users';

// email settings (same as nodemailer)
exports.emailType = 'Stub';
exports.emailSettings = {
  service: 'none',
  auth: {
    user: 'none',
    pass: 'none'
  }
};
