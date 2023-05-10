/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.26.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import {Addr, Decimal, Uint128, OracleTreasuryQuery, OracleExchangeQuery, OracleContractQuery, ExchangeRateItem, Coin} from "./types";
import {InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg, ContractInfoResponse, ExchangeRateResponse, ExchangeRatesResponse, TaxCapResponse, TaxRateResponse} from "./OraiswapOracle.types";
export interface OraiswapOracleReadOnlyInterface {
  contractAddress: string;
  taxRate: () => Promise<TaxRateResponse>;
  taxCap: ({
    denom
  }: {
    denom: string;
  }) => Promise<TaxCapResponse>;
  exchangeRate: ({
    baseDenom,
    quoteDenom
  }: {
    baseDenom?: string;
    quoteDenom: string;
  }) => Promise<ExchangeRateResponse>;
  exchangeRates: ({
    baseDenom,
    quoteDenoms
  }: {
    baseDenom?: string;
    quoteDenoms: string[];
  }) => Promise<ExchangeRatesResponse>;
  contractInfo: () => Promise<ContractInfoResponse>;
  rewardPool: ({
    denom
  }: {
    denom: string;
  }) => Promise<Coin>;
}
export class OraiswapOracleQueryClient implements OraiswapOracleReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.taxRate = this.taxRate.bind(this);
    this.taxCap = this.taxCap.bind(this);
    this.exchangeRate = this.exchangeRate.bind(this);
    this.exchangeRates = this.exchangeRates.bind(this);
    this.contractInfo = this.contractInfo.bind(this);
    this.rewardPool = this.rewardPool.bind(this);
  }

  taxRate = async (): Promise<TaxRateResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      tax_rate: {}
    });
  };
  taxCap = async ({
    denom
  }: {
    denom: string;
  }): Promise<TaxCapResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      tax_cap: {
        denom
      }
    });
  };
  exchangeRate = async ({
    baseDenom,
    quoteDenom
  }: {
    baseDenom?: string;
    quoteDenom: string;
  }): Promise<ExchangeRateResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      exchange_rate: {
        base_denom: baseDenom,
        quote_denom: quoteDenom
      }
    });
  };
  exchangeRates = async ({
    baseDenom,
    quoteDenoms
  }: {
    baseDenom?: string;
    quoteDenoms: string[];
  }): Promise<ExchangeRatesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      exchange_rates: {
        base_denom: baseDenom,
        quote_denoms: quoteDenoms
      }
    });
  };
  contractInfo = async (): Promise<ContractInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      contract_info: {}
    });
  };
  rewardPool = async ({
    denom
  }: {
    denom: string;
  }): Promise<Coin> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reward_pool: {
        denom
      }
    });
  };
}
export interface OraiswapOracleInterface extends OraiswapOracleReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateAdmin: ({
    admin
  }: {
    admin: Addr;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  updateExchangeRate: ({
    denom,
    exchangeRate
  }: {
    denom: string;
    exchangeRate: Decimal;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  deleteExchangeRate: ({
    denom
  }: {
    denom: string;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  updateTaxCap: ({
    cap,
    denom
  }: {
    cap: Uint128;
    denom: string;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
  updateTaxRate: ({
    rate
  }: {
    rate: Decimal;
  }, $fee?: number | StdFee | "auto", $memo?: string, $funds?: Coin[]) => Promise<ExecuteResult>;
}
export class OraiswapOracleClient extends OraiswapOracleQueryClient implements OraiswapOracleInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateAdmin = this.updateAdmin.bind(this);
    this.updateExchangeRate = this.updateExchangeRate.bind(this);
    this.deleteExchangeRate = this.deleteExchangeRate.bind(this);
    this.updateTaxCap = this.updateTaxCap.bind(this);
    this.updateTaxRate = this.updateTaxRate.bind(this);
  }

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
  updateExchangeRate = async ({
    denom,
    exchangeRate
  }: {
    denom: string;
    exchangeRate: Decimal;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_exchange_rate: {
        denom,
        exchange_rate: exchangeRate
      }
    }, $fee, $memo, $funds);
  };
  deleteExchangeRate = async ({
    denom
  }: {
    denom: string;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      delete_exchange_rate: {
        denom
      }
    }, $fee, $memo, $funds);
  };
  updateTaxCap = async ({
    cap,
    denom
  }: {
    cap: Uint128;
    denom: string;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_tax_cap: {
        cap,
        denom
      }
    }, $fee, $memo, $funds);
  };
  updateTaxRate = async ({
    rate
  }: {
    rate: Decimal;
  }, $fee: number | StdFee | "auto" = "auto", $memo?: string, $funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_tax_rate: {
        rate
      }
    }, $fee, $memo, $funds);
  };
}