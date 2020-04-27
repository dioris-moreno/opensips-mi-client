import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'clusterer';

export default class Clusterer extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Reloads data from the clusterer database. The currently established topology will be lost and the node will rediscover the new topology.
     */
    reload = () => this.execute('clusterer_reload');

    /**
     * Lists information(node id, URL, link state with that node etc.) about the other nodes in each cluster.
     */
    list = () => this.execute('clusterer_list');

    /**
     * Lists each cluster's topology from the local node's perspective as an adjacency list. A node appears as a neighbour if the link with that node is up.
     */
    listTopology = () => this.execute('clusterer_list_topology');

    /**
     * Sets the status(Enabled/Disabled) of the local node in a specified cluster. A disabled node does not send any messages and ignores received ones thus appearing as a failed node in the topology.
     * @param params.cluster_id - indicates the id of the cluster.
     * @param params.status - indicates the new status(0 - Disabled, 1 - Enabled).
     */
    setStatus = (params: { cluster_id: number; status: number }) => this.execute('clusterer_set_status', params);

    /**
     * Dispatches a given MI command to be run on a specific node in the cluster.
     * @param params.cluster_id - id of the cluster.
     * @param params.destination - id of the destination node
     * @param params.cmd_name - name of the MI command to be run
     * @param params.cmd_params - (optional) array of parameters for the MI command to be run
     */
    sendMi = (params: { cluster_id: number; destination: number; cmd_name: string; cmd_params?: string[] }) =>
        this.execute('cluster_send_mi', params);

    /**
     * Dispatches a given MI command to be run on all the nodes in a cluster. The command is also executed locally.
     * @param params.cluster_id - id of the cluster.
     * @param params.cmd_name - name of the MI command to be run
     * @param params.cmd_params - (optional) array of parameters for the MI command to be run
     */
    broadcastMi = (params: { cluster_id: number; cmd_name: string; cmd_params?: string }) =>
        this.execute('cluster_broadcast_mi', params);

    /**
     * Lists the registered capabilities and their states.
     */
    listCap = () => this.execute('clusterer_list_cap');

    /**
     * Set the given sharing tag to the state. The information about this change is also broadcasted in the cluster in order to force any other node that may be active on this tag to step down to backup.
     * @param params.tag - the name of the tag to be set active and the cluster it belogs to, in the format tag/cluster_id.
     */
    shtagSetActive = (params: { tag: string }) => this.execute('clusterer_shtag_set_active', params);

    /**
     * Lists all known sharing tags and their states.
     */
    listShtags = () => this.execute('clusterer_list_shtags');
}
