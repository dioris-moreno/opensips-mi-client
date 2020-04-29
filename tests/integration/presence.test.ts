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

describe('Presence Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it.skip('refreshWatchers(): should trigger sending Notify messages to watchers if a change in watchers authorization or in published state occurred.', async () => {
        // Triggers error: Server error
        const presentity_uri = 'sip:bob@domain.com';
        const event = 'presence';
        const refresh_type = 0;
        const response = await client.presence.refreshWatchers({ presentity_uri, event, refresh_type });
        debug(response);
    });

    it('cleanup(): should trigger the cleanup functions for watchers and presentity tables', async () => {
        const response = await client.presence.cleanup();
        expect(response).toBe(OK);
    });

    it('presentityList(): should return all the presentity records.', async () => {
        const response = await client.presence.presentityList();
        expect(_.isArray(response)).toBeTruthy();
    });

    it('subscriptionList(): should return all the subscription records', async () => {
        const response = await client.presence.subscriptionList();
        expect(_.isArray(response)).toBeTruthy();
    });

    it('subscriptionList(): should return the subscriptions for which the "To" and "From" URIs match the given parameters', async () => {
        const from = 'bob@domain.com';
        const to = 'alice@domain.com';
        const response = await client.presence.subscriptionList({ from, to });
        expect(_.isArray(response)).toBeTruthy();
    });

    it.skip('expose(): should expose in the script, by rasing an event, all the presentities of a specific event that match a specified filter.', async () => {
        // Triggers error: unknown event
        const event = 'presence';
        const response = await client.presence.expose({ event });
        debug(response);
    });
});
