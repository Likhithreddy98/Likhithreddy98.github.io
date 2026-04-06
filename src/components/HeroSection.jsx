import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ARROW_IMG = "https://customer-assets.emergentagent.com/job_aec67119-10a2-4c7b-810c-10612115169a/artifacts/tuueatrq_WhatsApp%20Image%202026-04-06%20at%2011.47.53%20PM.jpeg";
const CAR_IMG = "https://static.prod-images.emergentagent.com/jobs/aec67119-10a2-4c7b-810c-10612115169a/images/70de0c7aef1cbbabd09b2de40b44790ba9631d4c407f343fc8388d802be26b66.png";

const HEADLINE_WORDS = [
  { text: "WELCOME", spaced: true },
  { text: "ITZFIZZ", spaced: true },
];

const REVEAL_WORDS = ["SPEED", "POWER", "LUXURY", "PRECISION", "ELEGANCE"];

const METRICS = [
  { value: "58%", label: "Lorem ipsum dolor sit amet" },
  { value: "23%", label: "Lorem ipsum dolor sit amet" },
  { value: "27%", label: "Lorem ipsum dolor sit amet" },
  { value: "40%", label: "Lorem ipsum dolor sit amet" },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const arrowRef = useRef(null);
  const carRef = useRef(null);
  const lettersRef = useRef([]);
  const metricsRef = useRef([]);
  const revealWordsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const metricsRowRef = useRef(null);

  let letterIndex = 0;

  const setLetterRef = useCallback((el, i) => {
    lettersRef.current[i] = el;
  }, []);

  const setMetricRef = useCallback((el, i) => {
    metricsRef.current[i] = el;
  }, []);

  const setWordRef = useCallback((el, i) => {
    revealWordsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vw = container.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power2.out" }
      );

      gsap.set(lettersRef.current.filter(Boolean), { opacity: 0 });
      gsap.set(revealWordsRef.current.filter(Boolean), { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2000",
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        arrowRef.current,
        { left: "0px" },
        { left: () => `${container.offsetWidth}px`, duration: 1, ease: "none" },
        0
      );


      tl.fromTo(
        carRef.current,
        { opacity: 0, left: "-300px", xPercent: -50, yPercent: -50 },
        { opacity: 0.85, left: "50%", xPercent: -50, yPercent: -50, duration: 1, ease: "none" },
        0
      );


      const validLetters = lettersRef.current.filter(Boolean);
      const count = validLetters.length;
      validLetters.forEach((letter, i) => {
        const progressStart = (i / count) * 0.75;
        tl.to(
          letter,
          {
            opacity: 1,
            duration: 0.03,
            ease: "power1.out",
            onUpdate: function () {
              if (this.progress() > 0.5) {
                letter.classList.add("revealed");
              } else {
                letter.classList.remove("revealed");
              }
            },
            onReverseComplete: function () {
              letter.classList.remove("revealed");
            },
          },
          progressStart
        );
      });

      const validWords = revealWordsRef.current.filter(Boolean);
      validWords.forEach((word, i) => {
        const progressStart = 0.1 + (i * 0.65) / validWords.length;
        tl.fromTo(
          word,
          { opacity: 0, x: -15, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.05, ease: "power2.out" },
          progressStart
        );
      });

      const validMetrics = metricsRef.current.filter(Boolean);
      validMetrics.forEach((card, i) => {
        const at = 0.78 + i * 0.05;
        tl.fromTo(
          card,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power3.out" },
          at
        );
      });

      tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.03 }, 0);
    }, container);

    return () => ctx.revert();
  }, []);

  letterIndex = 0;
  const headlineElements = HEADLINE_WORDS.map((word, wi) => {
    const chars = word.text.split("").map((char) => {
      const idx = letterIndex++;
      return (
        <span
          key={idx}
          ref={(el) => setLetterRef(el, idx)}
          className="headline-letter"
          style={word.spaced ? {} : { letterSpacing: "0.08em" }}
          data-testid={`headline-letter-${idx}`}
        >
          {char}
        </span>
      );
    });

    return (
      <span key={wi} className="inline-block">
        {chars}
        {wi < HEADLINE_WORDS.length - 1 && (
          <span className="inline-block" style={{ width: "0.6em" }} />
        )}
      </span>
    );
  });

  return (
    <>
      <div
        ref={containerRef}
        className="hero-container"
        data-testid="pinned-section"
      >

        <div
          className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full"
          data-testid="main-headline"
        >
          <h1 className="text-[5vw] sm:text-[4vw] md:text-5xl lg:text-6xl xl:text-7xl flex flex-wrap justify-center items-center">
            {headlineElements}
          </h1>
        </div>


        <div
          className="absolute top-[38%] left-0 w-full z-10 flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-14 px-4"
          data-testid="reveal-words-container"
        >
          {REVEAL_WORDS.map((word, i) => (
            <span
              key={word}
              ref={(el) => setWordRef(el, i)}
              className="text-xs sm:text-sm lg:text-base font-semibold tracking-[0.2em] uppercase opacity-0"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              data-testid={`reveal-word-${i}`}
            >
              {word}
            </span>
          ))}
        </div>


        <div className="arrow-track" data-testid="arrow-track">
          <img
            ref={arrowRef}
            src={ARROW_IMG}
            alt="Fire Arrow"
            className="fire-arrow"
            style={{ left: "0px" }}
            data-testid="fire-arrow"
          />
        </div>


        <img
          ref={carRef}
          src={CAR_IMG}
          alt="McLaren 720S"
          className="car-image"
          style={{ top: "58%", left: "-300px" }}
          data-testid="mclaren-car"
        />


        <div
          ref={metricsRowRef}
          className="absolute bottom-[2%] md:bottom-[6%] left-0 w-full z-20 flex flex-wrap justify-center gap-2 sm:gap-6 lg:gap-8 px-2 md:px-4"
          data-testid="metrics-row"
        >
          {METRICS.map((metric, i) => (
            <div
              key={i}
              ref={(el) => setMetricRef(el, i)}
              className="metric-card"
              data-testid={`impact-metric-${i}`}
            >
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>


        <div
          ref={scrollIndicatorRef}
          className="scroll-indicator"
          data-testid="scroll-indicator"
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>


      <div className="after-section" data-testid="after-section">
        <div className="text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#71717A" }}
          >
            Scroll back up to reverse the animation
          </p>
        </div>
      </div>
    </>
  );
}
