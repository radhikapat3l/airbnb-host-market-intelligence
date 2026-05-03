import '../styles/globals.css';

export default function App(props) {
  const Component = props.Component;
  const pageProps = props.pageProps;
  return <Component {...pageProps} />;
}
