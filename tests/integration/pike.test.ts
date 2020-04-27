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

    it('list(): should Lists the nodes in the pike tree.', async () => {
        const response = await client.pike.list();
        debug(response);
    });

    it('rm(): should Remove a node from the pike tree by IP address.', async () => {
        const IP = uuid();
        const response = await client.pike.rm({ IP });
        debug(response);
    });
});
