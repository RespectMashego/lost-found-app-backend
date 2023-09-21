import Item from "../models/Item.js";

const searchItems = async (req, res) => {
    try {
        // Get the search query parameters from the request
        const { name, location, category } = req.query;
        console.log(req.query);

        // Construct a dynamic query based on the provided parameters
        const query = {};
        if (name) {
            query.itemName = { $regex: new RegExp(name, 'i') };
        }
        if (location) {
            query.location = { $regex: new RegExp(location, 'i') };
        }
        if (category) {
            query.category = { $regex: new RegExp(category, 'i') };
        }

        // Use the constructed query to search for items
        const results = await Item.find(query);

        if (results.length === 0) {
            // If no items are found, send a custom message
            res.status(200).json({ message: 'No items found' });
        } else {
            // If items are found, send the items as the response
            res.status(200).json({ items: results });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default { searchItems };
