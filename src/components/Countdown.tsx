"use client";

import { useEffect, useMemo, useState } from "react";

const RELEASE_ISO_BRT = "2026-11-19T00:00:00-03:00"; // data de lançamento oficial BRT 19.11.26

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function calcDiff(targetMs: number) {
  const now = Date.now();
  const diff = Math.max(0, targetMs - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { diff, days, hours, minutes, seconds };
}

export default function Countdown() {
  const targetMs = useMemo(() => new Date(RELEASE_ISO_BRT).getTime(), []);

  // evita mismatch: SSR e primeiro render do client ficam idênticos
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(() => ({
    diff: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }));

  useEffect(() => {
    setMounted(true);

    const tick = () => setT(calcDiff(targetMs));
    tick(); // calcula imediatamente após montar (já no client)

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <section className="countdownBar" aria-label="Contagem regressiva">
      <div className="countdownBarInner">
        <p className="countdownTitle">GRAND THEFT AUTO VI LANÇAMENTO EM</p>

        <div className="countdownRow" role="timer" aria-live="polite">
          <div className="countdownBlock">
            <div className="countdownValue">{t.days}</div>
            <div className="countdownLabel">DIAS</div>
          </div>

          <div className="countdownColon" aria-hidden="true">
            :
          </div>

          <div className="countdownBlock">
            <div className="countdownValue">{pad2(t.hours)}</div>
            <div className="countdownLabel">HORAS</div>
          </div>

          <div className="countdownColon" aria-hidden="true">
            :
          </div>

          <div className="countdownBlock">
            <div className="countdownValue">{pad2(t.minutes)}</div>
            <div className="countdownLabel">MINUTOS</div>
          </div>

          <div className="countdownColon" aria-hidden="true">
            :
          </div>

          <div className="countdownBlock">
            <div className="countdownValue">{pad2(t.seconds)}</div>
            <div className="countdownLabel">SEGUNDOS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
