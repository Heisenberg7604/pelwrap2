import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Maximize2 } from 'lucide-react';
import { events, eventsHero } from '../data/events';

const Events = ({ isDark }) => {
    const reduceMotion = useReducedMotion();
    // lightbox = { photos, index, title } | null
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = (event, index) =>
        setLightbox({ photos: event.photos, index, title: event.title });

    const closeLightbox = useCallback(() => setLightbox(null), []);

    const step = useCallback((direction) => {
        setLightbox((current) => {
            if (!current) return current;
            const total = current.photos.length;
            return { ...current, index: (current.index + direction + total) % total };
        });
    }, []);

    // Keyboard control + scroll lock while the viewer is open
    useEffect(() => {
        if (!lightbox) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [lightbox, closeLightbox, step]);

    const activePhoto = lightbox ? lightbox.photos[lightbox.index] : null;
    const rule = isDark ? 'border-white/10' : 'border-gray-200';
    const muted = isDark ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className={`font-body ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* ============================ HERO ============================ */}
            <section className="relative min-h-[78vh] sm:min-h-[85vh] flex items-end overflow-hidden">
                <motion.img
                    src={eventsHero.src}
                    alt={eventsHero.alt}
                    initial={reduceMotion ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Two-axis scrim: keeps the type on the left readable over a busy stall shot */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/85" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

                <div className="relative w-full container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-32">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-red-400 mb-4 sm:mb-6">
                            Patkar Extrusions · On the floor
                        </p>

                        <h1 className="font-display font-semibold uppercase text-white leading-[0.86] tracking-[-0.015em] text-[clamp(2.5rem,8.5vw,7rem)]">
                            Events &amp; Exhibitions
                        </h1>

                        <div className="mt-5 sm:mt-7 h-[3px] w-20 sm:w-28 bg-red-600" />

                        <p className="mt-5 sm:mt-7 max-w-xl text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
                            Every year we take the product range off the line and onto the floor.
                            Here is what the last few shows looked like.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ======================== GALLERIES =========================== */}
            {events.map((event, index) => {
                const banded = index % 2 === 0;
                const bandClass = banded
                    ? isDark ? 'bg-gray-800' : 'bg-white'
                    : isDark ? 'bg-gray-900' : 'bg-gray-50';

                return (
                    <section
                        key={event.id}
                        id={event.slug}
                        className={`scroll-mt-28 py-14 sm:py-20 lg:py-24 ${bandClass}`}
                    >
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <SectionHeading
                                eyebrow={event.kind}
                                title={event.title}
                                isDark={isDark}
                            />

                            {/* Fact row — mono, because these are codes and dates */}
                            <ul className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 pb-6 border-b ${rule}`}>
                                {[event.date, event.stand, event.venue, event.location]
                                    .filter(Boolean)
                                    .map((fact) => (
                                        <li
                                            key={fact}
                                            className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] ${muted}`}
                                        >
                                            {fact}
                                        </li>
                                    ))}
                            </ul>

                            <p
                                className={`mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                            >
                                {event.description}
                            </p>

                            {/* Contact sheet */}
                            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {event.photos.map((photo, photoIndex) => (
                                    <button
                                        key={photo.id}
                                        type="button"
                                        onClick={() => openLightbox(event, photoIndex)}
                                        aria-label={`Open photo: ${photo.alt}`}
                                        className={`group relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${isDark ? 'bg-gray-700 focus-visible:ring-offset-gray-900' : 'bg-gray-200 focus-visible:ring-offset-gray-50'
                                            }`}
                                    >
                                        <img
                                            src={photo.thumb}
                                            alt={photo.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />

                                        <Maximize2 className="absolute top-3 right-3 w-4 h-4 text-white opacity-0 group-hover:opacity-90 group-focus-visible:opacity-90 transition-opacity duration-300" />

                                        <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-left text-[11px] sm:text-sm text-white leading-snug opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300">
                                            {photo.alt}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* =========================== CTA ============================== */}
            <section className={`py-14 sm:py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-gradient-to-br from-red-700 to-red-900 px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
                        <div className="max-w-2xl">
                            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-red-200">
                                Book a meeting
                            </p>
                            <h2 className="mt-4 font-display font-semibold uppercase text-white leading-[0.95] tracking-[-0.01em] text-3xl sm:text-4xl lg:text-5xl">
                                Meet us at the next show
                            </h2>
                            <p className="mt-4 text-sm sm:text-base text-red-100/90 leading-relaxed">
                                Tell us which show you are attending and we will hold a slot at the
                                stand to walk you through the range in person.
                            </p>
                            <Link
                                to="/contact"
                                className="mt-7 inline-flex items-center gap-2 bg-white text-red-900 font-medium px-6 py-3 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-800"
                            >
                                Get in touch
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================= LIGHTBOX =========================== */}
            <AnimatePresence>
                {activePhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-6"
                        onClick={closeLightbox}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${lightbox.title} photo viewer`}
                    >
                        <div className="absolute top-0 inset-x-0 flex items-start justify-between gap-4 p-4 sm:p-6 z-10">
                            <div className="min-w-0">
                                <p className="font-display font-semibold uppercase tracking-wide text-white text-base sm:text-xl truncate">
                                    {lightbox.title}
                                </p>
                                <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-red-400 mt-1">
                                    {String(lightbox.index + 1).padStart(2, '0')} / {String(lightbox.photos.length).padStart(2, '0')}
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeLightbox();
                                }}
                                aria-label="Close viewer"
                                className="shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        <motion.img
                            key={activePhoto.id}
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            src={activePhoto.src}
                            alt={activePhoto.alt}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-full max-h-[72vh] sm:max-h-[78vh] object-contain"
                        />

                        <p className="absolute bottom-5 sm:bottom-7 inset-x-0 px-14 sm:px-20 text-center text-xs sm:text-sm text-gray-300">
                            {activePhoto.alt}
                        </p>

                        {lightbox.photos.length > 1 && (
                            <>
                                <LightboxArrow side="left" onClick={() => step(-1)} />
                                <LightboxArrow side="right" onClick={() => step(1)} />
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ------------------------------ pieces ----------------------------- */

/** Red eyebrow over a large condensed title — the reference page's section marker. */
const SectionHeading = ({ eyebrow, title, isDark }) => (
    <div>
        <p
            className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] ${isDark ? 'text-red-400' : 'text-red-600'
                }`}
        >
            {eyebrow}
        </p>
        <h2
            className={`mt-3 font-display font-semibold uppercase leading-[0.95] tracking-[-0.015em] text-[clamp(1.9rem,5.5vw,4rem)] ${isDark ? 'text-white' : 'text-gray-900'
                }`}
        >
            {title}
        </h2>
    </div>
);

const LightboxArrow = ({ side, onClick }) => {
    const Icon = side === 'left' ? ChevronLeft : ChevronRight;
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
            className={`absolute top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${side === 'left' ? 'left-2 sm:left-6' : 'right-2 sm:right-6'
                }`}
        >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
    );
};

export default Events;
