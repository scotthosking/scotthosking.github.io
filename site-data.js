/**
 * ============================================================
 *  SITE DATA — Edit this file to update all site content
 * ============================================================
 */
const SITE_DATA = {

  // ── Personal Info ─────────────────────────────────────────
  name: "Dr Scott Hosking",
  tagline: "AI × Climate Resilience",
  bio: `Mission Director for Environmental Forecasting at the Alan Turing Institute. Building and deploying AI technologies that help nations predict, prepare for, and respond to environmental change.`,
  affiliations: [
    { name: "Alan Turing Institute", role: "Mission Director, Environmental Forecasting (2024-present)" },
  ],
  social: {
    github:   "https://github.com/scotthosking",
    scholar:  "https://scholar.google.com/citations?user=Z9vzJ2cAAAAJ",
    bluesky:  "https://bsky.app/profile/scotthosking.bsky.social",
    linkedin: "https://www.linkedin.com/in/scotthosking",
    email:    "mailto:shosking@turing.ac.uk",
  },

  // ── Resilience Pillars ────────────────────────────────────
  pillars: [
    { id: "energy",         icon: "⚡",  label: "Energy Security",          description: "Ensuring reliable, clean energy supply through predictive environmental modelling." },
    { id: "food",           icon: "🌾", label: "Food Security",            description: "Anticipating climate risks to agriculture from Arctic ice loss to West African rainfall shifts." },
    { id: "water",          icon: "💧", label: "Water Security",           description: "Modelling freshwater availability and hydrological extremes under changing climates." },
    { id: "ecosystem",      icon: "🌿", label: "Ecosystem Health",         description: "Monitoring biodiversity and conserving ecosystems that underpin societal resilience." },
    { id: "infrastructure", icon: "🏗️", label: "Infrastructure Resilience",description: "Protecting transport, energy, and supply-chain infrastructure from climate disruption." },
    { id: "national",       icon: "🛡️", label: "National AI Strategy",     description: "Sovereign forecasting capability and national AI infrastructure for environmental risk." },
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
      pillars: ["energy", "infrastructure", "food", "national"],
      image: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?w=800&q=80",
      imageAlt: "Storm clouds and weather systems",
      description: "A landmark collaboration between the Alan Turing Institute and the UK Met Office to develop the UK's first operational AI weather forecasting model. FastNet generates global ten-day forecasts thousands of times faster than traditional numerical weather prediction systems, establishing a sovereign UK capability in AI-driven meteorology.",
      impact: "Sovereign UK AI weather capability · Faster emergency response · Energy grid planning",
    },
    {
      id: "icenet",
      url: "https://www.turing.ac.uk/research/research-projects/icenet-ai-sea-ice-predictions-and-polar-resilience",
      title: "Arctic Sea Ice Forecasting",
      subtitle: "IceNet — AI-Powered Seasonal Predictions",
      status: "active",
      period: "2018 – present",
      funder: "EPSRC, NERC",
      pillars: ["ecosystem", "infrastructure", "national"],
      image: "https://images.unsplash.com/photo-1773891411696-b652241ddd2f?w=800&q=80",
      imageAlt: "Cargo ship navigating through Arctic sea ice",
      description: "The first AI-powered pan-Arctic seasonal sea ice forecasting model. IceNet consistently outperforms traditional dynamical models, especially for extreme ice events. Actively used to support Arctic conservation and decarbonise shipping through optimised routing. Showcased as an AI for Good exemplar at the UK's first International AI Safety Summit (2023).",
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
      pillars: ["food", "water", "ecosystem", "infrastructure"],
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
      pillars: ["national", "ecosystem", "infrastructure"],
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
      pillars: ["national", "ecosystem", "food", "energy"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      imageAlt: "University research programme",
      description: "UKRI Centre for Doctoral Training in the Application of AI to the study of Environmental Risks, jointly led by the University of Cambridge and BAS. Training the next generation of environmental AI researchers to build the UK's sovereign human capital in climate resilience. I was one of the three original co-directors to establish this programme.",
      impact: "National skills pipeline · 50+ PhD researchers · Cross-disciplinary training",
    },
  ],

  // ── Selected Publications ─────────────────────────────────
  publications: [
    { year: 2026, title: "FastNet: Improving the physical consistency of machine-learning weather prediction models through loss function design", authors: "Dunstan et al.", journal: "#", url: "#"},
    { year: 2025, title: "End-to-end data-driven weather prediction", authors: "Allen, et al.", journal: "Nature", url: "https://doi.org/10.1038/s41586-025-08897-0" },
    { year: 2024, title: "Prioritize environmental sustainability in use of AI and data science methods", authors: "Jay, Yu, Crawford, I. et al.", journal: "Nat. Geosci.", url: "https://doi.org/10.1038/s41561-023-01369-y"},
    { year: 2022, title: "Localized impacts and economic implications from high temperature disruption days under climate change", authors: "Summers, Mackie, Ueno, Simpson, Hosking et al.", journal: "Climate Resilience and Sustainability", url: "http://dx.doi.org/10.1002/cli2.35"},
    { year: 2021, title: "Seasonal Arctic sea ice forecasting with probabilistic deep learning", authors: "Andersson et al.", journal: "Nature Communications", url: "https://www.nature.com/articles/s41467-021-25257-4"},
    { year: 2021, title: "Regional disparities and seasonal differences in climate risk to rice labour", authors: "Simpson, Hosking, Mitchell, Betts, Shuckburgh", journal: "Environmental Research Letters", url: "http://dx.doi.org/10.1088/1748-9326/ac3288"},
  ],
};
