import { Provider } from "react-redux";
import AppRoutes from "./AppRoutes";
import { store } from "./redux/store";

function App() {
    return (<>
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    </>);
}

export default App;