import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'drouting';

export class Drouting extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Command to reload routing rules from database.
     * @param params.partition_name - (optional) if not provided all the partitions will be reloaded, otherwise just the partition given as parameter will be reloaded.
     */
    reload = (params?: { partition_name?: string }) => this.execute('dr_reload', params);

    /**
     * Gets the status (enabled or disabled) of one or multiple gateways. The function can also be used to set the status of a single gateway.
     * @param params.partition_name - (optional) Required if use_partition is set to 1.
     * @param params.gw_id - (optional) the id of a gateway. If provided, the function will return/set (depnding if the third parameter is given) the status of that gateway, otherwise it will list all gateways in the given partition along with their statuses.
     * @param params.status - (optional) the new status to be forced for a GW (0 - disable, 1 - enable). Only makes sense if gw_id is provided.
     */
    gwStatus = (params?: { partition_name?: string; gw_id?: string; status?: number }) =>
        this.execute('dr_gw_status', params);

    /**
     * Gets the status (enabled or disabled) of one or multiple carriers. The function can also be used to set the status of a single carrier.
     * @param params.partition_name - (optional) Required if use_partition is set to 1.
     * @param params.carrier_id - (optional) the id of a carrier. If provided, the function will return/set (depnding if the third parameter is given) the status of that carrier, otherwise it will list all carriers contained in the given partition along with their statuses.
     * @param params.status - (optional) the new status to be forced for a carrier (0 - disable, 1 - enable). Only makes sense if carrier_id is provided.
     */
    carrierStatus = (params?: { partition_name?: string; carrier_id?: string; status?: number }) =>
        this.execute('dr_carrier_status', params);

    /**
     * Gets the time of the last reload for any partition.
     * @param params.partition_name - (optional) if not provided the function will list the time of the last update for every partition. Otherwise, the function will list the time of the last reload for the given partition.
     */
    reloadStatus = (params?: { partition_name?: string }) => this.execute('dr_reload_status', params);

    /**
     * Gets the matched prefix along with the list of the gateways / carriers to which a number would be routed when using the do_routing function.
     * @param params.partition_name - (optional) Required if use_partition is set to 1.
     * @param params.group_id - (optional) the group id of the rules to check against.
     * @param params.number - the number to test against.
     */
    numberRouting = (params: { partition_name?: string; group_id?: string; number: string }) =>
        this.execute('dr_number_routing', params);

    /**
     * Enables/disables gateway probing or returns the current gateway probing status.
     * @param params.status - (optional) 1 - enable, 0 - disable gateway probing
     */
    enableProbing = (params?: { status?: number }) => this.execute('dr_enable_probing', params);
}

export default Drouting;
