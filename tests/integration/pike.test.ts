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

describe('Pike Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('list(): should list the nodes in the pike tree.', async () => {
        const response = await client.pike.list();
        expect(_.isArray(response['IPs'])).toBeTruthy();
    });

    it('rm(): should try to remove a node from the pike tree by IP address (test-error)', async () => {
        try {
            const ip = '10.1.1.10';
            await client.pike.rm({ ip });
        } catch (err) {
            expect(err.message).toBe('Match not found');
        }
    });

    it('rm(): should trigger an Bad IP error (invalid IP passed)', async () => {
        try {
            const ip = uuid();
            await client.pike.rm({ ip });
        } catch (err) {
            expect(err.message).toBe('Bad IP');
        }
    });
});
