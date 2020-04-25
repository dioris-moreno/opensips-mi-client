import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'qrouting';

export default class Qrouting extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Reload all quality-based routing rules from the SQL database.
     */
    reload = () => this.execute('qr_reload');

    /**
     * Inspect the signaling quality statistics of the current for all drouting gateways in all partitions, with various levels of filtering.
     * @param params.partition - a specific drouting partition to list statistics for
     * @param params.rule_id - a specific drouting rule database id to list statistics for
     * @param params.dst_name - a specific gateway or carrier name to list statistics for
     */
    status = (params?: { partition?: string; rule_id?: string; dst_name?: string }) =>
        this.execute('qr_status', params);

    /**
     * Within a given routing rule, temporarily remove the given gateway or carrier from routing, until they are re-enabled manually. The removal effect will be lost on an OpenSIPS restart.
     * @param params.partition - drouting partition
     * @param params.rule_id - database id of the drouting rule
     * @param params.dst_name - gateway or carrier to disable
     */
    disableDst = (params: { partition?: string; rule_id: string; dst_name: string }) =>
        this.execute('qr_disable_dst', params);

    /**
     * Within a given routing rule, re-introduce the given gateway or carrier into the routing process.
     * @param params.partition - drouting partition
     * @param params.rule_id - database id of the drouting rule
     * @param params.dst_name - gateway or carrier to enable
     */
    enableDst = (params: { partition?: string; rule_id: string; dst_name: string }) =>
        this.execute('qr_enable_dst', params);
}
