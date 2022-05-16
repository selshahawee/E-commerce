import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { getTotal } from 'redux/reducers/app'
import { store } from 'redux/store'
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }: AppProps) {
 
  return (
    <Provider store={store}>
      <ToastContainer/>
        <Component {...pageProps} />
    
    </Provider>
  )
}

export default MyApp
