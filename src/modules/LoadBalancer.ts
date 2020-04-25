import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'load_balancer';

export default class LoadBalancer extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Trigers the reload of the load balancing data from the DB.
     */
    reload = () => this.execute('lb_reload');

    /**
     * Changes the capacity for a resource of a destination.
     * @param params.destination_id - the ID (as per DB) of the destination.
     * @param params.res_name - name of the resource you want to resize.
     * @param params.new_capacity - new resource capacity.
     */
    resize = (params: { destination_id: string; res_name: string; new_capacity: string }) =>
        this.execute('lb_resize', params);

    /**
     * Lists all the destinations and the maximum and current load for each resource of the destination.
     */
    list = () => this.execute('lb_list');

    /**
     * Gets or sets the status (enabled or disabled) of a destination.
     * @param params.destination_id - the ID (as per DB) of the destination.
     * @param params.new_status - (optional) - If no new status is given, the function will return the current status. If a new status is given (0 - disable, 1 - enable), this status will be forced for the destination.
     */
    status = (params: { destination_id: string; new_status?: string }) => this.execute('lb_status', params);
}
