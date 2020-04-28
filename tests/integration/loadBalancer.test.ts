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

    it('reload(): should Trigers the reload of the load balancing data from the DB.', async () => {
        const response = await client.loadBalancer.reload();
        expect(response).toBe(OK);
    });

    it('resize(): should Changes the capacity for a resource of a destination.', async () => {
        const destination_id = uuid();
        const res_name = uuid();
        const new_capacity = uuid();
        const response = await client.loadBalancer.resize({ destination_id, res_name, new_capacity });
        debug(response);
    });

    it('list(): should Lists all the destinations and the maximum and current load for each resource of the destination.', async () => {
        const response = await client.loadBalancer.list();
        debug(response);
    });

    it('status(): should Gets or sets the status (enabled or disabled) of a destination.', async () => {
        const destination_id = uuid();
        const response = await client.loadBalancer.status({ destination_id });
        debug(response);
    });
});
