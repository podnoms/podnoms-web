export function podcastsReducer(state: any = [], {type, payload}) {
    switch (type) {
        case 'ADD_ITEMS':
            return payload;
        case 'CREATE_ITEM':
            return [...state, payload];
        case 'UPDATE_ITEM':
            return state.map(item => {
                return item.id == payload.id ? Object.assign({}, item, payload) : item;
            });
        case 'DELETE_ITEM':
            return state.filter(item => {
                return item.id != payload.id;
            });
        case 'GET_ITEM':
            return state.filter(item => {
                return item.slug == payload;
            })[0];
        default:
            return state;
    }
}
