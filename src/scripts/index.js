addEventListener('DOMContentLoaded', async (event) => {
  const url = 'https://x8ki-letl-twmt.n7.xano.io/api:I8m-w2H2/victim_key';
  let data = [];

  // Function to fetch and display data
  async function fetchData() {
    try {
      const response = await axios.get(url);
      data = response.data;

      // Ensure we have valid data
      if (Array.isArray(data) && data.length > 0) {
        const tableBody = document.querySelector('tbody');

        // Clear previous table data
        tableBody.innerHTML = '';

        // Iterate over the fetched data and create rows for the table
        data.forEach((victim, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${victim.value}</td>
        <td>${victim.key}</td>
        <td>${new Date(victim.created_at).toLocaleString()}</td>
        <td><button class="btn btn-danger" id="${
          victim.id
        }">Delete</button></td>
      `;
          tableBody.appendChild(row);
        });
      } else {
        document.querySelector('#noKey').innerText = 'No Key Found.';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function deleteUserById(id) {
    try {
      // Use backticks and template literals to inject the URL correctly
      const response = await axios.delete(`${url}/${id}`);

      // Check if the deletion was successful (status code 200)
      if (response.status === 200) {
        alert('Data has been deleted!');
        location.reload();
      }
    } catch (error) {
      // Handle errors more gracefully
      console.error('Error deleting data:', error);
      alert('An error occurred while deleting the data.');
    }
  }

  function searchData(query) {
    return data.filter((d) => d.value.includes(query.toLowerCase()));
  }

  // Call fetchData to load data when the page loads
  await fetchData();

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dataFiltered = searchData(this.uid.value);

    const tableBody = document.querySelector('#victimTable tbody');

    if (Array.isArray(data) && dataFiltered.length > 0) {
      // Clear previous table data
      tableBody.innerHTML = '';
      document.querySelector('#noKey').innerText = '';

      // Iterate over the fetched data and create rows for the table
      dataFiltered.forEach((victim, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${victim.value}</td>
        <td>${victim.key}</td>
        <td>${new Date(victim.created_at).toLocaleString()}</td>
      `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = '';
      document.querySelector('#noKey').innerText = 'No Key Found.';
    }
  });

  document.querySelectorAll('.btn-danger').forEach((button) => {
    button.addEventListener('click', function () {
      const userId = this.id;
      deleteUserById(userId); // Call the function to delete the user
    });
  });
});
