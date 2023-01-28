function wsCommunicationFactory(event, onEvent) {
    function subscribe() {
        WebsocketsService.subscribe(event, payload => {
            onEvent(payload);
        });
    }

    function unsubscribe() {
        WebsocketsService.unsubscribe(event);
    }

    return [subscribe, unsubscribe];
}

const [orderBookSubscribe, orderbookUnsubscribe] = wsCommunicationFactory(
    'orderbook',
    () => updateUI(),
);

