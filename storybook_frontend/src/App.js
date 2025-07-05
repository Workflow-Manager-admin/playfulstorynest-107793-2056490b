import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Fonts - import via <link> here for Fallback; also see index.html/main in prod.
const FONT_URL = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&family=Fredoka:wght@600&family=Comic+Neue:wght@700&display=swap";
const BALOO_FONT_FAMILY = "'Baloo 2', 'Fredoka', 'Comic Neue', 'Comic Sans MS', cursive, sans-serif";

/**
 * Pastel & Vibrant Colors (Palette)
 */
const COLORS = {
  yellow: '#FFD600',
  blue: '#87E9FF',
  pink: '#FF8DAC',
  purple: '#B197FC',
  accent: '#FF6F61',
  board: '#FFFEEB',
  nav: '#FFF8CC',
  progress: '#FFC55C',
  green: '#A6F3A6',
  white: '#FFFFFF',
  bubble: '#FFFFFF',
  text: '#314259',
  buttonText: '#fff',
  toast: '#8773fa',
};

/**
 * Demo, hardcoded Story Data
 */
const STORY = [
  {
    id: 0,
    title: "Welcome to Jellybean Jungle",
    text: "Once upon a time in the Jellybean Jungle, all the animals loved to play! Today, Bouncy the Bunny wants to show you around.",
    character: {
      name: "Bouncy Bunny",
      type: "bunny",
      color: COLORS.accent,
    },
    art: "bunny"
  },
  {
    id: 1,
    title: "Bouncy’s Special Trick",
    text: "Bouncy can hop higher than any bunny in Jellybean Jungle! Tap Bouncy to see him bounce and wave hello!",
    character: {
      name: "Bouncy Bunny",
      type: "bunny",
      color: COLORS.accent,
    },
    art: "bunny"
  },
  {
    id: 2,
    title: "Through the Lollipop Field",
    text: "The next day, Bouncy brought you to the rainbow lollipop fields. Tap Bouncy along the path and see what happens!",
    character: {
      name: "Bouncy Bunny",
      type: "bunny",
      color: COLORS.accent,
    },
    art: "bunny"
  },
  {
    id: 3,
    title: "The End",
    text: "Thanks for exploring Jellybean Jungle with us. Come back anytime for more adventures. Bye-bye from Bouncy!",
    character: {
      name: "Bouncy Bunny",
      type: "bunny",
      color: COLORS.accent,
    },
    art: "bunny"
  }
];

const SUPABASE_URL = "https://krgthvlsqcyehlczelp.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGd0aHZsc3FjeWVobGN6ZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzI1MDUsImV4cCI6MjA2NzMwODUwNX0.mRUUpm7VsJs089dm3jL-fN8_o-cTT5KH2JKsxL1x4r4";
const SUPABASE_TABLE = "user_progress"; 

/**
 * Playful Bunny SVG Component (Animated)
 */
function AnimatedBunny({ onClick, animation, mood }) {
  const headBounce = animation === "bounce" ? "bunny-head-bounce" : "";
  const wave = animation === "wave" ? "bunny-wave-arm" : "";
  const spin = animation === "spin" ? "bunny-spin" : "";
  const shake = animation === "shake" ? "bunny-shake" : "";
  // Mood determines expression
  let eyeY = mood === "happy" ? 75 : (mood === "wink" ? 77 : 75);
  return (
    <div
      aria-label="Bouncy Bunny Character"
      className={`bunny-character-outer`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', margin: "0 auto", userSelect: "none"
      }}
      onClick={onClick}
      data-testid="bunny-character"
    >
      <svg width="124" height="144" viewBox="0 0 124 144">
        {/* Ears */}
        <ellipse cx="34" cy="35" rx="15" ry="42" fill={COLORS.blue} stroke={COLORS.yellow} strokeWidth="6"/>
        <ellipse cx="90" cy="35" rx="15" ry="42" fill={COLORS.blue} stroke={COLORS.yellow} strokeWidth="6"/>
        {/* Head */}
        <ellipse
          cx="62"
          cy="76"
          rx="45"
          ry="44"
          fill={COLORS.yellow}
          stroke={COLORS.pink}
          strokeWidth="7"
          className={headBounce + " " + spin + " " + shake}
        />
        {/* Eyes */}
        <ellipse cx="46" cy={eyeY} rx="7" ry="10" fill="#343"/>
        <ellipse cx="78" cy="75" rx="7" ry="10" fill="#343"/>
        {/* Nose */}
        <ellipse cx="62" cy="91" rx="8" ry="5.6" fill={COLORS.pink}/>
        {/* Smile */}
        <path d="M51,103 Q62,116 73,103" stroke="#444" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="62" cy="132" rx="28" ry="14" fill={COLORS.blue} stroke={COLORS.yellow} strokeWidth="3"/>
        {/* Arm */}
        <rect
          x="93" y="112" rx="12" ry="10" width="16" height="18"
          fill={COLORS.yellow}
          stroke={COLORS.pink} strokeWidth="3"
          className={wave}
          style={{ transformOrigin: "104px 121px" }}
        />
      </svg>
      <div className="character-label" style={{
        fontFamily: BALOO_FONT_FAMILY,
        color: COLORS.accent,
        fontWeight: 'bold',
        fontSize: '1.17em',
        letterSpacing: ".04em",
        marginTop: '-2.5px'
      }}>
        Bouncy Bunny
      </div>
    </div>
  );
}

/**
 * Floating Home Button
 */
function FloatingHome({ onClick }) {
  return (
    <button
      aria-label="Go Home"
      className="floating-home-btn"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translate(-50%,0) scale(1.06)',
        background: COLORS.purple,
        color: COLORS.white,
        border: 'none',
        borderRadius: 50,
        boxShadow: '0 2px 14px #9c79eb45',
        width: 70, height: 70,
        zIndex: 98,
        fontSize: '2.3em',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background .24s, box-shadow .18s'
      }}
    >
      <span role="img" aria-label="Home" style={{fontSize: "1.52em"}}>🏠</span>
    </button>
  )
}

/**
 * Page-style Story Card with Speech Bubble
 */
function StoryCard({ story, onCharClick, anim, pageNum, numPages }) {
  return (
    <article
      className="story-card"
      style={{
        background: COLORS.board,
        margin: '0 auto',
        borderRadius: 28,
        boxShadow: '0 10px 36px rgba(219,184,255,0.13), 0 2px 1.5px #ffd2e7aa',
        maxWidth: 430,
        minHeight: 300,
        padding: '1.55em 1.2em 2.5em 1.2em',
        fontFamily: BALOO_FONT_FAMILY,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeInCard 0.42s cubic-bezier(.24,1.6,.58,1.1)',
        touchAction: 'pan-y pan-x'
      }}
    >
      <div className="story-title" style={{
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: COLORS.pink,
        letterSpacing: '.01em',
        margin: '0 0 0.5em 0',
        textShadow: '1px 2px 0 #fff6',
        fontFamily: BALOO_FONT_FAMILY,
      }}>{story.title}</div>
      <SpeechBubble text={story.text} />
      <div style={{ margin: '1.1em 0 0.16em 0', minHeight: 124}}>
        <AnimatedBunny
          onClick={onCharClick}
          animation={anim}
          mood="happy"
        />
      </div>
      {/* Progress chip */}
      <div
        className="story-progress-chip"
        aria-label="Progress"
        style={{
          fontFamily: BALOO_FONT_FAMILY,
          position: 'absolute', left: 20, bottom: 17,
          fontSize: '1.07em',
          color: COLORS.purple, opacity: 0.93,
          background: COLORS.yellow,
          borderRadius: 12, padding: '3px 13px', boxShadow: '0 1.5px 8px #ffe47766', fontWeight: 700
        }}>
        {pageNum + 1} / {numPages}
      </div>
    </article>
  )
}

function SpeechBubble({ text }) {
  // Render text inside a playful SVG bubble
  return (
    <div className="speech-bubble-outer" style={{
      width: '98%', margin: '0 auto 0.23em auto', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <svg viewBox="0 0 340 93" width="97%" height="70" style={{filter: "drop-shadow(0 3px 16px #eee2)"}}>
        <ellipse
          cx="170" cy="46" rx="161" ry="41"
          fill={COLORS.bubble} stroke={COLORS.purple} strokeWidth="4"
        />
        <polygon points="180,87 183,92 191,82" fill={COLORS.bubble} stroke={COLORS.purple} strokeWidth="2"/>
      </svg>
      <div style={{
        position: 'absolute',
        marginTop: '-3.7em',
        width: '81%',
        textAlign: 'center',
        fontFamily: BALOO_FONT_FAMILY,
        fontSize: "1.05em",
        color: "#3B2965" 
      }}>
        {text}
      </div>
    </div>
  );
}

/**
 * Toast / Check feedback (bottom)
 */
function Toast({ show, msg, check }) {
  return (
    <div className="story-toast" style={{
      opacity: show ? 1 : 0, transition: 'opacity 0.25s, bottom 0.28s cubic-bezier(.6,2,.4,1.2)',
      pointerEvents: 'none',
      position: 'fixed',
      left: '50%',
      bottom: show ? 32 : -42,
      transform: 'translate(-50%,0)',
      color: COLORS.white,
      borderRadius: 28,
      background: COLORS.toast,
      minWidth: show ? 120 : 0,
      padding: show ? '13px 26px' : '0 0',
      fontSize: '1.13em',
      fontWeight: 'bold',
      fontFamily: BALOO_FONT_FAMILY,
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      gap: '0.8em',
      boxShadow: '0 2px 14px #9c79eb45',
      letterSpacing: ".01em"
    }}>
      {check && <span style={{fontSize: '1.15em'}}>✅</span>}
      {msg}
    </div>
  );
}

/**
 * Visual Progress tracker - Horizontal
 */
function ProgressBar({ progress, numPages }) {
  // progress = 0-based page index
  const pct = ((progress+1)/numPages)*100;
  return (
    <div
      className="progress-bar"
      style={{
        width: '84vw', maxWidth: 372, margin: '0.7em auto 0 auto',
        height: 9,
        borderRadius: 8,
        background: COLORS.white,
        boxShadow: '0 2px 12px #ffe47724',
        position: 'relative',
        overflow: 'hidden'
      }}>
      <div
        className="progress-bar-inner"
        style={{
          width: `${pct}%`,
          height: 9,
          background: `linear-gradient(90deg, ${COLORS.progress} 50%, ${COLORS.blue} 90%)`,
          borderRadius: 8,
          transition: "width 0.38s cubic-bezier(.38,1.7,.44,.9)"
        }}
      />
    </div>
  );
}

/**
 * Swipe Navigation for Mobile/Touch
 */
function useSwipeNavigation(onPrev, onNext, enable) {
  // Attaches global touch handlers if enabled
  const touchStartRef = useRef(null);
  useEffect(() => {
    if (!enable) return;

    function handleTouchStart(e) {
      if (e.touches.length === 1) touchStartRef.current = e.touches[0].clientX;
    }
    function handleTouchEnd(e) {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current;
      // Swipe right = prev, left = next
      if (dx > 55) onPrev && onPrev();
      else if (dx < -55) onNext && onNext();
      touchStartRef.current = null;
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onPrev, onNext, enable]);
}

/**
 * Navigation Bar
 */
function NavBar({ userId, onRestart }) {
  return (
    <nav
      className="storybook-navbar"
      style={{
        background: COLORS.nav,
        width: '100%',
        boxShadow: '0 2px 8px #FFE01245',
        padding: '0.45em 0.7em',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0 0 22px 22px',
        justifyContent: 'space-between',
        fontFamily: BALOO_FONT_FAMILY
      }}
      aria-label="Main Navigation"
    >
      <div className="storybook-logo" style={{
        display: 'flex', alignItems: 'center', gap: '0.7em'
      }}>
        <span style={{
          fontSize: '2.23em',
          color: COLORS.yellow,
          fontWeight: 'bold',
          fontFamily: BALOO_FONT_FAMILY
        }}>📚</span>
        <span
          style={{
            fontFamily: BALOO_FONT_FAMILY,
            fontSize: '1.19em',
            color: COLORS.pink,
            fontWeight: 700,
            letterSpacing: '.011em',
          }}
        >Playful StoryNest</span>
      </div>
      {userId &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.08em',
          fontFamily: BALOO_FONT_FAMILY
        }}>
          <span style={{
            fontSize: '1.01em',
            color: COLORS.blue
          }}>🧒 {userId}</span>
          <button
            style={{
              background: COLORS.pink,
              color: COLORS.buttonText,
              border: 'none',
              borderRadius: 14,
              padding: '7px 14px',
              fontWeight: 'bold',
              fontFamily: BALOO_FONT_FAMILY,
              fontSize: '1em',
              cursor: 'pointer',
              transition: 'background .10s'
            }}
            onClick={onRestart}
            aria-label="Restart reading"
          >⟲ Restart</button>
        </div>
      }
    </nav>
  );
}

/**
 * Animated, bubbly Start Button
 */
function AnimatedStartButton({ onClick, enabled, loading }) {
  return (
    <button
      onClick={onClick}
      className="story-btn start-btn-animated"
      type="button"
      aria-label="Start Reading"
      disabled={!enabled || loading}
      style={{
        background: enabled ? COLORS.yellow : COLORS.yellow + "99",
        color: COLORS.buttonText,
        fontWeight: 'bold',
        fontSize: '1.22em',
        fontFamily: BALOO_FONT_FAMILY,
        border: 'none',
        borderRadius: 22,
        boxShadow: `0 6px 24px ${COLORS.progress}33`,
        cursor: enabled && !loading ? 'pointer' : 'not-allowed',
        letterSpacing: '.01em',
        margin: '1.4em auto 0 auto',
        width: 210,
        height: 62,
        transition: 'transform .19s cubic-bezier(.31,2,.35,1.6),box-shadow .18s',
        position: 'relative'
      }}
      tabIndex={enabled ? 0 : -1}
    >
      <span style={{
        animation: enabled && !loading ? "startBtnPulse 1.35s infinite cubic-bezier(.32,2.1,.67,1.3)" : 'none',
        display: 'inline-block'
      }}>{loading ? "Loading..." : "Start Reading 👉"}</span>
    </button>
  );
}

/**
 * Big tap area navigation buttons with animation
 */
function StoryNavFooter({ page, numPages, onPrev, onNext }) {
  return (
    <footer
      className="story-footer"
      style={{
        width: '100%',
        margin: '1.7em auto 0 auto',
        paddingBottom: '1.5em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '2em'
      }}
    >
      <button
        className="story-btn nav-btn nav-btn-prev"
        style={{
          background: COLORS.purple,
          color: COLORS.white,
          border: 'none',
          borderRadius: 22,
          fontWeight: 'bold',
          fontFamily: BALOO_FONT_FAMILY,
          fontSize: '1.27em',
          boxShadow: `0 3px 12px ${COLORS.purple}32`,
          padding: '17px 36px',
          opacity: page === 0 ? 0.38 : 1,
          cursor: page === 0 ? 'not-allowed' : 'pointer',
          transform: page === 0 ? 'scale(.98)' : 'scale(1.07)',
          transition: 'opacity .13s, transform .12s'
        }}
        disabled={page === 0}
        onClick={onPrev}
        tabIndex={page === 0 ? -1 : 0}
      >← Prev</button>
      <button
        className="story-btn nav-btn nav-btn-next"
        style={{
          background: COLORS.pink,
          color: COLORS.white,
          border: 'none',
          borderRadius: 22,
          fontWeight: 'bold',
          fontFamily: BALOO_FONT_FAMILY,
          fontSize: '1.27em',
          boxShadow: `0 6px 22px ${COLORS.pink}22`,
          padding: '17px 36px',
          opacity: page === numPages - 1 ? 0.3 : 1,
          cursor: page === numPages - 1 ? 'not-allowed' : 'pointer',
          transform: page === numPages - 1 ? 'scale(.98)' : 'scale(1.07)',
          transition: 'opacity .13s, transform .12s'
        }}
        disabled={page === numPages - 1}
        onClick={onNext}
        tabIndex={page === numPages - 1 ? -1 : 0}
      >Next →</button>
    </footer>
  );
}

/**
 * Start Page with animated start button and welcome
 */
function StartPage({ onStart, loading, error }) {
  const [userId, setUserId] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (userId.trim()) onStart(userId.trim().toLowerCase());
  }
  return (
    <form onSubmit={handleSubmit} className="start-form"
      style={{
        maxWidth: 330,
        margin: '2.6em auto',
        padding: '2.5em 1.3em 2.7em 1.3em',
        background: COLORS.board,
        borderRadius: 38,
        boxShadow: '0 6px 32px #FFD60022, 0 0.5px 1.2px #dbe0ffad',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{margin: "0 0 0.2em 0"}}>
        <AnimatedBunny onClick={()=>{}} animation="" mood="happy"/>
      </div>
      <h2 style={{
        fontFamily: BALOO_FONT_FAMILY,
        color: COLORS.purple,
        marginBottom: '0.7em',
        marginTop: '0.5em',
        fontSize: '1.28em',
        fontWeight: 800
      }}>Start Your Story Adventure!</h2>
      <label
        htmlFor="user-id-entry"
        style={{
          fontFamily: BALOO_FONT_FAMILY,
          fontWeight: 'bold',
          color: COLORS.pink,
          fontSize: '1.11em',
          marginBottom: 11,
          letterSpacing: '.012em'
        }}>
        Enter your name or ID:
      </label>
      <input
        id="user-id-entry"
        type="text"
        required
        minLength={2}
        maxLength={18}
        inputMode="text"
        spellCheck={false}
        autoComplete={"off"}
        value={userId}
        autoFocus
        disabled={loading}
        aria-label="Enter user ID"
        onChange={e => setUserId(e.target.value.replace(/[^a-zA-Z0-9_ -]/g, ''))}
        className="input-userid"
        style={{
          border: `2.5px solid ${COLORS.progress}`,
          borderRadius: 15,
          padding: '13px 18px',
          fontSize: '1.1em',
          fontFamily: BALOO_FONT_FAMILY,
          background: COLORS.blue,
          color: COLORS.accent,
          outline: 'none',
          marginBottom: '1.20em',
          marginTop: 3,
          width: 210,
          transition: "box-shadow .12s"
        }}
      />
      <AnimatedStartButton onClick={handleSubmit} enabled={!!userId && !loading} loading={loading} />
      {error && (
        <div style={{
          color: '#d43545',
          fontFamily: BALOO_FONT_FAMILY,
          marginTop: 14,
          fontSize: '1.01em'
        }}>{error}</div>
      )}
    </form>
  );
}

/**
 * Supabase REST: Load user progress
 */
async function loadUserProgress(userId) {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?user_id=eq.${encodeURIComponent(userId)}`,
      {
        headers: {
          'apikey': SUPABASE_API_KEY,
          'Authorization': `Bearer ${SUPABASE_API_KEY}`,
          'Accept': 'application/json',
        }
      }
    );
    if (!resp.ok) return 0;
    const j = await resp.json();
    if (j && Array.isArray(j) && j.length > 0 && typeof j[0].last_page === 'number') {
      return j[0].last_page;
    }
  } catch (e) { }
  return 0;
}

/**
 * Supabase REST: Save user progress and return success status
 */
async function saveUserProgress(userId, lastPage) {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_API_KEY,
          'Authorization': `Bearer ${SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates', // upsert
        },
        body: JSON.stringify([{ user_id: userId, last_page: lastPage }])
      }
    );
    return resp.ok;
  } catch (e) { return false; }
}

/**
 * PUBLIC_INTERFACE - Root App Component
 */
export default function App() {
  // State
  const [userId, setUserId] = useState(null);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [anim, setAnim] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [toastCheck, setToastCheck] = useState(false);
  const [showHome, setShowHome] = useState(false);

  // On Start, load user progress if any
  async function handleStart(uid) {
    setLoading(true);
    setTimeout(async () => {
      const prog = await loadUserProgress(uid);
      setUserId(uid);
      setChapterIdx(prog < STORY.length ? prog : 0);
      setLoading(false);
      setShowHome(true);
      setToast(`Hi ${uid}, welcome!`);
      setToastCheck(true);
      setTimeout(() => { setToast(''); setToastCheck(false); }, 1250);
    }, 420);
  }

  // Save progress when chapter changes
  useEffect(() => {
    if (userId && typeof chapterIdx === 'number') {
      saveUserProgress(userId, chapterIdx).then((ok) => {
        if (ok) {
          setToast("Progress saved!");
          setToastCheck(true);
          setTimeout(() => { setToast(''); setToastCheck(false); }, 1200);
        }
      });
    }
  }, [chapterIdx, userId]);

  // Animation triggers on character click
  function triggerAnimation() {
    const anims = ['bounce', 'wave', 'spin', 'shake'];
    const next = anims[Math.floor(Math.random() * anims.length)];
    setAnim(next);
    setTimeout(() => setAnim(''), 950);
  }

  // Story navigation logic
  function nextPage() {
    setChapterIdx(idx => {
      if (idx < STORY.length - 1) return idx + 1;
      return idx;
    });
  }
  function prevPage() {
    setChapterIdx(idx => {
      if (idx > 0) return idx - 1;
      return idx;
    });
  }
  function restart() {
    setUserId(null);
    setChapterIdx(0);
    setToast('');
    setToastCheck(false);
    setShowHome(false);
    setLoading(false);
  }

  // Only enable swipe in story mode
  useSwipeNavigation(
    () => chapterIdx > 0 && prevPage(),
    () => chapterIdx < (STORY.length - 1) && nextPage(),
    !!userId
  );

  useEffect(() => {
    // Import playful fonts at runtime (robust on reload)
    let exists = document.getElementById('story-nest-fonts');
    if (!exists) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONT_URL;
      link.id = 'story-nest-fonts';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="App"
      style={{
        background: `linear-gradient(123deg, ${COLORS.blue} 0%, ${COLORS.white} 100%)`,
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        fontFamily: BALOO_FONT_FAMILY,
        transition: 'background .27s',
        overflowX: 'hidden'
      }}
    >
      <NavBar userId={userId} onRestart={restart} />
      <ProgressBar progress={chapterIdx} numPages={STORY.length} />
      <main style={{
        minHeight: '72vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        maxWidth: 510,
        padding: '0 0.7em'
      }}>
        {!userId ?
          <StartPage onStart={handleStart} loading={loading} error={''} />
          : (
            <>
              <div style={{ marginTop: '2.05em', marginBottom: 0, width: '100%' }}>
                <StoryCard
                  story={STORY[chapterIdx]}
                  anim={anim}
                  onCharClick={triggerAnimation}
                  pageNum={chapterIdx}
                  numPages={STORY.length}
                />
              </div>
              <StoryNavFooter
                page={chapterIdx}
                numPages={STORY.length}
                onPrev={prevPage}
                onNext={nextPage}
              />
              {showHome && <FloatingHome onClick={restart} />}
            </>
          )
        }
      </main>
      <footer style={{
        background: COLORS.yellow,
        color: '#774d00',
        fontFamily: BALOO_FONT_FAMILY,
        borderRadius: '20px 20px 0 0',
        padding: '0.75em 0',
        marginTop: 'auto',
        fontSize: '1.01em',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 -1px 8px #FFD60033'
      }}>
        © {new Date().getFullYear()} Playful StoryNest &mdash; Read. Laugh. Imagine!
      </footer>
      <Toast show={!!toast} msg={toast} check={toastCheck} />
    </div>
  );
}

/**
 * Animation CSS for Bunny & Buttons & Card Fade
 * Add bubble pop and playful transitions
 */
const styleTag = document.createElement("style");
styleTag.textContent = `
.bunny-head-bounce {
  animation: bunny-bounce .95s cubic-bezier(.38,1.7,.44,.93) 1;
}
@keyframes bunny-bounce {
  10% { transform: translateY(-18px) scale(1.12,0.94);}
  21% { transform: translateY(-34px) scale(1.20,0.81);}
  44% { transform: translateY(-12px) scale(1.07,1);}
  63% { transform: translateY(-5px);}
  90% { transform: scale(1,1);}
  100% { transform: none;}
}
.bunny-wave-arm {
  animation: bunny-wave .93s cubic-bezier(.46,1.8,.47,1.18) 1;
}
@keyframes bunny-wave {
  0% { transform: rotateZ(0deg);}
  22% { transform: rotateZ(13deg);}
  50% { transform: rotateZ(-18deg);}
  75% { transform: rotateZ(15deg);}
  100% { transform: rotateZ(0deg);}
}
.bunny-spin {
  animation: bunny-spin .83s cubic-bezier(.46,1.3,.44,1) 1;
}
@keyframes bunny-spin { 0%{ transform: rotateZ(0); } 75%{ transform: rotateZ(360deg);} 100%{ transform: rotateZ(0);} }
.bunny-shake {
  animation: bunny-shake .78s cubic-bezier(.38,1.1,.42,1.09) 1;
}
@keyframes bunny-shake {
  0%{ transform: translateX(0);}
  12%{ transform: translateX(-6px);}
  27%{ transform: translateX(10px);}
  46%{ transform: translateX(-10px);}
  62%{ transform: translateX(6px);}
  80%{ transform: translateX(-4px);}
  100%{ transform: translateX(0);}
}
@keyframes fadeInCard {
  0% { opacity: 0; transform: scale(0.97) translateY(17px);}
  100% { opacity: 1; transform: scale(1) translateY(0);}
}
@keyframes startBtnPulse {
  0% { box-shadow: 0 0 0 #fff0; transform: scale(1.0);}
  50% { box-shadow: 0 0 0 10px #ffd60099; transform: scale(1.05);}
  100% { box-shadow: 0 0 0 #fff0; transform: scale(1.0);}
}
.floating-home-btn {
  animation: floatButtonPopIn .52s cubic-bezier(.36,1.6,.32,1) 1;
}
@keyframes floatButtonPopIn {
  0% { transform: scale(0.2) translate(-50%,80px); opacity: 0;}
  90%{ transform: scale(1.11) translate(-50%,0); opacity: 1;}
  100%{ transform: scale(1.06) translate(-50%,0);}
}
.speech-bubble-outer { position: relative; }
@media (max-width: 530px) {
  .storybook-navbar { font-size: 0.94em; }
  .story-card { max-width: 98vw; border-radius: 17px;}
  .character-label { font-size: 1.1em!important;}
  .start-form { padding: 1.16em 0.22em 1.7em 0.22em; }
  .input-userid { font-size: 1em; min-width: 132px;}
  .story-btn, .nav-btn { padding: 1.1em 1.1em; font-size: 1.09em;}
  .floating-home-btn { width:56px; height: 56px; font-size: 2em;}
}
::-webkit-scrollbar { width: 0; height: 0;}
`;
document.head.appendChild(styleTag);
