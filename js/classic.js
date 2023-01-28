class BaseWallet {
    transactions = [];

    _currency = null;

    _gateway = null;

    showBalance() {
        this.transactions.reduce((acc, item) => {
            if (item.type === 'in') {
                return acc + item.amount;
            }

            return acc - item.amount;
        }, 0)
    }

    sendMoney(amount) {
        const transaction = { amount, date: new Date(), type: 'out' };

        this.transactions.push(transaction);
        this._updateAPI(transaction);
    }

    receiveMoney(amount) {
        const transaction = { amount, date: new Date(), type: 'in' };

        this.transactions.push(transaction);
        this._updateAPI(transaction);
    }

    _authenticate() {
        new Error('Implement me!');
    }

    _updateAPI(transaction) {
        if (!this._currency || !this._gateway) {
            throw new Error('Incorrect usage of Base class!');
        }

        this._authenticate();
        API.Post(`http://${this._gateway}/transactions/${this._currency}`, { transaction });
    }
}

class USDWallet extends BaseWallet {
    _currency = 'usd';

    _gateway = 'visa';

    _authenticate() {
        API.Post('https://bankofamerica.com/auth');
    }
}

class EURWallet extends BaseWallet {
    _currency = 'eur';
    _gateway = 'mastercard';

    _authenticate() {
        API.Patch('https://bankofeurope.com/auth');
    }
}

class BGPWallet extends BaseWallet {
    _currency = 'gbp';

    _gateway = 'mastercard';

    _authenticate() {
        API.Put('https://britishbank.com/auth');
    }
}

const usdWallet = new USDWallet();

usdWallet.sendMoney(100);
usdWallet.receiveMoney(10);
