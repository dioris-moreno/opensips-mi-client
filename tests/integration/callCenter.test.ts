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

describe('CallCenter Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should reload flows and agents definition from database', async () => {
        const response = await client.callCenter.reload();
        expect(response).toBe(OK);
    });

    it('agentLogin(): should login an agent into the Call Center engine', async () => {
        const agent_id = 'AgentA';
        const state = 1;
        const response = await client.callCenter.agentLogin({ agent_id, state });
        expect(response).toBe(OK);
    });

    it('agentLogin(): should logout an agent into the Call Center engine', async () => {
        const agent_id = 'AgentA';
        const state = 0;
        const response = await client.callCenter.agentLogin({ agent_id, state });
        expect(response).toBe(OK);
    });

    it('listQueue(): should return a list of all the calls in queuing', async () => {
        const response = await client.callCenter.listQueue();
        expect(_.isArray(response['Calls'])).toBeTruthy();
    });

    it('listFlows(): should return a list of all the flows', async () => {
        const response = await client.callCenter.listFlows();
        expect(_.isArray(response['Flows'])).toBeTruthy();
    });

    it('listAgents(): should return a list of all the agents', async () => {
        const response = await client.callCenter.listAgents();
        // debug(response);
        expect(_.isArray(response['Agents'])).toBeTruthy();
    });

    it('listCalls(): should return a list of all the ongoing calls', async () => {
        const response = await client.callCenter.listCalls();
        expect(_.isArray(response['Calls'])).toBeTruthy();
    });

    it('resetStats(): should reset all counter-like statistics.', async () => {
        const response = await client.callCenter.resetStats();
        expect(response).toBe(OK);
    });
});
