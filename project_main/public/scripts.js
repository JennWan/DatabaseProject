/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

// Fetches data from the demotable and displays it.
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/demotable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const nameValue = document.getElementById('insertName').value;

    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

async function insertRatesTable(event) {
    event.preventDefault();
    const foodRatingValue = document.getElementById('insertFoodRating').value;
    const serviceRatingValue = document.getElementById('insertServiceRating').value;
    const affordabilityRatingValue = document.getElementById('insertAffordabilityRating').value;
    const reviewIDValue = document.getElementById('insertReviewID').value;
    const restaurantNameValue = document.getElementById('insertRestaurantName').value;
    const restaurantLocationValue = document.getElementById('insertRestaurantLocation').value;


    const response = await fetch('/insert-rates-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            foodRating: foodRatingValue,
            serviceRating: serviceRatingValue,
            affordabilityRating: affordabilityRatingValue,
            reviewID: reviewIDValue,
            restaurantName: restaurantNameValue,
            restaurantLocation: restaurantLocationValue
        })
    });


    const responseData = await response.json();
    const messageElement = document.getElementById('insertRatesResultMsg');


    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
    } else {
        messageElement.textContent = "Error inserting data! Make sure foreign keys match.";
    }
}

async function deleteJournal2Table(event) {
    event.preventDefault();

    const titleValue = document.getElementById('insertTitle').value;
    const descriptionValue = document.getElementById('insertDescription').value;

    const response = await fetch('/delete-journal2-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue,
            description: descriptionValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteJournal2ResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
    } else {
        messageElement.textContent = "Error inserting data! Make sure foreign keys match.";
    }
}

// projects on the restaurant1 table
async function projectRestaurant(event) {
    event.preventDefault();

    const cuisineTagValue = document.getElementById('projectCuisineTag');
    const menuValue = document.getElementById('projectMenu');

    // get full table
    const response = await fetch('/project-restaurant', {
        method: 'GET'
    });

    const responseData = await response.json();
    const restaurantTableContent = responseData.data;

    const tableElement = document.getElementById('displayRestaurant');
    const tableBody = tableElement.querySelector('tbody');

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    // display columns you want
    let displayCol0 = cuisineTagValue.checked;
    let displayCol1 = menuValue.checked;
    restaurantTableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            if (index === 0 && !displayCol0) {
                return;
            }
            if (index === 1 && !displayCol1) {
                return;
            }
            cell.textContent = field;
        });
    });
}

async function aggregationHaving() {
    const tableElement = document.getElementById('displayHaving');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/aggregation-having', {
        method: 'GET'
    });

    const responseData = await response.json();
    const havingTableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    havingTableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function displayJournal2Table() {
    const tableElement = document.getElementById('displayJournal2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/display-journal2-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const journal2Content = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    journal2Content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

// Function to add more condition blocks dynamically
function addSearchCondition() {
    var conditionDiv = document.createElement('div');
    conditionDiv.classList.add('condition');
    conditionDiv.innerHTML = `
        <select name="attribute[]">
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="waitlistID">Waitlist ID</option>
        </select>
        <select name="operator[]">
            <option value="=">=</option>
            <option value="!=">!=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&lt;=</option>
            <option value=">=">&gt;=</option>
        </select>
        <input type="text" name="value[]" placeholder="Enter value">
        <select name="logical_operator[]">
            <option value="AND">AND</option>
            <option value="OR">OR</option>
        </select>
    `;
    document.getElementById('searchConditions').appendChild(conditionDiv);
}

// Handle the search form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Collect the search parameters
    var attributes = document.querySelectorAll('[name="attribute[]"]');
    var operators = document.querySelectorAll('[name="operator[]"]');
    var values = document.querySelectorAll('[name="value[]"]');
    var logicalOperators = document.querySelectorAll('[name="logical_operator[]"]');

    var conditions = [];
    for (let i = 0; i < attributes.length; i++) {
        var attribute = attributes[i].value;
        var operator = operators[i].value;
        var value = values[i].value;
        var logicalOperator = i < logicalOperators.length ? logicalOperators[i].value : '';

        // Prepare the condition (e.g., "name = 'John'")
        conditions.push(`${attribute} ${operator} '${value}'`);

        // Add logical operator if it's not the last condition
        if (i < attributes.length - 1) {
            conditions.push(logicalOperator);
        }
    }

    // Join the conditions with spaces and prepare the query
    var queryString = conditions.join(' ');

    // Send the query to the server (use fetch to send AJAX request)
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: queryString })
    })
        .then(response => response.json())
        .then(data => {
            // Display the results in the table
            var tableBody = document.getElementById('searchResults').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Clear existing rows

            if (data.length > 0) {
                data.forEach(row => {
                    var tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td>${row.name}</td>
                    <td>${row.location}</td>
                    <td>${row.waitlistID}</td>
                `;
                    tableBody.appendChild(tr);
                });
            } else {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="3">No results found.</td>';
                tableBody.appendChild(tr);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
    } else {
        alert("Error in count demotable!");
    }
}

async function countDineInOrder() {
    const tableElement = document.getElementById('displayGroupBy');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/count-dineinorder', {
        method: 'GET'
    });

    const responseData = await response.json();
    const havingTableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    havingTableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("deleteJournal2Table").addEventListener("submit", deleteJournal2Table);
    document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    document.getElementById("projectRestaurant").addEventListener("submit", projectRestaurant);
    document.getElementById("countDemotable").addEventListener("click", countDemotable);
    document.getElementById("havingAggregation").addEventListener("click", aggregationHaving);
    document.getElementById("countDineInOrder").addEventListener("click", countDineInOrder);
    document.getElementById("insertRatesTable").addEventListener("submit", insertRatesTable);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
}