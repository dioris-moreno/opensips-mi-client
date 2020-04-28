import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'gflags';

export class Gflags extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Set the value of the flags specified by bitmask to 1.
     * @param params.bitmask - a bitmask in decimal or hexa format (32 bit size)
     */
    setGflag = (params: { bitmask: number }) => this.execute('set_gflag', params);

    /**
     * Reset the value of some flags to 0.
     * @param params.bitmask - a bitmask in decimal or hexa format (32 bit size)
     */
    resetGflag = (params: { bitmask: number }) => this.execute('reset_gflag', params);

    /**
     * Returns true if all the flags from the bitmask are set.
     * @param params.bitmask - a bitmask in decimal or hexa format (32 bit size)
     */
    isGflag = (params: { bitmask: number }) => this.execute('is_gflag', params);

    /**
     * Return the bitmap with all flags. The function gets no parameters and returns the bitmap in hexa and decimal format.
     */
    getGflags = () => this.execute('get_gflags');
}

export default Gflags;
