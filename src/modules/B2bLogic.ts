import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'b2b_logic';

export default class B2bLogic extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * This command instantiates a B2B scenario.
     * @param params.senario_id - the id of the scenario to be instantiated.
     * @param params.scenario_params - array of at least 2 scenario parameters
     */
    triggerScenario = (params: { senario_id: string; scenario_params: string }) =>
        this.execute('b2b_trigger_scenario', params);

    /**
     * This command can be used by an external application to tell B2BUA to bridge a call party from an on going dialog to another destination. By default the caller is bridged to the new uri and BYE is set to the callee. You can instead bridge the callee if you send 1 as the third parameter.
     * @param params.dialog_id - the , or the of the ongoing dialog.
     * @param params.new_uri - the uri of the new destination
     * @param params.flag - (optional) used to specify that the callee must be bridged to the new destination. If not present the caller will be bridged. Possible values are '0' or '1'.
     * @param params.prov_media_uri - (optional) the uri of a media server able to play provisional media starting from the beginning of the bridging scenario to the end of it. If not present, no other entity will be envolved in the bridging scenario
     */
    bridge = (params: { dialog_id: string; new_uri: string; flag?: string; prov_media_uri?: string }) =>
        this.execute('b2b_bridge', params);

    /**
     * This command can be used to list the internals of b2b_logic entities.
     */
    list = () => this.execute('b2b_list');
}
