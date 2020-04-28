import Debug from 'debug';
const debug = Debug('opensips-mi-client');

export enum CommunicationTypeEnum {
    Http = 'http',
    Fifo = 'fifo',
}

export interface CommandParameters {
    [key: string]: any;
}

/**
 * communication_type: Communication transport used by OpenSIPS CLI (default: http).
 * fifo_file: The OpenSIPS FIFO file to which the CLI will write commands (default: /tmp/opensips_fifo).
 * fifo_reply_dir: The default directory where `opensips-cli` will create the fifo used for the reply from OpenSIPS (default: /tmp).
 * url: The default URL used when `http` `communication_type` is used (default: http://127.0.0.1:8888/mi).
 * jsonrpcVersion: The default JSON-RPC protocol version used.
 */
export default interface ClientConfiguration {
    communication_type?: CommunicationTypeEnum | string;
    fifo_file?: string;
    fifo_reply_dir?: string;
    url?: string;
    jsonrpcVersion?: string;
}

export const defaultConfiguration: ClientConfiguration = {
    communication_type: CommunicationTypeEnum.Http,
    fifo_file: '/tmp/opensips_fifo',
    fifo_reply_dir: '/tmp',
    url: 'http://127.0.0.1:8888/mi',
    jsonrpcVersion: '2.0',
};

export const getDefaults = (config: ClientConfiguration) => {
    const ret: ClientConfiguration = { ...defaultConfiguration };
    if (config.communication_type) ret.communication_type = config.communication_type;
    if (config.fifo_file) ret.fifo_file = config.fifo_file;
    if (config.fifo_reply_dir) ret.fifo_reply_dir = config.fifo_reply_dir;
    if (config.url) ret.url = config.url;
    debug('defaultConfiguration', defaultConfiguration);
    debug('config', config);
    debug('ret', ret);
    return ret;
};
