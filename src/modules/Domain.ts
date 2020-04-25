import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'domain';

export default class Domain extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Causes domain module to re-read the contents of domain table into cache memory.
     */
    reload = () => this.execute('domain_reload');

    /**
     * Causes domain module to dump hash indexes and domain names in its cache memory.
     */
    dump = () => this.execute('domain_dump');
}
