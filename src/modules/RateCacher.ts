import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'rate_cacher';

export default class RateCacher extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Adds a new Vendor, without assigning any ratesheet to it.
     * @param params.vendorName - name of the Vendor to be added
     */
    addVendor = (params: { vendorName: string }) => this.execute('rc_addVendor', params);

    /**
     * Removes a vendor from memory, along with the ratesheet asigned with it ( if any )
     * @param params.vendorName - name of the Vendor to be deleted
     */
    deleteVendor = (params: { vendorName: string }) => this.execute('rc_deleteVendor', params);

    /**
     * Reloads the provided ratesheet and assigns it to the Vendor
     * @param params.vendorName - name of the Vendor
     * @param params.ratesheet_id - ID of the ratesheet to be reloaded and assigned
     */
    reloadVendorRate = (params: { vendorName: string; ratesheet_id: string }) =>
        this.execute('rc_reloadVendorRate', params);

    /**
     * Deletes the assigned ratesheet from the Vendor
     * @param params.vendorName - name of the Vendor
     */
    deleteVendorRate = (params: { vendorName: string }) => this.execute('rc_deleteVendorRate', params);

    /**
     * Fetches all the ratesheet information ( destination name, price, minimum, increment ) for the provided Vendor and dialled number
     * @param params.vendorName - name of the Vendor
     * @param params.dialledNumber - number to match in the above Vendor's ratesheet
     */
    getVendorPrice = (params: { vendorName: string; dialledNumber: string }) =>
        this.execute('rc_getVendorPrice', params);

    /**
     * Adds a new Client, without assigning any ratesheet to it.
     * @param params.clientName - name of the Client to be added
     */
    addClient = (params: { clientName: string }) => this.execute('rc_addClient', params);

    /**
     * Removes a Client from memory, along with the ratesheet asigned with it ( if any )
     * @param params.clientName - name of the Client to be deleted
     */
    deleteClient = (params: { clientName: string }) => this.execute('rc_deleteClient', params);

    /**
     * Reloads the provided ratesheet and assigns it to the Client
     * @param params.clientName - name of the Cient
     * @param params.isWholesale - is the ratesheet assigned on the wholesale or retail quality
     * @param params.ratesheet_id - ID of the ratesheet to be reloaded and assigned
     */
    reloadClientRate = (params: { clientName: string; isWholesale: string; ratesheet_id: string }) =>
        this.execute('rc_reloadClientRate', params);

    /**
     * Deletes the assigned ratesheet from the Client
     * @param params.ClientName - name of the Client
     * @param params.isWholesale - delete the wholesale or retail ratesheet
     */
    deleteClientRate = (params: { ClientName: string; isWholesale: string }) =>
        this.execute('rc_deleteClientRate', params);

    /**
     * Fetches all the ratesheet information ( destination name, price, minimum, increment ) for the provided Client, on the specified quality ( wholesale vs retail ) and dialled number
     * @param params.ClientName - name of the Client
     * @param params.isWholesale - wholesale = 1, retail = 0
     * @param params.dialledNumber - number to match in the above Client's ratesheet
     */
    getClientPrice = (params: { ClientName: string; isWholesale: string; dialledNumber: string }) =>
        this.execute('rc_getClientPrice', params);
}
