const CsvParser = require("json2csv").Parser;
const db=require('../../models')
const moment= require('moment')
const _ = require('lodash');

const Himachal = db.himachal
const HimachalIVRS= db.ivrsHimachal
// const sequelize = Himachal.Sequelize
const sequelize  = require('sequelize')

// const { Op } = require('sequelize');







const himachalAllData = async (req,res)=>{
    



  let results = await db.sequelize.query(
    `SELECT t2.Response,
    COUNT( CASE WHEN t2.UploadDate='2022-08-02' THEN t2.Response END) AS R_2022_08_02,
    COUNT( CASE WHEN t2.UploadDate='2022-08-03' THEN t2.Response END) AS R_2022_08_03,
    COUNT( CASE WHEN t2.UploadDate='2022-10-07' THEN t2.Response END) AS R_2022_10_07
FROM himachalvotersdata t1
JOIN himachalIvrs t2 ON t1.mobile = t2.mobile
WHERE t2.UploadDate IN ('2022-08-02', '2022-08-03', '2022-10-07')
GROUP BY t2.Response;`,
{
  replacements: [],
  type: db.sequelize.QueryTypes.SELECT,
}
)
  res.render('himachaldata',{'results':JSON.stringify(results)})
 


//   res.send(results)
//   console.log(results.length)
}

const himachalresponse = async(req,res)=>{
  let data = await db.sequelize.query(
    `SELECT t2.Response,
    COUNT( CASE WHEN t2.UploadDate='2022-08-02' THEN t2.Response END) AS R_2022_08_02,
    COUNT( CASE WHEN t2.UploadDate='2022-08-03' THEN t2.Response END) AS R_2022_08_03,
    COUNT( CASE WHEN t2.UploadDate='2022-10-07' THEN t2.Response END) AS R_2022_10_07
FROM himachalvotersdata t1
JOIN himachalIvrs t2 ON t1.mobile = t2.mobile
WHERE t2.UploadDate IN ('2022-08-02', '2022-08-03', '2022-10-07')
GROUP BY t2.Response;`,
{
  replacements: [],
  type: db.sequelize.QueryTypes.SELECT,
}
)
  res.render('himachaldata',{'data':JSON.stringify(data)})

}

const himachadata = async (req,res)=>{
  try {
    // const himdata = await Himachal.findAll({
    //   attributes: ['Response_2022_08_02', 'Response_2022_08_03', 'Response_2022_10_07', 'AGE', 'AC_Name', [sequelize.fn('COUNT', '*'), 'count']],
    //   where: {
    //     [sequelize.Op.or]: [
    //       { Response_2022_08_02: { [sequelize.Op.ne]: null } },
    //       { Response_2022_08_03: { [sequelize.Op.ne]: null } },
    //       { Response_2022_10_07: { [sequelize.Op.ne]: null } },
    //       { AGE: { [sequelize.Op.ne]: null } },
    //       { AC_Name: { [sequelize.Op.ne]: null } }
    //     ]
    //   },
    //   group: ['Response_2022_08_02', 'Response_2022_08_03', 'Response_2022_10_07', 'AGE', 'AC_Name']
    // });
  
    
    const himdata= await Himachal.findAll({
     
		  // subQuery: true,
      attributes: [
        'id',
        'GENDER',
        'mobile',
        'state',
        'AC_Number',
        'AC_Name',
        'AGE',
        [
          sequelize.literal(
            "(IF(t2.UploadDate='2022-08-02', t2.Response, NULL))"
          ),
          'R_2022_08_02'
        ],
        [
          sequelize.literal(
            "(IF(t2.UploadDate='2022-08-03', t2.Response, NULL))"
          ),
          'R_2022_08_03'
        ],
        [
          sequelize.literal(
            "(IF(t2.UploadDate='2022-10-07', t2.Response, NULL))"
          ),
          'R_2022_10_07'
        ]
      ],
      
      include: [
        {
          model: HimachalIVRS,
          as: 't2',
          required: true,
          attributes: [],
          
        },
        
      ],
      distinct: true,
    });
    
    
    // res.send(himdata);
    res.render('dashboard',{'himdata':JSON.stringify(himdata)})
    // res.send(himdata)
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while trying to get data from the Himachal model.' });
  }
};

const himachalcount = async (req,res)=>{
    



  let results = await db.sequelize.query(
    `SELECT Response_2022_08_02,Response_2022_08_03,Response_2022_10_07,AGE,AC_Name,COUNT(*)
    FROM himachalvotersdata
    where Response_2022_08_02 IS NOT NULL or Response_2022_08_03 IS NOT NULL or Response_2022_10_07 IS NOT NULL or AGE IS NOT NULL or AC_NAME IS NOT NULL
    GROUP BY Response_2022_08_02,Response_2022_08_03,Response_2022_10_07,AGE,AC_Name;`,
{
  replacements: [],
  type: db.sequelize.QueryTypes.SELECT,
}
)
  // res.render('himachaldata',{'results':JSON.stringify(results)})
 


  res.send(results)
//   console.log(results.length)
}


const himachaljoin = async (req,res)=>{
//   console.log('Before query');
// const maxDate = await HimachalIVRS.max('UploadDate', {
//     attributes: ['Response'],
//     group: ['mobile'],
//     raw: true
// });
// console.log('After max date query');
// const results = await  Himachal.findAll({
//     attributes: ['id', 'GENDER', 'mobile', 'state', 'AC_Number', 'AC_Name', 'AGE'],
//     include: [{
//         model: HimachalIVRS,
//         where: {
//             UploadDate: maxDate
//         }
//     }],
//     group: ['id', 'GENDER', 'mobile', 'state', 'AC_Number', 'AC_Name', 'AGE'],
//     raw: true
// });
// console.log(results);
// console.log('After find all query');
// res.send(results);
// await db.sequelize.query("SET @sql = NULL; SELECT GROUP_CONCAT(DISTINCT CONCAT('MAX(CASE WHEN UploadDate = ''', UploadDate, ''' THEN response ELSE NULL END) AS `', DATE_FORMAT(UploadDate, '%Y-%m-%d'), '`')) INTO @sql FROM himachalIvrs; SET @sql = CONCAT('SELECT t1.id, t1.GENDER, t1.mobile, t1.state, t1.AC_Number, t1.AC_Name, t1.AGE, ', @sql, ' FROM himachalvotersdata t1 JOIN himachalIvrs t2 ON t1.mobile = t2.mobile GROUP BY t1.id, t1.GENDER, t1.mobile, t1.state, t1.AC_Number, t1.AC_Name, t1.AGE'); PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;", { type: db.sequelize.QueryTypes.SELECT })
//   .then(results => {
//     res.send(results)
//     // do something with the results
//   })
//   .catch(err => {
//     console.error(err);
//     // handle the error
//   });

const subquery = await db.sequelize.query(
  'SELECT DISTINCT UploadDate FROM himachalIvrs',
  { type: db.sequelize.QueryTypes.SELECT }
)

const subqueryValues = subquery.map(row => `MAX(CASE WHEN UploadDate = '${row.UploadDate}' THEN response ELSE NULL END) AS '${row.UploadDate}'`)

const query = await db.sequelize.query(
  `SELECT t1.id, t1.GENDER, t1.mobile, t1.state, t1.AC_Number, t1.AC_Name, t1.AGE, ${subqueryValues.join(',')}
  FROM himachalvotersdata t1 JOIN himachalIvrs t2 ON t1.mobile = t2.mobile
  GROUP BY t1.id, t1.GENDER, t1.mobile, t1.state, t1.AC_Number, t1.AC_Name, t1.AGE`,
  { type: db.sequelize.QueryTypes.SELECT }
)
res.send(query)
console.log(query.length)

}

const himAcName= async (req,res,)=>{
  const  result = await db.sequelize.query(`SELECT DISTINCT AC_Name FROM himachalvotersdata ORDER BY AC_Name ASC `)

  res.render ('himdropdown',{'result':result})
    // res.send(result)
}

// const himall =  (req,res,next)=>{
//   //  let query;

//    const type = req.query.type;

//    const search_query = req.query.parent_value;

//     if(type == 'load_GENDER')
//     {
//        var query = `
//         SELECT DISTINCT GENDER AS Data FROM himachalvotersdata 
//         WHERE AC_Name = '${search_query}' 
//         ORDER BY GENDER ASC
//         `;
//     }

//     if(type == 'load_Response_2022_08_02')
//     {
//        var query = `
//         SELECT Response_2022_08_02 AS Data FROM himachalvotersdata  
//         WHERE GENDER = '${search_query}' 
//         ORDER BY Response_2022_08_02 ASC
//         `;
//     }

//       db.sequelize.query(query, function(error, data){
//       console.log(data)

//        const data_arr = [];

//         data.forEach((row)=>{
//           row.forEach((col)=>{
//             data_arr.push(col.Data);

//           })
           
//         });

//         res.json(data_arr);
//         // res.send(data_arr)
//         console.log(data_arr);

//     });



// }
const himall = async (req, res, next) => {
  try {
    // Validate and sanitize user input
    const type = req.query.type;
    const search_query = req.query.parent_value;

    // Extract SQL query logic into a separate function
    const query = buildSQLQuery(type, search_query);
    console.log(query);

    // Execute the query
    const data = await db.sequelize.query(query);
    // console.log(data)

    // Create an array of the query results
    // const data_arr = data.map((row) => row.Data);
    // const data_arr = data.map((arr) => {
    //   return arr.map((row) => {
    //     return row.GENDER, row.Response_2022_08_02;
    //   });
    // })
    const data_arr = data.map((arr) => {
      return arr.map((row) => {
        return row.Data;
      });
    })

    let result = Array.from(new Set(_.flattenDeep(data_arr)));

    // const data_arr = data.map((arr) => {
    //   return arr.map((n) => {
    //     return n.Data;
    //   });
    // });

    console.log(result)



    // Send the array back to the client
    // res.json(data_arr);
    res.send(result)
  } catch (error) {
    // Handle errors and provide a meaningful message to the client
    res.status(500).send(error.message);
    console.log(error);
  }
};

function buildSQLQuery(type, search_query) {
  let query;
  if (type === 'load_GENDER') {
    query = `
        SELECT DISTINCT GENDER as Data FROM   himachalvotersdata 
        WHERE AC_Name = '${search_query}' 
        ORDER BY GENDER ASC
    `;
  }if(type ==='load_Response_2022_08_02'){
    query = `
    SELECT DISTINCT Response_2022_08_02 as Data  FROM himachalvotersdata 
    WHERE AC_Name = '${search_query}' 
    ORDER BY Response_2022_08_02 ASC
`;

  }
  return query;

}






module.exports = {
 
    himachalAllData,
    himachalresponse,
    himachadata,
    himachalcount,
    himachaljoin,
    himAcName,
    himall
  };
  
  