import '../styles/globals.css';
import '../styles/mui-override.css';
import '../styles/transition.css';
import { Transition } from '../utils/transition';
import Layout from '../components/Layout/index';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Transition>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Transition>
    </>
  );
}
