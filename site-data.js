/**
 * ============================================================
 *  SITE DATA — Edit this file to update all site content
 * ============================================================
 */
const SITE_DATA = {

  // ── Personal Info ─────────────────────────────────────────
  name: "Dr Scott Hosking",
  tagline: "AI × Climate Resilience",
  bio: `Mission Director for Environment at the Alan Turing Institute. Building and deploying AI technologies that help nations predict, prepare for, and respond to environmental change.`,
  affiliations: [
    { name: "Alan Turing Institute", role: "Mission Director, Environment (2024-present)" },
  ],
  social: {
    github:   "https://github.com/scotthosking",
    scholar:  "https://scholar.google.com/citations?user=Z9vzJ2cAAAAJ",
    bluesky:  "https://bsky.app/profile/scotthosking.bsky.social",
    linkedin: "https://www.linkedin.com/in/scotthosking",
    email:    "mailto:shosking@turing.ac.uk",
  },

  // ── Turing Transformational Resilience Goals ─────────────
  // Used for the project filter buttons and project tags.
  pillars: [
    { id: "decision",       icon: "🧭", label: "Decision Advantage",       description: "Helping Defence and civil responders make faster, trusted decisions in times of crisis, including when normal systems are degraded or under attack." },
    { id: "infrastructure", icon: "🏗️", label: "Resilient Infrastructure", description: "Modelling and anticipating disruptions to the UK's critical infrastructure, such as water and energy systems." },
    { id: "sea",            icon: "⚓", label: "Security at Sea",          description: "Improving situational awareness and maritime operations in challenging environments." },
    { id: "supply",         icon: "📦", label: "Supply Resilience",        description: "Revealing supply-chain vulnerabilities, anticipating shortages and helping government and industry respond earlier." },
  ],

  // ── Projects ──────────────────────────────────────────────
  projects: [
      {
      id: "fastnet",
      url: "https://www.turing.ac.uk/research/research-projects/fastnet",
      title: "UK AI Weather Forecasting",
      subtitle: "FastNet — Turing & Met Office",
      status: "active",
      period: "2023 – present",
      funder: "UK Met Office, EPSRC",
      pillars: ["decision", "infrastructure", "supply"],
      image: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?w=800&q=80",
      imageAlt: "Storm clouds and weather systems",
      description: "A landmark collaboration between the Alan Turing Institute and the UK Met Office to develop the UK's first operational AI weather forecasting model. FastNet generates global ten-day forecasts thousands of times faster than traditional numerical weather prediction systems, establishing a sovereign UK capability in AI-driven meteorology.",
      impact: "Sovereign UK AI weather capability · Faster emergency response · Energy grid planning",
    },
    {
      id: "cryocast",
      url: "https://www.turing.ac.uk/research/research-projects/cryocast-ai-sea-ice-predictions-and-polar-resilience",
      title: "AI Sea Ice Prediction",
      subtitle: "CryoCast — building on IceNet",
      status: "active",
      period: "2018 – present",
      funder: "EPSRC, NERC",
      pillars: ["sea", "decision"],
      image: "https://images.unsplash.com/photo-1773891411696-b652241ddd2f?w=800&q=80",
      imageAlt: "Cargo ship navigating through Arctic sea ice",
      description: "CryoCast continues and extends IceNet, the first AI-powered pan-Arctic seasonal sea ice forecasting model. Published in Nature Communications (2021), IceNet consistently outperforms traditional dynamical models, especially for extreme ice events. It is actively used to support Arctic conservation and to decarbonise shipping through optimised routing, and was showcased as an AI for Good exemplar at the UK's first International AI Safety Summit (2023). CryoCast is designed to work directly from raw, fragmented observations, delivering forecasts that support local decisions at the edge.",
      impact: "Reduces shipping emissions · Supports Arctic conservation · Underpins UK sovereign forecasting",
    },
    {
      id: "cumulus",
      url: "https://www.turing.ac.uk/research/research-projects/project-cumulus-strengthening-climate-services-for-sub-saharan-african-agriculture",
      title: "AI Weather Forecasting for West Africa",
      subtitle: "Empowering Local Meteorological Services",
      status: "active",
      period: "2025 – 2027",
      funder: "Gates Foundation, FCDO",
      pillars: ["supply", "decision"],
      image: "https://images.unsplash.com/photo-1615027212409-2628cc0cc11a?w=800&q=80",
      imageAlt: "Agricultural workers in West Africa",
      description: "Deploying a multimodal deep learning architecture across West Africa to empower local meteorological services with high-accuracy environmental forecasts. Directly supports agricultural stability and food security for millions of people in climate-vulnerable regions.",
      impact: "Agricultural stability · Food security for millions · Sovereign local capacity",
    },
    {
      id: "giant",
      url: "https://giantgreenland.com/",
      title: "Greenland Ice Sheet Tipping Points",
      subtitle: "Early warning for glacier and ocean collapse",
      status: "active",
      period: "2025 – 2028",
      funder: "ARIA",
      pillars: ["infrastructure", "sea"],
      image: "https://images.unsplash.com/photo-1560648476-90ea97f03ae5?w=800&q=80",
      imageAlt: "Greenland glacier and fjord",
      description: "A £20 million UK-led initiative investigating how warming oceans cause Greenland's fjord glaciers to melt, fracture, and collapse. Combines advanced field observations, next-generation computer models, and an AI-driven early warning system to forecast ice loss and understand how freshwater discharge into the North Atlantic could trigger abrupt, irreversible tipping points in global ocean circulation and climate.",
      impact: "Early warning of glacier collapse · Sea level rise forecasting · Protecting communities across the Arctic and Europe",
    },
    {
      id: "ai4er",
      url: "https://ai4er-cdt.esc.cam.ac.uk",
      title: "Doctoral Training in Environmental AI",
      subtitle: "UKRI Centre for Doctoral Training, Cambridge & BAS",
      status: "",
      period: "2019 – 2027",
      funder: "UKRI EPSRC",
      pillars: [],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      imageAlt: "University research programme",
      description: "UKRI Centre for Doctoral Training in the Application of AI to the study of Environmental Risks, jointly led by the University of Cambridge and BAS. Training the next generation of environmental AI researchers to build the UK's sovereign human capital in climate resilience. I was one of the three original co-directors to establish this programme.",
      impact: "National skills pipeline · 50+ PhD researchers · Cross-disciplinary training",
    },
  ],

  // ── Selected Publications ─────────────────────────────────
  publications: [
    { focus: "weather", year: 2026, title: "FastNet: Improving the Physical Consistency of Machine Learning Weather Prediction Models through Loss Function Design", authors: "T. Dunstan, O. Strickson, T. Bennett, J. Bowyer, M. Burnand, J. Chappell, A. Coca-Castro, …, J. S. Hosking et al.", journal: "Artificial Intelligence for the Earth Systems", url: "https://doi.org/10.1175/AIES-D-25-0090.1" },
    { focus: "weather", year: 2025, title: "End-to-end data-driven weather prediction", authors: "A. Allen, S. Markou, W. Tebbutt, J. Requeima, W. P. Bruinsma, T. R. Andersson, M. Herzog, …, J. S. Hosking et al.", journal: "Nature", url: "https://doi.org/10.1038/s41586-025-08897-0" },
    { focus: "heat", year: 2022, title: "Localized impacts and economic implications from high temperature disruption days under climate change", authors: "T. Summers, E. Mackie, R. Ueno, C. Simpson, J. S. Hosking, T. Suciu, A. Coburn, E. Shuckburgh", journal: "Climate Resilience and Sustainability", url: "https://doi.org/10.1002/cli2.35" },
    { focus: "seaice", year: 2021, title: "Seasonal Arctic sea ice forecasting with probabilistic deep learning", authors: "T. Andersson, J. S. Hosking, M. Pérez-Ortiz, B. Paige, A. Elliott, C. Russell, S. Law, D. C. Jones et al.", journal: "Nature Communications", url: "https://doi.org/10.1038/s41467-021-25257-4" },
    { focus: "food", year: 2021, title: "Regional disparities and seasonal differences in climate risk to rice labour", authors: "C. Simpson, J. S. Hosking, D. Mitchell, R. A. Betts, E. Shuckburgh", journal: "Environmental Research Letters", url: "https://doi.org/10.1088/1748-9326/ac3288" },
    { focus: "energy", year: 2018, title: "Changes in European wind energy generation potential within a 1.5°C warmer world", authors: "J. S. Hosking, D. MacLeod, T. Phillips, C. R. Holmes, P. Watson, E. Shuckburgh, D. Mitchell", journal: "Environmental Research Letters", url: "https://doi.org/10.1088/1748-9326/aabf78" },
  ],

  // Symbols shown beside each selected publication
  pubFocus: {
    weather: { icon: "🌦️", label: "Weather" },
    seaice:  { icon: "🧊", label: "Sea ice" },
    energy:  { icon: "⚡", label: "Energy" },
    food:    { icon: "🌾", label: "Food" },
    heat:    { icon: "🌡️", label: "Heat" },
  },
};
