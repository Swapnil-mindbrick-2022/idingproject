const CsvParser = require("json2csv").Parser;
const db=require('../../models')

const Himachal = db.himachal
const HimachalIVRS= db.ivrsHimachal
// const sequelize = Himachal.Sequelize
const sequelize  = require('sequelize')







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
    // res.render('dashboard',{'himdata':JSON.stringify(himdata)})
    res.send(himdata)
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while trying to get data from the Himachal model.' });
  }
};



module.exports = {
 
    himachalAllData,
    himachalresponse,
    himachadata
  };
  
  