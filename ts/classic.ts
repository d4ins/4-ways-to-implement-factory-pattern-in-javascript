import { Currencies, Gateways, Transaction } from "./types";

class BaseWallet {
    public transactions: Transaction[] = [];

    protected readonly currency: Currencies;

    protected readonly gateway: Gateways;

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

    protected authenticate(): void | never {
        new Error('Implement me!');
    }

    private updateAPI(transaction): void | never {
        if (!this.currency || !this.gateway) {
            throw new Error('Incorrect usage of Base class!');
        }

        API.Post(`http://${this.gateway}/transactions/${this.currency}`, { transaction });
    }
}

class USDWallet extends BaseWallet {
    protected readonly currency: Currencies = 'usd'
    protected  readonly gateway: Gateways = 'visa';

    protected authenticate(): void {
        API.Post('https://bankofamerica.com/auth');
    }
}

class EURWallet extends BaseWallet {
    protected readonly currency: Currencies = 'eur';
    protected readonly gateway: Gateways = 'mastercard';

    protected authenticate(): void {
        API.Post('https://bankofeurope.com/auth');
    }
}

class BGPWallet extends BaseWallet {
    protected readonly currency: Currencies = 'gbp';
    protected readonly gateway: Gateways = 'mastercard';

    protected authenticate(): void {
        API.Post('https://britishbank.com/auth');
    }
}

const usdWallet = new USDWallet();

usdWallet.sendMoney(100);
usdWallet.receiveMoney(10);
