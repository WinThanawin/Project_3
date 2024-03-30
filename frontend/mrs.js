const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Medical_Records_System`);
        const Medical_Records_SystemData = response.data;
        renderInventory(Medical_Records_SystemData);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

const renderInventory = (Medical_Records_SystemData) => {
    const Medical_Records_SystemDOM = document.getElementById('Medical_Records_System');
    let htmlData = `
        <table>
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
            </tr>
    `;

    Medical_Records_SystemData.forEach(Medical_Records_System => {
        htmlData += `
            <tr>
                <td>${Medical_Records_System.id}</td>
                <td>${Medical_Records_System.name_surname}</td>
                <td>${Medical_Records_System.age}</td>
                <td>${Medical_Records_System.chronic_disease}</td>
                <td>${Medical_Records_System.date_of_service}</td>
                <td>${Medical_Records_System.initial_symptoms}</td>
                <td>${Medical_Records_System.diagnosis}</td>
                <td>${Medical_Records_System.treatment_and_medication}</td>
                <td>${Medical_Records_System.appointment_date}</td>
                <td>${Medical_Records_System.attending_physician}</td>
                <td>${Medical_Records_System.appointment_details}</td>
                <td><a href='Home.html?id=${Medical_Records_System.id}' class='edit-button'>Edit</a></td>
                <td><button class='delete-button' data-id='${Medical_Records_System.id}'>Delete</button></td>
            </tr>
        `;
    });

    htmlData += '</table>';
    Medical_Records_SystemDOM.innerHTML = htmlData;

    Medical_Records_SystemDOM.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${BASE_URL}/Medical_Records_System/${id}`);
                loadData();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    });
};
