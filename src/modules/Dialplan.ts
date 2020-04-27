import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'dialplan';

export default class Dialplan extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * It will update the translation rules, loading the database info.
     * @param params.partition - (optional) Partition to be reloaded. If not specified, all partitions will be reloaded.
     */
    reload = (params?: { partition?: string }) => this.execute('dp_reload', params);

    /**
     * It will apply a translation rule identified by a dialplan id on an input string.
     * @param params.dpid - the dpid of the rule set used for match the input string
     * @param params.input - the input string
     * @param params.partition - (optional) the name of the partition when the dpid is located
     */
    translate = (params: { dpid: number; input: string; partition?: string }) => this.execute('dp_translate', params);

    /**
     * Display partition(s) details.
     * @param params.partition - (optional) The partition name. If no partition is specified, all known partitions will be listed.
     */
    showPartition = (params?: { partition?: string }) => this.execute('dp_show_partition', params);
}
