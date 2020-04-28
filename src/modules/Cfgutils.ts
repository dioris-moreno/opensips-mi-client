import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'cfgutils';

export class Cfgutils extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Set the probability value to the given parameter.
     * @param params.prob_proc - the parameter should be a percent value (number from 0 to 99).
     */
    setProbability = (params: { prob_proc: number }) => this.execute('rand_set_prob', params);

    /**
     * Reset the probability value to the inital start value.
     */
    resetProbability = () => this.execute('rand_reset_prob');

    /**
     * Return the actual probability setting.
     */
    getProbability = () => this.execute('rand_get_prob');

    /**
     * Check if the actual config file hash is identical to the stored one.
     */
    checkConfigHash = () => this.execute('check_config_hash');

    /**
     * Return the stored config file hash.
     */
    getConfigHash = () => this.execute('get_config_hash');

    /**
     * Set the value of a shared variable ($shv(name)).
     * @param params.name - shared variable name
     * @param params.type - type of the value: int - integer value, str - string value.
     * @param params.value - value to be set
     */
    setSharedVariable = (params: { name: string; type: string; value: string }) => this.execute('shv_set', params);

    /**
     * Get the value of a shared variable ($shv(name)).
     * @param params.name - shared variable name. If this parameter is missing, all shared variables are returned.
     */
    get = (params: { name: string }) => this.execute('shv_get', params);
}

export default Cfgutils;
