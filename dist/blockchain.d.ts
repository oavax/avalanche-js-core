/**
 # avalanche-js-core

This package provides a collection of apis to interact with Avalanche blockchain.

## Installation

```
npm install avalanche-js-core
```

## Usage

Create a Avalanche instance connecting to testnet

```javascript
* const { Avalanche } = require('avalanche-js-core');
* const {
*   ChainID,
*   ChainType,
*   hexToNumber,
*   numberToHex,
*   fromWei,
*   Units,
*   Unit,
* } = require('avalanche-js-utils');

* const hmy = new Avalanche(
*     'https://api.s0.b.hmny.io/',
*     {
*         chainType: ChainType.Avalanche,
*         chainId: ChainID.HmyTestnet,
*     },
* );
```

Getting balance of account `avax103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7`
```javascript
* hmy.blockchain
*   .getBalance({ address: 'avax103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7' })
*   .then((response) => {
*     console.log('balance in AVAXs: ' + fromWei(hexToNumber(response.result), Units.avax));
*   });
```

Getting the latest block number
```javascript
* hmy.blockchain.getBlockNumber().then((response) => {
*   console.log('current block number: ' + hexToNumber(response.result));
* });
```

Getting the block using block hash
```javascript
* hmy.blockchain
*   .getBlockByHash({
*     blockHash: '0x08c46ae7249362a7d1f602d44c5a81f33ebdab6a7dcb6068f99610b57911aafd',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the block using block number
```javascript
* hmy.blockchain
*   .getBlockByNumber({
*     blockNumber: numberToHex(422635),
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the transaction using hash
```javascript
* hmy.blockchain
*   .getTransactionByHash({
*     txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the transaction receipt
```javascript
* hmy.blockchain
*   .getTransactionReceipt({
*     txnHash: '0x56c73eb993b18dc04baacec5c2e9d1292a090f6a978a4a1c461db5255fcbc831',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the cross-shard transaction receipt
```javascript
* hmy.blockchain
*   .getCxReceiptByHash({
*     txnHash: '0xcd36a90ff5d5373285c2896ba7bbcd3f5324263c0cb8ecfb7cad2f5fc2fbdbda',
*     shardID: 1,
*   })
*   .then((value) => {
*     console.log(value.result);
*   });
```

Getting the deployed smart contract code
```javascript
* hmy.blockchain
*   .getCode({
*     address: '0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
*     blockNumber: 'latest',
*   })
*   .then((response) => {
*     console.log(response.result);
*   });
```

Getting the transaction count of an account
```javascript
* hmy.blockchain
*   .getTransactionCount({
*     address: 'avax1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy',
*   })
*   .then((response) => {
*     console.log(hexToNumber(response.result));
*   });
```

Getting the shard structure and details
```javascript
* hmy.blockchain.getShardingStructure().then((response) => {
*   console.log(response.result);
* });
```

Transferring funds using `sendTransaction`
```javascript
// key corresponds to avax103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7, only has testnet balance
* hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

* async function transfer() {
*   const txn = hmy.transactions.newTx({
*     to: 'avax166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
*     value: new Unit(1).asAVAX().toWei(),
*     // gas limit, you can use string
*     gasLimit: '21000',
*     // send token from shardID
*     shardID: 0,
*     // send token to toShardID
*     toShardID: 0,
*     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
*     gasPrice: new hmy.utils.Unit('1').asGwei().toWei(),
*   });

*   // sign the transaction use wallet;
*   const signedTxn = await hmy.wallet.signTransaction(txn);
*   const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
*   console.log(txnHash.result);
* }

* transfer();
```
 *
 * @packageDocumentation
 * @module avalanche-core
 */
import { Messenger, NewPendingTransactions, NewHeaders, LogSub, Syncing } from 'avalanche-js-network';
import { Transaction } from 'avalanche-js-transaction';
import { StakingTransaction } from 'avalanche-js-staking';
declare class Blockchain {
    /**
     * @hidden
     */
    messenger: Messenger;
    /**
     * @hidden
     */
    constructor(messenger: Messenger);
    /**
     * @hidden
     */
    setMessenger(messenger: Messenger): void;
    /**
     *
     * @hidden
     */
    getRpcResult(result: any): any;
    /**
     * Get the balance of an address at a given block.
     *
     * @param address the address to get the balance of.
     * @param blockNumber (option) If you pass this parameter it will not use the default block set with `DefaultBlockParams.latest`
     * @param shardID (option) If you pass this parameter it will not use the default block set with `this.messenger.currentShard`
     *
     * @returns The current balance for the given address in wei.
     *
     * @hint
     * ```
     * the third param `shardID` is binding with the endpoint
     * shard 0: localhost:9500
     * shard 1: localhost:9501
     * ```
     *
     * @example
     * ```javascript
     * hmy.blockchain.getBalance({
     *   address: 'avax103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
     *   blockNumber: 'latest'
     * }).then(value => {
     *   console.log(value.result);
     * });
     * ```
     */
    getBalance({ address, blockNumber, shardID, }: {
        address: string;
        blockNumber?: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns the current block number.
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @return `Promise` - The number of the most recent block.
     *
     * @hint
     * ```
     * the third param `shardID` is binding with the endpoint
     * shard 0: localhost:9500
     * shard 1: localhost:9501
     * ```
     *
     * @example
     * ```javascript
     * hmy.blockchain.getBlockNumber().then((value) => {
     *   console.log(value.result);
     * });
     * ```
     */
    getBlockNumber(shardID?: number): Promise<any>;
    /**
     * Returns a block matching the block Hash.
     *
     * @param blockHash the block hash
     * @param returnObject By default it is `true`, Features in development, IGNORE it!
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` - The block object
     *
     * @example
     * ```javascript
     * hmy.blockchain.getBlockByHash({
     *   blockHash: '0x9cd821b576efdff61280e8857ef218fb2cff8db0cf0fb27dfceef7237042b79e',
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getBlockByHash({ blockHash, returnObject, shardID, }: {
        blockHash: string;
        returnObject?: boolean;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns a block matching the block Number.
     *
     * @param blockNumber the block number
     * @param returnObject By default it is `true`, Features in development, IGNORE it!
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` - The block object
     *
     * @example
     * ```javascript
     * hmy.blockchain.getBlockByNumber({
     *   blockNumber: '0x89',
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getBlockByNumber({ blockNumber, returnObject, shardID, }: {
        blockNumber?: string;
        returnObject?: boolean;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns the number of transaction in a given block.
     *
     * @param blockHash the block number Hash
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` -  The number of transactions in the given block.
     *
     * @example
     * ```javascript
     * hmy.blockchain.getBlockTransactionCountByHash({
     *   blockHash: '0x4142514a238157e7fe57b9d54abedb33943507fa15b3799954c273a12705ced1'
     * }).then((value) => {
     *   console.log(value):
     * });
     * ```
     */
    getBlockTransactionCountByHash({ blockHash, shardID, }: {
        blockHash: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns the number of transaction in a given block.
     *
     * @param blockNumber the block number Hash
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` -  The number of transactions in the given block.
     *
     * @example
     * ```javascript
     * hmy.blockchain.getBlockTransactionCountByNumber({
     *   blockNumber: '0x2403C'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getBlockTransactionCountByNumber({ blockNumber, shardID, }: {
        blockNumber: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns a transaction based on a block hash and the transactions index position.
     *
     * @param blockHash the block number Hash
     * @param index The transactions index position. **Hex Number**
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` -  A transaction object
     *
     * @example
     * ```javascript
     * hmy.blockchain.getTransactionByBlockHashAndIndex({
     *   blockHash: '0x4142514a238157e7fe57b9d54abedb33943507fa15b3799954c273a12705ced1',
     *   index: '0x0'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getTransactionByBlockHashAndIndex({ blockHash, index, shardID, }: {
        blockHash: string;
        index: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns a transaction based on a block number and the transactions index position.
     *
     * @param blockNumber the block number
     * @param index The transactions index position. **Hex Number**
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` -  A transaction object
     *
     * @example
     * ```javascript
     * hmy.blockchain.getTransactionByBlockNumberAndIndex({
     *   blockNumber: '0x2403C',
     *   index: '0x0'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getTransactionByBlockNumberAndIndex({ blockNumber, index, shardID, }: {
        blockNumber?: string;
        index: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns a transaction matching the given transaction hash.
     *
     * @param txnHash The transaction hash
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` -  A transaction object
     *
     * @example
     * ```javascript
     * hmy.blockchain.getTransactionByHash({
     *   txnHash: '0x146a0cf7e8da45b44194207c4e7785564527059483b765f9a04424554443b224'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getTransactionByHash({ txnHash, shardID, }: {
        txnHash: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns the receipt of a transaction by transaction hash.
     *
     * @param txnHash The transaction hash
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` -  A transaction receipt object, or `null` when no receipt was found
     *
     * @example
     * ```javascript
     * hmy.blockchain.getTransactionReceipt({
     *   txnHash: '0x146a0cf7e8da45b44194207c4e7785564527059483b765f9a04424554443b224'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getTransactionReceipt({ txnHash, shardID, }: {
        txnHash: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Get transaction recepit from cross shard transaction
     *
     * @param txnHash The transaction hash
     * @param shardID the shard id of receiver's address
     * @returns `Promise` -  A transaction receipt object, or `null` when no receipt was found
     *
     * @example
     * ```javascript
     * // This transaction sends from shard 0 to shard 1
     * hmy.blockchain.getCxReceiptByHash({
     *   txnHash: '0x7fae9252fbda68d718e610bc10cf2b5c6a9cafb42d4a6b9d6e392c77d587b9ea',
     *   shardID: 1,
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getCxReceiptByHash({ txnHash, shardID }: {
        txnHash: string;
        shardID: number;
    }): Promise<any>;
    /**
     * Get the code at a specific address.
     *
     * @param address The address to get the code from (eg:smart contract)
     * @param blockNumber (OPTIONAL) If you pass this parameter it will not use the default block
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @return `Promise` - The data at given `address`
     *
     * @example
     * ```javascript
     * hmy.blockchain.getCode({
     *   address: '0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
     *   blockNumber: 'latest'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getCode({ address, blockNumber, shardID, }: {
        address: string;
        blockNumber?: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Get the number of peers connected to.
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` - number of peer count
     *
     * @example
     * ```javascript
     * hmy.blockchain.net_peerCount().then((value) => {
     *   console.log(value.result);
     * });
     * ```
     */
    net_peerCount(shardID?: number): Promise<any>;
    /**
     * Get the version of net.
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` - the current version.
     *
     * @example
     * ```javascript
     * hmy.blockchain.net_version().then((value) => {
     *   console.log(value.result);
     * });
     * ```
     */
    net_version(shardID?: number): Promise<any>;
    /**
     * Get the protocal version.
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @returns `Promise` - the current protocol version.
     *
     * @example
     * ```javascript
     * hmy.blockchain.getProtocolVersion().then((value) => {
     *   console.log(value.result);
     * });
     * ```
     */
    getProtocolVersion(shardID?: number): Promise<any>;
    /**
     * Get the storage at a specific position of an address
     *
     * @param address The address to get the storage from
     * @param position The index position of the storage
     * @param blockNumber by default it's `latest`.
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     *
     * @example
     * ```javascript
     * hmy.blockchain.getStorageAt({
     *   address: 'avax1d0kw95t6kkljmkk9vu0zv25jraut8ngv5vrs5g',
     *   position: '0x0'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getStorageAt({ address, position, blockNumber, shardID, }: {
        address: string;
        position: string;
        blockNumber?: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Get the numbers of transactions sent from this address.
     *
     * @param address The address to get the numbers of transactions from
     * @param blockNumber by default it's `latest`
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @return `Promise` - The number of transactions sent from the given address.
     *
     * @example
     * ```javascript
     * hmy.blockchain.getTransactionCount({
     *   address: "avax1d0kw95t6kkljmkk9vu0zv25jraut8ngv5vrs5g"
     * }).then((value) => {
     *   console.log(value.result);
     * });
     * ```
     */
    getTransactionCount({ address, blockNumber, shardID, }: {
        address: string;
        blockNumber?: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Get the sharding structure of current network
     *
     * @return `Promise` - The sharding structure of current network.
     *
     * @example
     * ```javascript
     * hmy.blockchain.getShardingStructure().then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    getShardingStructure(): Promise<any>;
    /**
     * Sends a signed transaction to the network.
     *
     * @param transaction `Object` - The transaction object to send:
     * @return The **callbalck** will return the 32 bytes transaction hash
     *
     * @example
     * ```javascript
     * // add privateKey to wallet
     * const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
     * hmy.wallet.addByPrivateKey(privateKey);
     *
     * async function transfer() {
     *   const txn = hmy.transactions.newTx({
     *     //  token send to
     *     to: 'avax166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
     *     // amount to send
     *     value: '10000',
     *     // gas limit, you can use string
     *     gasLimit: '210000',
     *     // send token from shardID
     *     shardID: 0,
     *     // send token to toShardID
     *     toShardID: 0,
     *     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
     *     gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
     *   });
     *
     *   // sign the transaction use wallet;
     *   const signedTxn = await hmy.wallet.signTransaction(txn);
     *   const txnHash = await hmy.blockchain.sendTransaction(signedTxn);
     *   console.log(txnHash.result);
     * }
     *
     * transfer();
     * ```
     */
    sendTransaction(transaction: Transaction): Promise<any>;
    /**
     * Sends a raw transaction to the network.
     *
     * @param transaction `Object` - The transaction object to send:
     * @return The **callbalck** will return the 32 bytes transaction hash
     *
     * @example
     * ```javascript
     * // add privateKey to wallet
     * const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
     * hmy.wallet.addByPrivateKey(privateKey);
     *
     * async function transfer() {
     *   const txn = hmy.transactions.newTx({
     *     //  token send to
     *     to: 'avax166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
     *     // amount to send
     *     value: '10000',
     *     // gas limit, you can use string
     *     gasLimit: '210000',
     *     // send token from shardID
     *     shardID: 0,
     *     // send token to toShardID
     *     toShardID: 0,
     *     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
     *     gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
     *   });
     *
     *   // sign the transaction use wallet;
     *   const signedTxn = await hmy.wallet.signTransaction(txn);
     *   recovered = signedTxn.recover(signedTxn.rawTransaction);
     *
     *   const txnHash = await hmy.blockchain.sendRawTransaction(recovered);
     *   console.log(txnHash);
     * }
     *
     * transfer();
     * ```
     */
    sendRawTransaction(transaction: Transaction): Promise<string>;
    /**
     * send a transaction and check whether it exists
     *
     * @param transaction `Object` - The transaction object to send:
     * @return The **callbalck** will return the 32 bytes transaction hash
     *
     * @example
     * ```javascript
     * // add privateKey to wallet
     * const privateKey = '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e';
     * hmy.wallet.addByPrivateKey(privateKey);
     *
     * async function transfer() {
     *   const txn = hmy.transactions.newTx({
     *     //  token send to
     *     to: 'avax166axnkjmghkf3df7xfvd0hn4dft8kemrza4cd2',
     *     // amount to send
     *     value: '10000',
     *     // gas limit, you can use string
     *     gasLimit: '210000',
     *     // send token from shardID
     *     shardID: 0,
     *     // send token to toShardID
     *     toShardID: 0,
     *     // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
     *     gasPrice: new hmy.utils.Unit('100').asGwei().toWei(),
     *   });
     *
     *   // sign the transaction use wallet;
     *   const signedTxn = await hmy.wallet.signTransaction(txn);
     *   const txnHash = await hmy.blockchain.createObservedTransaction(signedTxn);
     *   console.log(txnHash);
     * }
     *
     * transfer();
     * ```
     */
    createObservedTransaction(transaction: Transaction): import("avalanche-js-network/dist/providers/emitter").Emitter;
    /**
     * send raw staking transaction
     *
     * @param staking
     * @ignore
     *
     * @warning
     * ```
     * At present, this function is not implement yet, will Coming soon!!!
     * ```
     */
    sendRawStakingTransaction(staking: StakingTransaction): Promise<string>;
    /**
     * send raw staking transaction and check whether it exists
     *
     * @param staking
     * @ignore
     *
     * @warning
     * ```
     * At present, this function is not implement yet, will Coming soon!!!
     * ```
     */
    createObservedStakingTransaction(staking: StakingTransaction): import("avalanche-js-network/dist/providers/emitter").Emitter;
    /**
     * Executes a message call or transaction and returns the amount of the gas used.
     *
     * @param to the address will send to
     * @param data the data will send to that address
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @return `promise` -  the used gas for the simulated call/transaction.
     *
     * @warning
     * ```
     * At present, this function hmy_estimateGas is not implement yet, will Coming soon!!!
     * ```
     *
     * @example
     * ```javascript
     * hmy.blockchain.estimateGas({
     *   to: 'avax1d0kw95t6kkljmkk9vu0zv25jraut8ngv5vrs5g',
     *   data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    estimateGas({ to, data, shardID, }: {
        to: string;
        data: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     * @return `promise` - Number string of the current gas price in wei.
     *
     * @example
     * ```javascript
     * hmy.blockchain.gasPrice().then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    gasPrice(shardID?: number): Promise<any>;
    /**
     * Executes a message call transaction,
     * which is directly executed in the VM of the node, but never mined into the blockchain.
     *
     * @param payload some data you want put into these fucntions
     * @param blockNumber by default it's `latest`
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     *
     * @example
     * ```javascript
     * hmy.blockchain.call({
     *   to: "0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19",
     * }).then((value) => {
     *   console.log(value);
     * });
     * ```
     */
    call({ payload, blockNumber, shardID, }: {
        payload: any;
        blockNumber?: string;
        shardID?: number;
    }): Promise<any>;
    /**
     * Return new pending Transactions
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     *
     * @example
     * ```javascript
     * const hmy = new Avalanche(
     *   // rpc url
     *   'ws://api.s0.b.hmny.io/',
     *   {
     *     // chainType set to Avalanche
     *     chainType: ChainType.Avalanche,
     *     // chainType set to HmyLocal
     *     chainId: ChainID.HmyLocal,
     *   },
     * );
     *
     * const tmp = hmy.blockchain.newPendingTransactions();
     * console.log(tmp)
     * ```
     */
    newPendingTransactions(shardID?: number): NewPendingTransactions;
    /**
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     *
     * @example
     * ```javascript
     * const hmy = new Avalanche(
     *   // rpc url
     *   'ws://api.s0.b.hmny.io/',
     *   {
     *     // chainType set to Avalanche
     *     chainType: ChainType.Avalanche,
     *     // chainType set to HmyLocal
     *     chainId: ChainID.HmyLocal,
     *   },
     * );
     *
     * const tmp = hmy.blockchain.newBlockHeaders();
     * console.log(tmp)
     * ```
     */
    newBlockHeaders(shardID?: number): NewHeaders;
    /**
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     *
     * @example
     * ```javascript
     * const hmy = new Avalanche(
     *   // rpc url
     *   'ws://api.s0.b.hmny.io/',
     *   {
     *     // chainType set to Avalanche
     *     chainType: ChainType.Avalanche,
     *     // chainType set to HmyLocal
     *     chainId: ChainID.HmyLocal,
     *   },
     * );
     *
     * const tmp = hmy.blockchain.syncing();
     * console.log(tmp)
     * ```
     */
    syncing(shardID?: number): Syncing;
    /**
     *
     * @param shardID `shardID` is binding with the endpoint, IGNORE it!
     *
     * @example
     * ```javascript
     * const hmy = new Avalanche(
     *   // rpc url
     *   'ws://api.s0.b.hmny.io/',
     *   {
     *     // chainType set to Avalanche
     *     chainType: ChainType.Avalanche,
     *     // chainType set to HmyLocal
     *     chainId: ChainID.HmyLocal,
     *   },
     * );
     *
     * const tmp = hmy.blockchain.logs({
     *   from: '0x12'
     * });
     * console.log(tmp)
     * ```
     */
    logs(options: any, shardID?: number): LogSub;
}
export { Blockchain };
