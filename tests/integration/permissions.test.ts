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

describe('Permissions Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('addressReload(): should re-read the contents of the address database table into cache memory', async () => {
        // const partition = uuid(); { partition }
        const response = await client.permissions.addressReload();
        expect(response).toBe(OK);
    });

    it('addressDump(): should return contents of the address table from cache memory', async () => {
        // const partition = uuid();
        const response = await client.permissions.addressDump();
        //  { Partitions: [ { name: 'default', Destinations: [] } ] }
        expect(_.isArray(response['Partitions'])).toBeTruthy();
    });

    it('subnetDump(): should return contents of cache memory subnet table.', async () => {
        // const partition = uuid();
        const response = await client.permissions.subnetDump();
        //  { Partitions: [ { name: 'default', Destinations: [] } ] }
        expect(_.isArray(response['Partitions'])).toBeTruthy();
    });

    it('allowUri(): should return OK, it is allowed', async () => {
        // permissions.allow file:
        // ALL : ALL
        const basename = 'permissions';
        const uri = 'sip:bob@domain.com';
        const contact = 'sip:alice@domain.com';
        const response = await client.permissions.allowUri({ basename, uri, contact });
        expect(response).toBe(OK);
    });
});
