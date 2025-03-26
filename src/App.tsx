import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; 
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 bg-gradient-to-r from-teal-600 to-purple-700 p-4">
              <AnimatedRoutes />
            </div>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;