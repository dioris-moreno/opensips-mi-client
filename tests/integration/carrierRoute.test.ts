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

describe('CarrierRoute Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reloadRoutes(): should This command reloads the routing data from the data source.', async () => {
        const response = await client.carrierRoute.reloadRoutes();
        debug(response);
    });

    it('dumpRoutes(): should This command prints the route rules on the command line.', async () => {
        const response = await client.carrierRoute.dumpRoutes();
        debug(response);
    });

    it('replaceHost(): should This command can replace the rewrite_host of a route rule, it is only usable in file mode. Following options are possible:', async () => {
        const d = uuid();
        const p = uuid();
        const h = uuid();
        const t = uuid();
        const response = await client.carrierRoute.replaceHost({ d, p, h, t });
        debug(response);
    });

    it('deactivateHost(): should This command deactivates the specified host, i.e. it sets its status to 0. It is only usable in file mode. Following options are possible:', async () => {
        const d = uuid();
        const p = uuid();
        const h = uuid();
        const t = uuid();
        const response = await client.carrierRoute.deactivateHost({ d, p, h, t });
        debug(response);
    });

    it('activateHost(): should This command activates the specified host, i.e. it sets its status to 1. It is only usable in file mode. Following options are possible:', async () => {
        const d = uuid();
        const p = uuid();
        const h = uuid();
        const response = await client.carrierRoute.activateHost({ d, p, h });
        debug(response);
    });

    it('addHost(): should This command adds a route rule, it is only usable in file mode. Following options are possible:', async () => {
        const d = uuid();
        const p = uuid();
        const h = uuid();
        const w = uuid();
        const P = uuid();
        const S = uuid();
        const i = uuid();
        const s = uuid();
        const response = await client.carrierRoute.addHost({ d, p, h, w, P, S, i, s });
        debug(response);
    });

    it('deleteHost(): should This command delete the specified hosts or rules, i.e. remove them from the route tree. It is only usable in file mode. Following options are possible:', async () => {
        const d = uuid();
        const p = uuid();
        const h = uuid();
        const w = uuid();
        const P = uuid();
        const S = uuid();
        const i = uuid();
        const s = uuid();
        const response = await client.carrierRoute.deleteHost({ d, p, h, w, P, S, i, s });
        debug(response);
    });
});
