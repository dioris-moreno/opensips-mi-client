import Debug from 'debug';
const debug = Debug('opensips-mi-client');

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
     * @param [name] - get only the statistic named "name".
     * @param [options] - use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (
        name?: CallCenter.Stats | CallCenter.GlobalStatsTypes,
        options?: { keepGroupName: boolean },
    ) => {
        return this.getModuleStats(name, options);
    };

    /**
     * Returns the realtime value of the statistic (per flow)
     * @param name - get only the statistic named "name".
     * @param flowId - get only the statistic named "name".
     * @param [options] - use keepGroupName=true to get the original names of the stats.
     */
    getFlowStatistic = async (
        name: CallCenter.FlowStats | CallCenter.FlowStatsTypes,
        flowId: string,
        options?: { keepGroupName: boolean },
    ) => {
        const statName = `${name}-${flowId}`;
        return this.getModuleStats(statName, options);
    };

    /**
     * Returns the realtime value of the statistic (per agent)
     * @param name - get only the statistic named "name".
     * @param agentId - get only the statistic named "name".
     * @param [options] - use keepGroupName=true to get the original names of the stats.
     */
    getAgentStatistic = async (
        name: CallCenter.AgentStats | CallCenter.AgentStatsTypes,
        agentId: string,
        options?: { keepGroupName: boolean },
    ) => {
        const statName = `${name}-${agentId}`;
        return this.getModuleStats(statName, options);
    };
}

export namespace CallCenter {
    export type AllStats = 'all';

    // Global statistics types
    export type GlobalIncallsStat = 'ccg_incalls';
    export type GlobalAwtStat = 'ccg_awt';
    export type GlobalLoadStat = 'ccg_load';
    export type GlobalDistributedIncallsStat = 'ccg_distributed_incalls';
    export type GlobalAnsweredIncallsStat = 'ccg_answered_incalls';
    export type GlobalAbandonnedIncallsStat = 'ccg_abandonned_incalls';
    export type GlobalOnholdCallsStat = 'ccg_onhold_calls';
    export type GlobalFreeAgentsStat = 'ccg_free_agents';
    export type GlobalStatsTypes =
        | AllStats
        | GlobalIncallsStat
        | GlobalAwtStat
        | GlobalLoadStat
        | GlobalDistributedIncallsStat
        | GlobalAnsweredIncallsStat
        | GlobalAbandonnedIncallsStat
        | GlobalOnholdCallsStat
        | GlobalFreeAgentsStat;

    // Per-flow statistics types
    export type FlowIncallsStat = 'ccf_incalls';
    export type FLowDistributedIncallsStat = 'ccf_dist_incall';
    export type FlowAnsweredIncallsStat = 'ccf_answ_incall';
    export type FlowAbandonnedIncallsStat = 'ccf_aban_incall';
    export type FlowOnholdCallsStat = 'ccf_onhold_call';
    export type FlowQueuedCallsStat = 'ccf_queued_calls';
    export type FlowFreeAgentsStat = 'ccf_free_agents';
    export type FlowEtwStat = 'ccf_etw';
    export type FlowAwtStat = 'ccf_awt';
    export type FlowLoadStat = 'ccf_load';
    export type FlowStatsTypes =
        | FlowIncallsStat
        | FLowDistributedIncallsStat
        | FlowAnsweredIncallsStat
        | FlowAbandonnedIncallsStat
        | FlowOnholdCallsStat
        | FlowQueuedCallsStat
        | FlowFreeAgentsStat
        | FlowEtwStat
        | FlowAwtStat
        | FlowLoadStat;

    // Per-agent statistics types
    export type AgentDistributedIncallsStat = 'cca_dist_incalls';
    export type AgentAnsweredIncallsStat = 'cca_answ_incalls';
    export type AgentAbandonnedIncallsStat = 'cca_aban_incalls';
    export type AgentAttStat = 'cca_att';
    export type AgentStatsTypes =
        | AgentDistributedIncallsStat
        | AgentAnsweredIncallsStat
        | AgentAbandonnedIncallsStat
        | AgentAttStat;

    export enum Stats {
        All = 'all',
        Incalls = 'ccg_incalls',
        Awt = 'ccg_awt',
        Load = 'ccg_load',
        DistributedIncalls = 'ccg_distributed_incalls',
        AnsweredIncalls = 'ccg_answered_incalls',
        AbandonnedIncalls = 'ccg_abandonned_incalls',
        OnholdCalls = 'ccg_onhold_calls',
        FreeAgents = 'ccg_free_agents',
    }

    export enum FlowStats {
        Incalls = 'ccf_incalls',
        DistributedIncalls = 'ccf_dist_incall',
        AnsweredIncalls = 'ccf_answ_incall',
        AbandonnedIncalls = 'ccf_aban_incall',
        OnholdCalls = 'ccf_onhold_call',
        QueuedCalls = 'ccf_queued_calls',
        FreeAgents = 'ccf_free_agents',
        Etw = 'ccf_etw',
        Awt = 'ccf_awt',
        Load = 'ccf_load',
    }

    export enum AgentStats {
        DistributedIncalls = 'cca_dist_incalls',
        AnsweredIncalls = 'cca_answ_incalls',
        AbandonnedIncalls = 'cca_aban_incalls',
        Att = 'cca_att',
    }
}

export default CallCenter;
