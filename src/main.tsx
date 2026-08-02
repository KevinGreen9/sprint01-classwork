import { createRoot } from 'react-dom/client'
import './index.css'
import {AppWithReducer} from "./AppWithReducer.tsx";

createRoot(document.getElementById('root')!).render(<AppWithReducer />)
