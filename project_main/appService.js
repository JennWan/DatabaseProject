
const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                                       id NUMBER PRIMARY KEY,
                                       name VARCHAR2(20)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function insertRatesTable(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO RATES (foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation) VALUES (:foodRating, :serviceRating, :affordabilityRating, :reviewID, :restaurantName, :restaurantLocation)`,
            [foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation],
            { autoCommit: true }
        );


        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function deleteJournal2Table(title, description) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM JOURNAL2 WHERE title = :title AND description = :description`,
            [title, description],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function displayJournal2Table() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM JOURNAL2'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}


async function projectRestaurant(cuisineTag, menu) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * FROM Restaurant1'
        );
        return result.rows;
    });
}

async function searchRestaurant(queryString) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM Restaurant2 WHERE ${queryString}`
        );
        return result.rows;  // Return the rows that match the query
    }).catch(() => {
        return [];
    });
}

async function aggregationHaving() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT CAST(AVG(foodRating) AS DECIMAL(3, 2)) AS avgFoodRating, CAST(AVG(serviceRating) AS DECIMAL(3, 2)) AS avgServiceRating, CAST(AVG(affordabilityRating) AS DECIMAL(3, 2)) AS avgAffordabilityRating, restaurantName, restaurantLocation FROM Rates GROUP BY restaurantName, restaurantLocation HAVING Count(*) >= 2'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function countDineInOrder() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT accountID, Count(*) AS orderCount FROM DINEINORDER GROUP BY accountID'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function nestedAggregation() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * FROM (SELECT accountID, CAST(AVG(totalPrice) AS DECIMAL(6, 2)) AS avgTotalPrice FROM DineInOrder GROUP BY accountID) WHERE avgTotalPrice >= 100'
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable,
    insertDemotable,
    updateNameDemotable,
    countDemotable,
    insertRatesTable,
    projectRestaurant,
    aggregationHaving,
    deleteJournal2Table,
    displayJournal2Table,
    searchRestaurant,
    countDineInOrder,
    nestedAggregation
};
