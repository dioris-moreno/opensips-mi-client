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

const contactExample = {
    Contact: 'sip:bob@domain.com',
    Expires: 3600,
    Q: '',
    Flags: 0,
    Cflags: '',
    Methods: 4479,
};

describe('Usrloc Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it.skip('rm(): should Deletes an entire AOR record (including its contacts).', async () => {
        const table_name = 'location';
        let response = await client.usrloc.dump();
        if (_.isEmpty(response['Domains'][0]['AORs'])) return;
        const firstAor = response['Domains'][0]['AORs'][0];
        const aor = firstAor.AOR;
        response = await client.usrloc.rm({ table_name, aor });
        debug(response);
        expect(response).toBe(OK);
    });

    it.skip('rmContact(): should delete a contact from an AOR record.', async () => {
        const table_name = 'location';
        let response = await client.usrloc.dump();
        const firstAor = response['Domains'][0]['AORs'][0];
        const aor = firstAor.AOR;
        const contact = firstAor['Contacts'][0]['Contact'];
        response = await client.usrloc.rmContact({ table_name, aor, contact });
        expect(response).toBe(OK);
        response = await client.usrloc.sync({ table_name });
        expect(response).toBe(OK);
    });

    it('dump(): should dump the entire content of the USRLOC in memory cache', async () => {
        const response = await client.usrloc.dump();
        // debug(JSON.stringify(response));
        expect(_.isArray(response['Domains'])).toBeTruthy();
    });

    it('flush(): should force a flush of all pending usrloc cache changes to the database', async () => {
        const response = await client.usrloc.flush();
        expect(response).toBe(OK);
    });

    it.skip('add(): should Adds a new contact for an user AOR.', async () => {
        // Trigger error: Invalid parameters.
        const table_name = 'location';
        const aor = 'AgentA';
        const contact = 'sip:sdfdfadf97@asdfasdfasdf.invalid;transport=ws';
        const expires = 3600;
        const q = '';
        const flags = 0;
        const cflags = '';
        const methods = 4479;
        const response = await client.usrloc.add({
            table_name,
            aor,
            contact,
            expires,
            q,
            flags,
            cflags,
            methods,
        });
        debug(response);
    });

    it('showContact(): should dump the contacts of an user AOR (test-error)', async () => {
        const table_name = 'location';
        const aor = 'AgentA';
        const response = await client.usrloc.showContact({ table_name, aor });
        expect(response['AOR']).toBe(aor);
    });

    it('sync(): should empty the location table, then synchronize it with all contacts from memory', async () => {
        const table_name = 'location';
        const response = await client.usrloc.sync({ table_name });
        expect(response).toBe(OK);
    });

    it('clusterSync(): should synchronize under a cluster-enabled instance (test-error)', async () => {
        try {
            await client.usrloc.clusterSync();
        } catch (err) {
            expect(err.message).toBe('Clustering not enabled');
        }
    });
});
