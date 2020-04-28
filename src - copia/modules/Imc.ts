import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'imc';

export default class Imc extends Module {
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
}
