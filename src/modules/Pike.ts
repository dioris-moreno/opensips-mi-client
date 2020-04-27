import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'pike';

export default class Pike extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Lists the nodes in the pike tree.
     */
    list = () => this.execute('pike_list');

    /**
     * Remove a node from the pike tree by IP address.
     * @param params.ip - IP address currently blocked.
     */
    rm = (params: { ip: string }) => this.execute('pike_rm', params);
}
