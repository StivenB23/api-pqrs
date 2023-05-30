import { Schema, model, Model, Types } from "mongoose";
import { dateFormat } from '../util/date.handle.js'

/**
 *  Pqrs Schema
 * @author Stive Ospina
 */
const PqrsSchema = new Schema(
    {
        "user": {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        "type": {
            type: String,
            // required: true
        },
        "description": {
            type: String,
            // required: true
        },
        "date": {
            type: Date,
            default: dateFormat()
            // required: true
        },
        "areas": {
            type: Array
        },
        "state": {
            type: String,
            default:"pendiente"
        },
        "civilservant": {
            type: Array,
        }
    }, {
    timestamps: true,
    versionKey: false
}
);
/**
 *  Pqrs model provided by mongose ​​to interact with the database
 * @author Stive Ospina
 */
const PqrsModel = model("pqrs", PqrsSchema);
export { PqrsModel };