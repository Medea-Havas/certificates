import '../styles/globals.css';
import '../styles/mui-override.css';
import Layout from '../components/Layout/index';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
