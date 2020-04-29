import ConnectionBase from './ConnectionBase';
import { CommunicationType, CommandParameters } from './ClientConfiguration';
import axios from 'axios';
import url from 'url';
import Debug from 'debug';
const debug = Debug('opensips-mi-client');

export default class HttpConnection extends ConnectionBase {
    get communicationType() {
        return CommunicationType.Http;
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
            debug('HttpConnection:', err);
            throw err;
        }
    };

    validate(): void {
        if (!this.url) throw new Error('OpenSIPS instance url required.');
        const parsedUrl = url.parse(this.url, true);
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') return;
        throw new Error('Only http and https protocols are supported.');
    }
}
