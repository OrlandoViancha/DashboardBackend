const {connection_database} = require('../data/connection_db')
const { queries } = require('../data/queries')
const oracledb = require('oracledb');

const getQueries = async (req, res) => {
  const results = [];
  const connection = await connection_database();
  let i = 0;
  for (const query of queries) {
    const querie_result = await connection.execute(query,[],{ outFormat: oracledb.OUT_FORMAT_OBJECT })
    results.push({ queryNumber: i + 1, result: querie_result.rows });
    i++;
  }
  
  await connection.close();

  res.send(results)
}

module.exports = { getQueries };