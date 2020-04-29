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

describe('CarrierRoute Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reloadRoutes(): should reload the routing data from the data source', async () => {
        const response = await client.carrierRoute.reloadRoutes();
        expect(response).toBe(OK);
    });

    it('dumpRoutes(): should return the route rules', async () => {
        const response = await client.carrierRoute.dumpRoutes();
        expect(_.isArray(response['Carriers'])).toBeTruthy();
    });

    it('replaceHost(): should replace the rewrite_host of a route rule (file mode only | test-error).', async () => {
        // opensips-cli -x mi cr_replace_host "-d proxy -p 49 -h proxy1 -t proxy2"
        try {
            const options = '-d proxy -p 49 -h proxy1 -t proxy2';
            await client.carrierRoute.replaceHost({ options });
        } catch (err) {
            expect(err.message).toContain('Not running in config file mode');
        }
    });

    it('deactivateHost(): should deactivate the specified host (file mode only | test-error).', async () => {
        // opensips-cli -x mi cr_deactivate_host "-d proxy -p 49 -h proxy1"
        try {
            const options = '-d proxy -p 49 -h proxy1';
            await client.carrierRoute.deactivateHost({ options });
        } catch (err) {
            expect(err.message).toContain('Not running in config file mode');
        }
    });

    it('activateHost(): should activate the specified host (file mode only | test-error).', async () => {
        // opensips-cli -x mi cr_activate_host "-d proxy -p 49 -h proxy1"
        try {
            const options = '-d proxy -p 49 -h proxy1';
            await client.carrierRoute.activateHost({ options });
        } catch (err) {
            expect(err.message).toContain('Not running in config file mode');
        }
    });

    it('addHost(): should add a route rule (file mode only | test-error).', async () => {
        // opensips-cli -x mi cr_add_host "-d proxy -p 49 -h proxy1 -w 0.25"
        try {
            const options = '-d proxy -p 49 -h proxy1 -w 0.25';
            await client.carrierRoute.addHost({ options });
        } catch (err) {
            expect(err.message).toContain('Not running in config file mode');
        }
    });

    it('deleteHost(): should This command delete the specified hosts or rules (file mode only | test-error).', async () => {
        // opensips-cli -x mi cr_delete_host "-d proxy -p 49 -h proxy1 -w 0.25"
        try {
            const options = '-d proxy -p 49 -h proxy1 -w 0.25';
            await client.carrierRoute.deleteHost({ options });
        } catch (err) {
            expect(err.message).toContain('Not running in config file mode');
        }
    });
});
