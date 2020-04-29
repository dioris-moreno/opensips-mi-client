import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'sst';

export class Sst extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Sst.Stats | Sst.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Sst {
    export type AllStats = 'all';
    export type ExpiredSstStat = 'expired_sst';
    export type StatsTypes = AllStats | ExpiredSstStat;
    export enum Stats {
        All = 'all',
        ExpiredSst = 'expired_sst',
    }
}

export default Sst;
