import { createLogger, format, transports } from "winston";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const date = new Date();
const dateFormatFile =date.getDate() +'-'+date.getMonth()+'-'+date.getFullYear();

/**
 * It is register of logs
 */
const logger = createLogger({
    format: format.combine(format.simple(), format.timestamp(), format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports:[
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/log_api_${dateFormatFile}.log`
        }),
        new transports.Console({
            level: 'debug',
        })
    ]
})

export {logger}