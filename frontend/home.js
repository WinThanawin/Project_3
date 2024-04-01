const BASE_URL = 'http://localhost:8000';

let mode = "CREATE";
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
        const date_of_service = new Date(MRS.date_of_service); 
        const appointment_date = new Date(MRS.appointment_date);
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


        date_of_service.setHours(date_of_service.getHours() + 7); 
         const formattedDate = date_of_service.toISOString().slice(0, 16); 
        appointment_date.setHours(appointment_date.getHours() + 7);
        const formattedDate2 = appointment_date.toISOString().slice(0, 16); 
        name_surnameDOM.value = MRS.name_surname;
        ageDOM.value = MRS.age;
        chronic_diseaseDOM.value = MRS.chronic_disease;
        date_of_serviceDOM.value = formattedDate;
        initial_symptomsDOM.value = MRS.initial_symptoms;
        diagnosisDOM.value = MRS.diagnosis;
        treatment_and_prescribed_medicationDOM.value = MRS.treatment_and_prescribed_medication;
        appointment_dateDOM.value = formattedDate2;
        attending_physicianDOM.value = MRS.attending_physician;
        appointment_detailsDOM.value = MRS.appointment_details;    

        
      
    } catch (error) {
        console.log("Error", error);
        }
    }
}

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

const submitData = async () => {
  let messageDOM = document.getElementById('message');

  try {
      let MRSData = {
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
  
      console.log("submitData", MRSData);

      const errors = validateData(MRSData);
      if (errors.length > 0) {
          throw {
              message: "กรุณากรอกข้อมูลให้ครบถ้วน",
              errors: errors
          };
      }

      let message = "บันทึกข้อมูลสำเร็จ";
      if (mode === "CREATE") {
          const response = await axios.post(`${BASE_URL}/MRS`, MRSData);
          console.log('response', response.data);
      } else {
          const response = await axios.put(`${BASE_URL}/MRS/${selectedId}`, MRSData);
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