
const CsvParser = require("json2csv").Parser;
const db = require('../../models')
const IVRS = db.ivrs;
const readXlsxFile = require("read-excel-file/node");

const excel = require("exceljs")
// const { response } = require("express");
const fs = require("fs");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    
      //  row is an array of row . 
      // each row is aray of an cells .
    readXlsxFile(path).then((rows) => {
      

      // skip header
      rows.shift();
      let ivrss = [];
      // Parse Excel file to data objects
      console.log(rows)
      rows.forEach((row) => {
     

        let ivrs = {
          // userID: row[0],
          mobile: row[1],
          Response:row[2],
        //   Response2:row[3]
        
        }
        
        ivrss.push(ivrs);
      });
      
      IVRS.bulkCreate(ivrss)
        .then(() => {
          fs.unlink(path, (err) => {
            if (err) {
                throw err;
            }
        
            console.log("File is deleted.");
        });
          // res.status(200).send({
          //   message: "Uploaded the file successfully: " + req.file.originalname,
          // });
          res.send(ivrss)
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};





module.exports = {
  upload

};

