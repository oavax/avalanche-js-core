/**
 * @packageDocumentation
 * @module avalanche-core
 * @hidden
 */
import { HttpProvider, Messenger } from 'avalanche-js-network';
import { TransactionFactory, Transaction } from 'avalanche-js-transaction';
import { Wallet, Account } from 'avalanche-js-account';
import { ChainType, ChainID } from 'avalanche-js-utils';
import { Blockchain } from './blockchain';
export interface AvalancheModule {
    HttpProvider: HttpProvider;
    Messenger: Messenger;
    Blockchain: Blockchain;
    TransactionFactory: TransactionFactory;
    Wallet: Wallet;
    Transaction: Transaction;
    Account: Account;
}
export declare enum UrlType {
    http = 0,
    ws = 1
}
export interface AvalancheSetting<T extends ChainType, I extends ChainID> {
    type: T;
    id: I;
}
