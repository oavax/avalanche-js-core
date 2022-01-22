/**
 * @packageDocumentation
 * @module avalanche-core
 * @hidden
 */
import { ChainType, ChainID } from 'avalanche-js-utils';
export interface AvalancheConfig {
    chainUrl?: string;
    chainType: ChainType;
    chainId: ChainID;
    shardID?: number;
}
export declare function createWeb3(_web3: any): void;
