import dotenv from 'dotenv';
dotenv.config();

import ClientConfiguration, { defaultConfiguration } from './connection/ClientConfiguration';
const envConfig: ClientConfiguration = { ...defaultConfiguration };

const communication_type = process.env.OS_MI_COMM_TYPE as string;
const fifo_file = process.env.OS_MI_FIFO_FILE as string;
const fifo_reply_dir = process.env.OS_MI_FIFO_REPLY_DIR as string;
const url = process.env.OS_MI_URL as string;

if (communication_type) envConfig.communication_type = communication_type;
if (fifo_file) envConfig.fifo_file = fifo_file;
if (fifo_reply_dir) envConfig.fifo_reply_dir = fifo_reply_dir;
if (url) envConfig.url = url;

export default envConfig;
