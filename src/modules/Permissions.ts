import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'permissions';

export class Permissions extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Causes permissions module to re-read the contents of the address database table into cache memory. In cache memory the entries are for performance reasons stored in two different tables: address table and subnet table depending on the value of the mask field (32 or smaller).
     * @param params.partition - (optional) the name of the partition to be reloaded. If none specified all the partitions shall be reloaded.
     */
    addressReload = (params?: { partition?: string }) => this.execute('address_reload', params);

    /**
     * Causes permissions module to dump contents of the address table from cache memory.
     * @param params.partition - (optional) the name of the partition to be dumped. If none specified all the partitions shall be dumped.
     */
    addressDump = (params?: { partition?: string }) => this.execute('address_dump', params);

    /**
     * Causes permissions module to dump contents of cache memory subnet table.
     * @param params.partition - (optional) the name of the partition to be dumped. If none specified all the partitions shall be dumped.
     */
    subnetDump = (params?: { partition?: string }) => this.execute('subnet_dump', params);

    /**
     * Tests if (URI, Contact) pair is allowed according to allow/deny files. The files must already have been loaded by OpenSIPS.
     * @param params.basename - Basename from which allow and deny filenames will be created by appending contents of allow_suffix and deny_suffix parameters.
     * @param params.uri - URI to be tested
     * @param params.contact - Contact to be tested
     */
    allowUri = (params: { basename: string; uri: string; contact: string }) => this.execute('allow_uri', params);
}

export default Permissions;
