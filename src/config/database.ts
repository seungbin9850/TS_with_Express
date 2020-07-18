import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, '../../.env') });

const Config = {
    test_module: false,
    database: {
        host: process.env.HOST || "",
        port: process.env.PORT,
        user: process.env.NAME || "",
        password: process.env.PASSWORD || "",
        name: process.env.DBNAME || ""
    }
}

export default Config;