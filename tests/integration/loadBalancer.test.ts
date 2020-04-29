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

describe('LoadBalancer Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should reload the load balancing data from the DB', async () => {
        const response = await client.loadBalancer.reload();
        expect(response).toBe(OK);
    });

    it('resize(): should Changes the capacity for a resource of a destination.', async () => {
        try {
            // opensips-cli -x mi lb_resize 11 voicemail 56
            const destination_id = 1;
            const res_name = 'voicemail';
            const new_capacity = 56;
            const response = await client.loadBalancer.resize({ destination_id, res_name, new_capacity });
            debug(response);
        } catch (err) {
            expect(err.message).toContain('Destination ID not found');
        }
    });

    it('list(): should return a list of all the destinations and the maximum and current load for each resource of the destination', async () => {
        const response = await client.loadBalancer.list();
        expect(_.isArray(response['Destinations'])).toBeTruthy();
    });

    it('status(): should get or set the status (enabled or disabled) of a destination', async () => {
        try {
            // opensips-cli -x mi lb_status 2 1
            const destination_id = 2;
            const new_status = 1;
            const response = await client.loadBalancer.status({ destination_id, new_status });
            debug(response);
        } catch (err) {
            expect(err.message).toContain('Destination ID not found');
        }
    });
});
