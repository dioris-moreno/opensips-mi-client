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

describe('ProtoWs Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('trace(): should return de current ws tracing status', async () => {
        const response = await client.protoWs.trace();
        expect(response['WS tracing'] === 'on' || response['WS tracing'] === 'off').toBeTruthy();
    });

    it('trace(): should turn off ws tracing', async () => {
        const trace_mode = 'off';
        const response = await client.protoWs.trace({ trace_mode });
        expect(response).toBe(OK);
    });

    it('trace(): should turn on ws tracing', async () => {
        const trace_mode = 'on';
        const response = await client.protoWs.trace({ trace_mode });
        expect(response).toBe(OK);
    });
});
