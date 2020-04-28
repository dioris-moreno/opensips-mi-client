import dotenv from 'dotenv';
dotenv.config();

import { getDefaults } from './connection/ClientConfiguration';

const communication_type = process.env.OS_MI_COMM_TYPE as string;
const fifo_file = process.env.OS_MI_FIFO_FILE as string;
const fifo_reply_dir = process.env.OS_MI_FIFO_REPLY_DIR as string;
const url = process.env.OS_MI_URL as string;

const envConfig = getDefaults({ communication_type, fifo_file, fifo_reply_dir, url });

export default envConfig;
