import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'call_center';

export class CallCenter extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Command to reload flows and agents definition from database.
     */
    reload = () => this.execute('cc_reload');

    /**
     * Command to login an agent into the Call Center engine.
     * @param params.agent_id - ID of the agent
     * @param params.state - the new login state (0 - log off, 1 - log in)
     */
    agentLogin = (params: { agent_id: string; state: number }) => this.execute('cc_agent_login', params);

    /**
     * Command to list all the calls in queuing - for each call, the following attributes will be printed: the flow of the call, for how long the call is in the queue, the ETW for the call, call priority and the call skill (inherited from the flow).
     */
    listQueue = () => this.execute('cc_list_queue');

    /**
     * Command to list all the flows - for each flow, the following attributes will be printed: the flow ID, the avg. call duration, how many calls were processed, how many agents are logged, and how many onging calls are.
     */
    listFlows = () => this.execute('cc_list_flows');

    /**
     * Command to list all the agents - for each agent, the following attributes will be printed: agent ID, agent login state and agent state (free, wrapup, incall).
     */
    listAgents = () => this.execute('cc_list_agents');

    /**
     * Command to list all the ongoing calls - for each call, the following attributes will be printed: call ID, call state (welcome, queued, toagent, ended), call duration, flow it belongs to, agent serving the call (if any).
     */
    listCalls = () => this.execute('cc_list_calls');

    /**
     * Command to reset all counter-like statistics.
     */
    resetStats = () => this.execute('cc_reset_stats');

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: CallCenter.Stats | CallCenter.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace CallCenter {
    export type AllStats = 'all';
    export type CcgIncallsStat = 'ccg_incalls';
    export type CcgAwtStat = 'ccg_awt';
    export type CcgLoadStat = 'ccg_load';
    export type CcgDistributedIncallsStat = 'ccg_distributed_incalls';
    export type CcgAnsweredIncallsStat = 'ccg_answered_incalls';
    export type CcgAbandonnedIncallsStat = 'ccg_abandonned_incalls';
    export type CcgOnholdCallsStat = 'ccg_onhold_calls';
    export type CcgFreeAgentsStat = 'ccg_free_agents';
    export type CcfIncallsFlowIDStat = 'ccf_incalls_flowID';
    export type CcfDistIncallsFlowIDStat = 'ccf_dist_incalls_flowID';
    export type CcfAnswIncallsFlowIDStat = 'ccf_answ_incalls_flowID';
    export type CcfAbanIncallsFlowIDStat = 'ccf_aban_incalls_flowID';
    export type CcfOnholdIncallsFlowIDStat = 'ccf_onhold_incalls_flowID';
    export type CcfQueuedCallsFlowIDStat = 'ccf_queued_calls_flowID';
    export type CcfFreeAgentsFlowIDStat = 'ccf_free_agents_flowID';
    export type CcfEtwFlowIDStat = 'ccf_etw_flowID';
    export type CcfAwtFlowIDStat = 'ccf_awt_flowID';
    export type CcgLoadFlowIDStat = 'ccg_load_flowID';
    export type CcaDistIncallsAgnetIDStat = 'cca_dist_incalls_agnetID';
    export type CcaAnswIncallsAgentIDStat = 'cca_answ_incalls_agentID';
    export type CcaAbanIncallsAgentIDStat = 'cca_aban_incalls_agentID';
    export type CcaAttAgentIDStat = 'cca_att_agentID';
    export type StatsTypes =
        | AllStats
        | CcgIncallsStat
        | CcgAwtStat
        | CcgLoadStat
        | CcgDistributedIncallsStat
        | CcgAnsweredIncallsStat
        | CcgAbandonnedIncallsStat
        | CcgOnholdCallsStat
        | CcgFreeAgentsStat
        | CcfIncallsFlowIDStat
        | CcfDistIncallsFlowIDStat
        | CcfAnswIncallsFlowIDStat
        | CcfAbanIncallsFlowIDStat
        | CcfOnholdIncallsFlowIDStat
        | CcfQueuedCallsFlowIDStat
        | CcfFreeAgentsFlowIDStat
        | CcfEtwFlowIDStat
        | CcfAwtFlowIDStat
        | CcgLoadFlowIDStat
        | CcaDistIncallsAgnetIDStat
        | CcaAnswIncallsAgentIDStat
        | CcaAbanIncallsAgentIDStat
        | CcaAttAgentIDStat;
    export enum Stats {
        All = 'all',
        CcgIncalls = 'ccg_incalls',
        CcgAwt = 'ccg_awt',
        CcgLoad = 'ccg_load',
        CcgDistributedIncalls = 'ccg_distributed_incalls',
        CcgAnsweredIncalls = 'ccg_answered_incalls',
        CcgAbandonnedIncalls = 'ccg_abandonned_incalls',
        CcgOnholdCalls = 'ccg_onhold_calls',
        CcgFreeAgents = 'ccg_free_agents',
        CcfIncallsFlowID = 'ccf_incalls_flowID',
        CcfDistIncallsFlowID = 'ccf_dist_incalls_flowID',
        CcfAnswIncallsFlowID = 'ccf_answ_incalls_flowID',
        CcfAbanIncallsFlowID = 'ccf_aban_incalls_flowID',
        CcfOnholdIncallsFlowID = 'ccf_onhold_incalls_flowID',
        CcfQueuedCallsFlowID = 'ccf_queued_calls_flowID',
        CcfFreeAgentsFlowID = 'ccf_free_agents_flowID',
        CcfEtwFlowID = 'ccf_etw_flowID',
        CcfAwtFlowID = 'ccf_awt_flowID',
        CcgLoadFlowID = 'ccg_load_flowID',
        CcaDistIncallsAgnetID = 'cca_dist_incalls_agnetID',
        CcaAnswIncallsAgentID = 'cca_answ_incalls_agentID',
        CcaAbanIncallsAgentID = 'cca_aban_incalls_agentID',
        CcaAttAgentID = 'cca_att_agentID',
    }
}

export default CallCenter;
