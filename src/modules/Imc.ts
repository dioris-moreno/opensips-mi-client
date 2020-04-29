import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'imc';

export class Imc extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Lists of the IM Conferencing rooms.
     */
    listRooms = () => this.execute('imc_list_rooms');

    /**
     * Listing of the members in IM Conferencing rooms.
     * @param params.room - the room for which you want to list the members
     */
    listMembers = (params: { room: string }) => this.execute('imc_list_members', params);

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Imc.Stats | Imc.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Imc {
    export type AllStats = 'all';
    export type ActiveRoomsStat = 'active_rooms';
    export type StatsTypes = AllStats | ActiveRoomsStat;
    export enum Stats {
        All = 'all',
        ActiveRooms = 'active_rooms',
    }
}

export default Imc;
