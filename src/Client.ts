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
     *  Connects to the OpenSIPS instance.
     */
    connect = async () => {
        try {
            this._availableCommands = await this.connection.execute('which');
        } catch (err) {
            throw err;
        }
    };

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
    isCommandAvailable = (command: string) => {
        if (this._availableCommands.length === 0) throw new Error('Client not connected. Run connect().');
        return this._availableCommands.includes(command);
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
    arg = () => this.core.execute('arg');

    /**
     * The command will terminate OpenSIPS (and internal shutdown).
     */
    kill = () => this.core.execute('kill');

    /**
     * The command lists all the defined (static or learned) blacklists from OpenSIPS.
     */
    listBlacklists = () => this.core.execute('list_blacklists');

    /**
     * The command lists all ongoing TCP/TLS connection from OpenSIPS.
     */
    listTcpConnections = () => this.core.execute('list_tcp_conns');

    /**
     * Get or set the logging level of one or all OpenSIPS processes. If no argument is passed to the log_level command, it will print a table with the current logging levels of all processes. If a logging level is given, it will be set for each process. If pid is also given, the logging level will change only for that process.
     * @param params.level - logging level (-3...4)
     * @param params.pid - Unix pid (validated by OpenSIPS)
     */
    logLevel = (params?: { level?: number; pid?: number }) => this.core.execute('log_level', params);

    /**
     * This command can be used to list the internals of the b2b entities.
     */
    ps = () => this.core.execute('ps');

    /**
     * Prints the working directory of OpenSIPS instance.
     */
    pwd = () => this.core.execute('pwd');

    /**
     * Prints various time information about OpenSIPS - when it started to run, for how long it runs.
     */
    uptime = () => this.core.execute('uptime');

    /**
     * Prints the version string of a runningOpenSIPS.
     */
    version = () => this.core.execute('version');

    /**
     * Prints all available MI commands from the queried OpenSIPS instance.
     */
    which = () => this.core.execute('which');

    /**
     * Prints the statistics (all, group or one) realtime values.
     * @param params.statistics - an array of the following possible values: all - print all available statistics; group_name: - print only statistics from a certain group named 'group_name'; the OpenSIPS core defines the following groups: core, shmem; Modules export groups typically named like the module itself. name - print only the statistic named 'name'.
     */
    getStatistics = (params?: { statistics?: string | string[] }) => this.core.execute('get_statistics', params);

    /**
     * Prints a list of available statistics in the current configuration of OpenSIPS.
     * @param params.statistics - an array of the same possible values as for get_statistics MI command, with the exception of 'all'. Omitting the parameter will list all available statistics.
     */
    listStatistics = (params?: { statistics?: string | string[] }) => this.core.execute('list_statistics', params);

    /**
     * Reset (to zero) the value of a statistic variable. Note that not all variables allow reset (depending of the nature of the information they carry - example 'shmem:used_size').
     * @param params.statistics - an array of the names of the variables to be reset.
     */
    resetStatistics = (params?: { statistics?: string | string[] }) => this.core.execute('reset_statistics', params);

    /**
     * This command stores in a cache system a string value.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local';
     * @param params.attr - the label to be associated with this value;
     * @param params.value - the string to be stored;
     */
    cacheStore = (params: { system: string; attr: string; value: string }) => this.core.execute('cache_store', params);

    /**
     * This command queries for a stored value.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local'
     * @param params.attr - the label associated with the value
     */
    cacheFetch = (params: { system: string; attr: string }) => this.core.execute('cache_fetch', params);

    /**
     * This command removes a record from the cache system.
     * @param params.system - cache system to use - for the cache system implemented by OpenSIPS module 'localcache' the value of this parameter should be 'local'
     * @param params.attr - the label associated with the stored value
     */
    cacheRemove = (params: { system: string; attr: string }) => this.core.execute('cache_remove', params);

    /**
     * Subscribes an external application to a certain event.
     * @param params.event - event name
     * @param params.socket - external application socket
     * @param params.expire - (optional) - expire time, in seconds - if absent, the subscription is valid only one hour (3600 s)
     */
    eventSubscribe = (params: { event: string; socket: string; expire?: string }) =>
        this.core.execute('event_subscribe', params);

    /**
     * Lists all the events published through the Event Interface.
     */
    eventsList = () => this.core.execute('events_list');

    /**
     * Lists information about the subscribers
     * @param params.event - event name
     * @param params.socket - (optional) - external application socket
     */
    subscribersList = (params: { event: string; socket?: string }) => this.core.execute('subscribers_list', params);

    /**
     * Only available with QM_MALLOC + DBG_MALLOC. Fully scans the shared memory pool in order to locate any inconsistencies. If any sign of memory corruption is detected, OpenSIPS will immediately abort.
     */
    shmCheck = () => this.core.execute('shm_check');
    private get core() {
        if (!this._core) this._core = new Modules.Core(this);
        return this._core;
    }
    get b2bEntities() {
        if (!this._b2bEntities) this._b2bEntities = new Modules.B2bEntities(this);
        return this._b2bEntities;
    }
    get b2bLogic() {
        if (!this._b2bLogic) this._b2bLogic = new Modules.B2bLogic(this);
        return this._b2bLogic;
    }
    get b2bSca() {
        if (!this._b2bSca) this._b2bSca = new Modules.B2bSca(this);
        return this._b2bSca;
    }
    get benchmark() {
        if (!this._benchmark) this._benchmark = new Modules.Benchmark(this);
        return this._benchmark;
    }
    get cachedbLocal() {
        if (!this._cachedbLocal) this._cachedbLocal = new Modules.CachedbLocal(this);
        return this._cachedbLocal;
    }
    get callCenter() {
        if (!this._callCenter) this._callCenter = new Modules.CallCenter(this);
        return this._callCenter;
    }
    get carrierRoute() {
        if (!this._carrierRoute) this._carrierRoute = new Modules.CarrierRoute(this);
        return this._carrierRoute;
    }
    get cfgutils() {
        if (!this._cfgutils) this._cfgutils = new Modules.Cfgutils(this);
        return this._cfgutils;
    }
    get clusterer() {
        if (!this._clusterer) this._clusterer = new Modules.Clusterer(this);
        return this._clusterer;
    }
    get cplC() {
        if (!this._cplC) this._cplC = new Modules.CplC(this);
        return this._cplC;
    }
    get dbBerkeley() {
        if (!this._dbBerkeley) this._dbBerkeley = new Modules.DbBerkeley(this);
        return this._dbBerkeley;
    }
    get dbFlatstore() {
        if (!this._dbFlatstore) this._dbFlatstore = new Modules.DbFlatstore(this);
        return this._dbFlatstore;
    }
    get dbText() {
        if (!this._dbText) this._dbText = new Modules.DbText(this);
        return this._dbText;
    }
    get dbVirtual() {
        if (!this._dbVirtual) this._dbVirtual = new Modules.DbVirtual(this);
        return this._dbVirtual;
    }
    get dialog() {
        if (!this._dialog) this._dialog = new Modules.Dialog(this);
        return this._dialog;
    }
    get dialplan() {
        if (!this._dialplan) this._dialplan = new Modules.Dialplan(this);
        return this._dialplan;
    }
    get dispatcher() {
        if (!this._dispatcher) this._dispatcher = new Modules.Dispatcher(this);
        return this._dispatcher;
    }
    get domain() {
        if (!this._domain) this._domain = new Modules.Domain(this);
        return this._domain;
    }
    get drouting() {
        if (!this._drouting) this._drouting = new Modules.Drouting(this);
        return this._drouting;
    }
    get eventFlatstore() {
        if (!this._eventFlatstore) this._eventFlatstore = new Modules.EventFlatstore(this);
        return this._eventFlatstore;
    }
    get gflags() {
        if (!this._gflags) this._gflags = new Modules.Gflags(this);
        return this._gflags;
    }
    get httpd() {
        if (!this._httpd) this._httpd = new Modules.Httpd(this);
        return this._httpd;
    }
    get imc() {
        if (!this._imc) this._imc = new Modules.Imc(this);
        return this._imc;
    }
    get loadBalancer() {
        if (!this._loadBalancer) this._loadBalancer = new Modules.LoadBalancer(this);
        return this._loadBalancer;
    }
    get mediaExchange() {
        if (!this._mediaExchange) this._mediaExchange = new Modules.MediaExchange(this);
        return this._mediaExchange;
    }
    get nathelper() {
        if (!this._nathelper) this._nathelper = new Modules.Nathelper(this);
        return this._nathelper;
    }
    get permissions() {
        if (!this._permissions) this._permissions = new Modules.Permissions(this);
        return this._permissions;
    }
    get pike() {
        if (!this._pike) this._pike = new Modules.Pike(this);
        return this._pike;
    }
    get piHttp() {
        if (!this._piHttp) this._piHttp = new Modules.PiHttp(this);
        return this._piHttp;
    }
    get presence() {
        if (!this._presence) this._presence = new Modules.Presence(this);
        return this._presence;
    }
    get presenceDfks() {
        if (!this._presenceDfks) this._presenceDfks = new Modules.PresenceDfks(this);
        return this._presenceDfks;
    }
    get protoTls() {
        if (!this._protoTls) this._protoTls = new Modules.ProtoTls(this);
        return this._protoTls;
    }
    get protoWs() {
        if (!this._protoWs) this._protoWs = new Modules.ProtoWs(this);
        return this._protoWs;
    }
    get protoWss() {
        if (!this._protoWss) this._protoWss = new Modules.ProtoWss(this);
        return this._protoWss;
    }
    get qrouting() {
        if (!this._qrouting) this._qrouting = new Modules.Qrouting(this);
        return this._qrouting;
    }
    get ratelimit() {
        if (!this._ratelimit) this._ratelimit = new Modules.Ratelimit(this);
        return this._ratelimit;
    }
    get rateCacher() {
        if (!this._rateCacher) this._rateCacher = new Modules.RateCacher(this);
        return this._rateCacher;
    }
    get regex() {
        if (!this._regex) this._regex = new Modules.Regex(this);
        return this._regex;
    }
    get rls() {
        if (!this._rls) this._rls = new Modules.Rls(this);
        return this._rls;
    }
    get rtpengine() {
        if (!this._rtpengine) this._rtpengine = new Modules.Rtpengine(this);
        return this._rtpengine;
    }
    get rtpproxy() {
        if (!this._rtpproxy) this._rtpproxy = new Modules.Rtpproxy(this);
        return this._rtpproxy;
    }
    get sqlCacher() {
        if (!this._sqlCacher) this._sqlCacher = new Modules.SqlCacher(this);
        return this._sqlCacher;
    }
    get tlsMgm() {
        if (!this._tlsMgm) this._tlsMgm = new Modules.TlsMgm(this);
        return this._tlsMgm;
    }
    get tm() {
        if (!this._tm) this._tm = new Modules.Tm(this);
        return this._tm;
    }
    get tracer() {
        if (!this._tracer) this._tracer = new Modules.Tracer(this);
        return this._tracer;
    }
    get uacRegistrant() {
        if (!this._uacRegistrant) this._uacRegistrant = new Modules.UacRegistrant(this);
        return this._uacRegistrant;
    }
    get userblacklist() {
        if (!this._userblacklist) this._userblacklist = new Modules.Userblacklist(this);
        return this._userblacklist;
    }
    get usrloc() {
        if (!this._usrloc) this._usrloc = new Modules.Usrloc(this);
        return this._usrloc;
    }
    get xcapClient() {
        if (!this._xcapClient) this._xcapClient = new Modules.XcapClient(this);
        return this._xcapClient;
    }
}
