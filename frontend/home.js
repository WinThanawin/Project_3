const BASE_URL = 'http://localhost:8000';

let mode = "CREATE"; // default mode
let selectedId = "";

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
        mode = "EDIT";
        selectedId = id;
        console.log('id', id);

        try {
            const response = await axios.get(`${BASE_URL}/Medical_Records_System/${id}`);
            const Medical_Records_System = response.data;

            let name_surnameDOM = document.querySelector("input[name=name_surname]");
            let ageDOM = document.querySelector("input[name=age]");
            let chronic_diseaseDOM = document.querySelector("input[name=chronic_disease]");
            let date_of_serviceDOM = document.querySelector("select[name=date_of_service]");
            let initial_symptomsDOM = document.querySelector("input[name=initial_symptoms]");
            let diagnosisDOM = document.querySelector("input[name=diagnosis]");
            let treatment_and_medicationDOM = document.querySelector("input[name=treatment_and_medication]");
            let appointment_dateDOM = document.querySelector("input[name=appointment_date]");
            let attending_physicianDOM = document.querySelector("input[name=attending_physician]");
            let appointment_detailsDOM = document.querySelector("input[name=appointment_details]");

            name_surnameDOM = Medical_Records_System.name_surname;
            ageDOM.value = Medical_Records_System.age;
            chronic_diseaseDOM.value = Medical_Records_System.chronic_disease;
            date_of_serviceDOM.value = Medical_Records_System.date_of_service;
            initial_symptomsDOM.value = Medical_Records_System.initial_symptoms;
            diagnosisDOM.value = Medical_Records_System.diagnosis;
            treatment_and_medicationDOM.value = Medical_Records_System.treatment_and_medication;
            appointment_dateDOM.value = Medical_Records_System.appointment_date;
            attending_physicianDOM.value = Medical_Records_System.attending_physician;
            appointment_detailsDOM.value = Medical_Records_System.appointment_details;

        } catch (error) {
            console.log("Error", error);
        }
    }
};

const validateData = (userData) => {
    let errors = [];
    if (!userData.name_surname) {
        errors.push("กรุณากรอกรหัสสินค้า");
    }
    if (!userData.age) {
        errors.push("กรุณากรอกชื่อสินค้า");
    }
    if (!userData.chronic_disease) {
        errors.push("กรุณากรอกจำนวนคงเหลือ");
    }
    if (!userData.date_of_service) {
        errors.push("กรุณากรอกราคาต่อหน่วย");
    }
    if (!userData.initial_symptoms) {
        errors.push("กรุณากรอกวันที่เบิกจ่าย");
    }
    if (!userData.diagnosis) {
        errors.push("กรุณากรอกจำนวนสินค้า");
    }
    if (!userData.treatment_and_medication) {
        errors.push("กรุณากรอกผู้รับผิดชอบ");
    }
    if (!userData.appointment_date) {
        errors.push("กรุณากรอกการเคลื่อนไหวของสินค้า");
    }
    if (!userData.attending_physician) {
        errors.push("กรุณากรอกจำนวนสินค้าคงเหลือ");
    }
    if (!userData.appointment_details) {
        errors.push("กรุณากรอกจำนวนสินค้าคงเหลือ");
    }
    return errors;
};

const submitData = async () => {

    let name_surnameDOM = document.querySelector("input[name=name_surname]");
    let ageDOM = document.querySelector("input[name=age]");
    let chronic_diseaseDOM = document.querySelector("input[name=chronic_disease]");
    let date_of_serviceDOM = document.querySelector("select[name=date_of_service]");
    let initial_symptomsDOM = document.querySelector("input[name=initial_symptoms]");
    let diagnosisDOM = document.querySelector("input[name=diagnosis]");
    let treatment_and_medicationDOM = document.querySelector("input[name=treatment_and_medication]");
    let appointment_dateDOM = document.querySelector("input[name=appointment_date]");
    let attending_physicianDOM = document.querySelector("input[name=attending_physician]");
    let appointment_detailsDOM = document.querySelector("input[name=appointment_details]");

    let messageDOM = document.getElementById('message');

    try {
        let userData = {
            name_surname : name_surnameDOM.value,
            age : ageDOM.value,
            chronic_disease : chronic_diseaseDOM.value,
            date_of_service : date_of_serviceDOM.value,
            initial_symptoms : initial_symptomsDOM.value,
            diagnosis : diagnosisDOM.value,
            treatment_and_medication : treatment_and_medicationDOM.value,
            appointment_date : appointment_dateDOM.value,
            attending_physician : attending_physicianDOM,
            appointment_dateD : appointment_detailsDOM,
        };

        const errors = validateData(userData);
        if (errors.length > 0) {
            throw {
                message: "กรอกข้อมูลไม่ครบถ้วน",
                errors: errors
            };
        }

        let message = "บันทึกข้อมูลเรียบร้อย";
        let response;
        if (mode === "CREATE") {
            response = await axios.post(`${BASE_URL}/Medical_Records_System`, userData);
            console.log('response', response.data);
        } else {
            response = await axios.put(`${BASE_URL}/Medical_Records_System/${selectedId}`, userData);
            message = "แก้ไขข้อมูลเรียบร้อย";
            console.log('response', response.data);
        }
        messageDOM.innerText = message;
        messageDOM.className = "message success";
    } catch (error) {
        console.log('error message', error.message);
        console.log("error", error.errors);

        if (error.response) {
            console.log(error.response.data.message)
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
