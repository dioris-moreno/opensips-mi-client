import Debug from 'debug';
import Configuration, { CommunicationTypeEnum } from './ClientConfiguration';
import HttpConnection from './HttpConnection';
import FifoConnection from './FifoConnection';
import IConnection from './IConnection';
const debug = Debug('opensips-mi-client');

export default class ConnectionFactory {
    static createConnection(config: Configuration): IConnection {
        const { communication_type: type } = config;
        switch (type) {
            case CommunicationTypeEnum.Http:
                return new HttpConnection(config);
            case CommunicationTypeEnum.Fifo:
                return new FifoConnection(config);
            default:
                debug(`Communication type not supported (${type}).`);
                throw new Error(`Communication type not supported (${type}).`);
        }
    }
}
