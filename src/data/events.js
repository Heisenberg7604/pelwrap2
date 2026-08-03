/**
 * Events & Exhibitions content.
 *
 * This is the ONLY file you edit to add or change an event. The page component
 * (src/pages/Events.jsx) is generic — it renders whatever is exported here.
 *
 * Image convention (see EVENTS_PAGE_README.md):
 *   public/assets/events/<slug>/01.jpg        1600px long edge — lightbox
 *   public/assets/events/<slug>/01-thumb.jpg   800px long edge — grid
 */

/** Builds the photo array for an event from the numbered files on disk. */
const photos = (slug, count, alts = {}) =>
    Array.from({ length: count }, (_, i) => {
        const n = String(i + 1).padStart(2, '0');
        return {
            id: `${slug}-${n}`,
            src: `/assets/events/${slug}/${n}.jpg`,
            thumb: `/assets/events/${slug}/${n}-thumb.jpg`,
            alt: alts[n] || `Photograph ${i + 1}`,
        };
    });

/**
 * Gallery sections. Every string field except `title` and `photos` is optional —
 * the page hides any row you leave empty, so partial records still look finished.
 */
export const events = [
    {
        id: 'plastindia-2026',
        slug: 'plastindia-2026',
        title: 'PlastIndia 2026',
        kind: 'Exhibition',
        date: '5–10 February 2026',
        stand: '', // TODO(content): add the stall number
        venue: 'Bharat Mandapam',
        location: 'New Delhi, India',
        description:
            'Six days on the floor at India\'s largest plastics exhibition. The stall carried the ' +
            'full extrusion range — uPVC and PP roofing sheets, PVC foam sheets and WPC door ' +
            'panels — with samples out on the counter for converters, distributors and export ' +
            'buyers to handle.',
        photos: photos('plastindia-2026', 6, {
            '01': 'Technical discussion with visitors at the stall counter',
            '02': 'Visitors reviewing the product range',
            '03': 'Product samples on display',
            '04': 'The stall front at PlastIndia 2026',
            '05': 'Full product wall along the stall',
            '06': 'Film and sheet samples on the display shelves, with the product range board alongside',
        }),
    },
    {
        id: 'ankleshwar-industrial-expo-2026',
        slug: 'aia-expo-2026',
        title: 'Ankleshwar Industrial Expo 2026',
        kind: 'Exhibition',
        date: '', // TODO(content): add the show dates
        stand: 'Stall A85 – A86',
        venue: 'APM Grounds, GIDC Ankleshwar',
        location: 'Ankleshwar, Gujarat',
        description:
            'Our home-ground show, a few kilometres from the works. Two adjoining stalls let us put ' +
            'the roofing sheet profiles, jumbo bags and edge protectors up side by side, so local ' +
            'fabricators and industrial buyers could compare finishes in person.',
        photos: photos('aia-expo-2026', 5, {
            '01': 'The Patkar Extrusions team at the expo stall',
            '02': 'Stalls A85 and A86 with the full product wall',
            '03': 'Roofing sheet profiles on display',
            '04': 'The team with visitors at the stall',
            '05': 'Product samples and literature on the counter',
        }),
    },
    {
        id: 'annual-meeting-fy25-26',
        slug: 'annual-meeting-fy25-26',
        title: 'Annual Meeting FY 2025–26',
        kind: 'Company Event',
        date: '15 July 2026',
        stand: '',
        venue: 'J P Group of Industries',
        location: 'GIDC Ankleshwar, Gujarat',
        description:
            'The whole team at the Ankleshwar works for the yearly review — closing out FY 2025–26, ' +
            'recognising work across production, quality and sales, and setting the targets that ' +
            'carry into the next year.',
        photos: photos('annual-meeting-fy25-26', 4, {
            '01': 'Team photograph outside the Ankleshwar corporate office',
            '02': 'The annual meeting session',
            '03': 'Team members at the annual meeting',
            '04': 'Group photograph at the annual meeting',
        }),
    },
];

/** Full-bleed hero image for the page. */
export const eventsHero = {
    src: '/assets/events/aia-expo-2026/02.jpg',
    alt: 'The Patkar Extrusions stall at the Ankleshwar Industrial Expo',
};

export default events;
