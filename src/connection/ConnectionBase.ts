import Configuration from './ClientConfiguration';
import IConnection from './IConnection';
import { CommunicationTypeEnum, CommandParameters } from './ClientConfiguration';

export default abstract class ConnectionBase implements IConnection {
    private _configuration: Configuration;

    constructor(config: Configuration) {
        this._configuration = config;
    }

    protected get configuration(): Configuration {
        return this._configuration;
    }

    protected getData(command: string, params?: CommandParameters) {
        // { "jsonrpc": "2.0", "method": "ps", "id": 10, "params": [] }
        const id = this.getRandomId();
        const jsonrpc = this.configuration.jsonrpcVersion;
        return { jsonrpc, method: command, id, params };
    }

    abstract get communicationType(): CommunicationTypeEnum;
    abstract execute(command: string, params: CommandParameters): any;
    abstract isValid(): boolean;

    protected getRandomId = () => {
        const min = 1;
        const max = 32767;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
}