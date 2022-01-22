/**
 * @packageDocumentation
 * @module avalanche-core
 */
import * as utils from 'avalanche-js-utils';
import { HttpProvider, Messenger, WSProvider, ShardingItem } from 'avalanche-js-network';
import { TransactionFactory, Transaction } from 'avalanche-js-transaction';
import { StakingTransaction, StakingFactory } from 'avalanche-js-staking';
import { ContractFactory, Contract } from 'avalanche-js-contract';
import { Wallet, Account } from 'avalanche-js-account';
import { Blockchain } from './blockchain';
import { AvalancheConfig } from './util';
export declare class Avalanche extends utils.AvalancheCore {
    /**@ignore*/
    Modules: {
        HttpProvider: typeof HttpProvider;
        WSProvider: typeof WSProvider;
        Messenger: typeof Messenger;
        Blockchain: typeof Blockchain;
        TransactionFactory: typeof TransactionFactory;
        StakingFactory: typeof StakingFactory;
        Wallet: typeof Wallet;
        Transaction: typeof Transaction;
        StakingTransaction: typeof StakingTransaction;
        Account: typeof Account;
        Contract: typeof Contract;
    };
    /**@ignore*/
    messenger: Messenger;
    /**@ignore*/
    transactions: TransactionFactory;
    /**@ignore*/
    stakings: StakingFactory;
    /**@ignore*/
    wallet: Wallet;
    /**@ignore*/
    blockchain: Blockchain;
    /**@ignore*/
    contracts: ContractFactory;
    /**@ignore*/
    crypto: any;
    /**@ignore*/
    utils: any;
    /**@ignore*/
    defaultShardID?: number;
    /**@ignore*/
    private provider;
    /**
     * Create a avalanche instance
     *
     * @param url The end-points of the hmy blockchain
     * @param config set up `ChainID` and `ChainType`, typically we can use the default values
     *
     * @example
     * ```
     * // import or require Avalanche class
     * const { Avalanche } = require('avalanche-js-core');
     *
     * // import or require settings
     * const { ChainID, ChainType } = require('avalanche-js-utils');
     *
     * // Initialize the Avalanche instance
     * const hmy = new Avalanche(
     *   // rpc url:
     *   // local: http://localhost:9500
     *   // testnet: https://api.s0.b.hmny.io/
     *   // mainnet: https://api.s0.t.hmny.io/
     *   'http://localhost:9500',
     *   {
     *     // chainType set to Avalanche
     *     chainType: ChainType.Avalanche,
     *     // chainType set to HmyLocal
     *     chainId: ChainID.HmyLocal,
     *   },
     * );
     * ```
     */
    constructor(url: string, config?: AvalancheConfig);
    /**
     * Will change the provider for its module.
     *
     * @param provider a valid provider, you can replace it with your own working node
     *
     * @example
     * ```javascript
     * const tmp = hmy.setProvider('http://localhost:9500');
     * ```
     */
    setProvider(provider: string | HttpProvider | WSProvider): void;
    /**
     * set the chainID
     *
     * @hint
     * ```
     * Default = 0,
     * EthMainnet = 1,
      Morden = 2,
      Ropsten = 3,
      Rinkeby = 4,
      RootstockMainnet = 30,
      RootstockTestnet = 31,
      Kovan = 42,
      EtcMainnet = 61,
      EtcTestnet = 62,
      Geth = 1337,
      Ganache = 0,
      HmyMainnet = 1,
      HmyTestnet = 2,
      HmyLocal = 2,
      HmyPangaea = 3
     * ```
     * @param chainId
     *
     * @example
     * ```
     * hmy.setChainId(2);
     * ```
     */
    setChainId(chainId: utils.ChainID): void;
    /**
     * Change the Shard ID
     *
     * @example
     * ```
     * hmy.setShardID(2);
     * ```
     */
    setShardID(shardID: number): void;
    /**
     * set the chainType
     *
     * @param chainType `hmy` or `eth`
     *
     * @example
     * ```
     * // set chainType to hmy
     * hmy.setChainType('hmy');
     * // set chainType to eth
     * hmy.setChainType('eth');
     * ```
     */
    setChainType(chainType: utils.ChainType): void;
    /**
     * Set the sharding Structure
     *
     * @param shardingStructures The array of information of sharding structures
     *
     * @example
     * ```javascript
     * hmy.shardingStructures([
     *   {"current":true,"http":"http://127.0.0.1:9500",
     *    "shardID":0,"ws":"ws://127.0.0.1:9800"},
     *   {"current":false,"http":"http://127.0.0.1:9501",
     *    "shardID":1,"ws":"ws://127.0.0.1:9801"}
     * ]);
     * ```
     */
    shardingStructures(shardingStructures: ShardingItem[]): void;
    /**@ignore*/
    private setMessenger;
}
