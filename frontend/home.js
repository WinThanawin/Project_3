const BASE_URL = 'http://localhost:8000';

let mode = "CREATE"; // default mode
let selectedId = "";

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        mode = "EDIT";
        selectedId = id;
       
    try {
        const response = await axios.get(`${BASE_URL}/MRS/${id}`);
        const MRS = response.data;

        let name_surnameDOM = document.querySelector("input[name=name_surname]");
        let ageDOM = document.querySelector("input[name=age]");
        let chronic_diseaseDOM = document.querySelector("input[name=chronic_disease]");
        let date_of_serviceDOM = document.querySelector("input[name=date_of_service]");
        let initial_symptomsDOM = document.querySelector("input[name=initial_symptoms]");
        let diagnosisDOM = document.querySelector("input[name=diagnosis]");
        let treatment_and_prescribed_medicationDOM = document.querySelector("input[name=treatment_and_prescribed_medication]");
        let appointment_dateDOM = document.querySelector("input[name=appointment_date]");
        let attending_physicianDOM = document.querySelector("input[name=attending_physician]");
        let appointment_detailsDOM = document.querySelector("input[name=appointment_details]");

        name_surnameDOM.value = MRS.name_surname;
        ageDOM.value = MRS.age;
        chronic_diseaseDOM.value = MRS.chronic_disease;
        date_of_serviceDOM.value = MRS.date_of_service;
        initial_symptomsDOM.value = MRS.initial_symptoms;
        diagnosisDOM.value = MRS.diagnosis;
        treatment_and_prescribed_medicationDOM.value = MRS.treatment_and_prescribed_medication;
        appointment_dateDOM.value = MRS.appointment_date;
        attending_physicianDOM.value = MRS.attending_physician;
        appointment_detailsDOM.value = MRS.appointment_details;    

        
      
    } catch (error) {
        console.log("Error", error);
        }
    }
}

const validateData = (userData) => {
    let errors = []
    if (!userData.name_surname) {
      errors.push('กรุณากรอกชื่อ-สกุล')
    }
    if (!userData.age) {
      errors.push('กรุณากรอกอายุ')
    }
    if (!userData.chronic_disease) {
      errors.push('กรุณากรอกโรคประจำตัว')
    }
    if (!userData.date_of_service) {
      errors.push('กรุณากรอกวันที่รับบริการ')
    }
    if (!userData.initial_symptoms) {
      errors.push('กรุณากรอกอาการเบื้องต้น')
    }
    if (!userData.diagnosis) {
      errors.push('กรุณากรอกการวินิจฉัย')
    }
    if (!userData.treatment_and_prescribed_medication) {
      errors.push('กรุณากรอกการรักษาและยาที่จ่าย')
    }
    if (!userData.appointment_date) {
      errors.push('กรุณากรอกวันนัด')
    }
    if (!userData.attending_physician) {
      errors.push('กรุณากรอกแพทย์ผู้รักษา')
    }
    if (!userData.appointment_details) {
      errors.push('กรุณากรอกรายละเอียดการนัด')
    }
    return errors
  }

  const submitData = async () => {
    let messageDOM = document.getElementById('message');

    try {
        let userData = {
            name_surname : document.querySelector("input[name=name_surname]").value,
            age : document.querySelector("input[name=age]").value,
            chronic_disease : document.querySelector("input[name=chronic_disease]").value,
            date_of_service : document.querySelector("input[name=date_of_service]").value,
            initial_symptoms : document.querySelector("input[name=initial_symptoms]").value,
            diagnosis : document.querySelector("input[name=diagnosis]").value,
            treatment_and_prescribed_medication : document.querySelector("input[name=treatment_and_prescribed_medication]").value,
            appointment_date : document.querySelector("input[name=appointment_date]").value,
            attending_physician : document.querySelector("input[name=attending_physician]").value,
            appointment_details : document.querySelector("input[name=appointment_details]").value                
        };
    
        console.log("submitData", userData);

        const errors = validateData(userData);
        if (errors.length > 0) {
            throw {
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
                errors: errors
            };
        }

        let message = "บันทึกข้อมูลสำเร็จ";
        if (mode === "CREATE") {
            const response = await axios.post(`${BASE_URL}/MRS`, userData);
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/MRS/${selectedId}`, userData);
            message = "แก้ไขข้อมูลสำเร็จ";
            console.log('response', response.data);
        }

        messageDOM.innerText = message;
        messageDOM.className = "message success";
    } catch (error) {
        console.log('error message', error.message);
        console.log("error", error.errors);

        if (error.response) {
            console.log(error.response.data.message);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }

        let htmlData = '<div>';
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = "message danger";
    }
};
