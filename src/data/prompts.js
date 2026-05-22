export const promptData = [
  {
    cat: 'Claude Code — Build sessions',
    items: [
      {
        title: 'Opening line for all Claude Code sessions',
        body: "I'm in the bishop-website React + Vite project. My source assets are in /Users/cbenitez/Bishop Advertising Design Folder/DesignMD Hub/. Proceed.",
      },
      {
        title: 'Session 1 — Run merge prompt',
        body: "I'm in the bishop-website React + Vite project. Apply the six changes in BISHOP_MERGE_PROMPT.md in the specified order. After each change confirm npm run dev still runs before proceeding. Proceed.",
      },
      {
        title: 'Session 2 — Run depth build',
        body: "I'm in the bishop-website React + Vite project. I also have a reference Stitch build at /Users/cbenitez/Bishop Advertising Design Folder/BishopAdvertisingOptimized — use it for the WavyPath implementation reference. Apply the four changes in BISHOP_DEPTH_BUILD_PROMPT.md in order. Do not touch any existing section components. Proceed.",
      },
      {
        title: 'Session 3 — Run Round 1 components',
        body: "I'm in the bishop-website React + Vite project. Add two new components — IOSCallPopup.jsx and LiquidGlassForm.jsx. Wire both into App.jsx. Do not touch any existing components. Proceed.",
      },
    ],
  },
  {
    cat: 'Stitch & Figma MCP',
    items: [
      {
        title: 'List Stitch projects',
        body: "Using the Stitch MCP, show me the screens and components in my Bishop Advertising Design System project.",
      },
      {
        title: 'Read Figma file',
        body: "Read my Figma file at [URL]. Extract all component specs, color tokens, spacing values, and typography settings. Apply to Bishop's brand system (orange only, Lora + Inter, DESIGN.md tokens).",
      },
      {
        title: 'Pull Stitch project into bishop-website',
        body: "Using the Stitch MCP, read project 255688608608393534. Extract the WavyPath component and Background component. Adapt them to Bishop's brand system (orange only, no multi-color gradients) and add them to bishop-website.",
      },
    ],
  },
  {
    cat: 'Content & copy',
    items: [
      {
        title: 'Rewrite service description in Bishop voice',
        body: "Rewrite this service description in Bishop's operator voice. Rules: declarative not suggestive, no \"we help\", revenue-tied framing, short sentences, no exclamation points. Service: [paste description]",
      },
      {
        title: 'Generate AEO content',
        body: "Write an AEO-optimized blog post for Bishop Advertising on the topic of [topic]. Target keyword: [keyword]. Write in Bishop's operator voice — declarative, chess metaphors where natural, revenue-tied framing. End with a CTA to book a strategy session.",
      },
      {
        title: 'Cold outreach email',
        body: "Write a cold outreach email for Bishop Advertising targeting [business type]. Use the competitor gap angle — their competitor is outranking them because they invested in AEO. Open with the diagnosis, show the gap, offer a free AI visibility scan as the CTA. Bishop voice: calm, certain, operator-led.",
      },
    ],
  },
  {
    cat: 'This chat — directive',
    items: [
      {
        title: 'Return to Bishop directive context',
        body: "This is my Bishop directive assistant chat. I'm Christian, Project Coordinator at Ben-Tex Construction and developer/designer for Bishop Advertising & AI. We have been building the bishop-website React app and all brand assets. Reference our full conversation context and continue from where we left off.",
      },
      {
        title: 'Request specific build prompt',
        body: "I need a Claude Code prompt for [describe what you want to build]. It should follow Bishop's brand system (DESIGN.md), use the existing component structure in bishop-website, and not touch any existing sections unless specifically needed.",
      },
    ],
  },
];
