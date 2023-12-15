import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {thunk} from "redux-thunk";
import {forbiddenWordsMiddleware} from "./redux/middleware";
import createSagaMiddleware from "redux-saga";
import {sagaWatcher} from "./redux/sagas";

const saga = createSagaMiddleware()

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk, saga, forbiddenWordsMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        )
)

saga.run(sagaWatcher)

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
