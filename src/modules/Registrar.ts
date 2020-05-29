import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'registrar';

export class Registrar extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Returns the statistics of the module.
     * @param [name] - get only the statistic named "name".
     * @param [options] - use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Registrar.Stats | Registrar.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Registrar {
    export type AllStats = 'all';
    export type MaxExpiresStat = 'max_expires';
    export type MaxContactsStat = 'max_contacts';
    export type DefaultExpiresStat = 'default_expire';
    export type AcceptedRegsStat = 'accepted_regs';
    export type RejectedRegsStat = 'rejected_regs';
    export type StatsTypes =
        | AllStats
        | MaxExpiresStat
        | MaxContactsStat
        | DefaultExpiresStat
        | AcceptedRegsStat
        | RejectedRegsStat;
    export enum Stats {
        All = 'all',
        MaxExpires = 'max_expires',
        MaxContacts = 'max_contacts',
        DefaultExpires = 'default_expire',
        AcceptedRegs = 'accepted_regs',
        RejectedRegs = 'rejected_regs',
    }
}

export default Registrar;
