/**
 * ============================================================
 *  SITE DATA — Edit this file to update all site content
 * ============================================================
 */
const SITE_DATA = {

  // ── Personal Info ─────────────────────────────────────────
  name: "Dr Scott Hosking",
  tagline: "AI × Climate Resilience",
  bio: `Mission Director for Environmental Forecasting at the Alan Turing Institute. I build AI and digital twin technologies that help nations predict, prepare for, and respond to environmental change.`,
  affiliations: [
    { name: "Alan Turing Institute", role: "Mission Director, Environmental Forecasting (2024-present)" },
  ],
  social: {
    github:   "https://github.com/scotthosking",
    scholar:  "https://scholar.google.com/citations?user=Z9vzJ2cAAAAJ",
    bluesky:  "https://bsky.app/profile/scotthosking.bsky.social",
    linkedin: "https://www.linkedin.com/in/jscotthosking",
    email:    "mailto:shosking@turing.ac.uk",
  },

  // ── Resilience Pillars ────────────────────────────────────
  pillars: [
    { id: "energy",         icon: "⚡", label: "Energy Security",          description: "Ensuring reliable, clean energy supply through predictive environmental modelling." },
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
      title: "FastNet",
      subtitle: "UK Operational AI Weather Model",
      status: "active",
      period: "2023 – present",
      funder: "Alan Turing Institute / UK Met Office",
      pillars: ["energy", "infrastructure", "food", "national"],
      image: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?w=800&q=80",
      imageAlt: "Storm clouds and weather systems",
      description: "A landmark collaboration between the Alan Turing Institute and the UK Met Office to launch the UK's first operational AI weather forecasting model. FastNet generates global ten-day forecasts thousands of times faster than traditional numerical weather prediction systems, establishing a sovereign UK capability in AI-driven meteorology.",
      impact: "Sovereign UK AI weather capability · Faster emergency response · Energy grid planning",
      details: {
        overview: "FastNet is the UK's first operational AI weather forecasting model, built through a landmark partnership between the Alan Turing Institute and the UK Met Office. It generates global ten-day forecasts using a multimodal deep learning architecture that is orders of magnitude faster than traditional numerical weather prediction.",
        background: "Traditional weather forecasting relies on numerical weather prediction — solving huge systems of physical equations on supercomputers at enormous cost. The emergence of AI weather models has demonstrated that deep learning can match their skill at a fraction of the cost. FastNet aims to give the UK a sovereign, world-class capability in this space.",
        approach: "FastNet uses a multimodal transformer architecture trained on decades of ERA5 reanalysis data. Scott Hosking serves as Senior Responsible Owner, ensuring the system meets operational standards for reliability, accuracy and national security. The model is currently in evaluation for integration into Met Office operations.",
        nationalResilience: "Sovereign weather forecasting is a critical national capability. FastNet ensures the UK is not dependent on foreign AI systems for weather intelligence that underpins emergency planning, energy grid management, agricultural decision-making, and military operations. Faster forecasts also mean earlier warnings for extreme weather events.",
        achievements: [
          "UK's first operational AI weather forecasting model",
          "Senior Responsible Owner: Dr Scott Hosking",
          "Generates global 10-day forecasts thousands of times faster than traditional methods",
          "Live collaboration between Alan Turing Institute and UK Met Office",
          "Currently in evaluation for operational deployment",
        ],
      },
      links: []
    },
    {
      id: "icenet",
      url: "https://www.turing.ac.uk/research/research-projects/icenet-ai-sea-ice-predictions-and-polar-resilience",
      title: "IceNet",
      subtitle: "AI-Powered Arctic Sea Ice Forecasting",
      status: "active",
      period: "2018 – present",
      funder: "BAS / Alan Turing Institute",
      pillars: ["ecosystem", "infrastructure", "national"],
      image: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=800&q=80",
      imageAlt: "Arctic sea ice from above",
      description: "The first AI-powered pan-Arctic seasonal sea ice forecasting model. IceNet consistently outperforms traditional dynamical models, especially for extreme ice events. Actively used to support Arctic conservation and decarbonise shipping through optimised routing. Showcased as an AI for Good exemplar at the UK's first International AI Safety Summit (2023).",
      impact: "Reduces shipping emissions · Supports Arctic conservation · Underpins UK sovereign forecasting",
      details: {
        overview: "IceNet is a probabilistic, deep learning sea ice forecasting system developed by an international team led by British Antarctic Survey and The Alan Turing Institute. Trained on climate simulations and observational data, IceNet forecasts the next 6 months of monthly-averaged sea ice concentration maps across the entire Arctic.",
        background: "Accurate sea ice forecasts are critical for a surprising range of national and global interests. Arctic shipping routes are becoming viable as ice retreats — but only if vessels can plan routes safely. Arctic ecosystems including polar bears, walrus, and seabirds depend on reliable ice platforms. And sea ice is a bellwether for the broader climate system, with changes influencing weather patterns across Europe and North America.",
        approach: "IceNet uses a U-Net deep learning architecture trained on 30+ years of ERA5 climate reanalysis data and passive microwave satellite observations. Unlike traditional dynamical models that simulate physical equations, IceNet learns statistical relationships directly from data — making it thousands of times faster to run while matching or exceeding forecast skill.",
        nationalResilience: "IceNet directly supports UK national resilience across multiple dimensions. It provides a sovereign AI forecasting capability that doesn't rely on foreign infrastructure. Its shipping route optimisation reduces emissions from Arctic freight, supporting energy and trade security. And it was featured by the UK government as an AI for Good exemplar at the first International AI Safety Summit in 2023.",
        achievements: [
          "First AI-powered pan-Arctic seasonal sea ice model",
          "Outperforms traditional dynamical models for extreme ice events",
          "Nature Communications paper ranked top 25 in Earth & Environmental Sciences (2021)",
          "Featured by UK government at International AI Safety Summit 2023",
          "Actively used for Arctic shipping route optimisation",
          "Featured in Wired, BBC, NVIDIA and major science outlets",
        ],
      },
      links: [
        { label: "IceNet Website", url: "https://icenet.ai" },
        { label: "Nature Communications Paper", url: "https://www.nature.com/articles/s41467-021-25257-4" },
        { label: "GitHub", url: "https://github.com/alan-turing-institute/IceNet-Project" },
      ]
    },
    {
      id: "west-africa-forecasting",
      url: "",
      title: "West Africa Weather AI",
      subtitle: "Empowering Local Meteorological Services",
      status: "active",
      period: "2022 – 2024",
      funder: "Gates Foundation / New Zealand Endeavour",
      pillars: ["food", "water", "ecosystem"],
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      imageAlt: "West African landscape and agriculture",
      description: "Deploying a multimodal deep learning architecture across West Africa to empower local meteorological services with high-accuracy environmental forecasts. Directly supports agricultural stability and food security for millions of people in climate-vulnerable regions.",
      impact: "Agricultural stability · Food security for millions · Sovereign local capacity",
      details: {
        overview: "This Gates Foundation-supported programme deploys a revolutionary multimodal deep learning architecture across West Africa, generating high-accuracy weather forecasts that are shared directly with local meteorological services — building sovereign forecasting capacity in climate-vulnerable nations.",
        background: "West Africa is acutely vulnerable to climate variability. Rainfall patterns directly control crop yields for hundreds of millions of subsistence farmers. Yet many national meteorological services in the region lack access to the computational infrastructure and expertise needed to run modern forecast systems. AI offers a path to closing this gap rapidly and cost-effectively.",
        approach: "The team developed a multimodal deep learning architecture that fuses satellite data, surface observations, and climate reanalysis to produce local-scale weather forecasts. The system is designed to run on modest hardware, making it deployable by national met services without supercomputer infrastructure.",
        nationalResilience: "Food security is one of the foundational pillars of national resilience. By improving agricultural weather forecasts in climate-vulnerable regions, this project reduces food supply shocks that ripple through global commodity markets and drive migration — with direct consequences for UK national security and aid budgets.",
        achievements: [
          "Supported by the Gates Foundation",
          "Multimodal deep learning architecture for African climate",
          "Deployed across multiple West African meteorological services",
          "Improves seasonal agricultural planning for smallholder farmers",
        ],
      },
      links: []
    },
    {
      id: "ai4er",
      url: "",
      title: "AI4ER CDT",
      subtitle: "Centre for Doctoral Training in AI for Environmental Risk",
      status: "",
      period: "2019 – 2023",
      funder: "UKRI EPSRC",
      pillars: ["national", "ecosystem", "food", "energy"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      imageAlt: "University research programme",
      description: "Co-directing the UKRI Centre for Doctoral Training in the Application of AI to the study of Environmental Risks, jointly led by the University of Cambridge and BAS. Training the next generation of environmental AI researchers to build the UK's sovereign human capital in climate resilience.",
      impact: "National skills pipeline · 50+ PhD researchers · Cross-disciplinary training",
      details: {
        overview: "The UKRI Centre for Doctoral Training in the Application of AI to the study of Environmental Risks (AI4ER) is a joint initiative between the University of Cambridge and the British Antarctic Survey. Scott Hosking co-directs the programme, which trains PhD researchers at the intersection of AI and environmental science.",
        background: "The UK faces a critical shortage of researchers who can work fluently across both AI/data science and environmental science. This skills gap is a direct threat to the UK's ability to build and maintain sovereign environmental forecasting capabilities. AI4ER was created specifically to address this gap.",
        approach: "AI4ER PhD students complete a one-year Master's programme spanning environmental science, statistics, and machine learning before embarking on a three-year research project. Students are co-supervised by academic researchers and industry/government partners including the Met Office, NERC centres, and technology companies.",
        nationalResilience: "Human capital is the most fundamental form of national resilience. AI4ER directly builds the UK's sovereign pool of researchers who can develop, maintain, and operate the AI systems that underpin national environmental forecasting, climate adaptation, and natural capital assessment.",
        achievements: [
          "50+ PhD researchers trained across four cohorts",
          "Co-directed by Scott Hosking (BAS) and University of Cambridge faculty",
          "Cross-disciplinary curriculum spanning AI and environmental science",
          "Industry partners include UK Met Office, NERC centres, and tech companies",
          "Alumni now working in government, research, and industry on climate AI",
        ],
      },
      links: [
        { label: "AI4ER Website", url: "https://ai4er-cdt.esc.cam.ac.uk" },
      ]
    },
  ],

  // ── Selected Publications ─────────────────────────────────
  publications: [
    { year: 2021, title: "Seasonal Arctic sea ice forecasting with probabilistic deep learning", authors: "Andersson et al.", journal: "Nature Communications", url: "https://www.nature.com/articles/s41467-021-25257-4", highlight: true },
    { year: 2022, title: "Localized impacts and economic implications from high temperature disruption days under climate change", authors: "Summers, Mackie, Ueno, Simpson, Hosking et al.", journal: "Climate Resilience and Sustainability", url: "#" },
    { year: 2022, title: "Convolutional conditional neural processes for local climate downscaling", authors: "Vaughan, Tebbutt, Hosking, Turner", journal: "Geoscientific Model Development", url: "#" },
    { year: 2021, title: "The Time Machine framework: monitoring and prediction of biodiversity loss", authors: "Eastwood, Stubbings, Hosking et al.", journal: "Trends in Ecology & Evolution", url: "#" },
    { year: 2021, title: "Regional disparities and seasonal differences in climate risk to rice labour", authors: "Simpson, Hosking, Mitchell, Betts, Shuckburgh", journal: "Environmental Research Letters", url: "#" },
  ],

};
