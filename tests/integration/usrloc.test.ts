/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('Usrloc Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('rm(): should Deletes an entire AOR record (including its contacts).', async () => {
        const table_name = uuid();
        const aor = uuid();
        const response = await client.usrloc.rm({ table_name, aor });
        debug(response);
    });

    it('rmContact(): should Deletes a contact from an AOR record.', async () => {
        const table_name = uuid();
        const AOR = uuid();
        const contact = uuid();
        const response = await client.usrloc.rmContact({ table_name, AOR, contact });
        debug(response);
    });

    it('dump(): should Dumps the entire content of the USRLOC in memory cache', async () => {
        const response = await client.usrloc.dump();
        debug(response);
    });

    it('flush(): should Force a flush of all pending usrloc cache changes to the database. Normally, this routine runs every seconds.', async () => {
        const response = await client.usrloc.flush();
        debug(response);
    });

    it('add(): should Adds a new contact for an user AOR.', async () => {
        const table_name = uuid();
        const aor = uuid();
        const contact = uuid();
        const expires = uuid();
        const q = uuid();
        const unused = uuid();
        const flags = uuid();
        const cflags = uuid();
        const methods = uuid();
        const response = await client.usrloc.add({
            table_name,
            aor,
            contact,
            expires,
            q,
            unused,
            flags,
            cflags,
            methods,
        });
        debug(response);
    });

    it('showContact(): should Dumps the contacts of an user AOR.', async () => {
        const table_name = uuid();
        const aor = uuid();
        const response = await client.usrloc.showContact({ table_name, aor });
        debug(response);
    });

    it('sync(): should Empty the location table, then synchronize it with all contacts from memory. Note that this can not be used when no database is specified or with the DB-Only scheme.', async () => {
        const table_name = uuid();
        const response = await client.usrloc.sync({ table_name });
        debug(response);
    });

    it('clusterSync(): should This command will only take effect if the module is running under a cluster-enabled .', async () => {
        const response = await client.usrloc.clusterSync();
        debug(response);
    });
});
