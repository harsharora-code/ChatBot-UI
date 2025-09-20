import { Switch, Route } from "wouter";
import { queryClient } from "./components/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import {ChatApp} from "./components/ChatApp";
import NotFound from "./components/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ChatApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark">
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;