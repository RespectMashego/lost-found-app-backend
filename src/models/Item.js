import mongoose from "mongoose";

const ItemScheme = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    postType: {
        type: String,
        default: 'found', // Set the default value to 'found'
    },
    images: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
    {
        timestamps: true, // Automatically add createdAt and updatedAt timestamps
    }



)

const Item = mongoose.model("Item", ItemScheme)

export default Item