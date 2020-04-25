export enum CommunicationTypeEnum {
    Http = 'http',
    Fifo = 'fifo',
}

export interface CommandParameters {
    [key: string]: any;
}

export default interface ClientConfiguration {
    communication_type: CommunicationTypeEnum | string;
    fifo_file?: string;
    fifo_reply_dir?: string;
    url?: string;
    jsonrpcVersion: string;
}

export const defaultConfiguration: ClientConfiguration = {
    communication_type: CommunicationTypeEnum.Http,
    fifo_file: '/tmp/opensips_fifo',
    fifo_reply_dir: '/tmp',
    url: 'http://127.0.0.1:8888/mi',
    jsonrpcVersion: '2.0',
};

// * `communication_type`: Communication transport used by OpenSIPS CLI (Default: `fifo`)
// * `fifo_file`: The OpenSIPS FIFO file to which the CLI will write commands
// (Default: `/tmp/opensips_fifo`)
// * `fifo_reply_dir`: The default directory where `opensips-cli` will create the
// fifo used for the reply from OpenSIPS (Default: `/tmp`)
// * `url`: The default URL used when `http` `communication_type` is used
// (Default: `http://127.0.0.1:8888/mi`).
