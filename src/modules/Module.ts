import { Client } from '../index';
import { CommandParameters } from '../connection/ClientConfiguration';
import Debug from 'debug';
const debug = Debug('opensips-mi-client');

export default class Module {
    private _client: Client;
    private _name: string;

    constructor(client: Client, name: string) {
        this._client = client;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    execute(command: string, params?: CommandParameters): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!(await this.client.isCommandAvailable(command)))
                    reject(new Error(`'${command}' command is not available in this OpenSIPS instance.`));
                resolve(await this.client.connection.execute(command, params));
            } catch (err) {
                debug(err);
                reject(err);
            }
        });
    }

    protected get client() {
        return this._client;
    }
}
