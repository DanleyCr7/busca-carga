import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Privacidade from "./pages/privacidade";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/empresas"} component={Home} />
      <Route path={"/motoristas"} component={Home} />
      <Route path={"/transportadoras"} component={Home} />
      <Route path={"/seguranca-pagamentos"} component={Home} />
      <Route path={"/tipos-de-carga"} component={Home} />
      <Route path={"/regioes"} component={Home} />
      <Route path={"/app"} component={Home} />
      <Route path={"/painel-empresas"} component={Home} />
      <Route path={"/conteudos"} component={Home} />
      <Route path={"/faq"} component={Home} />
      <Route path={"/contato"} component={Home} />
      <Route path={"/privacidade"} component={Privacidade} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
