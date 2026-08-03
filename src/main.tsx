import { createRoot } from 'react-dom/client'
import './index.css'
import {AppWithRedux} from "./AppWithRedux.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>

)
