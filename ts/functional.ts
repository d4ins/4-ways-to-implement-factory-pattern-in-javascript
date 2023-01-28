type Subscribe = () => void;

type Unsubscribe = () => void;

type Events = 'orderbook' | 'ticker';

type OnEvent = (payload: object) => void;

function wsCommunicationFactory(event: Events, onEvent: OnEvent): [Subscribe, Unsubscribe] {
    function subscribe(): void {
        WebsocketsService.subscribe(
            event,
            (payload: object): void => {
                onEvent(payload);
            }
        );
    }

    function unsubscribe(): void {
        WebsocketsService.unsubscribe(event);
    }

    return [subscribe, unsubscribe];
}

const [orderbookSubscribe, orderbookUnsubscribe] = wsCommunicationFactory(
    'orderbook',
    (payload: object) => updateOrderbookUI(payload),
);

const [tickerSubscribe, tickerUnsubscribe] = wsCommunicationFactory(
    'ticker',
    (payload: object) => updateTickerUI(payload),
);
