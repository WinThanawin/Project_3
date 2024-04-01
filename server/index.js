const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());

const port = 8000;

let conn = null;

const initMYSQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8880
  });
};


const validateData = (MRSData) => {
  let errors = []
  if (!MRSData.name_surname) {
    errors.push('กรุณากรอกชื่อ-สกุล')
  }
  if (!MRSData.age) {
    errors.push('กรุณากรอกอายุ')
  }
  if (!MRSData.chronic_disease) {
    errors.push('กรุณากรอกโรคประจำตัว')
  }
  if (!MRSData.date_of_service) {
    errors.push('กรุณากรอกวันที่รับบริการ')
  }
  if (!MRSData.initial_symptoms) {
    errors.push('กรุณากรอกอาการเบื้องต้น')
  }
  if (!MRSData.diagnosis) {
    errors.push('กรุณากรอกการวินิจฉัย')
  }
  if (!MRSData.treatment_and_prescribed_medication) {
    errors.push('กรุณากรอกการรักษาและยาที่จ่าย')
  }
  if (!MRSData.appointment_date) {
    errors.push('กรุณากรอกวันนัด')
  }
  if (!MRSData.attending_physician) {
    errors.push('กรุณากรอกแพทย์ผู้รักษา')
  }
  if (!MRSData.appointment_details) {
    errors.push('กรุณากรอกรายละเอียดการนัด')
  }
  return errors
}


app.get('/MRS', async (req, res) => {
  try {
    const results = await conn.query('SELECT * FROM MRS');
    res.json(results[0]);
  } catch (error) {
    console.error('Error message:', error.message);
    res.status(500).json({
      message: 'something wrong',
      errorMessage: error.message
    });
  }
});

app.get('/MRS/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM MRS WHERE id = ?', id);

    if (results[0].length === 0) {
      throw { statusCode: 404, message: 'ไม่พบข้อมูล' };
    }

    res.json(results[0][0]);
  } catch (error) {
    console.error('Error message:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    });
  }
});


app.post('/MRS', async (req, res) => {
  try {
    let MRS = req.body;
    const errors = validateData(MRS);
    if (errors.length > 0) {
      throw {
        message: "กรอกข้อมูลไม่ครบถ้วน",
        errors: errors
      };
    }

    const results = await conn.query("INSERT INTO MRS SET ?", MRS);
    res.json({
      message: "สร้างข้อมูลใหม่สำเร็จ",
      data: results[0]
    });

  } catch (error) {
    const errorMessage = error.message || 'something went wrong';
    const errors = error.errors || [];
    console.error('errorMessage', errorMessage);
    res.status(500).json({
      message: errorMessage,
      errors: errors
    });
  }
});

app.put('/MRS/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body
    const results = await conn.query(
      'UPDATE MRS SET ? WHERE id = ?',
      [updateUser, id]
    )
    res.json({
      message: 'อัปเดทข้อมูลสำเร็จ',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'อัปเดทข้อมูลไม่สำเร็จ'
    })
  }
})


app.delete('/MRS/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('DELETE FROM MRS WHERE id = ?', id);
    res.json({
      message: 'ลบข้อมูลสำเร็จ',
      data: results[0]
    });
  } catch (error) {
    console.log('errorMessage', error.message);
    res.status(500).json({
      message: 'ลบข้อมูลไม่สำเร็จ'
    });
  }
});


app.listen(port, async () => {
  await initMYSQL();
  console.log('Server is running on port', + port);
});
