import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'core';

export default class Core extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Returns the full list of arguments used when OpenSIPS was started. As in UNIX, the first argument is the name of executable binary.
     */
    arg = () => this.execute('arg');

    /**
     * The command will terminate OpenSIPS (and internal shutdown).
     */
    kill = () => this.execute('kill');

    /**
     * The command lists all the defined (static or learned) blacklists from OpenSIPS.
     */
    listBlacklists = () => this.execute('list_blacklists');

    /**
     * The command lists all ongoing TCP/TLS connections from OpenSIPS.
     */
    listTcpConnections = () => this.execute('list_tcp_conns');

    /**
     * Get or set the logging level of one or all OpenSIPS processes. If no argument is passed to the log_level command, it will print a table with the current logging levels of all processes. If a logging level is given, it will be set for each process. If pid is also given, the logging level will change only for that process.
     * @param params.level - (optional) logging level (-3...4)
     * @param params.pid - (optional) Unix pid (validated by OpenSIPS)
     */
    logLevel = (params?: { level?: number; pid?: number }) => this.execute('log_level', params);

    /**
     * This command can be used to list the internals of the b2b entities.
     */
    ps = () => this.execute('ps');

    /**
     * Prints the working directory of OpenSIPS instance.
     */
    pwd = () => this.execute('pwd');

    /**
     * Triggers the reload of the routing block (the routes) from the script during the runtime.
     */
    reloadRoutes = () => this.execute('reload_routes');

    /**
     * Prints various time information about OpenSIPS - when it started to run, for how long it runs.
     */
    uptime = () => this.execute('uptime');

    /**
     * Prints the version string of a runningOpenSIPS.
     */
    version = () => this.execute('version');

    /**
     * Prints all available MI commands from the queried OpenSIPS instance.
     */
    which = () => this.execute('which');

    /**
     * Prints the statistics (all, group or one) realtime values.
     * @param params.statistics - an array of the following possible values: all - print all available statistics; group_name: - print only statistics from a certain group named 'group_name'; the OpenSIPS core defines the following groups: core, shmem; Modules export groups typically named like the module itself. name - print only the statistic named 'name'.
     */
    getStatistics = (params: { statistics: string[] }) => this.execute('get_statistics', params);

    /**
     * Prints a list of available statistics in the current configuration of OpenSIPS.
     * @param params.statistics - (optional) an array of the same possible values as for get_statistics MI command, with the exception of 'all'. Omitting the parameter will list all available statistics.
     */
    listStatistics = (params?: { statistics?: string[] }) => this.execute('list_statistics', params);

    /**
     * Reset (to zero) the value of a statistic variable. Note that not all variables allow reset (depending of the nature of the information they carry - example 'shmem:used_size').
     * @param params.statistics - (optional) an array of the names of the variables to be reset.
     */
    resetStatistics = (params?: { statistics?: string[] }) => this.execute('reset_statistics', params);

    /**
     * This command stores in a cache system a string value.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local';
     * @param params.attr - the label to be associated with this value;
     * @param params.value - the string to be stored;
     * @param params.expire - (optional) expire time for the stored value;
     */
    cacheStore = (params: { system: string; attr: string; value: string; expire?: string }) =>
        this.execute('cache_store', params);

    /**
     * This command queries for a stored value.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local'
     * @param params.attr - the label associated with the value
     */
    cacheFetch = (params: { system: string; attr: string }) => this.execute('cache_fetch', params);

    /**
     * This command removes a record from the cache system.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local'
     * @param params.attr - the label associated with the stored value
     */
    cacheRemove = (params: { system: string; attr: string }) => this.execute('cache_remove', params);

    /**
     * Subscribes an external application to a certain event.
     * @param params.event - event name
     * @param params.socket - external application socket
     * @param params.expire - (optional) expire time, in seconds - if absent, the subscription is valid only one hour (3600 s)
     */
    eventSubscribe = (params: { event: string; socket: string; expire?: number }) =>
        this.execute('event_subscribe', params);

    /**
     * Lists all the events published through the Event Interface.
     */
    eventsList = () => this.execute('events_list');

    /**
     * Raises an event through the Event Interface using an MI command.
     * @param params.event - event name
     * @param params.params - (optional) array of elements, or a JSON object containing key-value pairs
     */
    raiseEvent = (params: { event: string; params?: string[] | { [key: string]: any } }) =>
        this.execute('raise_event', params);

    /**
     * Lists information about the subscribers
     * @param params.event - event name
     * @param params.socket - (optional) external application socket
     */
    subscribersList = (params: { event: string; socket?: string }) => this.execute('subscribers_list', params);

    /**
     * Triggers a pkg memory dump for a given process. The memory dump will written to OpenSIPS's log (syslog or stderr) using the 'memdump' logging level. The global 'memdump' log level may be overwritten by a custom value provided as argument to this command.
     * @param params.pid - the PID of the process to perform the pkg dump
     * @param params.level - (optional) a log level to be used for this dump
     */
    memPkgDump = (params: { pid: number; level?: number }) => this.execute('mem_pkg_dump', params);

    /**
     * Triggers a shm memory dump. The memory dump will written to OpenSIPS's log (syslog or stderr) using the 'memdump' logging level. The global 'memdump' log level may be overwritten by a custom value provided as argument to this command.
     * @param params.level - (optional) a log level to be used for this dump
     */
    memShmDump = (params?: { level?: number }) => this.execute('mem_shm_dump', params);

    /**
     * Only available with QM_MALLOC + DBG_MALLOC. Fully scans the shared memory pool in order to locate any inconsistencies. If any sign of memory corruption is detected, OpenSIPS will immediately abort.
     */
    shmCheck = () => this.execute('shm_check');

    /**
     * Get or set the global xlogging level in OpenSIPS processes. If no argument is passed to the xlog_level command, it will print the current xlog_level. If a logging level is given, it will be globally set for all OpenSIPS processes.
     * @param params.level - (optional) a log level to be used
     */
    xlogLevel = (params?: { level?: number }) => this.execute('xlog_level', params);
}
