import "dotenv/config"
import { connect } from "mongoose";

const NOVE_ENV = process.env.NOVE_ENV;
async function dbConnect() {
    const DB_URI = process.env.DB_URI;
    await connect(DB_URI);
}
export default dbConnect;