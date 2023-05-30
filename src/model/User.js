import { Schema, model, Model } from "mongoose";

/**
 *  User Schema
 * @author Stive Ospina
 */
const UserSchema = new Schema(
    {
        "fullname": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            unique: true,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "role": {
            type: String,
            default:"user",
            required: true
        }
    }, {
    timestamps: true,
    versionKey: false
}
);
/**
 *  user model provided by mongose ​​to interact with the database
 * @author Stive Ospina
 */
const UserModel = model("users", UserSchema);
export { UserModel };