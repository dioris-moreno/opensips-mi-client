import Debug from 'debug';
const debug = Debug('opensips-mi-client');
import ClientConfiguration from './connection/ClientConfiguration';
import envConfig from './envConfig';
import * as Modules from './modules';
import IConnection from './connection/IConnection';
import ConnectionFactory from './connection/ConnectionFactory';

export default class Client {
    private _connection: IConnection;
    private _availableCommands: string[] = [];
    private _core: Modules.Core | undefined;
    private _b2bEntities: Modules.B2bEntities | undefined;
    private _b2bLogic: Modules.B2bLogic | undefined;
    private _b2bSca: Modules.B2bSca | undefined;
    private _benchmark: Modules.Benchmark | undefined;
    private _cachedbLocal: Modules.CachedbLocal | undefined;
    private _callCenter: Modules.CallCenter | undefined;
    private _carrierRoute: Modules.CarrierRoute | undefined;
    private _cfgutils: Modules.Cfgutils | undefined;
    private _clusterer: Modules.Clusterer | undefined;
    private _cplC: Modules.CplC | undefined;
    private _dbBerkeley: Modules.DbBerkeley | undefined;
    private _dbFlatstore: Modules.DbFlatstore | undefined;
    private _dbText: Modules.DbText | undefined;
    private _dbVirtual: Modules.DbVirtual | undefined;
    private _dialog: Modules.Dialog | undefined;
    private _dialplan: Modules.Dialplan | undefined;
    private _dispatcher: Modules.Dispatcher | undefined;
    private _domain: Modules.Domain | undefined;
    private _drouting: Modules.Drouting | undefined;
    private _eventFlatstore: Modules.EventFlatstore | undefined;
    private _gflags: Modules.Gflags | undefined;
    private _httpd: Modules.Httpd | undefined;
    private _imc: Modules.Imc | undefined;
    private _loadBalancer: Modules.LoadBalancer | undefined;
    private _mediaExchange: Modules.MediaExchange | undefined;
    private _nathelper: Modules.Nathelper | undefined;
    private _permissions: Modules.Permissions | undefined;
    private _pike: Modules.Pike | undefined;
    private _piHttp: Modules.PiHttp | undefined;
    private _presence: Modules.Presence | undefined;
    private _presenceDfks: Modules.PresenceDfks | undefined;
    private _protoTls: Modules.ProtoTls | undefined;
    private _protoWs: Modules.ProtoWs | undefined;
    private _protoWss: Modules.ProtoWss | undefined;
    private _qrouting: Modules.Qrouting | undefined;
    private _ratelimit: Modules.Ratelimit | undefined;
    private _rateCacher: Modules.RateCacher | undefined;
    private _regex: Modules.Regex | undefined;
    private _rls: Modules.Rls | undefined;
    private _rtpengine: Modules.Rtpengine | undefined;
    private _rtpproxy: Modules.Rtpproxy | undefined;
    private _sqlCacher: Modules.SqlCacher | undefined;
    private _tlsMgm: Modules.TlsMgm | undefined;
    private _tm: Modules.Tm | undefined;
    private _tracer: Modules.Tracer | undefined;
    private _uacRegistrant: Modules.UacRegistrant | undefined;
    private _userblacklist: Modules.Userblacklist | undefined;
    private _usrloc: Modules.Usrloc | undefined;
    private _xcapClient: Modules.XcapClient | undefined;

    constructor(config?: ClientConfiguration) {
        if (!config) config = envConfig;
        this._connection = ConnectionFactory.createConnection(config);
    }

    /**
     * Returns the connection object of the OpenSIPS instance.
     */
    get connection(): IConnection {
        return this._connection;
    }

    /**
     * Check if the MI command is available on the queried OpenSIPS instance.
     * @param command - The MI command we want to check (e.g. dlg_list, rtpengine_show).
     */
    isCommandAvailable = async (command: string) => {
        if (this._availableCommands.length === 0) await this.loadAvailableCommands();
        return this._availableCommands.includes(command);
    };

    /**
     * Load the list of available commands on the queried OpenSIPS instance.
     */
    loadAvailableCommands = async () => {
        try {
            this._availableCommands = await this.connection.execute('which');
        } catch (err) {
            throw err;
        }
    };

    /**
     * Returns the list of available MI commands in the OpenSIPS intance (read on connect).
     */
    get availableCommands() {
        return this._availableCommands;
    }

    /**
     * Returns the full list of arguments used when OpenSIPS was started. As in UNIX, the first argument is the name of executable binary.
     */
    arg = () => this.core.arg();

    /**
     * The command will terminate OpenSIPS (and internal shutdown).
     */
    kill = () => this.core.kill();

    /**
     * The command lists all the defined (static or learned) blacklists from OpenSIPS.
     */
    listBlacklists = () => this.core.listBlacklists();

    /**
     * The command lists all ongoing TCP/TLS connections from OpenSIPS.
     */
    listTcpConnections = () => this.core.listTcpConnections();

    /**
     * Get or set the logging level of one or all OpenSIPS processes. If no argument is passed to the log_level command, it will print a table with the current logging levels of all processes. If a logging level is given, it will be set for each process. If pid is also given, the logging level will change only for that process.
     * @param params.level - (optional) logging level (-3...4)
     * @param params.pid - (optional) Unix pid (validated by OpenSIPS)
     */
    logLevel = (params?: { level?: number; pid?: number }) => this.core.logLevel(params);

    /**
     * The command will list all all OpenSIPS processes, along with type and description.
     */
    ps = () => this.core.ps();

    /**
     * Prints the working directory of OpenSIPS instance.
     */
    pwd = () => this.core.pwd();

    /**
     * Triggers the reload of the routing block (the routes) from the script during the runtime.
     */
    reloadRoutes = () => this.core.reloadRoutes();

    /**
     * Prints various time information about OpenSIPS - when it started to run, for how long it runs.
     */
    uptime = () => this.core.uptime();

    /**
     * Prints the version string of a runningOpenSIPS.
     */
    version = () => this.core.version();

    /**
     * Prints all available MI commands from the queried OpenSIPS instance.
     */
    which = () => this.core.which();

    /**
     * Prints the statistics (all, group or one) realtime values.
     * @param params.statistics - an array of the following possible values: all - print all available statistics; group_name: - print only statistics from a certain group named 'group_name'; the OpenSIPS core defines the following groups: core, shmem; Modules export groups typically named like the module itself. name - print only the statistic named 'name'.
     */
    getStatistics = (params: { statistics: string[] }) => this.core.getStatistics(params);

    /**
     * Prints a list of available statistics in the current configuration of OpenSIPS.
     * @param params.statistics - (optional) an array of the same possible values as for get_statistics MI command, with the exception of 'all'. Omitting the parameter will list all available statistics.
     */
    listStatistics = (params?: { statistics?: string[] }) => this.core.listStatistics(params);

    /**
     * Reset (to zero) the value of a statistic variable. Note that not all variables allow reset (depending of the nature of the information they carry - example 'shmem:used_size').
     * @param params.statistics - (optional) an array of the names of the variables to be reset.
     */
    resetStatistics = (params?: { statistics?: string[] }) => this.core.resetStatistics(params);

    /**
     * This command stores in a cache system a string value.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local';
     * @param params.attr - the label to be associated with this value;
     * @param params.value - the string to be stored;
     * @param params.expire - (optional) expire time for the stored value;
     */
    cacheStore = (params: { system: string; attr: string; value: string; expire?: string }) =>
        this.core.cacheStore(params);

    /**
     * This command queries for a stored value.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local'
     * @param params.attr - the label associated with the value
     */
    cacheFetch = (params: { system: string; attr: string }) => this.core.cacheFetch(params);

    /**
     * This command removes a record from the cache system.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local'
     * @param params.attr - the label associated with the stored value
     */
    cacheRemove = (params: { system: string; attr: string }) => this.core.cacheRemove(params);

    /**
     * Subscribes an external application to a certain event.
     * @param params.event - event name
     * @param params.socket - external application socket
     * @param params.expire - (optional) expire time, in seconds - if absent, the subscription is valid only one hour (3600 s)
     */
    eventSubscribe = (params: { event: string; socket: string; expire?: number }) => this.core.eventSubscribe(params);

    /**
     * Lists all the events published through the Event Interface.
     */
    eventsList = () => this.core.eventsList();

    /**
     * Raises an event through the Event Interface using an MI command.
     * @param params.event - event name
     * @param params.params - (optional) array of elements, or a JSON object containing key-value pairs
     */
    raiseEvent = (params: { event: string; params?: string[] | { [key: string]: any } }) =>
        this.core.raiseEvent(params);

    /**
     * Lists information about the subscribers
     * @param params.event - event name
     * @param params.socket - (optional) external application socket
     */
    subscribersList = (params: { event: string; socket?: string }) => this.core.subscribersList(params);

    /**
     * Triggers a pkg memory dump for a given process. The memory dump will written to OpenSIPS's log (syslog or stderr) using the 'memdump' logging level. The global 'memdump' log level may be overwritten by a custom value provided as argument to this command.
     * @param params.pid - the PID of the process to perform the pkg dump
     * @param params.level - (optional) a log level to be used for this dump
     */
    memPkgDump = (params: { pid: number; level?: number }) => this.core.memPkgDump(params);

    /**
     * Triggers a shm memory dump. The memory dump will written to OpenSIPS's log (syslog or stderr) using the 'memdump' logging level. The global 'memdump' log level may be overwritten by a custom value provided as argument to this command.
     * @param params.level - (optional) a log level to be used for this dump
     */
    memShmDump = (params?: { level?: number }) => this.core.memShmDump(params);

    /**
     * Only available with QM_MALLOC + DBG_MALLOC. Fully scans the shared memory pool in order to locate any inconsistencies. If any sign of memory corruption is detected, OpenSIPS will immediately abort.
     */
    shmCheck = () => this.core.shmCheck();

    /**
     * Get or set the global xlogging level in OpenSIPS processes. If no argument is passed to the xlog_level command, it will print the current xlog_level. If a logging level is given, it will be globally set for all OpenSIPS processes.
     * @param params.level - (optional) a log level to be used
     */
    xlogLevel = (params?: { level?: number }) => this.core.xlogLevel(params);

    /**
     *  Returns a Core object related to the OpenSIPS instance.
     */
    private get core() {
        if (!this._core) this._core = new Modules.Core(this);
        return this._core;
    }

    /**
     *  Returns a B2bEntities object related to the OpenSIPS instance.
     */
    get b2bEntities() {
        if (!this._b2bEntities) this._b2bEntities = new Modules.B2bEntities(this);
        return this._b2bEntities;
    }

    /**
     *  Returns a B2bLogic object related to the OpenSIPS instance.
     */
    get b2bLogic() {
        if (!this._b2bLogic) this._b2bLogic = new Modules.B2bLogic(this);
        return this._b2bLogic;
    }

    /**
     *  Returns a B2bSca object related to the OpenSIPS instance.
     */
    get b2bSca() {
        if (!this._b2bSca) this._b2bSca = new Modules.B2bSca(this);
        return this._b2bSca;
    }

    /**
     *  Returns a Benchmark object related to the OpenSIPS instance.
     */
    get benchmark() {
        if (!this._benchmark) this._benchmark = new Modules.Benchmark(this);
        return this._benchmark;
    }

    /**
     *  Returns a CachedbLocal object related to the OpenSIPS instance.
     */
    get cachedbLocal() {
        if (!this._cachedbLocal) this._cachedbLocal = new Modules.CachedbLocal(this);
        return this._cachedbLocal;
    }

    /**
     *  Returns a CallCenter object related to the OpenSIPS instance.
     */
    get callCenter() {
        if (!this._callCenter) this._callCenter = new Modules.CallCenter(this);
        return this._callCenter;
    }

    /**
     *  Returns a CarrierRoute object related to the OpenSIPS instance.
     */
    get carrierRoute() {
        if (!this._carrierRoute) this._carrierRoute = new Modules.CarrierRoute(this);
        return this._carrierRoute;
    }

    /**
     *  Returns a Cfgutils object related to the OpenSIPS instance.
     */
    get cfgutils() {
        if (!this._cfgutils) this._cfgutils = new Modules.Cfgutils(this);
        return this._cfgutils;
    }

    /**
     *  Returns a Clusterer object related to the OpenSIPS instance.
     */
    get clusterer() {
        if (!this._clusterer) this._clusterer = new Modules.Clusterer(this);
        return this._clusterer;
    }

    /**
     *  Returns a CplC object related to the OpenSIPS instance.
     */
    get cplC() {
        if (!this._cplC) this._cplC = new Modules.CplC(this);
        return this._cplC;
    }

    /**
     *  Returns a DbBerkeley object related to the OpenSIPS instance.
     */
    get dbBerkeley() {
        if (!this._dbBerkeley) this._dbBerkeley = new Modules.DbBerkeley(this);
        return this._dbBerkeley;
    }

    /**
     *  Returns a DbFlatstore object related to the OpenSIPS instance.
     */
    get dbFlatstore() {
        if (!this._dbFlatstore) this._dbFlatstore = new Modules.DbFlatstore(this);
        return this._dbFlatstore;
    }

    /**
     *  Returns a DbText object related to the OpenSIPS instance.
     */
    get dbText() {
        if (!this._dbText) this._dbText = new Modules.DbText(this);
        return this._dbText;
    }

    /**
     *  Returns a DbVirtual object related to the OpenSIPS instance.
     */
    get dbVirtual() {
        if (!this._dbVirtual) this._dbVirtual = new Modules.DbVirtual(this);
        return this._dbVirtual;
    }

    /**
     *  Returns a Dialog object related to the OpenSIPS instance.
     */
    get dialog() {
        if (!this._dialog) this._dialog = new Modules.Dialog(this);
        return this._dialog;
    }

    /**
     *  Returns a Dialplan object related to the OpenSIPS instance.
     */
    get dialplan() {
        if (!this._dialplan) this._dialplan = new Modules.Dialplan(this);
        return this._dialplan;
    }

    /**
     *  Returns a Dispatcher object related to the OpenSIPS instance.
     */
    get dispatcher() {
        if (!this._dispatcher) this._dispatcher = new Modules.Dispatcher(this);
        return this._dispatcher;
    }

    /**
     *  Returns a Domain object related to the OpenSIPS instance.
     */
    get domain() {
        if (!this._domain) this._domain = new Modules.Domain(this);
        return this._domain;
    }

    /**
     *  Returns a Drouting object related to the OpenSIPS instance.
     */
    get drouting() {
        if (!this._drouting) this._drouting = new Modules.Drouting(this);
        return this._drouting;
    }

    /**
     *  Returns a EventFlatstore object related to the OpenSIPS instance.
     */
    get eventFlatstore() {
        if (!this._eventFlatstore) this._eventFlatstore = new Modules.EventFlatstore(this);
        return this._eventFlatstore;
    }

    /**
     *  Returns a Gflags object related to the OpenSIPS instance.
     */
    get gflags() {
        if (!this._gflags) this._gflags = new Modules.Gflags(this);
        return this._gflags;
    }

    /**
     *  Returns a Httpd object related to the OpenSIPS instance.
     */
    get httpd() {
        if (!this._httpd) this._httpd = new Modules.Httpd(this);
        return this._httpd;
    }

    /**
     *  Returns a Imc object related to the OpenSIPS instance.
     */
    get imc() {
        if (!this._imc) this._imc = new Modules.Imc(this);
        return this._imc;
    }

    /**
     *  Returns a LoadBalancer object related to the OpenSIPS instance.
     */
    get loadBalancer() {
        if (!this._loadBalancer) this._loadBalancer = new Modules.LoadBalancer(this);
        return this._loadBalancer;
    }

    /**
     *  Returns a MediaExchange object related to the OpenSIPS instance.
     */
    get mediaExchange() {
        if (!this._mediaExchange) this._mediaExchange = new Modules.MediaExchange(this);
        return this._mediaExchange;
    }

    /**
     *  Returns a Nathelper object related to the OpenSIPS instance.
     */
    get nathelper() {
        if (!this._nathelper) this._nathelper = new Modules.Nathelper(this);
        return this._nathelper;
    }

    /**
     *  Returns a Permissions object related to the OpenSIPS instance.
     */
    get permissions() {
        if (!this._permissions) this._permissions = new Modules.Permissions(this);
        return this._permissions;
    }

    /**
     *  Returns a Pike object related to the OpenSIPS instance.
     */
    get pike() {
        if (!this._pike) this._pike = new Modules.Pike(this);
        return this._pike;
    }

    /**
     *  Returns a PiHttp object related to the OpenSIPS instance.
     */
    get piHttp() {
        if (!this._piHttp) this._piHttp = new Modules.PiHttp(this);
        return this._piHttp;
    }

    /**
     *  Returns a Presence object related to the OpenSIPS instance.
     */
    get presence() {
        if (!this._presence) this._presence = new Modules.Presence(this);
        return this._presence;
    }

    /**
     *  Returns a PresenceDfks object related to the OpenSIPS instance.
     */
    get presenceDfks() {
        if (!this._presenceDfks) this._presenceDfks = new Modules.PresenceDfks(this);
        return this._presenceDfks;
    }

    /**
     *  Returns a ProtoTls object related to the OpenSIPS instance.
     */
    get protoTls() {
        if (!this._protoTls) this._protoTls = new Modules.ProtoTls(this);
        return this._protoTls;
    }

    /**
     *  Returns a ProtoWs object related to the OpenSIPS instance.
     */
    get protoWs() {
        if (!this._protoWs) this._protoWs = new Modules.ProtoWs(this);
        return this._protoWs;
    }

    /**
     *  Returns a ProtoWss object related to the OpenSIPS instance.
     */
    get protoWss() {
        if (!this._protoWss) this._protoWss = new Modules.ProtoWss(this);
        return this._protoWss;
    }

    /**
     *  Returns a Qrouting object related to the OpenSIPS instance.
     */
    get qrouting() {
        if (!this._qrouting) this._qrouting = new Modules.Qrouting(this);
        return this._qrouting;
    }

    /**
     *  Returns a Ratelimit object related to the OpenSIPS instance.
     */
    get ratelimit() {
        if (!this._ratelimit) this._ratelimit = new Modules.Ratelimit(this);
        return this._ratelimit;
    }

    /**
     *  Returns a RateCacher object related to the OpenSIPS instance.
     */
    get rateCacher() {
        if (!this._rateCacher) this._rateCacher = new Modules.RateCacher(this);
        return this._rateCacher;
    }

    /**
     *  Returns a Regex object related to the OpenSIPS instance.
     */
    get regex() {
        if (!this._regex) this._regex = new Modules.Regex(this);
        return this._regex;
    }

    /**
     *  Returns a Rls object related to the OpenSIPS instance.
     */
    get rls() {
        if (!this._rls) this._rls = new Modules.Rls(this);
        return this._rls;
    }

    /**
     *  Returns a Rtpengine object related to the OpenSIPS instance.
     */
    get rtpengine() {
        if (!this._rtpengine) this._rtpengine = new Modules.Rtpengine(this);
        return this._rtpengine;
    }

    /**
     *  Returns a Rtpproxy object related to the OpenSIPS instance.
     */
    get rtpproxy() {
        if (!this._rtpproxy) this._rtpproxy = new Modules.Rtpproxy(this);
        return this._rtpproxy;
    }

    /**
     *  Returns a SqlCacher object related to the OpenSIPS instance.
     */
    get sqlCacher() {
        if (!this._sqlCacher) this._sqlCacher = new Modules.SqlCacher(this);
        return this._sqlCacher;
    }

    /**
     *  Returns a TlsMgm object related to the OpenSIPS instance.
     */
    get tlsMgm() {
        if (!this._tlsMgm) this._tlsMgm = new Modules.TlsMgm(this);
        return this._tlsMgm;
    }

    /**
     *  Returns a Tm object related to the OpenSIPS instance.
     */
    get tm() {
        if (!this._tm) this._tm = new Modules.Tm(this);
        return this._tm;
    }

    /**
     *  Returns a Tracer object related to the OpenSIPS instance.
     */
    get tracer() {
        if (!this._tracer) this._tracer = new Modules.Tracer(this);
        return this._tracer;
    }

    /**
     *  Returns a UacRegistrant object related to the OpenSIPS instance.
     */
    get uacRegistrant() {
        if (!this._uacRegistrant) this._uacRegistrant = new Modules.UacRegistrant(this);
        return this._uacRegistrant;
    }

    /**
     *  Returns a Userblacklist object related to the OpenSIPS instance.
     */
    get userblacklist() {
        if (!this._userblacklist) this._userblacklist = new Modules.Userblacklist(this);
        return this._userblacklist;
    }

    /**
     *  Returns a Usrloc object related to the OpenSIPS instance.
     */
    get usrloc() {
        if (!this._usrloc) this._usrloc = new Modules.Usrloc(this);
        return this._usrloc;
    }

    /**
     *  Returns a XcapClient object related to the OpenSIPS instance.
     */
    get xcapClient() {
        if (!this._xcapClient) this._xcapClient = new Modules.XcapClient(this);
        return this._xcapClient;
    }
}
