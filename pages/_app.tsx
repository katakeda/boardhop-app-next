import React from 'react';
import type { AppPropsWithLayout } from '../types/common';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default App;