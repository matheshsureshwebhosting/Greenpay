var admin = require("firebase-admin");
var serviceAccount = require("./greenpay-in-firebase-adminsdk-1p9go-417e229854.json");
// var serviceAccount = require("./test-35516-firebase-adminsdk-wjgbf-a639255f9d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports=admin
