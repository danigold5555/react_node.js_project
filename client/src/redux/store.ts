
import {createStore} from "redux";
import { reduce } from "./reducer";


export let store = createStore(reduce);