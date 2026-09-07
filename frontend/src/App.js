import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";

import Nav from "@/components/site/Nav";
import SideRail from "@/components/site/SideRail";
import Hero from "@/components/site/Hero";
import Initiative from "@/components/site/Initiative";
import ProfileSeat from "@/components/site/ProfileSeat";
import Framework from "@/components/site/Framework";
import Onboarding from "@/components/site/Onboarding";
import ApplyV2 from "@/components/site/ApplyV2";
import Closing from "@/components/site/Closing";
import TeamPage from "@/pages/TeamPage";

function Site() {
  const [applyMode, setApplyMode] = useState("director");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const goApply = useCallback((mode) => {
    setApplyMode(mode);
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 20);
  }, []);

  const onApply = useCallback(() => goApply("director"), [goApply]);
  const onEnquire = useCallback(() => goApply("company"), [goApply]);

  return (
    <div className="App bg-[#F7F5F0]">
      <Nav onApply={onApply} />
      <SideRail />
      <main>
        <Hero onApply={onApply} onEnquire={onEnquire} />
        <Initiative />
        <ProfileSeat />
        <Framework />
        <Onboarding onApply={onApply} onEnquire={onEnquire} />
        <ApplyV2 mode={applyMode} setMode={setApplyMode} />
        <Closing onApply={onApply} />
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#141214",
            color: "#F7F5F0",
            border: "1px solid rgba(168, 43, 82, 0.4)",
            borderRadius: 0,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Site />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/people" element={<TeamPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
