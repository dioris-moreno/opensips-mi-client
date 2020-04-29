/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client } from '../../src/index';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomInt } from '../utils/utils';

const OK = 'OK';

describe('DRouting Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should reload all routing rules from database', async () => {
        const response = await client.drouting.reload();
        expect(response).toBe(OK);
    });

    it('reload(): should reload one partition routing rules from database', async () => {
        const partition_name = 'default';
        const response = await client.drouting.reload({ partition_name });
        expect(response).toBe(OK);
    });

    it.skip('gwStatus(): should return the status all gateways', async () => {
        // partition_name is required because we have enabled use_partitions in opensips.cfg
        // modparam("drouting", "use_partitions", 1)
        const response = await client.drouting.gwStatus();
        expect(_.isArray(response['Gateways'])).toBeTruthy();
    });

    it('gwStatus(): should return status of the gateways of one partition', async () => {
        const partition_name = 'default';
        const response = await client.drouting.gwStatus({ partition_name });
        expect(_.isArray(response['Gateways'])).toBeTruthy();
    });

    it.skip('gwStatus(): should return status of one gateway of one partition', async () => {
        const partition_name = 'default';
        const gw_id = '1';
        const response = await client.drouting.gwStatus({ partition_name, gw_id });
        debug(response);
        // expect(_.isArray(response['Gateways'])).toBeTruthy();
    });

    it('carrierStatus(): should return the status of all carriers', async () => {
        const partition_name = 'default';
        const response = await client.drouting.carrierStatus({ partition_name });
        expect(_.isArray(response['Carriers'])).toBeTruthy();
    });

    it('reloadStatus(): should return the the time of the last reload for any partition', async () => {
        const partition_name = 'default';
        const response = await client.drouting.reloadStatus({ partition_name });
        // e.g. { name: 'default', Date: 'Sun Apr 26 18:04:25 2020' }
        expect(!_.isEmpty(response)).toBeTruthy();
    });

    it('numberRouting(): should return "No match"', async () => {
        const partition_name = 'default';
        const number = uuid();
        const response = await client.drouting.numberRouting({ partition_name, number });
        expect(response).toBe('No match');
    });

    it.skip('numberRouting(): should return the matched prefix to which a number would be routed', async () => {
        const partition_name = 'default';
        const number = uuid();
        const response = await client.drouting.numberRouting({ partition_name, number });
        // e.g. { name: 'default', Date: 'Sun Apr 26 18:04:25 2020' }
        debug(response);
        // expect(!_.isEmpty(response)).toBeTruthy();
    });

    it('enableProbing(): should enable gateway probing', async () => {
        const status = 1;
        const response = await client.drouting.enableProbing({ status });
        expect(response).toBe(OK);
    });

    it('enableProbing(): should disable gateway probing', async () => {
        const status = 0;
        const response = await client.drouting.enableProbing({ status });
        expect(response).toBe(OK);
    });
});
