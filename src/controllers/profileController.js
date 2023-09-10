import Item from "../models/Item.js"


const getUserPostedItems = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userPostedItems = await Item.find({ postedBy: userId }).sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .exec();
        console.log(userPostedItems);
        res.status(200).json({ userPostedItems })

    }
    catch (error) {
        console.error("error message", error)
    }

}

export default { getUserPostedItems }