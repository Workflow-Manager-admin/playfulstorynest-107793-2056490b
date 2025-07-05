import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Colors/Style constants (also see App.css for variables)
 */
const COLORS = {
  primary: '#FFD600',
  secondary: '#87E9FF',
  accent: '#FF6F61',
  board: '#FFFEEB',
  nav: '#FFF8CC',
  buttonText: '#fff',
};

const FONT_FAMILY = "'Fredoka One', 'Comic Sans MS', 'Baloo 2', sans-serif";

/**
 * Demo, hardcoded Story Data
 * In production, this would come from backend API or a stories database.
 */
const STORY = [
  {
    id: 0,
    title: "Welcome to Jellybean Jungle",
    text: "Once upon a time in the Jellybean Jungle, all the animals loved to play! Today, Bouncy the Bunny wants to show you around. Will you join Bouncy on an adventure?",
    character: {
      name: "Bouncy the Bunny",
      type: "bunny",
      color: COLORS.accent,
    }
  },
  {
    id: 1,
    title: "Bouncy's Special Trick",
    text: "Bouncy can hop higher than any bunny in Jellybean Jungle! Tap Bouncy to make him bounce and wave hello!",
    character: {
      name: "Bouncy the Bunny",
      type: "bunny",
      color: COLORS.accent,
    }
  },
  {
    id: 2,
    title: "Through the Lollipop Field",
    text: "The next day, Bouncy brought you to the rainbow lollipop fields. Tap Bouncy along the path and see what happens!",
    character: {
      name: "Bouncy the Bunny",
      type: "bunny",
      color: COLORS.accent,
    }
  },
  {
    id: 3,
    title: "The End",
    text: "Thanks for exploring Jellybean Jungle with us. Come back anytime for more adventures. Bye-bye from Bouncy!",
    character: {
      name: "Bouncy the Bunny",
      type: "bunny",
      color: COLORS.accent,
    }
  },
];

/**
 * Supabase REST API details (user progress storage)
 * Table "user_progress" must exist with 'user_id' (text, pk), 'last_page' (int)
 */
const SUPABASE_URL = "https://krgthvlsqcyehlczelp.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGd0aHZsc3FjeWVobGN6ZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzI1MDUsImV4cCI6MjA2NzMwODUwNX0.mRUUpm7VsJs089dm3jL-fN8_o-cTT5KH2JKsxL1x4r4";
const SUPABASE_TABLE = "user_progress"; // requires { user_id: <text>, last_page: <int> }

////////////////////////////////////////////////
// Animated Character Component (Bunny Example)
////////////////////////////////////////////////
function AnimatedBunny({ onClick, animation, name }) {
  /**
   * Renders a playful bunny using SVG and applies CSS animation classes dynamically.
   * Bounces on click. Animate: bounce, wave, etc.
   */
  return (
    <div
      data-testid="bunny-character"
      className={`bunny-character animated ${animation}`}
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={onClick}
      title={name}
    >
      {/* SVG Bunny Face */}
      <svg width="120" height="140" viewBox="0 0 120 140">
        {/* Ears */}
        <ellipse cx="35" cy="30" rx="15" ry="40" fill={COLORS.secondary} stroke={COLORS.primary} strokeWidth="5"/>
        <ellipse cx="85" cy="30" rx="15" ry="40" fill={COLORS.secondary} stroke={COLORS.primary} strokeWidth="5"/>
        {/* Head */}
        <ellipse cx="60" cy="70" rx="42" ry="45" fill={COLORS.primary} stroke={COLORS.accent} strokeWidth="6"/>
        {/* Eyes */}
        <ellipse cx="45" cy="75" rx="6" ry="10" fill="#333"/>
        <ellipse cx="75" cy="75" rx="6" ry="10" fill="#333"/>
        {/* Nose */}
        <ellipse cx="60" cy="88" rx="7" ry="5" fill={COLORS.accent}/>
        {/* Smile */}
        <path d="M50,98 Q60,110 70,98" stroke="#444" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="60" cy="125" rx="24" ry="18" fill={COLORS.secondary} stroke={COLORS.primary} strokeWidth="3"/>
      </svg>
      <div className="character-label" style={{
        fontFamily: FONT_FAMILY,
        color: COLORS.accent,
        fontWeight: 'bold',
        fontSize: '1.1em',
        marginTop: '-2px'
      }}>{name}</div>
    </div>
  );
}

////////////////////////////////////////////////
// Story Page - shows story content & animated char
////////////////////////////////////////////////
function StoryPage({ story, onCharClick, anim, pageNum, numPages }) {
  return (
    <div
      className="story-viewport"
      style={{
        background: COLORS.board,
        margin: '0 auto',
        maxWidth: 430,
        minHeight: 280,
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(255,215,0,0.12)',
        padding: '1.2em 1.2em 2.7em 1.2em',
        fontFamily: FONT_FAMILY,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="story-title" style={{
        fontSize: '1.5em',
        fontWeight: 'bold',
        textShadow: '1px 2px 0 #fff6',
        margin: '0 0 0.6em 0',
        color: COLORS.accent
      }}>{story.title}</div>
      <div className="story-text" style={{
        fontSize: '1.17em',
        color: '#443',
        letterSpacing: '0.02em',
        textAlign: 'center',
        marginBottom: '1.3em',
      }}>
        {story.text}
      </div>
      <div className="story-character" style={{ margin: '0.4em 0 0.3em 0' }}>
        <AnimatedBunny
          name={story.character.name}
          onClick={onCharClick}
          animation={anim}
        />
      </div>
      <div className="story-pagination" style={{
        fontFamily: FONT_FAMILY,
        position: 'absolute',
        right: 20,
        bottom: 16,
        fontSize: '1em',
        color: COLORS.accent,
        opacity: 0.6
      }}>
        {pageNum + 1} / {numPages}
      </div>
    </div>
  );
}

////////////////////////////////////////////////
// Navigation Bar component
////////////////////////////////////////////////
function NavBar({ userId, onRestart }) {
  return (
    <nav
      className="storybook-navbar"
      style={{
        background: COLORS.nav,
        width: '100%',
        boxShadow: '0 2px 8px #FFE01250',
        padding: '0.5em 0.7em',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0 0 18px 18px',
        justifyContent: 'space-between'
      }}
      aria-label="Main Navigation"
    >
      <div className="storybook-logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.7em'
      }}>
        <span style={{
          fontSize: '2em',
          color: COLORS.primary,
          fontWeight: 'bold',
          fontFamily: FONT_FAMILY
        }}>📚</span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: '1.2em',
            color: COLORS.accent,
            fontWeight: 700,
            letterSpacing: '0.01em',
          }}
        >Playful StoryNest</span>
      </div>
      {userId &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          fontFamily: FONT_FAMILY
        }}>
          <span style={{
            fontSize: '1em',
            color: COLORS.secondary
          }}>🧒 {userId}</span>
          <button
            style={{
              background: COLORS.accent,
              color: COLORS.buttonText,
              border: 'none',
              borderRadius: 12,
              padding: '6px 10px',
              fontWeight: 'bold',
              fontFamily: FONT_FAMILY,
              fontSize: '0.9em',
              cursor: 'pointer',
              transition: 'background .13s'
            }}
            onClick={onRestart}
            aria-label="Restart reading"
          >⟲ Restart</button>
        </div>
      }
    </nav>
  );
}

////////////////////////////////////////////////
// Start Page (User ID Entry)
////////////////////////////////////////////////
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
        margin: '2em auto',
        padding: '2em 1.3em 2.4em 1.3em',
        background: COLORS.board,
        borderRadius: 28,
        boxShadow: '0 4px 28px #FFD60022',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2 style={{
        fontFamily: FONT_FAMILY,
        color: COLORS.accent,
        marginBottom: '0.7em',
        marginTop: '0.1em',
        fontSize: '1.24em'
      }}>Start Your Story Adventure!</h2>
      <label
        htmlFor="user-id-entry"
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 'bold',
          color: COLORS.primary,
          fontSize: '1.07em',
          marginBottom: 7,
          letterSpacing: '0.01em'
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
        autoComplete="off"
        value={userId}
        autoFocus
        disabled={loading}
        aria-label="Enter user ID"
        onChange={e => setUserId(e.target.value.replace(/[^a-zA-Z0-9_ -]/g, ''))}
        className="input-userid"
        style={{
          border: `2.5px solid ${COLORS.primary}`,
          borderRadius: 14,
          padding: '10px 14px',
          fontSize: '1em',
          fontFamily: FONT_FAMILY,
          marginBottom: '1.28em',
          background: COLORS.secondary,
          color: COLORS.accent,
          outline: 'none',
        }}
      />
      <button
        className="story-btn"
        type="submit"
        disabled={!userId || loading}
        style={{
          background: COLORS.primary,
          color: COLORS.buttonText,
          fontWeight: 'bold',
          padding: '12px 36px',
          fontSize: '1.13em',
          fontFamily: FONT_FAMILY,
          border: 'none',
          borderRadius: 18,
          boxShadow: `0 4px 16px ${COLORS.primary}55`,
          cursor: 'pointer',
          letterSpacing: '0.02em',
          marginTop: '.15em'
        }}
      >{loading ? "Loading..." : "Start Reading"}</button>
      {error && (
        <div style={{
          color: '#f44336',
          fontFamily: FONT_FAMILY,
          marginTop: 9,
          fontSize: '1em'
        }}>{error}</div>
      )}
    </form>
  );
}

////////////////////////////////////////////////
// Footer Navigation (Next/Prev, progress)
////////////////////////////////////////////////
function StoryNavFooter({ page, numPages, onPrev, onNext }) {
  return (
    <footer
      className="story-footer"
      style={{
        width: '100%',
        margin: '1.4em auto 0 auto',
        paddingBottom: '2em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '2em'
      }}
    >
      <button
        className="story-btn"
        style={{
          background: COLORS.secondary,
          color: COLORS.accent,
          border: 'none',
          borderRadius: 18,
          fontWeight: 'bold',
          fontFamily: FONT_FAMILY,
          fontSize: '1.1em',
          boxShadow: `0 4px 12px ${COLORS.secondary}55`,
          padding: '13px 28px',
          opacity: page === 0 ? 0.45 : 1,
          cursor: page === 0 ? 'not-allowed' : 'pointer',
          transition: 'opacity .13s'
        }}
        disabled={page === 0}
        onClick={onPrev}
      >← Prev</button>
      <button
        className="story-btn"
        style={{
          background: COLORS.accent,
          color: COLORS.buttonText,
          border: 'none',
          borderRadius: 18,
          fontWeight: 'bold',
          fontFamily: FONT_FAMILY,
          fontSize: '1.1em',
          boxShadow: `0 4px 12px ${COLORS.accent}33`,
          padding: '13px 28px',
          opacity: page === numPages - 1 ? 0.48 : 1,
          cursor: page === numPages - 1 ? 'not-allowed' : 'pointer',
          transition: 'opacity .13s'
        }}
        disabled={page === numPages - 1}
        onClick={onNext}
      >Next →</button>
    </footer>
  );
}

////////////////////////////////////////////////
// Supabase REST: Load user progress
////////////////////////////////////////////////
async function loadUserProgress(userId) {
  // Returns last_page index (number) or 0 if not found.
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
  } catch (e) { /* Ignore; fallback */ }
  return 0;
}

////////////////////////////////////////////////
// Supabase REST: Save user progress
////////////////////////////////////////////////
async function saveUserProgress(userId, lastPage) {
  // Upsert progress for the userId
  try {
    await fetch(
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
  } catch (e) { /* Ignore errors on save */ }
}

/**
 * Root App Component
 */
// PUBLIC_INTERFACE
export default function App() {
  // State
  const [userId, setUserId] = useState(null);       // The entered user_id/name
  const [chapterIdx, setChapterIdx] = useState(0);  // Page index user is reading
  const [anim, setAnim] = useState('');             // Animation class for character
  const [loading, setLoading] = useState(false);    // For loading progress on Start
  const [error, setError] = useState('');

  // On Start, load user progress if any
  async function handleStart(uid) {
    setLoading(true);
    setError('');
    setTimeout(async () => {
      const prog = await loadUserProgress(uid);
      setUserId(uid);
      setChapterIdx(prog < STORY.length ? prog : 0);
      setLoading(false);
    }, 420); // playful delay for UX
  }

  // Save progress whenever userId or chapterIdx changes (but not if not started yet)
  useEffect(() => {
    if (userId && typeof chapterIdx === 'number') {
      saveUserProgress(userId, chapterIdx);
    }
  }, [userId, chapterIdx]);

  // Animation triggers on character click
  function triggerAnimation() {
    // Pick random animation: 'bounce', 'wave', etc.
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
    setError('');
    setLoading(false);
  }

  return (
    <div className="App"
      style={{
        background: COLORS.secondary,
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        fontFamily: FONT_FAMILY,
        transition: 'background .27s',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Baloo+2:wght@600&display=swap"
        rel="stylesheet"
      />
      <NavBar userId={userId} onRestart={restart} />
      <main style={{
        minHeight: '72vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        maxWidth: 540,
        padding: '0 0.7em'
      }}>
        {!userId ?
          <StartPage onStart={handleStart} loading={loading} error={error} />
          : (
            <>
              <div style={{ marginTop: '1.6em', marginBottom: 0 }}>
                <StoryPage
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
            </>
          )
        }
      </main>
      <footer style={{
        background: COLORS.primary,
        color: '#774d00',
        fontFamily: FONT_FAMILY,
        borderRadius: '16px 16px 0 0',
        padding: '0.5em 0',
        marginTop: 'auto',
        fontSize: '0.92em',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 -1px 8px #FFD60033'
      }}>
        © {new Date().getFullYear()} Playful StoryNest &mdash; Read. Laugh. Imagine!
      </footer>
    </div>
  );
}

/**
 * Animation CSS - inject into global style (for simplicity; would be in App.css in prod)
 */
const styleTag = document.createElement("style");
styleTag.textContent = `
.bunny-character.animated { transition: transform 0.32s cubic-bezier(.4,.9,.55,1.3); }
.bunny-character.bounce { animation: bunny-bounce .9s cubic-bezier(.4,1.8,.7,1) 1; }
@keyframes bunny-bounce {
  10% { transform: translateY(-16px) scale(1.09,0.93);}
  18% { transform: translateY(-32px) scale(1.17,0.83);}
  32% { transform: translateY(-12px) scale(1.07,1);}
  45% { transform: translateY(-3px);}
  62% { transform: scale(1,1);}
  100% { transform: none;}
}
.bunny-character.wave { animation: bunny-wave .85s cubic-bezier(.4,1.8,.7,1) 1;}
@keyframes bunny-wave {
  0% { transform: rotateZ(0deg);}
  25% { transform: rotateZ(12deg);}
  50% { transform: rotateZ(-15deg);}
  75% { transform: rotateZ(13deg);}
  100% { transform: rotateZ(0deg);}
}
.bunny-character.spin { animation: bunny-spin .9s cubic-bezier(.4,1.8,.7,1) 1;}
@keyframes bunny-spin { 0%{ transform: rotateZ(0); } 80%{ transform: rotateZ(420deg);} 100%{ transform: rotateZ(0);} }
.bunny-character.shake { animation: bunny-shake .73s cubic-bezier(.32,.9,.5,1) 1;}
@keyframes bunny-shake {
  0%{ transform: translateX(0);}
  20%{ transform: translateX(-5px);}
  25%{ transform: translateX(7px);}
  40%{ transform: translateX(-7px);}
  60%{ transform: translateX(4px);}
  80%{ transform: translateX(-4px);}
  100%{ transform: translateX(0);}
}
@media (max-width: 550px) {
  .storybook-navbar { font-size: .93em; }
  .story-viewport { max-width: 96vw; border-radius: 17px;}
  .start-form { padding: 1.2em 0.5em 2em 0.5em; font-size: 1em;}
  .input-userid { font-size: 1em; min-width: 145px;}
  .story-btn {padding: 0.8em 1.8em; font-size: 1em;}
}
`;
document.head.appendChild(styleTag);
