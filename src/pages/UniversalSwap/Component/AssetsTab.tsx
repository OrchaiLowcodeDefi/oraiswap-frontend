import WalletIcon from 'assets/icons/wallet-v3.svg';
import StakeIcon from 'assets/icons/stake.svg';
import styles from './AssetsTab.module.scss';
import cn from 'classnames/bind';
import { TableHeaderProps, Table } from 'components/Table';
import { AssetInfoResponse } from 'types/swap';
import { useCoinGeckoPrices } from 'hooks/useCoingecko';
import { getTotalUsd, getUsd, toSumDisplay, toTotalDisplay } from 'libs/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configure';
import { TokenItemType, getSubAmountDetails, toAmount } from '@oraichain/oraidex-common';
import React from 'react';
import { tokens } from 'config/bridgeTokens';
import { isSupportedNoPoolSwapEvm } from '@oraichain/oraidex-universal-swap';

const cx = cn.bind(styles);

export const AssetsTab: React.FC<{}> = () => {
  const { data: prices } = useCoinGeckoPrices();
  const amounts = useSelector((state: RootState) => state.token.amounts);
  const totalUsd = getTotalUsd(amounts, prices);
  const [[otherChainTokens, oraichainTokens], setTokens] = React.useState<TokenItemType[][]>(tokens);
  console.log({ otherChainTokens, oraichainTokens });

  const data = [...oraichainTokens, ...otherChainTokens]
    .filter((token) => {
      // not display because it is evm map and no bridge to option, also no smart contract and is ibc native
      if (!token.bridgeTo && !token.contractAddress) return false;
      // if (hideOtherSmallAmount && !toTotalDisplay(amounts, token)) {
      //   return false;
      // }
      if (isSupportedNoPoolSwapEvm(token.coinGeckoId)) return false;
      return true;
    })
    // .sort((a, b) => {
    //   return toTotalDisplay(amounts, b) * prices[b.coinGeckoId] - toTotalDisplay(amounts, a) * prices[a.coinGeckoId];
    // })
    .map((t: TokenItemType) => {
      let amount = BigInt(amounts[t.denom] ?? 0);
      let usd = getUsd(amount, t, prices);
      let subAmounts: AmountDetails;
      if (t.contractAddress && t.evmDenoms) {
        subAmounts = getSubAmountDetails(amounts, t);
        const subAmount = toAmount(toSumDisplay(subAmounts), t.decimals);
        amount += subAmount;
        usd += getUsd(subAmount, t, prices);
      }

      return {
        asset: t.name,
        chain: t.org,
        icon: t.Icon,
        iconLight: t?.IconLight,
        price: prices[t.coinGeckoId],
        balance: amount,
        denom: t.denom,
        value: 0,
        coeff: 0,
        coeffType: 'increase'
      };
    });

  const headers: TableHeaderProps<AssetInfoResponse> = {
    assets: {
      name: 'ASSET',
      accessor: (data) => (
        <div className={styles.assets}>
          <div className={styles.left}>{data.icon && <data.icon className={styles.tokenIcon} />}</div>
          <div className={styles.right}>
            <div className={styles.assetName}>{data.asset}</div>
            <div className={styles.assetChain}>{data.chain}</div>
          </div>
        </div>
      ),
      width: '22%',
      align: 'center'
    },
    price: {
      name: 'PRICE',
      width: '22%',
      accessor: (data) => (
        <span style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 50 }}>${data.price}</span>
      ),
      align: 'center'
    },
    balance: {
      name: 'BALANCE',
      width: '22%',
      align: 'center',
      accessor: (data) => <span>${data.balance}</span>
    },
    value: {
      name: 'VALUE',
      width: '22%',
      align: 'center',
      accessor: (data) => {
        const checkCoeffType = data.coeffType === 'increase';
        const coeffTypeValue = checkCoeffType ? '+' : '-';
        return (
          <div className={styles.valuesColumn}>
            <div className={styles.values}>
              <div className={styles.value}>${data.value}</div>
              <div
                style={{
                  color: checkCoeffType ? '#00AD26' : '#E01600'
                }}
                className={styles.coeff}
              >
                {coeffTypeValue}
                {data.coeff}%
              </div>
            </div>
          </div>
        );
      }
    },
    filter: {
      name: 'FILTER',
      width: '12%',
      align: 'center',
      accessor: () => <span></span>
    }
  };

  return (
    <div className={cx('assetsTab')}>
      <div className={cx('info')}>
        {[
          {
            src: WalletIcon,
            label: 'Total balance',
            balance: totalUsd.toFixed(6)
          },
          {
            src: StakeIcon,
            label: 'Total staked',
            balance: '0'
          }
        ].map((e, i) => {
          return (
            <div key={i} className={cx('total-info')}>
              <div className={cx('icon')}>
                <img className={cx('wallet')} src={e.src} alt="wallet" />
              </div>
              <div className={cx('balance')}>
                <div className={cx('label')}>{e.label}</div>
                <div className={cx('value')}>${e.balance}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Table
          headers={headers}
          // @ts-ignore
          data={data}
          stylesColumn={{
            padding: '16px 0'
          }}
        />
      </div>
    </div>
  );
};
