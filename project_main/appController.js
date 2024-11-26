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

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
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

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
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

router.post('/search', async (req, res) => {
    const queryString = req.body.query;

    try {
        // Call the search function in appService.js
        const results = await appService.searchRestaurant(queryString);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to execute selection query' });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({
            success: true,
            count: tableCount
        });
    } else {
        res.status(500).json({
            success: false,
            count: tableCount
        });
    }
});

router.get('/count-dineinorder', async (req, res) => {
    const tableContent = await appService.countDineInOrder();
    res.json({data: tableContent});
});

router.get('/nested-aggregation', async (req, res) => {
    const tableContent = await appService.nestedAggregation();
    res.json({data: tableContent});
});

module.exports = router;