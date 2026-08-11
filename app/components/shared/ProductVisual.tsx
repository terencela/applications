"use client";

import React from "react";

export function ProductVisual({ type }: { type: string }) {
  if (type === "messages") {
    return (
      <div className="project-visual visual-messages" aria-hidden="true">
        <div className="phone-pair">
          <div className="mini-phone phone-back">
            <span className="phone-kicker">VIBE PROFILE</span>
            <b>How they communicate</b>
            <div className="score-row">
              <span>Directness</span>
              <i style={{ width: "78%" }} />
            </div>
            <div className="score-row">
              <span>Warmth</span>
              <i style={{ width: "62%" }} />
            </div>
            <div className="score-row">
              <span>Context</span>
              <i style={{ width: "88%" }} />
            </div>
          </div>
          <div className="mini-phone phone-front">
            <span className="phone-kicker">DECODER</span>
            <div className="chat received">&ldquo;Sure, we can do that.&rdquo;</div>
            <div className="decode-card">
              <small>What it likely means</small>
              <b>Agreement: with hesitation.</b>
              <p>Ask what would make the plan feel safer.</p>
            </div>
            <button type="button">Draft a response</button>
          </div>
        </div>
      </div>
    );
  }

  const visuals: Record<string, React.ReactNode> = {
    knowledge: (
      <>
        <div className="ui-top">
          <span>Project intelligence</span>
          <i />
        </div>
        <div className="node-map">
          <b>Project A12</b>
          <span>Decisions</span>
          <span>Experts</span>
          <span>Standards</span>
        </div>
        <div className="ui-answer">
          Why did we change the load assumption?
          <em>3 cited sources</em>
        </div>
      </>
    ),
    voice: (
      <>
        <div className="wave">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
            <i key={n} style={{ height: `${18 + (n % 5) * 9}px` }} />
          ))}
        </div>
        <b className="visual-title">Mum&apos;s story · 04:28</b>
        <p className="visual-copy">&ldquo;I never told you how we first arrived&hellip;&rdquo;</p>
      </>
    ),
    travel: (
      <>
        <div className="route-line">
          <i />
          <span>ZRH</span>
          <i />
          <span>HKG</span>
        </div>
        <b className="visual-title">Next: Gate E46</b>
        <p className="visual-copy">12 min walk · passport control ahead</p>
      </>
    ),
    rehearse: (
      <>
        <div className="avatar-ring">
          <span>AI</span>
        </div>
        <b className="visual-title">Procurement negotiation</b>
        <div className="feedback-pills">
          <span>Clarity 8.4</span>
          <span>Control 7.8</span>
        </div>
      </>
    ),
    privacy: (
      <>
        <div className="shield-mark">✓</div>
        <b className="visual-title">Context protected</b>
        <div className="privacy-list">
          <span>
            Identity hidden <i>On</i>
          </span>
          <span>
            Raw data stored <i>Off</i>
          </span>
        </div>
      </>
    ),
    gtm: (
      <>
        <div className="funnel">
          <span>Market</span>
          <span>Accounts</span>
          <span>Campaign</span>
        </div>
        <b className="visual-title">From signal to action</b>
      </>
    ),
    culture: (
      <>
        <div className="culture-chat">&ldquo;Let&apos;s consider it.&rdquo;</div>
        <div className="culture-meaning">
          <small>UNSPOKEN CONTEXT</small>
          <b>This may be a polite &ldquo;no.&rdquo;</b>
        </div>
      </>
    ),
    workbook: (
      <>
        <div className="book-lines">
          <i />
          <i />
          <i />
          <i />
        </div>
        <b className="visual-title">Insight → exercise → action</b>
      </>
    ),
    twin: (
      <>
        <div className="twin-orbits">
          <i>T</i>
          <i>AI</i>
        </div>
        <b className="visual-title">Your judgment, extended</b>
      </>
    ),
    web: (
      <>
        <div className="xp-window">
          <b>Welcome, Terence.</b>
          <p>Choose your interface</p>
          <span>Classic</span>
          <span>XP</span>
          <span>AI</span>
        </div>
      </>
    ),
  };

  return <div className={`project-visual visual-${type}`}>{visuals[type]}</div>;
}
