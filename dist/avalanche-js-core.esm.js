import * as crypto from 'avalanche-js-crypto';
import { getAddress, fromBech32, HRP } from 'avalanche-js-crypto';
import * as utils from 'avalanche-js-utils';
import { assertObject, AssertType, DefaultBlockParams, AvalancheCore, defaultConfig, ChainType, ChainID, Unit, isBech32Address, isHex, hexToNumber } from 'avalanche-js-utils';
import { ResponseMiddleware, WSProvider, NewPendingTransactions, NewHeaders, Syncing, LogSub, RPCMethod, Provider, HttpProvider, Messenger } from 'avalanche-js-network';
import { TransactionFactory, Transaction } from 'avalanche-js-transaction';
import { StakingFactory, StakingTransaction } from 'avalanche-js-staking';
import { Contract, ContractFactory } from 'avalanche-js-contract';
import { Wallet, Account, HDNode } from 'avalanche-js-account';
import _regeneratorRuntime from 'regenerator-runtime';
import { __decorate } from 'tslib';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Blockchain = /*#__PURE__*/function () {
  /**
   * @hidden
   */
  function Blockchain(messenger) {
    this.messenger = messenger;
  }
  /**
   * @hidden
   */


  var _proto = Blockchain.prototype;

  _proto.setMessenger = function setMessenger(messenger) {
    this.messenger = messenger;
  }
  /**
   *
   * @hidden
   */
  ;

  _proto.getRpcResult = function getRpcResult(result) {
    if (result instanceof ResponseMiddleware) {
      return result.getRaw;
    } else {
      return result;
    }
  }
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
  ;

  _proto.getBalance =
  /*#__PURE__*/
  function () {
    var _getBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
      var address, _ref$blockNumber, blockNumber, _ref$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              address = _ref.address, _ref$blockNumber = _ref.blockNumber, blockNumber = _ref$blockNumber === void 0 ? DefaultBlockParams.latest : _ref$blockNumber, _ref$shardID = _ref.shardID, shardID = _ref$shardID === void 0 ? this.messenger.currentShard : _ref$shardID;
              _context.next = 3;
              return this.messenger.send(RPCMethod.GetBalance, [getAddress(address).checksum, blockNumber], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context.sent;
              return _context.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getBalance(_x) {
      return _getBalance.apply(this, arguments);
    }

    return getBalance;
  }()
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
  ;

  _proto.getBlockNumber =
  /*#__PURE__*/
  function () {
    var _getBlockNumber = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(shardID) {
      var result;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (shardID === void 0) {
                shardID = this.messenger.currentShard;
              }

              _context2.next = 3;
              return this.messenger.send(RPCMethod.BlockNumber, [], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context2.sent;
              return _context2.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getBlockNumber(_x2) {
      return _getBlockNumber.apply(this, arguments);
    }

    return getBlockNumber;
  }()
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
  ;

  _proto.getBlockByHash =
  /*#__PURE__*/
  function () {
    var _getBlockByHash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(_ref2) {
      var blockHash, _ref2$returnObject, returnObject, _ref2$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              blockHash = _ref2.blockHash, _ref2$returnObject = _ref2.returnObject, returnObject = _ref2$returnObject === void 0 ? true : _ref2$returnObject, _ref2$shardID = _ref2.shardID, shardID = _ref2$shardID === void 0 ? this.messenger.currentShard : _ref2$shardID;
              _context3.next = 3;
              return this.messenger.send(RPCMethod.GetBlockByHash, [blockHash, returnObject], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context3.sent;
              return _context3.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getBlockByHash(_x3) {
      return _getBlockByHash.apply(this, arguments);
    }

    return getBlockByHash;
  }()
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
  ;

  _proto.getBlockByNumber =
  /*#__PURE__*/
  function () {
    var _getBlockByNumber = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(_ref3) {
      var _ref3$blockNumber, blockNumber, _ref3$returnObject, returnObject, _ref3$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ref3$blockNumber = _ref3.blockNumber, blockNumber = _ref3$blockNumber === void 0 ? DefaultBlockParams.latest : _ref3$blockNumber, _ref3$returnObject = _ref3.returnObject, returnObject = _ref3$returnObject === void 0 ? true : _ref3$returnObject, _ref3$shardID = _ref3.shardID, shardID = _ref3$shardID === void 0 ? this.messenger.currentShard : _ref3$shardID;
              _context4.next = 3;
              return this.messenger.send(RPCMethod.GetBlockByNumber, [blockNumber, returnObject], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context4.sent;
              return _context4.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getBlockByNumber(_x4) {
      return _getBlockByNumber.apply(this, arguments);
    }

    return getBlockByNumber;
  }()
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
  ;

  _proto.getBlockTransactionCountByHash =
  /*#__PURE__*/
  function () {
    var _getBlockTransactionCountByHash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(_ref4) {
      var blockHash, _ref4$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              blockHash = _ref4.blockHash, _ref4$shardID = _ref4.shardID, shardID = _ref4$shardID === void 0 ? this.messenger.currentShard : _ref4$shardID;
              _context5.next = 3;
              return this.messenger.send(RPCMethod.GetBlockTransactionCountByHash, [blockHash], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context5.sent;
              return _context5.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getBlockTransactionCountByHash(_x5) {
      return _getBlockTransactionCountByHash.apply(this, arguments);
    }

    return getBlockTransactionCountByHash;
  }()
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
  ;

  _proto.getBlockTransactionCountByNumber =
  /*#__PURE__*/
  function () {
    var _getBlockTransactionCountByNumber = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(_ref5) {
      var blockNumber, _ref5$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              blockNumber = _ref5.blockNumber, _ref5$shardID = _ref5.shardID, shardID = _ref5$shardID === void 0 ? this.messenger.currentShard : _ref5$shardID;
              _context6.next = 3;
              return this.messenger.send(RPCMethod.GetBlockTransactionCountByNumber, [blockNumber], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context6.sent;
              return _context6.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getBlockTransactionCountByNumber(_x6) {
      return _getBlockTransactionCountByNumber.apply(this, arguments);
    }

    return getBlockTransactionCountByNumber;
  }()
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
  ;

  _proto.getTransactionByBlockHashAndIndex =
  /*#__PURE__*/
  function () {
    var _getTransactionByBlockHashAndIndex = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(_ref6) {
      var blockHash, index, _ref6$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              blockHash = _ref6.blockHash, index = _ref6.index, _ref6$shardID = _ref6.shardID, shardID = _ref6$shardID === void 0 ? this.messenger.currentShard : _ref6$shardID;
              _context7.next = 3;
              return this.messenger.send(RPCMethod.GetTransactionByBlockHashAndIndex, [blockHash, index], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context7.sent;
              return _context7.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getTransactionByBlockHashAndIndex(_x7) {
      return _getTransactionByBlockHashAndIndex.apply(this, arguments);
    }

    return getTransactionByBlockHashAndIndex;
  }()
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
  ;

  _proto.getTransactionByBlockNumberAndIndex =
  /*#__PURE__*/
  function () {
    var _getTransactionByBlockNumberAndIndex = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(_ref7) {
      var _ref7$blockNumber, blockNumber, index, _ref7$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ref7$blockNumber = _ref7.blockNumber, blockNumber = _ref7$blockNumber === void 0 ? DefaultBlockParams.latest : _ref7$blockNumber, index = _ref7.index, _ref7$shardID = _ref7.shardID, shardID = _ref7$shardID === void 0 ? this.messenger.currentShard : _ref7$shardID;
              _context8.next = 3;
              return this.messenger.send(RPCMethod.GetTransactionByBlockNumberAndIndex, [blockNumber, index], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context8.sent;
              return _context8.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getTransactionByBlockNumberAndIndex(_x8) {
      return _getTransactionByBlockNumberAndIndex.apply(this, arguments);
    }

    return getTransactionByBlockNumberAndIndex;
  }()
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
  ;

  _proto.getTransactionByHash =
  /*#__PURE__*/
  function () {
    var _getTransactionByHash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(_ref8) {
      var txnHash, _ref8$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              txnHash = _ref8.txnHash, _ref8$shardID = _ref8.shardID, shardID = _ref8$shardID === void 0 ? this.messenger.currentShard : _ref8$shardID;
              _context9.next = 3;
              return this.messenger.send(RPCMethod.GetTransactionByHash, [txnHash], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context9.sent;
              return _context9.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function getTransactionByHash(_x9) {
      return _getTransactionByHash.apply(this, arguments);
    }

    return getTransactionByHash;
  }()
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
  ;

  _proto.getTransactionReceipt =
  /*#__PURE__*/
  function () {
    var _getTransactionReceipt = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(_ref9) {
      var txnHash, _ref9$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              txnHash = _ref9.txnHash, _ref9$shardID = _ref9.shardID, shardID = _ref9$shardID === void 0 ? this.messenger.currentShard : _ref9$shardID;
              _context10.next = 3;
              return this.messenger.send(RPCMethod.GetTransactionReceipt, [txnHash], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context10.sent;
              return _context10.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function getTransactionReceipt(_x10) {
      return _getTransactionReceipt.apply(this, arguments);
    }

    return getTransactionReceipt;
  }()
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
  ;

  _proto.getCxReceiptByHash =
  /*#__PURE__*/
  function () {
    var _getCxReceiptByHash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(_ref10) {
      var txnHash, shardID, result;
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              txnHash = _ref10.txnHash, shardID = _ref10.shardID;
              _context11.next = 3;
              return this.messenger.send(RPCMethod.GetCXReceiptByHash, [txnHash], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context11.sent;
              return _context11.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function getCxReceiptByHash(_x11) {
      return _getCxReceiptByHash.apply(this, arguments);
    }

    return getCxReceiptByHash;
  }()
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
  ;

  _proto.getCode =
  /*#__PURE__*/
  function () {
    var _getCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(_ref11) {
      var address, _ref11$blockNumber, blockNumber, _ref11$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              address = _ref11.address, _ref11$blockNumber = _ref11.blockNumber, blockNumber = _ref11$blockNumber === void 0 ? DefaultBlockParams.latest : _ref11$blockNumber, _ref11$shardID = _ref11.shardID, shardID = _ref11$shardID === void 0 ? this.messenger.currentShard : _ref11$shardID;
              _context12.next = 3;
              return this.messenger.send(RPCMethod.GetCode, [getAddress(address).checksum, blockNumber], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context12.sent;
              return _context12.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function getCode(_x12) {
      return _getCode.apply(this, arguments);
    }

    return getCode;
  }()
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
  ;

  _proto.net_peerCount =
  /*#__PURE__*/
  function () {
    var _net_peerCount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(shardID) {
      var result;
      return _regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (shardID === void 0) {
                shardID = this.messenger.currentShard;
              }

              _context13.next = 3;
              return this.messenger.send(RPCMethod.PeerCount, [], 'net', shardID);

            case 3:
              result = _context13.sent;
              return _context13.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function net_peerCount(_x13) {
      return _net_peerCount.apply(this, arguments);
    }

    return net_peerCount;
  }()
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
  ;

  _proto.net_version =
  /*#__PURE__*/
  function () {
    var _net_version = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(shardID) {
      var result;
      return _regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (shardID === void 0) {
                shardID = this.messenger.currentShard;
              }

              _context14.next = 3;
              return this.messenger.send(RPCMethod.NetVersion, [], 'net', shardID);

            case 3:
              result = _context14.sent;
              return _context14.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function net_version(_x14) {
      return _net_version.apply(this, arguments);
    }

    return net_version;
  }()
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
  ;

  _proto.getProtocolVersion =
  /*#__PURE__*/
  function () {
    var _getProtocolVersion = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(shardID) {
      var result;
      return _regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (shardID === void 0) {
                shardID = this.messenger.currentShard;
              }

              _context15.next = 3;
              return this.messenger.send(RPCMethod.ProtocolVersion, [], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context15.sent;
              return _context15.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function getProtocolVersion(_x15) {
      return _getProtocolVersion.apply(this, arguments);
    }

    return getProtocolVersion;
  }()
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
  ;

  _proto.getStorageAt =
  /*#__PURE__*/
  function () {
    var _getStorageAt = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(_ref12) {
      var address, position, _ref12$blockNumber, blockNumber, _ref12$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              address = _ref12.address, position = _ref12.position, _ref12$blockNumber = _ref12.blockNumber, blockNumber = _ref12$blockNumber === void 0 ? DefaultBlockParams.latest : _ref12$blockNumber, _ref12$shardID = _ref12.shardID, shardID = _ref12$shardID === void 0 ? this.messenger.currentShard : _ref12$shardID;
              _context16.next = 3;
              return this.messenger.send(RPCMethod.GetStorageAt, [getAddress(address).checksum, position, blockNumber], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context16.sent;
              return _context16.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function getStorageAt(_x16) {
      return _getStorageAt.apply(this, arguments);
    }

    return getStorageAt;
  }()
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
  ;

  _proto.getTransactionCount =
  /*#__PURE__*/
  function () {
    var _getTransactionCount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(_ref13) {
      var address, _ref13$blockNumber, blockNumber, _ref13$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              address = _ref13.address, _ref13$blockNumber = _ref13.blockNumber, blockNumber = _ref13$blockNumber === void 0 ? DefaultBlockParams.latest : _ref13$blockNumber, _ref13$shardID = _ref13.shardID, shardID = _ref13$shardID === void 0 ? this.messenger.currentShard : _ref13$shardID;
              _context17.next = 3;
              return this.messenger.send(RPCMethod.GetTransactionCount, [getAddress(address).checksum, blockNumber], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context17.sent;
              return _context17.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function getTransactionCount(_x17) {
      return _getTransactionCount.apply(this, arguments);
    }

    return getTransactionCount;
  }()
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
  ;

  _proto.getShardingStructure =
  /*#__PURE__*/
  function () {
    var _getShardingStructure = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18() {
      var result;
      return _regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return this.messenger.send(RPCMethod.GetShardingStructure, [], this.messenger.chainPrefix);

            case 2:
              result = _context18.sent;
              return _context18.abrupt("return", this.getRpcResult(result));

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function getShardingStructure() {
      return _getShardingStructure.apply(this, arguments);
    }

    return getShardingStructure;
  }()
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
  ;

  _proto.sendTransaction =
  /*#__PURE__*/
  function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19(transaction) {
      var result;
      return _regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (!(!transaction.isSigned() || !transaction)) {
                _context19.next = 2;
                break;
              }

              throw new Error('transaction is not signed or not exist');

            case 2:
              _context19.next = 4;
              return this.messenger.send(RPCMethod.SendRawTransaction, [transaction.getRawTransaction()], this.messenger.chainPrefix, typeof transaction.txParams.shardID === 'string' ? Number.parseInt(transaction.txParams.shardID, 10) : transaction.txParams.shardID);

            case 4:
              result = _context19.sent;
              return _context19.abrupt("return", this.getRpcResult(result));

            case 6:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function sendTransaction(_x18) {
      return _sendTransaction.apply(this, arguments);
    }

    return sendTransaction;
  }()
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
  ;

  _proto.sendRawTransaction =
  /*#__PURE__*/
  function () {
    var _sendRawTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20(transaction) {
      var _yield$transaction$se, txn, result;

      return _regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (!(!transaction.isSigned() || !transaction)) {
                _context20.next = 2;
                break;
              }

              throw new Error('transaction is not signed or not exist');

            case 2:
              _context20.next = 4;
              return transaction.sendTransaction();

            case 4:
              _yield$transaction$se = _context20.sent;
              txn = _yield$transaction$se[0];
              result = _yield$transaction$se[1];

              if (!txn.isPending()) {
                _context20.next = 9;
                break;
              }

              return _context20.abrupt("return", result);

            case 9:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    function sendRawTransaction(_x19) {
      return _sendRawTransaction.apply(this, arguments);
    }

    return sendRawTransaction;
  }()
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
  ;

  _proto.createObservedTransaction = function createObservedTransaction(transaction) {
    try {
      transaction.sendTransaction().then(function (response) {
        var txReturned = response[0],
            TranID = response[1];
        txReturned.confirm(TranID).then(function (txConfirmed) {
          transaction.emitter.resolve(txConfirmed);
        });
      });
      return transaction.emitter;
    } catch (err) {
      throw err;
    }
  }
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
  ;

  _proto.sendRawStakingTransaction =
  /*#__PURE__*/
  function () {
    var _sendRawStakingTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee21(staking) {
      var _yield$staking$sendTr, txn, result;

      return _regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (!(!staking.isSigned() || !staking)) {
                _context21.next = 2;
                break;
              }

              throw new Error('staking transaction is not signed or not exist');

            case 2:
              _context21.next = 4;
              return staking.sendTransaction();

            case 4:
              _yield$staking$sendTr = _context21.sent;
              txn = _yield$staking$sendTr[0];
              result = _yield$staking$sendTr[1];

              if (!txn.isPending()) {
                _context21.next = 9;
                break;
              }

              return _context21.abrupt("return", result);

            case 9:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    function sendRawStakingTransaction(_x20) {
      return _sendRawStakingTransaction.apply(this, arguments);
    }

    return sendRawStakingTransaction;
  }()
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
  ;

  _proto.createObservedStakingTransaction = function createObservedStakingTransaction(staking) {
    try {
      staking.sendTransaction().then(function (response) {
        var txReturned = response[0],
            TranID = response[1];
        txReturned.confirm(TranID).then(function (txConfirmed) {
          staking.emitter.resolve(txConfirmed);
        });
      });
      return staking.emitter;
    } catch (err) {
      throw err;
    }
  }
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
  ;

  _proto.estimateGas =
  /*#__PURE__*/
  function () {
    var _estimateGas = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee22(_ref14) {
      var to, data, _ref14$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              to = _ref14.to, data = _ref14.data, _ref14$shardID = _ref14.shardID, shardID = _ref14$shardID === void 0 ? this.messenger.currentShard : _ref14$shardID;
              _context22.next = 3;
              return this.messenger.send(RPCMethod.EstimateGas, [{
                to: getAddress(to).checksum,
                data: data
              }], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context22.sent;
              return _context22.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function estimateGas(_x21) {
      return _estimateGas.apply(this, arguments);
    }

    return estimateGas;
  }()
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
  ;

  _proto.gasPrice =
  /*#__PURE__*/
  function () {
    var _gasPrice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee23(shardID) {
      var result;
      return _regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (shardID === void 0) {
                shardID = this.messenger.currentShard;
              }

              _context23.next = 3;
              return this.messenger.send(RPCMethod.GasPrice, [], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context23.sent;
              return _context23.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23, this);
    }));

    function gasPrice(_x22) {
      return _gasPrice.apply(this, arguments);
    }

    return gasPrice;
  }()
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
  ;

  _proto.call =
  /*#__PURE__*/
  function () {
    var _call = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee24(_ref15) {
      var payload, _ref15$blockNumber, blockNumber, _ref15$shardID, shardID, result;

      return _regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              payload = _ref15.payload, _ref15$blockNumber = _ref15.blockNumber, blockNumber = _ref15$blockNumber === void 0 ? DefaultBlockParams.latest : _ref15$blockNumber, _ref15$shardID = _ref15.shardID, shardID = _ref15$shardID === void 0 ? this.messenger.currentShard : _ref15$shardID;
              _context24.next = 3;
              return this.messenger.send(RPCMethod.Call, [payload, blockNumber], this.messenger.chainPrefix, shardID);

            case 3:
              result = _context24.sent;
              return _context24.abrupt("return", this.getRpcResult(result));

            case 5:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    function call(_x23) {
      return _call.apply(this, arguments);
    }

    return call;
  }()
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
  ;

  _proto.newPendingTransactions = function newPendingTransactions(shardID) {
    if (shardID === void 0) {
      shardID = this.messenger.currentShard;
    }

    if (this.messenger.provider instanceof WSProvider) {
      return new NewPendingTransactions(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
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
  ;

  _proto.newBlockHeaders = function newBlockHeaders(shardID) {
    if (shardID === void 0) {
      shardID = this.messenger.currentShard;
    }

    if (this.messenger.provider instanceof WSProvider) {
      return new NewHeaders(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
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
  ;

  _proto.syncing = function syncing(shardID) {
    if (shardID === void 0) {
      shardID = this.messenger.currentShard;
    }

    if (this.messenger.provider instanceof WSProvider) {
      return new Syncing(this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  }
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
  ;

  _proto.logs = function logs(options, shardID) {
    if (shardID === void 0) {
      shardID = this.messenger.currentShard;
    }

    if (this.messenger.provider instanceof WSProvider) {
      return new LogSub(options, this.messenger, shardID);
    } else {
      throw new Error('HttpProvider does not support this feature');
    }
  };

  return Blockchain;
}();

__decorate([assertObject({
  address: ['isValidAddress', AssertType.required],
  blockNumber: ['isBlockNumber', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getBalance", null);

__decorate([assertObject({
  blockHash: ['isHash', AssertType.required],
  returnObject: ['isBoolean', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getBlockByHash", null);

__decorate([assertObject({
  blockNumber: ['isBlockNumber', AssertType.optional],
  returnObject: ['isBoolean', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getBlockByNumber", null);

__decorate([assertObject({
  blockHash: ['isHash', AssertType.required],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getBlockTransactionCountByHash", null);

__decorate([assertObject({
  blockNumber: ['isBlockNumber', AssertType.required],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getBlockTransactionCountByNumber", null);

__decorate([assertObject({
  blockHash: ['isHash', AssertType.required],
  index: ['isHex', AssertType.required],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getTransactionByBlockHashAndIndex", null);

__decorate([assertObject({
  blockNumber: ['isBlockNumber', AssertType.optional],
  index: ['isHex', AssertType.required],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getTransactionByBlockNumberAndIndex", null);

__decorate([assertObject({
  txnHash: ['isHash', AssertType.required],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getTransactionByHash", null);

__decorate([assertObject({
  txnHash: ['isString', AssertType.required],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getTransactionReceipt", null);

__decorate([assertObject({
  txnHash: ['isString', AssertType.required],
  shardID: ['isNumber', AssertType.required]
})], Blockchain.prototype, "getCxReceiptByHash", null);

__decorate([assertObject({
  address: ['isValidAddress', AssertType.required],
  blockNumber: ['isBlockNumber', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getCode", null);

__decorate([assertObject({
  address: ['isValidAddress', AssertType.required],
  position: ['isHex', AssertType.required],
  blockNumber: ['isBlockNumber', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getStorageAt", null);

__decorate([assertObject({
  address: ['isValidAddress', AssertType.required],
  blockNumber: ['isBlockNumber', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "getTransactionCount", null);

__decorate([assertObject({
  to: ['isValidAddress', AssertType.optional],
  data: ['isHex', AssertType.optional],
  shardID: ['isNumber', AssertType.optional]
})], Blockchain.prototype, "estimateGas", null);

var Avalanche = /*#__PURE__*/function (_utils$AvalancheCore) {
  _inheritsLoose(Avalanche, _utils$AvalancheCore);

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
  function Avalanche(url, config) {
    var _this;

    if (config === void 0) {
      config = {
        chainId: defaultConfig.Default.Chain_ID,
        chainType: defaultConfig.Default.Chain_Type
      };
    }

    _this = _utils$AvalancheCore.call(this, config.chainType, config.chainId) || this;
    /**@ignore*/

    _this.Modules = {
      HttpProvider: HttpProvider,
      WSProvider: WSProvider,
      Messenger: Messenger,
      Blockchain: Blockchain,
      TransactionFactory: TransactionFactory,
      StakingFactory: StakingFactory,
      Wallet: Wallet,
      Transaction: Transaction,
      StakingTransaction: StakingTransaction,
      Account: Account,
      Contract: Contract
    };
    var providerUrl = config.chainUrl || url || defaultConfig.Default.Chain_URL;
    _this.provider = new Provider(providerUrl).provider;
    _this.messenger = new Messenger(_this.provider, _this.chainType, _this.chainId);
    _this.blockchain = new Blockchain(_this.messenger);
    _this.transactions = new TransactionFactory(_this.messenger);
    _this.stakings = new StakingFactory(_this.messenger);
    _this.wallet = new Wallet(_this.messenger);
    _this.contracts = new ContractFactory(_this.wallet);
    _this.crypto = crypto;
    _this.utils = utils;
    _this.defaultShardID = config.shardID;

    if (_this.defaultShardID !== undefined) {
      _this.setShardID(_this.defaultShardID);
    }

    return _this;
  }
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


  var _proto = Avalanche.prototype;

  _proto.setProvider = function setProvider(provider) {
    this.provider = new Provider(provider).provider;
    this.messenger.setProvider(this.provider);
    this.setMessenger(this.messenger);
  }
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
  ;

  _proto.setChainId = function setChainId(chainId) {
    this.chainId = chainId;
    this.messenger.setChainId(this.chainId);
    this.setMessenger(this.messenger);
  }
  /**
   * Change the Shard ID
   *
   * @example
   * ```
   * hmy.setShardID(2);
   * ```
   */
  ;

  _proto.setShardID = function setShardID(shardID) {
    this.defaultShardID = shardID;
    this.messenger.setDefaultShardID(this.defaultShardID);
    this.setMessenger(this.messenger);
  }
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
  ;

  _proto.setChainType = function setChainType(chainType) {
    this.chainType = chainType;
    this.messenger.setChainType(this.chainType);
    this.setMessenger(this.messenger);
  }
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
  ;

  _proto.shardingStructures = function shardingStructures(_shardingStructures) {
    for (var _iterator = _createForOfIteratorHelperLoose(_shardingStructures), _step; !(_step = _iterator()).done;) {
      var shard = _step.value;
      var shardID = typeof shard.shardID === 'string' ? Number.parseInt(shard.shardID, 10) : shard.shardID;
      this.messenger.shardProviders.set(shardID, {
        current: shard.current !== undefined ? shard.current : false,
        shardID: shardID,
        http: shard.http,
        ws: shard.ws
      });
    }

    this.setMessenger(this.messenger);
  }
  /**@ignore*/
  ;

  _proto.setMessenger = function setMessenger(messenger) {
    this.blockchain.setMessenger(messenger);
    this.wallet.setMessenger(messenger);
    this.transactions.setMessenger(messenger);
    this.stakings.setMessenger(messenger);
  };

  return Avalanche;
}(AvalancheCore);

var packageInfo = {
  version: '1.0.0'
};
var TruffleProvider = /*#__PURE__*/function (_HDNode) {
  _inheritsLoose(TruffleProvider, _HDNode);

  function TruffleProvider(provider, hdOptions, chainOptions, transactionOptions) {
    var _this;

    if (provider === void 0) {
      provider = 'http://localhost:9500';
    }

    if (hdOptions === void 0) {
      hdOptions = {
        menmonic: undefined,
        index: 0,
        addressCount: 1
      };
    }

    if (chainOptions === void 0) {
      chainOptions = {
        shardID: 0,
        chainType: ChainType.Avalanche,
        chainId: ChainID.HmyLocal
      };
    }

    if (transactionOptions === void 0) {
      transactionOptions = {
        gasLimit: '10000000',
        gasPrice: '20000000000'
      };
    }

    _this = _HDNode.call(this, provider, hdOptions.menmonic, hdOptions.index, hdOptions.addressCount, chainOptions.shardID, chainOptions.chainType, chainOptions.chainId, transactionOptions.gasLimit, transactionOptions.gasPrice) || this;

    _this.resolveResult = function (response) {
      var _final = response.getRaw || response;

      delete _final.req;
      delete _final.responseType;
      return _final;
    };

    _this.resolveCallback = function (err, res, callback) {
      try {
        if (err) {
          callback(err);
        }

        var response = _this.resolveResult(res);

        callback(null, response);
      } catch (error) {
        throw error;
      }
    };

    return _this;
  }

  var _proto = TruffleProvider.prototype;

  _proto.send = /*#__PURE__*/function () {
    var _send = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this2 = this;

      var _this$resolveArgs,
          newArgs,
          id,
          params,
          newMethod,
          callback,
          accounts,
          txObj,
          rawTxn,
          result,
          _result,
          _result2,
          _result3,
          _args = arguments;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$resolveArgs = this.resolveArgs.apply(this, _args), newArgs = _this$resolveArgs.newArgs, id = _this$resolveArgs.id, params = _this$resolveArgs.params, newMethod = _this$resolveArgs.newMethod, callback = _this$resolveArgs.callback;
              _context.t0 = newMethod;
              _context.next = _context.t0 === 'hmy_accounts' ? 4 : _context.t0 === 'hmy_sendTransaction' ? 7 : _context.t0 === 'hmy_getTransactionReceipt' ? 15 : _context.t0 === 'net_version' ? 19 : _context.t0 === 'web3_clientVersion' ? 21 : _context.t0 === 'hmy_getBlockByNumber' ? 23 : 27;
              break;

            case 4:
              accounts = this.getAccounts();
              callback(null, {
                result: accounts,
                id: id,
                jsonrpc: '2.0'
              });
              return _context.abrupt("return", {
                result: accounts,
                id: id,
                jsonrpc: '2.0'
              });

            case 7:
              txObj = params[0];
              _context.next = 10;
              return this.signTransaction(txObj);

            case 10:
              rawTxn = _context.sent;
              _context.next = 13;
              return this.provider.send({
                id: id,
                method: 'hmy_sendRawTransaction',
                params: [rawTxn],
                jsonrpc: '2.0'
              }, function (err, res) {
                return _this2.resolveCallback(err, res, callback);
              });

            case 13:
              result = _context.sent;
              return _context.abrupt("return", this.resolveResult(result));

            case 15:
              _context.next = 17;
              return this.provider.send({
                id: id,
                method: 'hmy_getTransactionReceipt',
                params: [params[0]],
                jsonrpc: '2.0'
              }, function (err, res) {
                try {
                  if (err) {
                    callback(err);
                  }

                  var response = _this2.resolveResult(res);

                  if (response.result !== null) {
                    response.result.status = '0x1';
                  }

                  callback(null, response);
                } catch (error) {
                  throw error;
                }
              });

            case 17:
              _result = _context.sent;
              return _context.abrupt("return", this.resolveResult(_result));

            case 19:
              callback(null, {
                result: String(this.messenger.chainId),
                id: id,
                jsonrpc: '2.0'
              });
              return _context.abrupt("return", {
                result: String(this.messenger.chainId),
                id: id,
                jsonrpc: '2.0'
              });

            case 21:
              callback(null, {
                result: "Avalanche/" + packageInfo.version + "/@avalanche-js",
                id: id,
                jsonrpc: '2.0'
              });
              return _context.abrupt("return", {
                result: "Avalanche/" + packageInfo.version + "/@avalanche-js",
                id: id,
                jsonrpc: '2.0'
              });

            case 23:
              _context.next = 25;
              return this.provider.send(newArgs, function (err, res) {
                try {
                  if (err) {
                    callback(err);
                  }

                  var response = _this2.resolveResult(res);

                  if (response.error) {
                    callback(response.error);
                    return;
                  }

                  if (new Unit(response.result.gasLimit).asWei().toWei().gt(new Unit(_this2.gasLimit).asWei().toWei())) {
                    response.result.gasLimit = "0x" + new Unit(_this2.gasLimit).asWei().toWei().toString('hex');
                  }

                  if (isBech32Address(response.result.miner)) {
                    response.result.miner = fromBech32(response.result.miner, HRP);
                  }

                  callback(null, response);
                } catch (error) {
                  throw error;
                }
              });

            case 25:
              _result2 = _context.sent;
              return _context.abrupt("return", this.resolveResult(_result2));

            case 27:
              _context.next = 29;
              return this.provider.send(newArgs, function (err, res) {
                return _this2.resolveCallback(err, res, callback);
              });

            case 29:
              _result3 = _context.sent;
              return _context.abrupt("return", this.resolveResult(_result3));

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function send() {
      return _send.apply(this, arguments);
    }

    return send;
  }();

  _proto.sendAsync = function sendAsync() {
    return this.send.apply(this, arguments);
  };

  _proto.resolveArgs = function resolveArgs() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var method = args[0].method;
    var params = args[0].params;
    var newMethod = method;

    if (method.startsWith('eth')) {
      newMethod = method.replace('eth', 'hmy');
    }

    args[0].method = newMethod;
    var id = args[0].id;
    return {
      newArgs: args[0],
      id: id,
      params: params,
      newMethod: newMethod,
      callback: args[1]
    };
  };

  return TruffleProvider;
}(HDNode);

/** @hidden */

var ExtensionType;

(function (ExtensionType) {
  ExtensionType["MathWallet"] = "MathWallet";
  ExtensionType["AVAXWallet"] = "AVAXWallet";
})(ExtensionType || (ExtensionType = {}));

var AvalancheExtension = /*#__PURE__*/function () {
  /**
   * Create an blockchain instance support wallet injection
   *
   * @param wallet could be MathWallet or AVAXWallet instance
   * @param config (optional), using default `Chain_Id` and `Chain_Type`
   *
   * @example
   * ```javascript
   * // Using Mathwallet instance
   * export const initEx = async() => {
   *   hmyEx = new AvalancheExtension(window.avalanche);
   * }
   * // Using AVAXWallet instance
   * export const initEx = async() => {
   *   hmyEx = new AvalancheExtension(window.avaxwallet);
   * }
   * ```
   */
  function AvalancheExtension(wallet, config) {
    if (config === void 0) {
      config = {
        chainId: defaultConfig.Default.Chain_ID,
        chainType: defaultConfig.Default.Chain_Type
      };
    }

    this.extensionType = null;
    this.wallet = wallet; // check if it is mathwallet or avaxwallet

    this.isExtension(this.wallet);

    if (wallet.messenger) {
      this.provider = wallet.messenger.provider;
      this.messenger = wallet.messenger;
    } else {
      this.provider = new Provider(config.chainUrl || wallet.network.chain_url).provider;
      this.messenger = new Messenger(this.provider, config.chainType, config.chainId);
    }

    this.wallet.messenger = this.messenger;
    this.blockchain = new Blockchain(this.messenger);
    this.transactions = new TransactionFactory(this.messenger);
    this.contracts = new ContractFactory(this.wallet);
    this.crypto = crypto;
    this.utils = utils;
  }
  /**
   * Will change the provider for its module.
   *
   * @param provider a valid provider, you can replace it with your own working node
   *
   * @example
   * ```javascript
   * const tmp = hmyEx.setProvider('http://localhost:9500');
   * ```
   */


  var _proto = AvalancheExtension.prototype;

  _proto.setProvider = function setProvider(provider) {
    this.provider = new Provider(provider).provider;
    this.messenger.setProvider(this.provider);
    this.setMessenger(this.messenger);
  }
  /**
   * Change the Shard ID
   *
   * @example
   * ```
   * hmyEx.setShardID(2);
   * ```
   */
  ;

  _proto.setShardID = function setShardID(shardID) {
    this.defaultShardID = shardID;
    this.messenger.setDefaultShardID(this.defaultShardID);
    this.setMessenger(this.messenger);
  };

  _proto.isExtension = function isExtension(wallet) {
    var _this = this;

    var isExtension = false;
    this.extensionType = null;

    if (wallet.isMathWallet || wallet.isAVAXWallet) {
      isExtension = true;
      if (wallet.isMathWallet) this.extensionType = ExtensionType.MathWallet;else this.extensionType = ExtensionType.AVAXWallet; // remake signTransaction of MathWallet or AVAXWallet

      var signTransaction = this.wallet.signTransaction;

      this.wallet.signTransaction = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(transaction, updateNonce, encodeMode, blockNumber) {
          var extensionAccount, nonce;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (updateNonce === void 0) {
                    updateNonce = true;
                  }

                  if (encodeMode === void 0) {
                    encodeMode = 'rlp';
                  }

                  if (blockNumber === void 0) {
                    blockNumber = 'latest';
                  }

                  _context.next = 5;
                  return _this.wallet.getAccount();

                case 5:
                  extensionAccount = _context.sent;

                  if (!updateNonce) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 9;
                  return _this.messenger.send(RPCMethod.GetAccountNonce, [getAddress(extensionAccount.address).checksum, blockNumber], _this.messenger.chainPrefix, typeof transaction.txParams.shardID === 'string' ? Number.parseInt(transaction.txParams.shardID, 10) : transaction.txParams.shardID);

                case 9:
                  nonce = _context.sent;
                  transaction.setParams(_extends({}, transaction.txParams, {
                    from: getAddress(extensionAccount.address).bech32,
                    nonce: Number.parseInt(isHex(nonce.result.toString()) ? hexToNumber(nonce.result.toString()) : nonce.result.toString(), 10)
                  }));
                  _context.next = 14;
                  break;

                case 13:
                  transaction.setParams(_extends({}, transaction.txParams, {
                    from: getAddress(extensionAccount.address).bech32
                  }));

                case 14:
                  return _context.abrupt("return", signTransaction(transaction, false, encodeMode, blockNumber));

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }();
    }

    if (!isExtension) {
      throw new Error('Extension is not found');
    }

    return;
  }
  /**
   * Get the wallet account
   *
   * @example
   * ```javascript
   * const account = hmyEx.login();
   * console.log(account);
   * ```
   */
  ;

  _proto.login =
  /*#__PURE__*/
  function () {
    var _login = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var account;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.wallet.getAccount();

            case 2:
              account = _context2.sent;
              return _context2.abrupt("return", account);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function login() {
      return _login.apply(this, arguments);
    }

    return login;
  }()
  /**
   * Log out the wallet account
   *
   * @example
   * ```javascript
   * hmyEx.logout();
   * ```
   */
  ;

  _proto.logout =
  /*#__PURE__*/
  function () {
    var _logout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.wallet.forgetIdentity();

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function logout() {
      return _logout.apply(this, arguments);
    }

    return logout;
  }()
  /**
   * Set the sharding Structure
   *
   * @param shardingStructures The array of information of sharding structures
   *
   * @example
   * ```javascript
   * hmyEx.shardingStructures([
   *   {"current":true,"http":"http://127.0.0.1:9500",
   *    "shardID":0,"ws":"ws://127.0.0.1:9800"},
   *   {"current":false,"http":"http://127.0.0.1:9501",
   *    "shardID":1,"ws":"ws://127.0.0.1:9801"}
   * ]);
   * ```
   */
  ;

  _proto.shardingStructures = function shardingStructures(_shardingStructures) {
    for (var _iterator = _createForOfIteratorHelperLoose(_shardingStructures), _step; !(_step = _iterator()).done;) {
      var shard = _step.value;
      var shardID = typeof shard.shardID === 'string' ? Number.parseInt(shard.shardID, 10) : shard.shardID;
      this.messenger.shardProviders.set(shardID, {
        current: shard.current !== undefined ? shard.current : false,
        shardID: shardID,
        http: shard.http,
        ws: shard.ws
      });
    }

    this.setMessenger(this.messenger);
  }
  /**@ignore*/
  ;

  _proto.setMessenger = function setMessenger(messenger) {
    this.blockchain.setMessenger(messenger);
    this.wallet.messenger = messenger;
    this.transactions.setMessenger(messenger);
  };

  return AvalancheExtension;
}();

/**
 * @packageDocumentation
 * @module avalanche-core
 * @hidden
 */
var UrlType;

(function (UrlType) {
  UrlType[UrlType["http"] = 0] = "http";
  UrlType[UrlType["ws"] = 1] = "ws";
})(UrlType || (UrlType = {}));

export { Avalanche, AvalancheExtension, Blockchain, ExtensionType, TruffleProvider, UrlType };
//# sourceMappingURL=avalanche-js-core.esm.js.map
