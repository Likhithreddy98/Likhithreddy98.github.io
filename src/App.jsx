import "@/App.css";
import HeroSection from "@/components/HeroSection";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <div className="grain-overlay" />
      <HeroSection />
    </div>
  );
}

export default App;
