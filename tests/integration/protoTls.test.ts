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

describe('ProtoTls Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('trace(): should get the current tracing status', async () => {
        // { 'TLS tracing': 'off' }
        const key = 'TLS tracing';
        const response = await client.protoTls.trace();
        expect(response[key] === 'on' || response[key] === 'off').toBeTruthy();
    });

    it('trace(): should turn on tracing', async () => {
        const key = 'TLS tracing';
        const trace_mode = 'on';
        let response = await client.protoTls.trace({ trace_mode });
        expect(response).toBe(OK);
        response = await client.protoTls.trace();
        expect(response[key]).toBe(trace_mode);
    });

    it('trace(): should turn off tracing', async () => {
        const key = 'TLS tracing';
        const trace_mode = 'off';
        let response = await client.protoTls.trace({ trace_mode });
        expect(response).toBe(OK);
        response = await client.protoTls.trace();
        expect(response[key]).toBe(trace_mode);
    });
});
