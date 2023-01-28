import { Currencies, Gateways, Transaction } from "./types";

abstract class BaseWallet {
    protected abstract readonly currency: Currencies;

    protected abstract readonly gateway: Gateways;

    protected abstract authenticate(): void;

    public transactions: Transaction[] = [];

    public showBalance(): void {
        this.transactions.reduce((acc: number, item: Transaction): number => {
            if (item.type === 'in') {
                return acc + item.amount;
            }

            return acc - item.amount;
        }, 0)
    }

    public sendMoney(amount): void {
        const transaction: Transaction = { amount, date: new Date(), type: 'out' };

        this.transactions.push(transaction);
        this.updateAPI(transaction);
    }

    public receiveMoney(amount): void {
        const transaction: Transaction = { amount, date: new Date(), type: 'in' };

        this.transactions.push(transaction);
        this.updateAPI(transaction);
    }

    private updateAPI(transaction): void | never {
        this.authenticate();
        API.Post(`http://${this.gateway}/transactions/${this.currency}`, { transaction });
    }
}

class USDWallet extends BaseWallet {
    currency: Currencies = 'usd'

    gateway: Gateways = 'visa';

    protected authenticate(): void {
        API.Post('https://bankofamerica.com/auth');
    }
}

class EURWallet extends BaseWallet {
    currency: Currencies = 'eur';
    gateway: Gateways = 'mastercard';

    protected authenticate(): void {
        API.Post('https://bankofeurope.com/auth');
    }
}

class BGPWallet extends BaseWallet {
    currency: Currencies = 'gbp';

    gateway: Gateways = 'mastercard';

    protected authenticate(): void {
        API.Post('https://britishbank.com/auth');
    }
}

const usdWallet = new USDWallet();

usdWallet.sendMoney(100);
usdWallet.receiveMoney(10);
