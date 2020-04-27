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

describe('SqlCacher Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('cacherReload(): should reload the entire SQL table in cache in full caching mode (test-error)', async () => {
        // It triggers error:  Cache entry not found
        try {
            const id = 'default';
            const response = await client.sqlCacher.cacherReload({ id });
        } catch (err) {
            expect(err.message).toContain('Cache entry not found');
        }
    });
});
