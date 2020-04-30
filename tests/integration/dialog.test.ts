/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, Dialog } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('Dialog Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('list(): should list the description of the dialogs', async () => {
        const index = '1';
        const counter = '0';
        const response = await client.dialog.list({ index, counter });
        expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });

    it('listCtx(): should list the description of the dialogs including associated context', async () => {
        const index = '1';
        const counter = '0';
        const response = await client.dialog.listCtx({ index, counter });
        expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });

    it('endDlg(): should terminate an ongoing dialog (test-error)', async () => {
        try {
            const dialog_id = uuid();
            await client.dialog.endDlg({ dialog_id });
        } catch (err) {
            expect(err.message).toBe('Requested Dialog not found');
        }
    });

    it('getSize(): should return the number of dialogs belonging to a profile (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.getSize({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('listDlgs(): should list all the dialogs belonging to a profile (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.listDlgs({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('getValues(): should list all the values belonging to a profile along with their count (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.getValues({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('endDlgs(): should terminate all ongoing dialogs from a specified profile (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.endDlgs({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('dbSync(): should load all the information about the dialogs from the database', async () => {
        const response = await client.dialog.dbSync();
        expect(response).toBe(OK);
    });

    it('clusterSync(): should synchronize if dialog replication is enabled (test-error)', async () => {
        try {
            await client.dialog.clusterSync();
        } catch (err) {
            expect(err.message).toBe('Dialog replication disabled');
        }
    });

    it('restoreDb(): should restore the dialog table after a potential desynchronization event', async () => {
        const response = await client.dialog.restoreDb();
        expect(response).toBe(OK);
    });

    it('allProfiles(): should list all the dialog profiles', async () => {
        const response = await client.dialog.allProfiles();
        expect(_.isArray(response['Profiles'])).toBeTruthy();
    });

    it('pushVar(): should push or update a dialog value for the given list of dialog IDs / Call-IDs (test-error)', async () => {
        const dlg_val_name = 'var_name';
        const dlg_val_value = 'var_value';
        const DID = ['DID1'];
        const response = await client.dialog.pushVar({ dlg_val_name, dlg_val_value, DID });
        expect(response).toBe(OK);
    });

    it('sendSequential(): should send a sequential request within an ongoing dialog (test-error)', async () => {
        try {
            const callid = uuid();
            await client.dialog.sendSequential({ callid });
        } catch (err) {
            expect(err.message).toBe('Dialog Not Found');
        }
    });

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.dialog.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.dialog.getStatistics(Dialog.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.dialog.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return active_dialogs statistic', async () => {
        const stat = 'active_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.ActiveDialogs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return active_dialogs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'active_dialogs';
        const valueName = 'dialog:active_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.ActiveDialogs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return early_dialogs statistic', async () => {
        const stat = 'early_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.EarlyDialogs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return early_dialogs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'early_dialogs';
        const valueName = 'dialog:early_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.EarlyDialogs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return processed_dialogs statistic', async () => {
        const stat = 'processed_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.ProcessedDialogs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return processed_dialogs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'processed_dialogs';
        const valueName = 'dialog:processed_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.ProcessedDialogs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return expired_dialogs statistic', async () => {
        const stat = 'expired_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.ExpiredDialogs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return expired_dialogs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'expired_dialogs';
        const valueName = 'dialog:expired_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.ExpiredDialogs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return failed_dialogs statistic', async () => {
        const stat = 'failed_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.FailedDialogs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return failed_dialogs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'failed_dialogs';
        const valueName = 'dialog:failed_dialogs';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.FailedDialogs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return create_sent statistic', async () => {
        const stat = 'create_sent';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.CreateSent);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return create_sent statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'create_sent';
        const valueName = 'dialog:create_sent';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.CreateSent, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return update_sent statistic', async () => {
        const stat = 'update_sent';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.UpdateSent);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return update_sent statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'update_sent';
        const valueName = 'dialog:update_sent';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.UpdateSent, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return delete_sent statistic', async () => {
        const stat = 'delete_sent';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.DeleteSent);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return delete_sent statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'delete_sent';
        const valueName = 'dialog:delete_sent';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.DeleteSent, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return create_recv statistic', async () => {
        const stat = 'create_recv';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.CreateRecv);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return create_recv statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'create_recv';
        const valueName = 'dialog:create_recv';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.CreateRecv, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return update_recv statistic', async () => {
        const stat = 'update_recv';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.UpdateRecv);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return update_recv statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'update_recv';
        const valueName = 'dialog:update_recv';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.UpdateRecv, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return delete_recv statistic', async () => {
        const stat = 'delete_recv';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.DeleteRecv);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return delete_recv statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'delete_recv';
        const valueName = 'dialog:delete_recv';

        // Using Stats enum member
        let response = await client.dialog.getStatistics(Dialog.Stats.DeleteRecv, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.dialog.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
