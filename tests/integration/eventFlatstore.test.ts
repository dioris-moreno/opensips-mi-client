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

describe('EventFlatstore Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('flatRotate(): should reopen the file specified (test-error)', async () => {
        try {
            const path_to_file = `/etc/opensips/event-flagstore-${uuid()}`;
            await client.eventFlatstore.flatRotate({ path_to_file });
        } catch (err) {
            expect(err.message).toContain('File not found');
        }
    });
});
