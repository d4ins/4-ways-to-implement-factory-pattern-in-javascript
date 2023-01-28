import { Transaction } from "./types";

interface BaseWallet {
    transactions: Transaction[];
    sendMoney: (amount: number) => void;
    receiveMoney: (amount: number) => void;
    updateAPI: (transaction: Transaction) => void;
}

class USDWallet implements BaseWallet {
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

    public updateAPI(transaction): void {
        API.Post('https://bankofamerica.com/auth');
        API.Post(`http://visa.com/transactions/usd`, { transaction });
    }
}

class EURWallet implements BaseWallet {
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
        const transaction: Transaction = { amount, date: new Date(), type: 'outcome' };

        this.transactions.push(transaction);
        this.updateAPI(transaction);
    }

    public receiveMoney(amount): void {
        const transaction: Transaction = { amount, date: new Date(), type: 'income' };

        this.transactions.push(transaction);
        this.updateAPI(transaction);
    }

    public updateAPI(transaction): void {
        API.Post(`http://visa.com/transactions/usd`, { tx: transaction });
    }
}

const usdWallet = new USDWallet();

usdWallet.sendMoney(100);
usdWallet.receiveMoney(10);
