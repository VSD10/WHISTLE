import React, { useState, useEffect, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════
   WHISTLE — 3D HEX TILE DISSOLVE TRANSITION
   
   The screen is covered by an 8×15 grid of tiles.
   Each tile has a dark face with a circuit-glyph + code.
   On load: tiles cascade flip away (rotateX -90°) in a 
   diagonal wave from top-left → bottom-right, like a 
   3D mosaic/curtain folding back.
   
   When all tiles are gone → white snap flash → page visible.
   ═══════════════════════════════════════════════════════════════ */

const ROWS = 8;
const COLS = 15;
const MS_PER_STEP = 28;      // stagger delay per diagonal step
const FLIP_DURATION = 280;   // ms each individual tile takes to flip
const HOLD_AFTER = 120;      // ms after last tile before content shows

const GLYPHS = ['◈', '◉', '⬡', '⬢', '◈', '⬦', '▸', '◆', '▪', '◇'];
const CODES = ['V', 'E', 'R', 'I', 'F', 'Y', '0', '1', 'X', 'S'];

// Pre-compute tile specs so they don't recompute on render
interface TileSpec {
    row: number;
    col: number;
    diagonal: number;
    delayMs: number;
    glyph: string;
    code: string;
    // color swatch per tile: mostly neon-green tones, some magenta
    fgColor: string;
    bgColor: string;
}

function buildTiles(): TileSpec[] {
    const tiles: TileSpec[] = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const diag = r + c;
            const seed = r * COLS + c;
            const isMagenta = seed % 7 === 0;
            const isBright = seed % 11 === 0;
            tiles.push({
                row: r,
                col: c,
                diagonal: diag,
                delayMs: diag * MS_PER_STEP,
                glyph: GLYPHS[seed % GLYPHS.length],
                code: `${CODES[seed % CODES.length]}${String(seed % 99).padStart(2, '0')}`,
                fgColor: isMagenta ? '#ff00ff' : isBright ? '#ffffff' : '#39ff14',
                bgColor: isMagenta ? 'rgba(255,0,255,0.05)' : 'rgba(57,255,20,0.04)',
            });
        }
    }
    return tiles;
}

const TILES = buildTiles();
const MAX_DIAGONAL = (ROWS - 1) + (COLS - 1);
const TOTAL_ANIM_MS = MAX_DIAGONAL * MS_PER_STEP + FLIP_DURATION + HOLD_AFTER;

interface PageTransitionProps {
    children: React.ReactNode;
    label?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, label = 'LOADING' }) => {
    const [flipping, setFlipping] = useState(false);
    const [overlayDone, setOverlayDone] = useState(false);
    const [flash, setFlash] = useState(false);
    const [contentIn, setContentIn] = useState(false);

    useEffect(() => {
        // Tiny delay so DOM is painted, then kick off flips
        const startTimer = setTimeout(() => setFlipping(true), 40);

        // Flash at the end of all tiles
        const flashTimer = setTimeout(() => {
            setFlash(true);
            setTimeout(() => setFlash(false), 100);
        }, TOTAL_ANIM_MS - HOLD_AFTER);

        // Remove overlay + show content
        const doneTimer = setTimeout(() => {
            setOverlayDone(true);
            setTimeout(() => setContentIn(true), 30);
        }, TOTAL_ANIM_MS);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(flashTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    return (
        <>
            {/* ── TILE OVERLAY ── */}
            {!overlayDone && (
                <div className="fixed inset-0 z-[998] overflow-hidden pointer-events-none"
                    style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
                >
                    {/* White flash */}
                    <div
                        className="absolute inset-0 z-20 transition-opacity duration-75"
                        style={{ backgroundColor: '#39ff14', opacity: flash ? 0.7 : 0 }}
                    />

                    {/* Grid of tiles */}
                    {TILES.map(tile => (
                        <div
                            key={`${tile.row}-${tile.col}`}
                            className="absolute"
                            style={{
                                width: `${100 / COLS}%`,
                                height: `${100 / ROWS}%`,
                                left: `${(tile.col / COLS) * 100}%`,
                                top: `${(tile.row / ROWS) * 100}%`,
                                // The 3D scene
                                perspective: '600px',
                                perspectiveOrigin: '50% 50%',
                            }}
                        >
                            {/* The flipping card */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    transformStyle: 'preserve-3d',
                                    transformOrigin: '50% 0%',
                                    transform: flipping
                                        ? 'rotateX(-100deg) scaleZ(0.5)'
                                        : 'rotateX(0deg) scaleZ(1)',
                                    transition: flipping
                                        ? `transform ${FLIP_DURATION}ms cubic-bezier(0.4, 0, 0.8, 0.6) ${tile.delayMs}ms,
                                           opacity   ${FLIP_DURATION * 0.6}ms ease      ${tile.delayMs + FLIP_DURATION * 0.4}ms`
                                        : 'none',
                                    opacity: flipping ? 0 : 1,
                                }}
                            >
                                {/* Tile face */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        backgroundColor: '#0a0a0a',
                                        background: `radial-gradient(circle at 50% 50%, ${tile.bgColor}, #050505)`,
                                        border: `1px solid ${tile.fgColor}18`,
                                        backfaceVisibility: 'hidden',
                                        boxShadow: `inset 0 0 12px ${tile.fgColor}08`,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Corner glyph */}
                                    <div
                                        className="absolute top-0.5 left-1 font-mono leading-none select-none"
                                        style={{ fontSize: '6px', color: tile.fgColor, opacity: 0.4 }}
                                    >
                                        {tile.glyph}
                                    </div>

                                    {/* Corner code */}
                                    <div
                                        className="absolute bottom-0.5 right-1 font-mono leading-none select-none"
                                        style={{ fontSize: '5px', color: tile.fgColor, opacity: 0.3, letterSpacing: '0.1em' }}
                                    >
                                        {tile.code}
                                    </div>

                                    {/* Center micro dot */}
                                    <div
                                        className="rounded-full"
                                        style={{
                                            width: '3px', height: '3px',
                                            backgroundColor: tile.fgColor,
                                            boxShadow: `0 0 6px ${tile.fgColor}`,
                                            opacity: 0.6,
                                        }}
                                    />

                                    {/* Diagonal circuit lines */}
                                    <div className="absolute inset-0 opacity-[0.06]" style={{
                                        backgroundImage: `linear-gradient(45deg, ${tile.fgColor} 1px, transparent 1px),
                                                           linear-gradient(-45deg, ${tile.fgColor} 1px, transparent 1px)`,
                                        backgroundSize: '8px 8px',
                                    }} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Center status readout (visible through gaps as tiles flip) */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="text-center select-none">
                            <div className="font-header font-black text-4xl tracking-widest text-neon-green opacity-30" style={{ textShadow: '0 0 30px #39ff14' }}>
                                WHISTLE
                            </div>
                            <div className="font-mono text-[8px] text-white/20 tracking-[0.5em] mt-1">
                                {label}
                            </div>
                        </div>
                    </div>

                    {/* Bottom label */}
                    <div className="absolute bottom-4 left-0 right-0 text-center z-20 font-mono text-[8px] text-neon-green/20 tracking-[0.4em] select-none pointer-events-none">
                        WHISTLE_OS // MOUNTING_{label}
                    </div>
                </div>
            )}

            {/* ── PAGE CONTENT ── */}
            <div
                style={{
                    opacity: contentIn ? 1 : 0,
                    transform: contentIn ? 'none' : 'translateY(8px)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
            >
                {children}
            </div>
        </>
    );
};

export default PageTransition;
