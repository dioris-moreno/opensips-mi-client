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
    export type GlobalIncallsStat = 'ccg_incalls';
    export type GlobalAwtStat = 'ccg_awt';
    export type GlobalLoadStat = 'ccg_load';
    export type GlobalDistributedIncallsStat = 'ccg_distributed_incalls';
    export type GlobalAnsweredIncallsStat = 'ccg_answered_incalls';
    export type GlobalAbandonnedIncallsStat = 'ccg_abandonned_incalls';
    export type GlobalOnholdCallsStat = 'ccg_onhold_calls';
    export type GlobalFreeAgentsStat = 'ccg_free_agents';
    export type FlowIncallsFlowIDStat = 'ccf_incalls_flowID';
    export type FLowDistIncallsFlowIDStat = 'ccf_dist_incalls_flowID';
    export type FlowAnswIncallsFlowIDStat = 'ccf_answ_incalls_flowID';
    export type FlowAbanIncallsFlowIDStat = 'ccf_aban_incalls_flowID';
    export type FlowOnholdIncallsFlowIDStat = 'ccf_onhold_incalls_flowID';
    export type FlowQueuedCallsFlowIDStat = 'ccf_queued_calls_flowID';
    export type FlowFreeAgentsFlowIDStat = 'ccf_free_agents_flowID';
    export type FlowEtwFlowIDStat = 'ccf_etw_flowID';
    export type FlowAwtFlowIDStat = 'ccf_awt_flowID';
    export type FlowLoadFlowIDStat = 'ccg_load_flowID';
    export type AgentDistIncallsAgnetIDStat = 'cca_dist_incalls_agnetID';
    export type AgentAnswIncallsAgentIDStat = 'cca_answ_incalls_agentID';
    export type AgentAbanIncallsAgentIDStat = 'cca_aban_incalls_agentID';
    export type AgentAttAgentIDStat = 'cca_att_agentID';
    export type StatsTypes =
        | AllStats
        | GlobalIncallsStat
        | GlobalAwtStat
        | GlobalLoadStat
        | GlobalDistributedIncallsStat
        | GlobalAnsweredIncallsStat
        | GlobalAbandonnedIncallsStat
        | GlobalOnholdCallsStat
        | GlobalFreeAgentsStat
        | FlowIncallsFlowIDStat
        | FLowDistIncallsFlowIDStat
        | FlowAnswIncallsFlowIDStat
        | FlowAbanIncallsFlowIDStat
        | FlowOnholdIncallsFlowIDStat
        | FlowQueuedCallsFlowIDStat
        | FlowFreeAgentsFlowIDStat
        | FlowEtwFlowIDStat
        | FlowAwtFlowIDStat
        | FlowLoadFlowIDStat
        | AgentDistIncallsAgnetIDStat
        | AgentAnswIncallsAgentIDStat
        | AgentAbanIncallsAgentIDStat
        | AgentAttAgentIDStat;
    export enum Stats {
        All = 'all',
        GlobalIncalls = 'ccg_incalls',
        GlobalAwt = 'ccg_awt',
        GlobalLoad = 'ccg_load',
        GlobalDistributedIncalls = 'ccg_distributed_incalls',
        GlobalAnsweredIncalls = 'ccg_answered_incalls',
        GlobalAbandonnedIncalls = 'ccg_abandonned_incalls',
        GlobalOnholdCalls = 'ccg_onhold_calls',
        GlobalFreeAgents = 'ccg_free_agents',
        FlowIncallsFlowID = 'ccf_incalls_flowID',
        FLowDistIncallsFlowID = 'ccf_dist_incalls_flowID',
        FlowAnswIncallsFlowID = 'ccf_answ_incalls_flowID',
        FlowAbanIncallsFlowID = 'ccf_aban_incalls_flowID',
        FlowOnholdIncallsFlowID = 'ccf_onhold_incalls_flowID',
        FlowQueuedCallsFlowID = 'ccf_queued_calls_flowID',
        FlowFreeAgentsFlowID = 'ccf_free_agents_flowID',
        FlowEtwFlowID = 'ccf_etw_flowID',
        FlowAwtFlowID = 'ccf_awt_flowID',
        FlowLoadFlowID = 'ccg_load_flowID',
        AgentDistIncallsAgnetID = 'cca_dist_incalls_agnetID',
        AgentAnswIncallsAgentID = 'cca_answ_incalls_agentID',
        AgentAbanIncallsAgentID = 'cca_aban_incalls_agentID',
        AgentAttAgentID = 'cca_att_agentID',
    }
}

export default CallCenter;
