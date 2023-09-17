import Item from "../models/Item.js";
import cloudinary from 'cloudinary';

// Configure Cloudinary

cloudinary.config({
    cloud_name: 'dhge4f7mf',
    api_key: '214534517966234',
    api_secret: 'dZxbcDvVTf4u314F44qc4PtzUOg'
});

const createItem = async (req, res) => {
    try {
        const userId = req.user.id
        const { itemName, category, description, location, contact } = req.body;
        const images = req.files; // Assuming you're using a middleware like multer to handle file uploads
        console.log("images from app", images);
        // Upload images to Cloudinary and get their URLs
        const imageUrls = await Promise.all(images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image.path);
            return result.secure_url;
        }));

        // Create a new item with the image URLs
        const newItem = new Item({
            itemName,
            category,
            description,
            location,
            contact,
            images: imageUrls, // Store the array of image URLs

        });
        newItem.postedBy = req.user.userId;
        console.log("user id", req.user.userId);

        await newItem.save();

        res.status(201).json({
            message: "Item posted successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        console.log("item id", itemId);
        const userId = req.user.userId;
        console.log("useid", userId);

        const item = await Item.findByIdAndDelete({ _id: itemId })
        if ( item.postedBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this item.' });
        }

        // If the user is the owner, you can proceed to delete the item
        console.log("before delete");
        // await item.deleteOne()
        console.log("after delete");
        res.status(200).json({
            message: "item posted successfully"
        })




    } catch (error) {


    }




}

export default { createItem, deleteItem };

