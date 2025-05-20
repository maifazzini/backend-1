import mongoose from "mongoose";
import paginate  from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            index: "text"
        },
        code: String,
        price: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        stock: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        thumbnails: String
    }
);

productsSchema.plugin(paginate)

const Productsdb= mongoose.model("productos", productsSchema);

export default Productsdb