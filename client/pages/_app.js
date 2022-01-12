import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';


const AppComponent = ({ Component, pageProps, currentUser}) => {
  return <div>
    <Header currentUser={currentUser} />
    <div className='container'>
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  </div>
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log(appContext);
  // console.log(Object.keys(appContext));
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  // console.log(data);
  console.log(pageProps);

  return {
    pageProps,
    // currentUser: data.currentUser
    ...data
  };
};

export default AppComponent;

// export default function myClient({ Component, pageProps}) {
//   return <div>
//     <h1>HEADER!</h1>
//     <Component {...pageProps} />
//   </div>
// };

// export default ({ Component, pageProps}) => {
//   return <Component {...pageProps} />
// };