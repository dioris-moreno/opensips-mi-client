import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'dialog';

export class Dialog extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Lists the description of the dialogs (calls). If no parameter is given, all dialogs will be listed. If a dialog identifier is passed as parameter (callid and fromtag), only that dialog will be listed. If a index and conter parameter is passed, it will list only a number of "counter" dialogs starting with index (as offset) - this is used to get only section of dialogs.
     * @param params.callid - (optional) callid if a single dialog to be listed.
     * @param params.from_tag - (optional) (cannot be present without the callid parameter) - fromtag (as per initial request) of the dialog to be listed. entry
     * @param params.index - offset where the dialog listing should start.
     * @param params.counter - how many dialogs should be listed (starting from the offset)
     */
    list = (params: { callid?: string; from_tag?: string; index: string; counter: string }) =>
        this.execute('dlg_list', params);

    /**
     * The same as the but including in the dialog description the associated context from modules sitting on top of the dialog module. This function also prints the dialog's values. In case of binary values, the non-printable chars are represented in hex (e.g. \x00)
     * @param params.callid - (optional) callid if a single dialog to be listed.
     * @param params.from_tag - (optional) (cannot be present without the callid parameter) - fromtag (as per initial request) of the dialog to be listed. entry
     * @param params.index - (optional) offset where the dialog listing should start.
     * @param params.counter - (optional) how many dialogs should be listed (starting from the offset)
     */
    listCtx = (params?: { callid?: string; from_tag?: string; index?: string; counter?: string }) =>
        this.execute('dlg_list_ctx', params);

    /**
     * Terminates an ongoing dialog. If dialog is established, BYEs are sent in both directions. If dialog is in unconfirmed or early state, a CANCEL will be sent to the callee side, that will trigger a 487 from the callee, which, when relayed, will also end the dialog on the caller's side.
     * @param params.dialog_id - this is an identifier of the dialog - it can be either (1) the numerical unique ID of the dialog (as provided by dlg_list), either (2) the SIP Call-ID of the dialog.
     * @param params.extra_hdrs - (optional) string containg the extra headers (full format) to be added to the BYE requests.
     */
    endDlg = (params: { dialog_id: string; extra_hdrs?: string }) => this.execute('dlg_end_dlg', params);

    /**
     * Returns the number of dialogs belonging to a profile. If the profile supports values, the check can be reinforced to take into account a specific value - how many dialogs were inserted into the profile with a specific value. If not value is passed, only simply belonging of the dialog to the profile is checked. Note that the profile does not supports values, this will be silently discarded.
     * @param params.profile - name of the profile to get the value for.
     * @param params.value - (optional) string value to toughen the check;
     */
    getSize = (params: { profile: string; value?: string }) => this.execute('profile_get_size', params);

    /**
     * Lists all the dialogs belonging to a profile. If the profile supports values, the check can be reinforced to take into account a specific value - list only the dialogs that were inserted into the profile with that specific value. If not value is passed, all dialogs belonging to the profile will be listed. Note that the profile does not supports values, this will be silently discarded. Also, when using shared profiles using the CacheDB interface, this command will only display the local dialogs.
     * @param params.profile - name of the profile to list the dialog for.
     * @param params.value - (optional) string value to toughen the check;
     */
    listDlgs = (params: { profile: string; value?: string }) => this.execute('profile_list_dlgs', params);

    /**
     * Lists all the values belonging to a profile along with their count. If the profile does not support values a total count will be returned. Note that this function does not work for shared profiles over the CacheDB interface.
     * @param params.profile - name of the profile to list the dialog for.
     */
    getValues = (params: { profile: string }) => this.execute('profile_get_values', params);

    /**
     * Terminate all ongoing dialogs from a specified profile, on a single dialog it performs the same operations as the command
     * @param params.profile - name of the profile that will have its dialogs terminated
     * @param params.value - (optional) if the profile supports values terminate only the dialogs with the specified value
     */
    endDlgs = (params: { profile: string; value?: string }) => this.execute('profile_end_dlgs', params);

    /**
     * Will load all the information about the dialogs from the database in the OpenSIPS internal memory. If a dialog is already found in memory and has the same/an older state, it will be updated with the values from DB. Otherwise, the newer in-memory version will not be changed.
     */
    dbSync = () => this.execute('dlg_db_sync');

    /**
     * This command will only take effect if dialog replication is enabled.
     */
    clusterSync = () => this.execute('dlg_cluster_sync');

    /**
     * Restores the dialog table after a potential desynchronization event. The table is truncated, then populated with CONFIRMED dialogs from memory.
     */
    restoreDb = () => this.execute('dlg_restore_db');

    /**
     * Lists all the dialog profiles, along with 1 or 0 if the given profile has/does not have an associated value.
     */
    allProfiles = () => this.execute('list_all_profiles');

    /**
     * Push or update a dialog value for the given list of dialog IDs / Call-IDs.
     * @param params.dlg_val_name - name of the dialog value that needs to be inserted/updated
     * @param params.dlg_val_value - value to be inserted/updated
     * @param params.DID - dialog identifier. Can be either the $DLG_did or the actual Call-ID.
     */
    pushVar = (params: { dlg_val_name: string; dlg_val_value: string; DID: string[] }) =>
        this.execute('dlg_push_var', params);

    /**
     * Sends a sequential request within an ongoing dialog.
     * @param params.callid - the callid of the dialog you need to trigger the sequential message for.
     * @param params.method - (optional) the method used for the sequential message. Default value is .
     * @param params.mode - (optional) can be used to tune the behavior of the sequential message. Possible values for the are:
     * @param params.body - (optional) can be used to specify a body for the initial sequential message. Possible values for the parameter are:
     */
    sendSequential = (params: { callid: string; method?: string; mode?: string; body?: string }) =>
        this.execute('dlg_send_sequential', params);

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Dialog.Stats | Dialog.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Dialog {
    export type AllStats = 'all';
    export type ActiveDialogsStat = 'active_dialogs';
    export type EarlyDialogsStat = 'early_dialogs';
    export type ProcessedDialogsStat = 'processed_dialogs';
    export type ExpiredDialogsStat = 'expired_dialogs';
    export type FailedDialogsStat = 'failed_dialogs';
    export type CreateSentStat = 'create_sent';
    export type UpdateSentStat = 'update_sent';
    export type DeleteSentStat = 'delete_sent';
    export type CreateRecvStat = 'create_recv';
    export type UpdateRecvStat = 'update_recv';
    export type DeleteRecvStat = 'delete_recv';
    export type StatsTypes =
        | AllStats
        | ActiveDialogsStat
        | EarlyDialogsStat
        | ProcessedDialogsStat
        | ExpiredDialogsStat
        | FailedDialogsStat
        | CreateSentStat
        | UpdateSentStat
        | DeleteSentStat
        | CreateRecvStat
        | UpdateRecvStat
        | DeleteRecvStat;
    export enum Stats {
        All = 'all',
        ActiveDialogs = 'active_dialogs',
        EarlyDialogs = 'early_dialogs',
        ProcessedDialogs = 'processed_dialogs',
        ExpiredDialogs = 'expired_dialogs',
        FailedDialogs = 'failed_dialogs',
        CreateSent = 'create_sent',
        UpdateSent = 'update_sent',
        DeleteSent = 'delete_sent',
        CreateRecv = 'create_recv',
        UpdateRecv = 'update_recv',
        DeleteRecv = 'delete_recv',
    }
}

export default Dialog;
