import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'dispatcher';

export default class Dispatcher extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Sets the status for a destination address (can be use to mark the destination as active or inactive).
     * @param params.state - state of the destination address
     * @param params.group - partition name followed by colon and destination group id. If the partition name is omitted, the default partition will be used
     * @param params.address - address of the destination in the group
     */
    setState = (params: { state: string; group: string; address: string }) => this.execute('ds_set_state', params);

    /**
     * It lists the groups and included destinations of all the partitions.
     * @param params.full - (optional) adds the weight, priority and description fields to the listing
     */
    list = (params?: { full?: string }) => this.execute('ds_list', params);

    /**
     * It reloads the groups and included destinations for a specified partition or all partitions.
     * @param params.partition - (optional) name of the partition to be reloaded.
     */
    reload = (params?: { partition?: string }) => this.execute('ds_reload', params);

    /**
     * Pushes script attrs for the dispatcher entry defined by IP, Port, setid, and optionally partition.
     * @param params.attrs - new attributes to be pushed
     * @param params.ip - IP for which we are pushing script attributes
     * @param params.port - Port for which we are pushing script attributes
     * @param params.setid - Setid for which we are pushing script attributes
     * @param params.partition - Partition for which we are pushing script attributes
     */
    pushScriptAttrs = (params: { attrs: string; ip: string; port: string; setid: string; partition: string }) =>
        this.execute('ds_push_script_attrs', params);
}
