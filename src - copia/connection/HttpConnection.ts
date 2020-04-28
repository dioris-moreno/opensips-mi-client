import ConnectionBase from './ConnectionBase';
import { CommunicationTypeEnum, CommandParameters } from './ClientConfiguration';
import axios from 'axios';
import Debug from 'debug';
const debug = Debug('opensips-mi-client');

export default class HttpConnection extends ConnectionBase {
    get communicationType() {
        return CommunicationTypeEnum.Http;
    }

    get url() {
        return this.configuration.url;
    }

    execute = async (command: string, params?: CommandParameters) => {
        try {
            const url = this.url as string;
            const data = this.getData(command, params);
            const response = await axios.post(url, data);
            const { result, error } = response.data;
            if (error) throw new Error(error.message);
            return result;
        } catch (err) {
            debug('http error:', err);
            throw err;
        }
    };

    isValid(): boolean {
        return true;
    }
}
