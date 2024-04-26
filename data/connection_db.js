const oracledb = require('oracledb');

const connection_database = () => {

 try {

  const connection =  oracledb.getConnection({
   user: "pedidos",
   password: "p1234",
   connectionString: "localhost:1521/orcl"

  });

  return connection;

 } catch (error) {
  
  console.log(error.message)
 }

};

module.exports = { connection_database };