import Debug from 'debug';
import ClientConfiguration from './ClientConfiguration';
import HttpConnection from './HttpConnection';
import FifoConnection from './FifoConnection';
import Connection from './Connection';
const debug = Debug('opensips-mi-client');

export default class ConnectionFactory {
    static createConnection(config: ClientConfiguration): Connection {
        const { communication_type: type } = config;
        switch (type) {
            case ClientConfiguration.CommunicationType.Http:
                return new HttpConnection(config);
            // case ClientConfiguration.CommunicationType.Fifo:
            //     return new FifoConnection(config);
            default:
                debug(`Communication type not supported (${type}).`);
                throw new Error(`Communication type not supported (${type}).`);
        }
    }
}
