import classNames from 'classnames';
import styles from './index.module.scss';
import TokenBalance from 'components/TokenBalance';
import { TokenItemType } from 'config/bridgeTokens';
import TransferConvertToken from '../TransferConvertToken';
import { TooltipIcon } from 'components/Tooltip';

interface TokenItemProps {
  token: TokenItemType;
  amountDetail?: AmountDetail;
  convertToken?: any;
  transferIBC?: any;
  name?: string;
  onClickTransfer?: any;
  active: Boolean;
  className?: string;
  onClick?: Function;
  onBlur?: Function;
  convertKwt?: any;
  subAmounts?: AmountDetails;
}

const TokenItem: React.FC<TokenItemProps> = ({
  token,
  amountDetail,
  active,
  className,
  onClick,
  convertToken,
  transferIBC,
  onClickTransfer,
  convertKwt,
  subAmounts
}) => {
  return (
    <div
      className={classNames(
        styles.tokenWrapper,
        { [styles.active]: active },
        className
      )}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(token);
      }}
    >
      <div className={styles.balanceAmountInfo}>
        <div className={styles.token}>
          {token.Icon && <token.Icon className={styles.tokenIcon} />}
          <div className={styles.tokenInfo}>
            <div className={styles.tokenName}>{token.name}</div>
            <div className={styles.tokenOrg}>
              <span className={styles.tokenOrgTxt}>
                {token.bridgeNetworkIdentifier
                  ? `${token.org} (${token.bridgeNetworkIdentifier})`
                  : token.org}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.tokenBalance}>
          <div className={styles.row}>
            <TokenBalance
              balance={{
                amount: amountDetail ? amountDetail?.amount : '0',
                denom: '',
                decimals: token.decimals
              }}
              className={styles.tokenAmount}
              decimalScale={Math.min(6, token.decimals)}
            />
            {subAmounts && Object.keys(subAmounts)?.length > 0 && (
              <TooltipIcon
                content={
                  <div className={styles.tooltipAmount}>
                    {Object.keys(subAmounts).map((name, idx) => {
                      let description: string;
                      if (name !== token.name)
                        description = token.erc20Cw20Map[0]?.description;

                      return (
                        <div key={idx} className={styles.row}>
                          <div>
                            <div>{name}</div>
                            {!!description && (
                              <div className={styles.description}>
                                ({description})
                              </div>
                            )}
                          </div>
                          <TokenBalance
                            balance={{
                              amount: subAmounts[name].amount,
                              denom: '',
                              decimals: token.decimals
                            }}
                            className={styles.tokenAmount}
                            decimalScale={Math.min(6, token.decimals)}
                          />
                        </div>
                      );
                    })}
                  </div>
                }
                placement="bottom-end"
              />
            )}
          </div>
          <TokenBalance
            balance={amountDetail?.usd || 0}
            className={styles.subLabel}
            decimalScale={2}
          />
        </div>
      </div>
      <div>
        {active && (
          <TransferConvertToken
            token={token}
            amountDetail={amountDetail}
            convertToken={convertToken}
            transferIBC={transferIBC}
            onClickTransfer={onClickTransfer}
            convertKwt={convertKwt}
          />
        )}

        {/* // TODO: {active && token.contractAddress && token.cosmosBased && (
          <ConvertToNative
            name={evmName}
            token={token}
            amountDetail={amountDetail}
            convertToken={convertToken}
          />
        )} */}
      </div>
    </div>
  );
};

export default TokenItem;
