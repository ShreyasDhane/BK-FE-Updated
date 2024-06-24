import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
