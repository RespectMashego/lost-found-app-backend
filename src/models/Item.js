import mongoose from "mongoose";

const ItemScheme = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, require: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    postType: {
        type: String,
        default: 'found', // Set the default value to 'found'
    },
    images: [{ type: String }],
     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }


})

const Item = mongoose.model("Item", ItemScheme)

export default Item