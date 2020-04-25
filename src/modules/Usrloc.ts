import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'usrloc';

export default class Usrloc extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Deletes an entire AOR record (including its contacts).
     * @param params.table_name - table where the AOR is removed from (Ex: location).
     * @param params.aor - user AOR in username[@domain] format (domain must be supplied only if use_domain option is on).
     */
    rm = (params: { table_name: string; aor: string }) => this.execute('ul_rm', params);

    /**
     * Deletes a contact from an AOR record.
     * @param params.table_name - table where the AOR is removed from (Ex: location).
     * @param params.AOR - user AOR in username[@domain] format (domain must be supplied only if use_domain option is on).
     * @param params.contact - exact contact to be removed
     */
    rmContact = (params: { table_name: string; AOR: string; contact: string }) => this.execute('ul_rm_contact', params);

    /**
     * Dumps the entire content of the USRLOC in memory cache
     * @param params.brief - (optional, may not be present); if equals to string , a brief dump will be done (only AOR and contacts, with no other details)
     */
    dump = (params?: { brief?: string }) => this.execute('ul_dump', params);

    /**
     * Force a flush of all pending usrloc cache changes to the database. Normally, this routine runs every seconds.
     */
    flush = () => this.execute('ul_flush');

    /**
     * Adds a new contact for an user AOR.
     * @param params.table_name - table where the contact will be added (Ex: location).
     * @param params.aor - user AOR in username[@domain] format (domain must be supplied only if use_domain option is on).
     * @param params.contact - contact string to be added
     * @param params.expires - expires value of the contact
     * @param params.q - Q value of the contact
     * @param params.unused - unused attribute (kept for backword compatibility)
     * @param params.flags - internal USRLOC flags of the contact
     * @param params.cflags - per branch flags of the contact
     * @param params.methods - mask with supported requests of the contact
     */
    add = (params: {
        table_name: string;
        aor: string;
        contact: string;
        expires: string;
        q: string;
        unused: string;
        flags: string;
        cflags: string;
        methods: string;
    }) => this.execute('ul_add', params);

    /**
     * Dumps the contacts of an user AOR.
     * @param params.table_name - table where the AOR resides (Ex: location).
     * @param params.aor - user AOR in username[@domain] format (domain must be supplied only if use_domain option is on).
     */
    showContact = (params: { table_name: string; aor: string }) => this.execute('ul_show_contact', params);

    /**
     * Empty the location table, then synchronize it with all contacts from memory. Note that this can not be used when no database is specified or with the DB-Only scheme.
     * @param params.table_name - table where the AOR resides (Ex: location).
     * @param params.AOR - only delete/sync this user AOR, not the whole table. Format: "username[@domain]" ( is required only if option is on).
     */
    sync = (params: { table_name: string; AOR?: string }) => this.execute('ul_sync', params);

    /**
     * This command will only take effect if the module is running under a cluster-enabled .
     */
    clusterSync = () => this.execute('ul_cluster_sync');
}
