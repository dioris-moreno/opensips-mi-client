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

    it('refreshWatchers(): should Triggers sending Notify messages to watchers if a change in watchers authorization or in published state occurred.', async () => {
        const presentity_uri = uuid();
        const event = uuid();
        const refresh_type = uuid();
        const response = await client.presence.refreshWatchers({ presentity_uri, event, refresh_type });
        debug(response);
    });

    it('cleanup(): should Manually triggers the cleanup functions for watchers and presentity tables. Useful if you have set to zero or less.', async () => {
        const response = await client.presence.cleanup();
        debug(response);
    });

    it('presentityList(): should Lists all the presentity records.', async () => {
        const response = await client.presence.presentityList();
        debug(response);
    });

    it('subscriptionList(): should Lists all the subscription records, or the subscriptions for which the "To" and "From" URIs match the given parameters.', async () => {
        const response = await client.presence.subscriptionList();
        debug(response);
    });

    it('expose(): should Exposes in the script, by rasing an event, all the presentities of a specific event that match a specified filter.', async () => {
        const event = uuid();
        const response = await client.presence.expose({ event });
        debug(response);
    });
});
