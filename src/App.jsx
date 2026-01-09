import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MapsProvider from "./components/Context/MapContext/MapsProvider";
import LeftBarProvider from "./components/Context/LeftBarContext/LeftBarProvider";
import RightBarProvider from "./components/Context/RightBarContext/RightBarProvider";
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
      <RightBarProvider>
        <LeftBarProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Layout />
          </QueryClientProvider>{" "}
        </LeftBarProvider>
      </RightBarProvider>
    </MapsProvider>
  );
}

export default App;
