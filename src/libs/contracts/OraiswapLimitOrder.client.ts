/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {Addr, Uint128, Binary, AssetInfo, Decimal, OrderDirection, Cw20ReceiveMsg, Asset, OrderFilter} from "./types";
import {InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg, ContractInfoResponse, LastOrderIdResponse, OrderResponse, OrderBookResponse, OrderBookMatchableResponse, OrderBooksResponse, OrdersResponse, TickResponse, TicksResponse} from "./OraiswapLimitOrder.types";
export interface OraiswapLimitOrderReadOnlyInterface {
  contractAddress: string;
  contractInfo: () => Promise<ContractInfoResponse>;
  orderBook: ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }) => Promise<OrderBookResponse>;
  orderBooks: ({
    limit,
    orderBy,
    startAfter
  }: {
    limit?: number;
    orderBy?: number;
    startAfter?: number[];
  }) => Promise<OrderBooksResponse>;
  order: ({
    assetInfos,
    orderId
  }: {
    assetInfos: AssetInfo[];
    orderId: number;
  }) => Promise<OrderResponse>;
  orders: ({
    assetInfos,
    direction,
    filter,
    limit,
    orderBy,
    startAfter
  }: {
    assetInfos: AssetInfo[];
    direction?: OrderDirection;
    filter: OrderFilter;
    limit?: number;
    orderBy?: number;
    startAfter?: number;
  }) => Promise<OrdersResponse>;
  tick: ({
    assetInfos,
    direction,
    price
  }: {
    assetInfos: AssetInfo[];
    direction: OrderDirection;
    price: Decimal;
  }) => Promise<TickResponse>;
  ticks: ({
    assetInfos,
    direction,
    limit,
    orderBy,
    startAfter
  }: {
    assetInfos: AssetInfo[];
    direction: OrderDirection;
    limit?: number;
    orderBy?: number;
    startAfter?: Decimal;
  }) => Promise<TicksResponse>;
  lastOrderId: () => Promise<LastOrderIdResponse>;
  orderBookMatchable: ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }) => Promise<OrderBookMatchableResponse>;
}
export class OraiswapLimitOrderQueryClient implements OraiswapLimitOrderReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.contractInfo = this.contractInfo.bind(this);
    this.orderBook = this.orderBook.bind(this);
    this.orderBooks = this.orderBooks.bind(this);
    this.order = this.order.bind(this);
    this.orders = this.orders.bind(this);
    this.tick = this.tick.bind(this);
    this.ticks = this.ticks.bind(this);
    this.lastOrderId = this.lastOrderId.bind(this);
    this.orderBookMatchable = this.orderBookMatchable.bind(this);
  }

  contractInfo = async (): Promise<ContractInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      contract_info: {}
    });
  };
  orderBook = async ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }): Promise<OrderBookResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      order_book: {
        asset_infos: assetInfos
      }
    });
  };
  orderBooks = async ({
    limit,
    orderBy,
    startAfter
  }: {
    limit?: number;
    orderBy?: number;
    startAfter?: number[];
  }): Promise<OrderBooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      order_books: {
        limit,
        order_by: orderBy,
        start_after: startAfter
      }
    });
  };
  order = async ({
    assetInfos,
    orderId
  }: {
    assetInfos: AssetInfo[];
    orderId: number;
  }): Promise<OrderResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      order: {
        asset_infos: assetInfos,
        order_id: orderId
      }
    });
  };
  orders = async ({
    assetInfos,
    direction,
    filter,
    limit,
    orderBy,
    startAfter
  }: {
    assetInfos: AssetInfo[];
    direction?: OrderDirection;
    filter: OrderFilter;
    limit?: number;
    orderBy?: number;
    startAfter?: number;
  }): Promise<OrdersResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      orders: {
        asset_infos: assetInfos,
        direction,
        filter,
        limit,
        order_by: orderBy,
        start_after: startAfter
      }
    });
  };
  tick = async ({
    assetInfos,
    direction,
    price
  }: {
    assetInfos: AssetInfo[];
    direction: OrderDirection;
    price: Decimal;
  }): Promise<TickResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      tick: {
        asset_infos: assetInfos,
        direction,
        price
      }
    });
  };
  ticks = async ({
    assetInfos,
    direction,
    limit,
    orderBy,
    startAfter
  }: {
    assetInfos: AssetInfo[];
    direction: OrderDirection;
    limit?: number;
    orderBy?: number;
    startAfter?: Decimal;
  }): Promise<TicksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      ticks: {
        asset_infos: assetInfos,
        direction,
        limit,
        order_by: orderBy,
        start_after: startAfter
      }
    });
  };
  lastOrderId = async (): Promise<LastOrderIdResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      last_order_id: {}
    });
  };
  orderBookMatchable = async ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }): Promise<OrderBookMatchableResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      order_book_matchable: {
        asset_infos: assetInfos
      }
    });
  };
}
export interface OraiswapLimitOrderInterface extends OraiswapLimitOrderReadOnlyInterface {
  contractAddress: string;
  sender: string;
  receive: ({
    amount,
    msg,
    sender
  }: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  updateAdmin: ({
    admin
  }: {
    admin: Addr;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  createOrderBookPair: ({
    baseCoinInfo,
    minQuoteCoinAmount,
    quoteCoinInfo,
    spread
  }: {
    baseCoinInfo: AssetInfo;
    minQuoteCoinAmount: Uint128;
    quoteCoinInfo: AssetInfo;
    spread?: Decimal;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  submitOrder: ({
    assets,
    direction
  }: {
    assets: Asset[];
    direction: OrderDirection;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  cancelOrder: ({
    assetInfos,
    orderId
  }: {
    assetInfos: AssetInfo[];
    orderId: number;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  executeOrderBookPair: ({
    assetInfos,
    limit
  }: {
    assetInfos: AssetInfo[];
    limit?: number;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  removeOrderBookPair: ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
}
export class OraiswapLimitOrderClient extends OraiswapLimitOrderQueryClient implements OraiswapLimitOrderInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.receive = this.receive.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.createOrderBookPair = this.createOrderBookPair.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.executeOrderBookPair = this.executeOrderBookPair.bind(this);
    this.removeOrderBookPair = this.removeOrderBookPair.bind(this);
  }

  receive = async ({
    amount,
    msg,
    sender
  }: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      receive: {
        amount,
        msg,
        sender
      }
    }, $fee, $memo, $funds);
  };
  updateAdmin = async ({
    admin
  }: {
    admin: Addr;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_admin: {
        admin
      }
    }, $fee, $memo, $funds);
  };
  createOrderBookPair = async ({
    baseCoinInfo,
    minQuoteCoinAmount,
    quoteCoinInfo,
    spread
  }: {
    baseCoinInfo: AssetInfo;
    minQuoteCoinAmount: Uint128;
    quoteCoinInfo: AssetInfo;
    spread?: Decimal;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_order_book_pair: {
        base_coin_info: baseCoinInfo,
        min_quote_coin_amount: minQuoteCoinAmount,
        quote_coin_info: quoteCoinInfo,
        spread
      }
    }, $fee, $memo, $funds);
  };
  submitOrder = async ({
    assets,
    direction
  }: {
    assets: Asset[];
    direction: OrderDirection;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      submit_order: {
        assets,
        direction
      }
    }, $fee, $memo, $funds);
  };
  cancelOrder = async ({
    assetInfos,
    orderId
  }: {
    assetInfos: AssetInfo[];
    orderId: number;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      cancel_order: {
        asset_infos: assetInfos,
        order_id: orderId
      }
    }, $fee, $memo, $funds);
  };
  executeOrderBookPair = async ({
    assetInfos,
    limit
  }: {
    assetInfos: AssetInfo[];
    limit?: number;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_order_book_pair: {
        asset_infos: assetInfos,
        limit
      }
    }, $fee, $memo, $funds);
  };
  removeOrderBookPair = async ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_order_book_pair: {
        asset_infos: assetInfos
      }
    }, $fee, $memo, $funds);
  };
}