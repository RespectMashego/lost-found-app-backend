import Item from "../models/Item.js"

const getFeed = async (req, res) => {
    try {

        const items = await Item.find()
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .exec();
            
        res.status(200).json({ items })

    }
    catch (error) {
        console.error('Error fetching feed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export default { getFeed }