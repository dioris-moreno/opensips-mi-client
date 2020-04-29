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

describe('Tracer Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('trace(): should get the global tracing setting', async () => {
        const response = await client.tracer.trace();
        // { global: 'on', 'trace destinations': [] }
        expect(response['global'] === 'on' || response['global'] === 'off').toBeTruthy();
    });

    it('trace(): should turn on tracing globally', async () => {
        const mode = 'on';
        let response = await client.tracer.trace({ mode });
        expect(response).toBe(OK);
        response = await client.tracer.trace();
        expect(response['global']).toBe(mode);
    });

    it('trace(): should turn off tracing globally', async () => {
        const mode = 'off';
        let response = await client.tracer.trace({ mode });
        expect(response).toBe(OK);
        response = await client.tracer.trace();
        expect(response['global']).toBe(mode);
    });

    it('start(), stop(): should create and stop a dynamic tracing destination without filters', async () => {
        // opensips-cli -x mi trace_start id=ip_filter uri=sip:10.0.0.1:5060 filter=ip=127.0.0.1
        const id = uuid();
        const uri = 'sip:127.0.0.1:5060';
        let response = await client.tracer.start({ id, uri });
        expect(response).toBe(OK);
        // Stop the created trace.
        response = await client.tracer.stop({ id });
        expect(response).toBe(OK);
    });

    it('start(), stop(): should create and stop a dynamic tracing destination using filter', async () => {
        // opensips-cli -x mi trace_start id=ip_filter uri=sip:10.0.0.1:5060 filter=ip=127.0.0.1
        const id = uuid();
        const uri = 'sip:127.0.0.1:5060';
        const filter = 'ip=127.0.0.1';
        let response = await client.tracer.start({ id, uri, filter });
        expect(response).toBe(OK);
        // Stop the created trace.
        response = await client.tracer.stop({ id });
        expect(response).toBe(OK);
    });

    it('start(), stop(): should create and stop a dynamic tracing destination using filter and scope', async () => {
        // opensips-cli -x mi trace_start id=ip_filter uri=sip:10.0.0.1:5060 filter=ip=127.0.0.1
        const id = uuid();
        const uri = 'sip:127.0.0.1:5060';
        const filter = 'ip=127.0.0.1';
        const scope = 'd'; // Dialog
        let response = await client.tracer.start({ id, uri, filter, scope });
        expect(response).toBe(OK);
        // Stop the created trace.
        response = await client.tracer.stop({ id });
        expect(response).toBe(OK);
    });

    it('start(), stop(): should create and stop a dynamic tracing destination using filter, scope and type', async () => {
        // opensips-cli -x mi trace_start id=ip_filter uri=sip:10.0.0.1:5060 filter=ip=127.0.0.1
        const id = uuid();
        const uri = 'sip:127.0.0.1:5060';
        const filter = 'ip=127.0.0.1';
        const scope = 'd'; // Dialog
        const type = 'sip|xlog';
        let response = await client.tracer.start({ id, uri, filter, scope, type });
        expect(response).toBe(OK);
        // Stop the created trace.
        response = await client.tracer.stop({ id });
        expect(response).toBe(OK);
    });
});
