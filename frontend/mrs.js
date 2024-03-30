const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    console.log('loaded');
    try {
        const response = await axios.get(`${BASE_URL}/MRS`);
        console.log(response.data);

        const MRSDOM = document.getElementById('MRS');
        if (MRSDOM) {
            let htmlData = `<table>`;
            htmlData += `
                <tr>
                <th>ID</th>
                <th>Name-Surname</th>
                <th>Age</th>
                <th>Chronic Disease</th>
                <th>Date of Service</th>
                <th>Initial Symptoms</th>
                <th>Diagnosis</th>
                <th>Treatment and Prescribed Medication</th>
                <th>Appointment Date</th>
                <th>Attending Physician</th>
                <th>Attending Details</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>`;

            for (let i = 0; i < response.data.length; i++) {
                let MRS= response.data[i];
                let DateofServices = new Date(MRS.date_of_service).toLocaleString('th-TH');
                let AppointmentDate = new Date(MRS.appointment_date).toLocaleString('th-TH');
                htmlData += `
                    <tr> 
                <td>${MRS.id}</td>
                <td>${MRS.name_surname}</td>
                <td>${MRS.age}</td>
                <td>${MRS.chronic_disease}</td>
                <td>${DateofServices}</td>
                <td>${MRS.initial_symptoms}</td>
                <td>${MRS.diagnosis}</td>
                <td>${MRS.treatment_and_prescribed_medication}</td>
                <td>${AppointmentDate}</td>
                <td>${MRS.attending_physician}</td>
                <td>${MRS.appointment_details}</td>
                <td><a href="home.html?id=${MRS.id}">แก้ไข</a></td>
                <td><button class="delete-button" data-id="${MRS.id}">ลบ</button></td>
                    </tr>`;
            }

            htmlData += '</table>';
            MRSDOM.innerHTML = htmlData;

            const deleteDOMs = document.getElementsByClassName('delete-button');
            for (let i = 0; i < deleteDOMs.length; i++) {
                deleteDOMs[i].addEventListener('click', async (event) => {
                    const id = event.target.dataset.id;
                    try {
                        await axios.delete(`${BASE_URL}/MRS/${id}`);
                        loadData();
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log('MRSDOM not found');
        }
    } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., display a message to the user
    }
};
