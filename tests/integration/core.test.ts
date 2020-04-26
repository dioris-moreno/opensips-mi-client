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
import { getRandomLogLevel, MIN_LOG_LEVEL, MAX_LOG_LEVEL } from '../utils/';

describe('Core MI Functions', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('arg(): should return the full list of arguments used when OpenSIPS was started', async () => {
        const response = await client.arg();
        expect(_.isArray(response)).toBeTruthy();
        expect(response.length > 0).toBeTruthy();
    });

    it('kill(): should terminate OpenSIPS (and internal shutdown)', async () => {
        const response = await client.kill();
        expect(response).toBe('OK');
    });

    it('listBlacklists(): should return a list of all the defined (static or learned) blacklists from OpenSIPS', async () => {
        const response = await client.listBlacklists();
        expect(_.isArray(response['Lists'])).toBeTruthy();
    });

    it('listTcpConnections(): should return a list all ongoing TCP/TLS connections from OpenSIPS', async () => {
        const response = await client.listTcpConnections();
        expect(_.isArray(response['Connections'])).toBeTruthy();
    });

    it('logLevel(): should return a table with the current logging levels', async () => {
        const response = await client.logLevel();
        expect(_.isArray(response['Processes'])).toBeTruthy();
        expect(response['Processes'].length > 0).toBeTruthy();
    });

    it('logLevel(): should change the logging level for each process', async () => {
        const newLogLevel = 2;
        const returnName = 'New global log level';
        const response = await client.logLevel({ level: newLogLevel });
        // response = { 'New global log level': 1 }
        expect(response[returnName]).toBe(newLogLevel);
    });

    it('version(): should return the OpenSIPS version', async () => {
        const response = await client.version();
        expect(response['Server'] !== undefined).toBeTruthy();
    });

    it('ps(): should return all OpenSIPS processes', async () => {
        const response = await client.ps();
        expect(_.isArray(response['Processes'])).toBeTruthy();
    });

    it('pwd(): should return the working directory of OpenSIPS instance', async () => {
        const response = await client.pwd();
        expect(!_.isEmpty(response['WD'])).toBeTruthy();
    });

    it('reloadRoutes(): should trigger the reload of the routing block (the routes) from the script during the runtime.', async () => {
        const response = await client.reloadRoutes();
        expect(response).toBe('OK');
    });

    it('uptime(): should return various time information about OpenSIPS', async () => {
        const response = await client.uptime();
        expect(!_.isEmpty(response['Now'])).toBeTruthy();
    });

    it('getStatistics(): should return all the statistics', async () => {
        const response = await client.getStatistics({ statistics: ['all'] });
        expect(_.isObject(response)).toBeTruthy();
        expect(!_.isEmpty(response)).toBeTruthy();
    });

    it('getStatistics(): should return statistics of one group', async () => {
        const all = await client.getStatistics({ statistics: ['all'] });
        const firstKey = _.keys(all)[0];
        const firstGroup = firstKey.split(':')[0] + ':';
        const stats = await client.getStatistics({ statistics: [firstGroup] });
        expect(_.isObject(stats)).toBeTruthy();
        expect(!_.isEmpty(stats)).toBeTruthy();
        expect(_.keys(stats).includes(firstKey)).toBeTruthy();
    });

    it('getStatistics(): should return the value of one statistic', async () => {
        const all = await client.getStatistics({ statistics: ['all'] });
        const firstKey = _.keys(all)[0];
        const statName = firstKey.split(':')[1];
        const stats = await client.getStatistics({ statistics: [statName] });
        expect(_.isObject(stats)).toBeTruthy();
        expect(_.keys(stats).length).toBe(1);
        expect(_.keys(stats).includes(firstKey)).toBeTruthy();
    });

    it('listStatistics(): should return a list of available statistics in the current configuration of OpenSIPS', async () => {
        const response = await client.listStatistics();
        expect(_.isObject(response)).toBeTruthy();
        expect(!_.isEmpty(response)).toBeTruthy();
    });

    it('resetStatistics(): should reset the value of one statistic', async () => {
        const statName = 'rcv_requests';
        const statsBefore = await client.getStatistics({ statistics: [statName] });
        // debug(statsBefore);
        const response = await client.resetStatistics({ statistics: [statName] });
        // debug(response);
        expect(response).toBe('OK');
        const statsAfter = await client.getStatistics({ statistics: [statName] });
    });

    it('cache: should store, fetch and remove a value in a cache system', async () => {
        try {
            const attr = uuid();
            const value = uuid();
            const system = 'local';
            let response = await client.cacheStore({ system, attr, value });
            expect(response).toBe('OK');
            response = await client.cacheFetch({ system, attr });
            expect(response.key).toBe(attr);
            expect(response.value).toBe(value);
            response = await client.cacheRemove({ system, attr });
            expect(response).toBe('OK');
        } catch (err) {
            debug(err);
        }
    });

    it('which(): should return all available MI commands from the queried OpenSIPS instance', async () => {
        const response = await client.which();
        expect(_.isArray(response)).toBeTruthy();
    });

    it('eventSubscribe(): NOT TESTED', async () => {
        expect(true).toBeTruthy();
    });

    it('eventsList(): should return all the events published through the Event Interface', async () => {
        const response = await client.eventsList();
        expect(_.isArray(response['Events'])).toBeTruthy();
        expect(response['Events'].length).toBeGreaterThan(0);
    });

    it('raiseEvent(): NOT TESTED (should raise a "Temporarily Unavailable" error)', async () => {
        try {
            // Used to test errors in HttpConnection Class.
            const event = 'E_PIKE_BLOCKED';
            await client.raiseEvent({ event });
        } catch (err) {
            expect(err).toBeTruthy();
        }
    });

    it('subscribersList(): should return a list of information about the subscribers', async () => {
        const event = 'E_PIKE_BLOCKED';
        const response = await client.subscribersList({ event });
        expect(response['Event']).toBeTruthy();
    });

    it('memPkgDump(): should trigger a pkg memory dump for a given process', async () => {
        let response = await client.ps();
        const processes: any[] = response['Processes'];
        const tcpProc = processes.find(item => item.Type === 'TCP receiver');
        const pid = tcpProc.PID;
        const level = 3;
        response = await client.memPkgDump({ pid, level });
        expect(response).toBe('OK');
    });

    it('memShmDump(): should trigger a shm memory dump', async () => {
        const response = await client.memShmDump();
        expect(response).toBe('OK');
    });

    it('shmCheck(): should scan the shared memory pool in order to locate any inconsistencies', async () => {
        const response = await client.shmCheck();
        expect(response).toBeTruthy();
    });

    it('xlogLevel(): should return the the current xlog_level', async () => {
        const response = await client.xlogLevel();
        expect(response['xLog Level']).toBeGreaterThanOrEqual(MIN_LOG_LEVEL);
        expect(response['xLog Level']).toBeLessThanOrEqual(MAX_LOG_LEVEL);
    });

    it('xlogLevel(): should set the logging level globally for all processes.', async () => {
        const level = getRandomLogLevel();
        const response = await client.xlogLevel({ level });
        expect(response['New xLog level']).toBe(level);
    });
});
