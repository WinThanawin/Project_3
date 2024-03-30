const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(cors())

const port = 8000;

let Medical_Records_System =[]
let count = 1;
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

const validateData = (userData) => {
  let errors = []
  if (!userData.name_surname) {
    errors.push("กรุณากรอกชื่อ-สกุล")
  }
  if (!userData.age) {
    errors.push("กรุณากรอกอายุ")
  }
  if (!userData.chronic_disease) {
    errors.push("กรุณากรอกโรคประจำตัว")
  }
  if (!userData.date_of_service) {
    errors.push("กรุณากรอกวันที่รับบริการ")
  }
  if (!userData.initial_symptoms) {
    errors.push("กรุณากรอกอาการเบื้องต้น")
  }
  if (!userData.diagnosis) {
    errors.push("กรุณากรอกการวินิจฉัย")
  }
  if (!userData.treatment_and_medication) {
    errors.push("กรุณากรอกการรักษาและยาที่ให้")
  }
  if (!userData.appointment_date) {
    errors.push("กรุณากรอกการวันที่นัด")
  }
  if (!userData.attending_physician) {
    errors.push("กรุณากรอกแพทย์ที่นัด")
  }
  if (!userData.appointment_details) {
    errors.push("กรุณากรอกรายละเอียดการนัด")
  }
  return errors
}

app.get('/Medical_Records_System', async (req, res) => {
  const results = await conn.query('SELECT * FROM Medical_Records_System')
  res.json(results[0])
});

app.get('/Medical_Records_System/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM Medical_Records_System WHERE id = ?', id);
    if (results.length === 0) {
      throw { statusCode: 404, message: 'ไม่พบข้อมูล' };
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error message:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    });
  }
});

app.post('/Medical_Records_System', async (req, res) => {
  try {
    let Medical_Records_System = req.body;
    const errors = validateData(Medical_Records_System);
    if (errors.length > 0) {
      throw {
        message: "กรอกข้อมูลไม่ถูกต้อง",
        errors: errors
      };
    }

    const results = await conn.query("INSERT INTO Medical_Records_System SET ?", Medical_Records_System);

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


app.put('/Medical_Records_System/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updatedMedical_Records_System = req.body;
    const results = await conn.query('UPDATE Medical_Records_System SET ? WHERE id = ?', [updatedMedical_Records_System, id]);

    res.json({
      message: "อัปเดตข้อมูลผู้ป่วย",
      data: updatedMedical_Records_System
    });

  } catch (error) {
    console.error('Error message:', error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: 'เกิดข้อผิดพลาดบางอย่าง',
      errorMessage: error.message
    });
  }
});


app.delete('/Medical_Records_System/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('DELETE FROM Medical_Records_System WHERE id = ?', id)
    res.json({
      message: 'ลบข้อมูลผู้ป่วยสำเร็จ',
      data: results[0]
    })
  } catch (error) {
    console.log('errorMessage', error.message)
    res.status(500).json({
      message: 'something went wrong'
    })
  }
})

app.listen(port, async () => {
  await initMYSQL();
  console.log('Server is running on port',+ port);
});