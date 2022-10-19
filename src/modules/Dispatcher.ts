import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'dispatcher';

export class Dispatcher extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Sets the status for a destination address (can be use to mark the destination as active or inactive).
     * @param params.state - state of the destination address: a - active, i - inactive, p - probing.
     * @param params.group - partition name followed by colon and destination group id. If the partition name is omitted, the default partition will be used
     * @param params.address - address of the destination in the group
     */
    setState = (params: { state: string; group: string; address: string }) => this.execute('ds_set_state', params);

    /**
     * It lists the groups and included destinations of all the partitions.
     * @param [params.full] - set to 1 to add the weight, priority and description fields to the listing
     */
    list = (params?: { full?: number }) => this.execute('ds_list', params);

    /**
     * It reloads the groups and included destinations for a specified partition or all partitions.
     * @param [params.partition] - name of the partition to be reloaded.
     */
    reload = (params?: { partition?: string }) => this.execute('ds_reload', params);
}

export default Dispatcher;
