import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import { registerRootComponent } from 'expo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    background2: "#e9f7f3",
    text: "black",
    primary: "green",
  },
  elevation: 3,
}

const queryClient = new QueryClient();

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </PaperProvider>
  );
}

registerRootComponent(Main);