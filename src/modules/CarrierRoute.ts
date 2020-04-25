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
     * This command can replace the rewrite_host of a route rule, it is only usable in file mode. Following options are possible:
     * @param params.d - the domain containing the host
     * @param params.p - the prefix containing the host
     * @param params.h - the host to be replaced
     * @param params.t - the new host
     */
    replaceHost = (params: { d: string; p: string; h: string; t: string }) => this.execute('cr_replace_host', params);

    /**
     * This command deactivates the specified host, i.e. it sets its status to 0. It is only usable in file mode. Following options are possible:
     * @param params.d - the domain containing the host
     * @param params.p - the prefix containing the host
     * @param params.h - the host to be deactivated
     * @param params.t - the new host used as backup
     */
    deactivateHost = (params: { d: string; p: string; h: string; t: string }) =>
        this.execute('cr_deactivate_host', params);

    /**
     * This command activates the specified host, i.e. it sets its status to 1. It is only usable in file mode. Following options are possible:
     * @param params.d - the domain containing the host
     * @param params.p - the prefix containing the host
     * @param params.h - the host to be activated
     */
    activateHost = (params: { d: string; p: string; h: string }) => this.execute('cr_activate_host', params);

    /**
     * This command adds a route rule, it is only usable in file mode. Following options are possible:
     * @param params.d - the domain containing the host
     * @param params.p - the prefix containing the host
     * @param params.h - the host to be added
     * @param params.w - the weight of the rule
     * @param params.P - an optional rewrite prefix
     * @param params.S - an optional rewrite suffix
     * @param params.i - an optional hash index
     * @param params.s - an optional strip value
     */
    addHost = (params: { d: string; p: string; h: string; w: string; P: string; S: string; i: string; s: string }) =>
        this.execute('cr_add_host', params);

    /**
     * This command delete the specified hosts or rules, i.e. remove them from the route tree. It is only usable in file mode. Following options are possible:
     * @param params.d - the domain containing the host
     * @param params.p - the prefix containing the host
     * @param params.h - the host to be added
     * @param params.w - the weight of the rule
     * @param params.P - an optional rewrite prefix
     * @param params.S - an optional rewrite suffix
     * @param params.i - an optional hash index
     * @param params.s - an optional strip value
     */
    deleteHost = (params: { d: string; p: string; h: string; w: string; P: string; S: string; i: string; s: string }) =>
        this.execute('cr_delete_host', params);
}
