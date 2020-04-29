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

describe('Clusterer Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should reload data from the clusterer database', async () => {
        const response = await client.clusterer.reload();
        expect(response).toBe(OK);
    });

    it('list(): should list information(node id, URL, link state with that node etc.) about the other nodes in each cluster', async () => {
        const response = await client.clusterer.list();
        expect(_.isArray(response['Clusters'])).toBeTruthy();
    });

    it('listTopology(): should list each clusters topology from the local nodes perspective as an adjacency list', async () => {
        const response = await client.clusterer.listTopology();
        expect(_.isArray(response['Clusters'])).toBeTruthy();
    });

    it('setStatus(): should disable the local node in a specified cluster', async () => {
        const cluster_id = 1;
        const status = 0;
        const response = await client.clusterer.setStatus({ cluster_id, status });
        expect(response).toBe(OK);
    });

    it('setStatus(): should enable the local node in a specified cluster', async () => {
        const cluster_id = 1;
        const status = 1;
        const response = await client.clusterer.setStatus({ cluster_id, status });
        expect(response).toBe(OK);
    });

    it('sendMi(): should dispatche a given MI command to be run on a specific node in the cluster (error-test)', async () => {
        try {
            const cluster_id = 1;
            const destination = 2; // This node doesn't exist.
            const cmd_name = 'version';
            const response = await client.clusterer.sendMi({ cluster_id, destination, cmd_name });
            debug(response);
        } catch (err) {
            expect(err.message).toBe('Send error');
        }
    });

    it('broadcastMi(): should Dispatches a given MI command to be run on all the nodes in a cluster', async () => {
        const cluster_id = 1;
        const cmd_name = 'version';
        const response = await client.clusterer.broadcastMi({ cluster_id, cmd_name });
        expect(!_.isEmpty(response['Server'])).toBeTruthy();
    });

    it('listCap(): should list the registered capabilities and their states', async () => {
        const response = await client.clusterer.listCap();
        expect(_.isArray(response['Clusters'])).toBeTruthy();
    });

    it('shtagSetActive(): should Set the given sharing tag to the state. The information about this change is also broadcasted in the cluster in order to force any other node that may be active on this tag to step down to backup.', async () => {
        const tag = `vip1/1`;
        const response = await client.clusterer.shtagSetActive({ tag });
        expect(response).toBe(OK);
    });

    it('listShtags(): should Lists all known sharing tags and their states.', async () => {
        const response = await client.clusterer.listShtags();
        expect(_.isArray(response)).toBeTruthy();
    });
});
