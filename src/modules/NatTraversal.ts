import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'nat_traversal';

export class NatTraversal extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Returns the statistics of the module.
     * @param [name] - get only the statistic named "name".
     * @param [options] - use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (
        name?: NatTraversal.Stats | NatTraversal.StatsTypes,
        options?: { keepGroupName: boolean },
    ) => {
        return this.getModuleStats(name, options);
    };
}

export namespace NatTraversal {
    export type AllStats = 'all';
    export type KeepaliveEndpointsStat = 'keepalive_endpoints';
    export type RegisteredEndpointsStat = 'registered_endpoints';
    export type SubscribedEndpointsStat = 'subscribed_endpoints';
    export type DialogEndpointsStat = 'dialog_endpoints';
    export type StatsTypes =
        | AllStats
        | KeepaliveEndpointsStat
        | RegisteredEndpointsStat
        | SubscribedEndpointsStat
        | DialogEndpointsStat;
    export enum Stats {
        All = 'all',
        KeepaliveEndpoints = 'keepalive_endpoints',
        RegisteredEndpoints = 'registered_endpoints',
        SubscribedEndpoints = 'subscribed_endpoints',
        DialogEndpoints = 'dialog_endpoints',
    }
}

export default NatTraversal;
