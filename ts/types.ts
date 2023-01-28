export type Currencies = 'usd' | 'eur' | 'gbp';

export type Gateways = 'visa' | 'mastercard';

export type Types = 'in' | 'out';

export interface Transaction {
    amount: number;
    date: Date;
    type: Types;
}
