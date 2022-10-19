import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'nathelper';

export class Nathelper extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Gets or sets the natpinging status.
     * @param [params.status] - if not provided the function returns the current natping status. Otherwise, enables natping if parameter value greater than 0 or disables natping if parameter value is 0.
     */
    enablePing = (params?: { status?: number }) => this.execute('nh_enable_ping', params);
}

export default Nathelper;
