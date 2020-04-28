import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'carrierroute';

export default class CarrierRoute extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * This command reloads the routing data from the data source.
     */
    reloadRoutes = () => this.execute('cr_reload_routes');

    /**
     * This command prints the route rules on the command line.
     */
    dumpRoutes = () => this.execute('cr_dump_routes');

    /**
     * This command can replace the rewrite_host of a route rule, it is only usable in file mode.
     * @param params.options - a string including the following options: -d - the domain containing the host, -p - the prefix containing the host, -h - the host to be replaced, -t - the new host.
     */
    replaceHost = (params: { options: string }) => this.execute('cr_replace_host', params);

    /**
     * This command deactivates the specified host, i.e. it sets its status to 0. It is only usable in file mode.
     * @param params.options - a string including the following options: -d - the domain containing the host, -p - the prefix containing the host, -h - the host to be deactivated, -t - the new host used as backup.
     */
    deactivateHost = (params: { options: string }) => this.execute('cr_deactivate_host', params);

    /**
     * This command activates the specified host, i.e. it sets its status to 1. It is only usable in file mode.
     * @param params.options - a string including the following options: -d - the domain containing the host, -p - the prefix containing the host, -h - the host to be activated.
     */
    activateHost = (params: { options: string }) => this.execute('cr_activate_host', params);

    /**
     * This command adds a route rule, it is only usable in file mode.
     * @param params.options - a string including the following options: -d - the domain containing the host, -p - the prefix containing the host, -h - the host to be added, -w - the weight of the rule, -P - an optional rewrite prefix, -S - an optional rewrite suffix, -i - an optional hash index, -s - an optional hash index.
     */
    addHost = (params: { options: string }) => this.execute('cr_add_host', params);

    /**
     * This command delete the specified hosts or rules, i.e. remove them from the route tree. It is only usable in file mode.
     * @param params.options - a string including the following options: -d - the domain containing the host, -p - the prefix containing the host, -h - the host to be deleted, -w - the weight of the rule, -P - an optional rewrite prefix, -S - an optional rewrite suffix, -i - an optional hash index, -s - an optional hash index.
     */
    deleteHost = (params: { options: string }) => this.execute('cr_delete_host', params);
}
