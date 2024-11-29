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
        displayRatesTable();
    } else {
        messageElement.textContent = "Error inserting data! Make sure foreign keys match or invalid characters used in input: ; = '";
    }
}

async function displayRatesTable() {
    const tableElement = document.getElementById('displayRates');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/display-rates-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const ratesContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    ratesContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
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
        messageElement.textContent = "Data deleted successfully!";
        displayJournal2Table();
    } else {
        messageElement.textContent = "Error deleting data! Make sure foreign keys match.";
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

// Function to add more condition blocks dynamically
// function addSearchCondition() {
//     var conditionDiv = document.createElement('div');
//     conditionDiv.classList.add('condition');
//     conditionDiv.innerHTML = `
//         <select name="attribute[]">
//             <option value="name">Name</option>
//             <option value="location">Location</option>
//             <option value="waitlistID">Waitlist ID</option>
//         </select>
//         <select name="operator[]">
//             <option value="=">=</option>
//             <option value="!=">!=</option>
//             <option value="<">&lt;</option>
//             <option value=">">&gt;</option>
//             <option value="<=">&lt;=</option>
//             <option value=">=">&gt;=</option>
//         </select>
//         <input type="text" name="value[]" placeholder="Enter value">
//         <select name="logical_operator[]">
//             <option value="AND">AND</option>
//             <option value="OR">OR</option>
//         </select>
//     `;
//     document.getElementById('searchConditions').appendChild(conditionDiv);
// }

// Handle the search form submission
// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form from submitting normally
//
//     // Collect the search parameters
//     var attributes = document.querySelectorAll('[name="attribute[]"]');
//     var operators = document.querySelectorAll('[name="operator[]"]');
//     var values = document.querySelectorAll('[name="value[]"]');
//     var logicalOperators = document.querySelectorAll('[name="logical_operator[]"]');
//
//     var conditions = [];
//     for (let i = 0; i < attributes.length; i++) {
//         var attribute = attributes[i].value;
//         var operator = operators[i].value;
//         var value = values[i].value;
//         var logicalOperator = i < logicalOperators.length ? logicalOperators[i].value : '';
//
//         // Prepare the condition (e.g., "name = 'John'")
//         conditions.push(`${attribute} ${operator} '${value}'`);
//
//         // Add logical operator if it's not the last condition
//         if (i < attributes.length - 1) {
//             conditions.push(logicalOperator);
//         }
//     }
//
//     // Join the conditions with spaces and prepare the query
//     var queryString = conditions.join(' ');
//
//     // Send the query to the server (use fetch to send AJAX request)
//     fetch('/search', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ query: queryString })
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Display the results in the table
//             var tableBody = document.getElementById('searchResults').getElementsByTagName('tbody')[0];
//             tableBody.innerHTML = '';  // Clear existing rows
//
//             if (data.length > 0) {
//                 data.forEach(row => {
//                     var tr = document.createElement('tr');
//                     tr.innerHTML = `
//                     <td>${row.name}</td>
//                     <td>${row.location}</td>
//                     <td>${row.waitlistID}</td>
//                 `;
//                     tableBody.appendChild(tr);
//                 });
//             } else {
//                 var tr = document.createElement('tr');
//                 tr.innerHTML = '<td colspan="3">No results found.</td>';
//                 tableBody.appendChild(tr);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// });

async function searchRestaurant(event) {
    event.preventDefault();

    const conditionsValue = document.getElementById('insertConditions').value;

    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conditions: conditionsValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('searchRestaurantMsg');

    if (responseData.success) {
        messageElement.textContent = "Searched successfully!";
    } else {
        messageElement.textContent = "Error searching data! Make sure you have inputted valid conditions.";
    }
}

async function countDineInOrder() {
    const tableElement = document.getElementById('displayGroupBy');
    const tableBody = tableElement.querySelector('tbody');


    const response = await fetch('/count-pickuporder', {
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

async function nestedAggregation() {
    const tableElement = document.getElementById('displayNested');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/nested-aggregation', {
        method: 'GET'
    });

    const responseData = await response.json();
    const nestedTableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    nestedTableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function displayReview2Table() {
    const tableElement = document.getElementById('displayReview2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/display-Review2-table', {
        method: 'GET'
    });

    const responseData = await response.json();
    const Review2Content = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    Review2Content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Updates Tuples in Review2 Table.
async function updateReview2(event) {
    event.preventDefault();

    const jid = document.getElementById('journalID').value;
    const column = document.getElementById('Column').value;
    const newValue = document.getElementById('updateNewValue').value;

    const response = await fetch('/update-review2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            journalID: jid,
            column: column,
            newValue: newValue
        })
    });
    const responseData = await response.json();
    const messageElement = document.getElementById('updateReviewResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Updated successfully!";
    } else {
        messageElement.textContent = `${responseData.error}`;
    }
}

// Restaurant2 Joins Restaurant_Staff1 Where restaurantName = name
// AND restaurantLocation = locationTuples in Review2 Table.
async function joinRestaurantStaff1(event) {
    event.preventDefault();

    const tableElement = document.getElementById('displayJoins');
    const tableBody = tableElement.querySelector('tbody');

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;

    const response = await fetch('/join-restaurant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            RName: name, //label must match with const created with req in app controller
            RLoc: location
        })
    });

    const Data = await response.json();
    const havingTableContent = Data.data;

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

// Rates divided by Review1
// See ratings by business
async function Division(event) {
    event.preventDefault();

    const tableElement = document.getElementById('displayDivision');
    const tableBody = tableElement.querySelector('tbody');

    const name = document.getElementById('Rname').value;

    const response = await fetch('/division', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            RestaurantName: name
        })
    });

    const response_data = await response.json();
    const havingTableContent = response_data.data;

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
    displayReview2Table();
    document.getElementById("deleteJournal2Table").addEventListener("submit", deleteJournal2Table);
    document.getElementById("projectRestaurant").addEventListener("submit", projectRestaurant);
    document.getElementById("havingAggregation").addEventListener("click", aggregationHaving);
    // document.getElementById("searchRestaurant").addEventListener("click", searchRestaurant);
    document.getElementById("nestedAggregation").addEventListener("click", nestedAggregation);
    document.getElementById("countPickUpOrder").addEventListener("click", countDineInOrder);
    document.getElementById("insertRatesTable").addEventListener("submit", insertRatesTable);
    document.getElementById("updateReview2").addEventListener("submit", updateReview2);
    document.getElementById("joinRestaurantStaff").addEventListener("submit", joinRestaurantStaff1);
    document.getElementById("Division").addEventListener("submit", Division);
};

// General function to refresh the displayed table data.
// You can invoke this after any table-modifying operation to keep consistency.
// function fetchTableData() {
//     fetchAndDisplayUsers();
// }