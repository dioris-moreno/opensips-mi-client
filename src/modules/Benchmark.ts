import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'benchmark';

export class Benchmark extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Enables/disables the module.
     * @param params.enable - value may be -1, 0 or 1. See discription of "enable" parameter.
     */
    enableGlobal = (params: { enable: number }) => this.execute('bm_enable_global', params);

    /**
     * Enable or disable a single timer.
     * @param params.timer - timer name
     * @param params.enable - enable (1) or disable (0) timer
     */
    enableTimer = (params: { timer: string; enable: number }) => this.execute('bm_enable_timer', params);

    /**
     * Modifies the benchmarking granularity.
     * @param params.granularity - See discription of granularity parameter in module documentation.
     */
    granularity = (params: { granularity: number }) => this.execute('bm_granularity', params);

    /**
     * Modifies the module log level.
     * @param params.log_level - See discription of loglevel parameter in module documentation.
     */
    loglevel = (params: { log_level: number }) => this.execute('bm_loglevel', params);

    /**
     * Returns the current and global results for each timer. This command is only available if the "granularity" variable is set to 0. It can be used to get results in stable time intervals instead of every N messages. Each timer will have 2 nodes - the local and the global values. Format of the values is the same as the one normally used in logfile. This way of getting the results allows to interface with external graphing applications like Munin.
     */
    pollResults = () => this.execute('bm_poll_results');
}

export default Benchmark;
