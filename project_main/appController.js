const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.post("/insert-rates-table", async (req, res) => {
    const { foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation } = req.body;
    const insertResult = await appService.insertRatesTable(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/display-rates-table', async (req, res) => {
    const tableContent = await appService.displayRatesTable();
    res.json({data: tableContent});
});

router.post("/delete-journal2-table", async (req, res) => {
    const { title, description } = req.body;
    const insertResult = await appService.deleteJournal2Table(title, description);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/display-journal2-table', async (req, res) => {
    const tableContent = await appService.displayJournal2Table();
    res.json({data: tableContent});
});

router.get('/project-restaurant', async (req, res) => {
    const {cuisineTag, menu} = req.body;
    const tableContent = await appService.projectRestaurant(cuisineTag, menu);
    res.json({data: tableContent});
});

router.get('/aggregation-having', async (req, res) => {
    const tableContent = await appService.aggregationHaving();
    res.json({data: tableContent});
});

// router.post('/search', async (req, res) => {
//     const tableContent = await appService.searchRestaurant(conditions);
//     res.json({data: tableContent});
// });
router.post('/search', async (req, res) => {
    try {
        const conditions = req.body.conditions;  // Accessing the correct property

        if (!conditions) {
            return res.status(400).json({ success: false, message: 'Conditions are required.' });
        }

        // Assuming you have a function that safely handles the conditions and queries the DB
        const tableContent = await appService.searchRestaurant(conditions);

        if (tableContent.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found matching the conditions.' });
        }

        res.json({ success: true, data: tableContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while searching.' });
    }
});

router.get('/count-pickuporder', async (req, res) => {
    const tableContent = await appService.countPickUpOrder();
    res.json({data: tableContent});
});

router.get('/nested-aggregation', async (req, res) => {
    const tableContent = await appService.nestedAggregation();
    res.json({data: tableContent});
});

router.get('/display-Review2-table', async (req, res) => {
    const tableContent = await appService.displayReview2Table();
    res.json({data: tableContent});
});

router.post("/update-review2", async (req, res) => {
    //In this relation, the user should be able to update any number of non-primary key
    // attributes.
    // • The application should display the tuples that are available for the relation so the
    // user can select which tuple they want to update (based on the key).
    const {journalID, column, newValue} = req.body;


    try {
        const updateResult = await appService.updateReview(journalID, column, newValue);
        if (updateResult) {
            return res.json({success: true});
        } else {
            return res.status(500).json({success: false, error: 'Database update failed'});
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.post('/join-restaurant', async (req, res) => {
    const { RName, RLoc } = req.body;
    const tableContent = await appService.JoinRestaurantStaff(RName, RLoc);
    res.json({data: tableContent});
});

router.get('/division', async (req, res) => {
    const tableContent = await appService.Division();
    res.json({data: tableContent});
});

module.exports = router;