import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MapsProvider from "./components/Map/MapContext/MapsProvider";
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout />
      </QueryClientProvider>{" "}
    </MapsProvider>
  );
}

export default App;
