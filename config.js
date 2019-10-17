exports.DATABASE_URL = process.env.DATABASE_URL ||
    'mongodb+srv://sesham:pass@my-first-atlas-db-t87ys.azure.mongodb.net/doggone-app?retryWrites=true&w=majority'; 
//exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      //'mongodb://localhost/doggone-test';
exports.PORT = process.env.PORT || 3000;

exports.COLLECTION = 'dogs'; 
