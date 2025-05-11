import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: { type:[{
            product: {
                type: mongoose.Schema.Types.ObjectId, ref:"productos"
            },
            quantity: {type:Number, required: true}
        }
    ]}
}
)


const Cartsdb= mongoose.model("carts", cartSchema)

export default Cartsdb