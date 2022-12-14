import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import type { PropsWithChildren } from "react";

import store from "@/redux/store";
import NextNProgress from "@/components/loader/NextNProgress";
import "react-toastify/dist/ReactToastify.css";

export default function Providerlayout({ children }: PropsWithChildren<{}>) {
  const queryClient: any = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 30,
      },
    },
  });

  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextNProgress color="#4e44c4" />
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <ToastContainer />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
