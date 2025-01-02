import { Header, Footer } from "./components";
import { AuthProvider } from "./context/AuthProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <div className="App font-serif">
        <Header />
        <div className="min-h-screen bg-background pt-20">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
