/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, Sl } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('Sl Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.sl.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.sl.getStatistics(Sl.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.sl.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return 1xx_replies statistic', async () => {
        const stat = '1xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C1xxReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 1xx_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '1xx_replies';
        const valueName = 'sl:1xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C1xxReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 2xx_replies statistic', async () => {
        const stat = '2xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C2xxReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 2xx_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '2xx_replies';
        const valueName = 'sl:2xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C2xxReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 3xx_replies statistic', async () => {
        const stat = '3xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C3xxReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 3xx_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '3xx_replies';
        const valueName = 'sl:3xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C3xxReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 4xx_replies statistic', async () => {
        const stat = '4xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C4xxReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 4xx_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '4xx_replies';
        const valueName = 'sl:4xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C4xxReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 5xx_replies statistic', async () => {
        const stat = '5xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C5xxReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 5xx_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '5xx_replies';
        const valueName = 'sl:5xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C5xxReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 6xx_replies statistic', async () => {
        const stat = '6xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C6xxReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 6xx_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '6xx_replies';
        const valueName = 'sl:6xx_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.C6xxReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return sent_replies statistic', async () => {
        const stat = 'sent_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.SentReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return sent_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'sent_replies';
        const valueName = 'sl:sent_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.SentReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return sent_err_replies statistic', async () => {
        const stat = 'sent_err_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.SentErrReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return sent_err_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'sent_err_replies';
        const valueName = 'sl:sent_err_replies';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.SentErrReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return received_ACKs statistic', async () => {
        const stat = 'received_ACKs';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.ReceivedAcks);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return received_ACKs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'received_ACKs';
        const valueName = 'sl:received_ACKs';

        // Using Stats enum member
        let response = await client.sl.getStatistics(Sl.Stats.ReceivedAcks, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sl.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
