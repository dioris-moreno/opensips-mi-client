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

describe('Dispatcher Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('list(): should return the groups and included destinations of all the partitions', async () => {
        const response = await client.dispatcher.list();
        // { PARTITIONS: [ { name: 'default' } ] }
        expect(_.isArray(response['PARTITIONS'])).toBeTruthy();
    });

    it('list(): should return the groups and included destinations of all the partitions (with full option = 1)', async () => {
        const full = 1;
        const response = await client.dispatcher.list({ full });
        // { PARTITIONS: [ { name: 'default' } ] }
        expect(_.isArray(response['PARTITIONS'])).toBeTruthy();
    });

    it('reload(): should reload all groups and included destinations for all partitions', async () => {
        const response = await client.dispatcher.reload();
        expect(response).toBe(OK);
    });

    it('reload(): should reload the groups and included destinations for a specified partition', async () => {
        const partition = 'default';
        const response = await client.dispatcher.reload({ partition });
        expect(response).toBe(OK);
    });

    it('setState(): should set the status for a destination address (test-error)', async () => {
        try {
            // opensips-cli -x mi ds_set_state a 2 sip:10.0.0.202
            const state = 'a';
            const group = '2';
            const address = 'sip:10.0.0.202';
            const response = await client.dispatcher.setState({ state, group, address });
        } catch (err) {
            expect(err.message).toContain('destination not found');
        }
    });
});
