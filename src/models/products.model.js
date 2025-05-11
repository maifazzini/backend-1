import mongoose from "mongoose";
import paginate  from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true
        },
        description: {
            type: String,
            require: true,
            index: "text"
        },
        code: String,
        price: {
            type: Number,
            require: true
        },
        status: {
            type: Boolean,
            default: true
        },
        stock: {
            type: Number,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        thumbnails: String
    }
);

productsSchema.plugin(paginate)

const Productsdb= mongoose.model("productos", productsSchema);

export default Productsdb