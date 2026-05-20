import React from "react";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TikTokMarquee from "@/components/TikTokMarquee";
import FeaturedGame from "@/components/FeaturedGame";
import GamesGrid from "@/components/GamesGrid";
import InstallSection from "@/components/InstallSection";
import Leaderboard from "@/components/Leaderboard";
import LiveSection from "@/components/LiveSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="App relative" data-testid="app-root">
      <Navbar />
      <main>
        <Hero />
        <TikTokMarquee />
        <FeaturedGame />
        <GamesGrid />
        <InstallSection />
        <Leaderboard />
        <LiveSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
