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
            postedBy: userId,
        });

        await newItem.save();

        res.status(201).json({
            message: "Item posted successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "Internal server error" });
    }
};

export default { createItem };
