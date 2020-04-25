import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'gflags';

export default class Gflags extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Set the value of some flags (specified by bitmask) to 1.
     * @param params.value - undefined
     */
    setGflag = (params: { value: string }) => this.execute('set_gflag', params);

    /**
     * Reset the value of some flags to 0.
     * @param params.value - undefined
     */
    resetGflag = (params: { value: string }) => this.execute('reset_gflag', params);

    /**
     * Returns true if the all the flags from the bitmask are set.
     * @param params.value - undefined
     */
    isGflag = (params: { value: string }) => this.execute('is_gflag', params);

    /**
     * Return the bitmap with all flags. The function gets no parameters and returns the bitmap in hexa and decimal format.
     */
    getGflags = () => this.execute('get_gflags');
}
