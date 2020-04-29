import Connection from './Connection';
import ClientConfiguration, { CommunicationType, CommandParameters } from './ClientConfiguration';

export default abstract class ConnectionBase implements Connection {
    private _configuration: ClientConfiguration;

    constructor(config: ClientConfiguration) {
        this._configuration = config;
        this.validate();
    }

    protected get configuration(): ClientConfiguration {
        return this._configuration;
    }

    protected getData(command: string, params?: CommandParameters) {
        // { "jsonrpc": "2.0", "method": "ps", "id": 10, "params": [] }
        const id = this.getRandomId();
        const jsonrpc = this.configuration.jsonrpcVersion;
        return { jsonrpc, method: command, id, params };
    }

    abstract get communicationType(): CommunicationType;
    abstract execute(command: string, params: CommandParameters): any;
    abstract validate(): void;

    protected getRandomId = () => {
        const min = 1;
        const max = 32767;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
}
