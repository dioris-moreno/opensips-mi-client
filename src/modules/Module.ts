import { Client } from '../index';
import { CommandParameters } from '../connection/ClientConfiguration';
import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('opensips-mi-client');

export default class Module {
    private _client: Client;
    private _name: string;

    constructor(client: Client, name: string) {
        this._client = client;
        this._name = name;
    }

    /**
     * Returns the name of the module.
     */
    get name() {
        return this._name;
    }

    /**
     * Executes the MI command against OpenSIPS, using the transport of "connection".
     * @param command - the MI command.
     * @param params - (optional) parameters required by the command.
     */
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

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names.
     */
    protected getModuleStats = async (name?: string, options?: { keepGroupName: boolean }) => {
        try {
            const groupName = `${this.name}:`;
            let filter = name ? name : groupName;
            const response = await this.client.getStatistics({ statistics: [filter] });
            if (options && options.keepGroupName) return response;
            const ret: { [key: string]: any } = {};
            for (const key of _.keys(response)) {
                const statName = key.replace(groupName, '');
                ret[statName] = response[key];
            }
            return ret;
        } catch (err) {
            throw err;
        }
    };

    /**
     * Returns the client instance.
     */
    protected get client() {
        return this._client;
    }
}
