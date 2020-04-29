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

describe('B2bLogic Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it.skip('triggerScenario(): should instantiate a B2B scenario (test-error)', async () => {
        try {
            // opensips-cli -x mi b2b_trigger_scenario marketing sip:bob@opensips.org sip:322@opensips.org:5070 sip:alice@opensips.org
            const senario_id = 'marketing';
            const scenario_params = ['sip:bob@opensips.org', 'sip:322@opensips.org:5070', 'sip:alice@opensips.org'];
            const response = await client.b2bLogic.triggerScenario({ senario_id, scenario_params });
            debug(response);
        } catch (err) {
            expect(err.message).toContain('Invalid');
        }
    });

    it.skip('bridge(): should tell B2BUA to bridge a call party from an on going dialog to another destination (test-error)', async () => {
        try {
            // opensips-cli -x mi b2b_bridge 1020.30 sip:alice@opensips.org
            const dialog_id = '1020.30';
            const new_uri = 'sip:alice@opensips.org';
            const response = await client.b2bLogic.bridge({ dialog_id, new_uri });
            debug(response);
        } catch (err) {
            expect(err.message).toContain('Invalid');
        }
    });

    it('list(): should list the internals of b2b_logic entities', async () => {
        const response = await client.b2bLogic.list();
        expect(_.isArray(response['Tuples'])).toBeTruthy();
    });
});
