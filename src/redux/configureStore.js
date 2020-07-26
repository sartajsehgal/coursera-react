import { createStore, combineReducers } from 'redux';
import { Dishes } from './reducer';
import { Comments } from './reducer';
import { Promotions } from './reducer';
import { Leaders } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}