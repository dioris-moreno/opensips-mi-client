/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, Tm } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('TM Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('uacDlg(): should generate and send a local SIP request', async () => {
        // opensips-cli -x mi t_uac_dlg method=INVITE ruri="sip:alice@127.0.0.1:7050" headers="From: sip:bobster@127.0.0.1:1337\r\nTo: sip:alice@127.0.0.1:7050\r\nContact: sip:bobster@127.0.0.1:1337\r\n"
        const method = 'INVITE';
        const ruri = 'sip:alice@127.0.0.1:7050';
        const headers =
            'From: sip:bobster@127.0.0.1:1337\r\nTo: sip:alice@127.0.0.1:7050\r\nContact: sip:bobster@127.0.0.1:1337\r\n';
        const response = await client.tm.uacDlg({ method, ruri, headers });
        // { Status: '408 Request Timeout' }
        expect(response['Status'] !== undefined).toBeTruthy();
    });

    it('uacCancel(): should generate and send a CANCEL for an existing SIP request (error-test).', async () => {
        // t_uac_cancel "1-23454@127.0.0.1" "1 INVITE"
        try {
            const callid = '1-23454@127.0.0.1';
            const cseq = '1 INVITE';
            await client.tm.uacCancel({ callid, cseq });
        } catch (err) {
            expect(err.message).toBe('No such transaction');
        }
    });

    // it.skip('hash(): should get information about the load of TM internal hash table (error-test)', async () => {
    //     // Test hangs.
    //     const response = await client.tm.hash();
    //     debug(response);
    // });

    it('reply(): should generate and send a reply for an existing inbound SIP transaction (error-test).', async () => {
        // opensips-cli -x mi t_reply 403 Forbidden 46961:1279687637 abcde
        try {
            const code = 403;
            const reason = 'Forbidden';
            const trans_id = '46961:1279687637';
            const to_tag = 'abcde';
            const response = await client.tm.reply({ code, reason, trans_id, to_tag });
            debug(response);
        } catch (err) {
            expect(err.message).toBe('Transaction not found');
        }
    });

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.tm.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.tm.getStatistics(Tm.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.tm.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return received_replies statistic', async () => {
        const stat = 'received_replies';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.ReceivedReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return received_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'received_replies';
        const valueName = 'tm:received_replies';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.ReceivedReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return relayed_replies statistic', async () => {
        const stat = 'relayed_replies';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.RelayedReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return relayed_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'relayed_replies';
        const valueName = 'tm:relayed_replies';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.RelayedReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return local_replies statistic', async () => {
        const stat = 'local_replies';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.LocalReplies);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return local_replies statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'local_replies';
        const valueName = 'tm:local_replies';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.LocalReplies, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return UAS_transactions statistic', async () => {
        const stat = 'UAS_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.UASTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return UAS_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'UAS_transactions';
        const valueName = 'tm:UAS_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.UASTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return UAC_transactions statistic', async () => {
        const stat = 'UAC_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.UACTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return UAC_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'UAC_transactions';
        const valueName = 'tm:UAC_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.UACTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 2xx_transactions statistic', async () => {
        const stat = '2xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C2xxTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 2xx_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '2xx_transactions';
        const valueName = 'tm:2xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C2xxTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 3xx_transactions statistic', async () => {
        const stat = '3xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C3xxTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 3xx_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '3xx_transactions';
        const valueName = 'tm:3xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C3xxTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 4xx_transactions statistic', async () => {
        const stat = '4xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C4xxTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 4xx_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '4xx_transactions';
        const valueName = 'tm:4xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C4xxTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 5xx_transactions statistic', async () => {
        const stat = '5xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C5xxTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 5xx_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '5xx_transactions';
        const valueName = 'tm:5xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C5xxTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return 6xx_transactions statistic', async () => {
        const stat = '6xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C6xxTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return 6xx_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = '6xx_transactions';
        const valueName = 'tm:6xx_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.C6xxTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return inuse_transactions statistic', async () => {
        const stat = 'inuse_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.InuseTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return inuse_transactions statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'inuse_transactions';
        const valueName = 'tm:inuse_transactions';

        // Using Stats enum member
        let response = await client.tm.getStatistics(Tm.Stats.InuseTransactions, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.tm.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
