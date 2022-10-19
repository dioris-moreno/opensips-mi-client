/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, NatTraversal } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('NatTraversal Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.natTraversal.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.natTraversal.getStatistics(NatTraversal.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.natTraversal.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return keepalive_endpoints statistic', async () => {
        const stat = 'keepalive_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.KeepaliveEndpoints);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return keepalive_endpoints statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'keepalive_endpoints';
        const valueName = 'nat_traversal:keepalive_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.KeepaliveEndpoints, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return registered_endpoints statistic', async () => {
        const stat = 'registered_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.RegisteredEndpoints);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return registered_endpoints statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'registered_endpoints';
        const valueName = 'nat_traversal:registered_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.RegisteredEndpoints, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return subscribed_endpoints statistic', async () => {
        const stat = 'subscribed_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.SubscribedEndpoints);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return subscribed_endpoints statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'subscribed_endpoints';
        const valueName = 'nat_traversal:subscribed_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.SubscribedEndpoints, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return dialog_endpoints statistic', async () => {
        const stat = 'dialog_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.DialogEndpoints);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return dialog_endpoints statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'dialog_endpoints';
        const valueName = 'nat_traversal:dialog_endpoints';

        // Using Stats enum member
        let response = await client.natTraversal.getStatistics(NatTraversal.Stats.DialogEndpoints, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.natTraversal.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
