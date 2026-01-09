import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MapsProvider from "./components/Context/MapContext/MapsProvider";
import LeftBarProvider from "./components/Context/LeftBarContext/LeftBarProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100000,
    },
  },
});
function App() {
  return (
    <MapsProvider>
      <LeftBarProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Layout />
        </QueryClientProvider>{" "}
      </LeftBarProvider>
    </MapsProvider>
  );
}

export default App;
