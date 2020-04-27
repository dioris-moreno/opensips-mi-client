import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'ratelimit';

export default class Ratelimit extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Lists the parameters and variabiles in the ratelimit module.
     * @param params.pipe - (optional) indicates the name of the pipe. If the parameter doesnt exist, all the active pipes are listed. Otherwise only the one specified.
     */
    list = (params?: { pipe?: string }) => this.execute('rl_list', params);

    /**
     * Resets the counter of a specified pipe.
     * @param params.pipe - indicates the name of the pipe whose counter should be reset.
     */
    resetPipe = (params: { pipe: string }) => this.execute('rl_reset_pipe', params);

    /**
     * Sets the PID Controller parameters for the Feedback Algorithm.
     * @param params.ki - the integral parameter.
     * @param params.kp - the proportional parameter.
     * @param params.kd - the derivative parameter.
     */
    setPid = (params: { ki: number; kp: number; kd: number }) => this.execute('rl_set_pid', params);

    /**
     * Gets the list of in use PID Controller parameters.
     */
    getPid = () => this.execute('rl_get_pid');

    /**
     * Dumps each destination used for replication, as well as the timestamp of the last message received from them.
     */
    binStatus = () => this.execute('rl_bin_status');
}
