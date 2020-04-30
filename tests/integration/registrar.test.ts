/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, Registrar } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('Registrar Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.registrar.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.registrar.getStatistics(Registrar.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.registrar.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return max_expires statistic', async () => {
        const stat = 'max_expires';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.MaxExpires);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return max_expires statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'max_expires';
        const valueName = 'registrar:max_expires';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.MaxExpires, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return max_contacts statistic', async () => {
        const stat = 'max_contacts';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.MaxContacts);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return max_contacts statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'max_contacts';
        const valueName = 'registrar:max_contacts';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.MaxContacts, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return default_expire statistic', async () => {
        const stat = 'default_expire';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.DefaultExpires);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return default_expire statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'default_expire';
        const valueName = 'registrar:default_expire';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.DefaultExpires, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return accepted_regs statistic', async () => {
        const stat = 'accepted_regs';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.AcceptedRegs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return accepted_regs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'accepted_regs';
        const valueName = 'registrar:accepted_regs';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.AcceptedRegs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return rejected_regs statistic', async () => {
        const stat = 'rejected_regs';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.RejectedRegs);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return rejected_regs statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'rejected_regs';
        const valueName = 'registrar:rejected_regs';

        // Using Stats enum member
        let response = await client.registrar.getStatistics(Registrar.Stats.RejectedRegs, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.registrar.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
