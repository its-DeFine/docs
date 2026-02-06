const categories = [
  [
    "Video Streaming",
    "Developer Tools",
    "Social Media",
    "Community",
    "Marketplaces",
    "AI-Powered Apps",
    "Other",
  ],
];

const linkIcons = {
  github: "github",
  youtube: "youtube",
  blog: "newspaper",
  x: "x",
};

const hrefs = [
  { title: "BeyondClub", href: "https://www.beyondclub.xyz" },
  { title: "Bonfire", href: "https://www.bonfire.xyz" },
  { title: "Buttrfly", href: "https://buttrfly.app" },
  { title: "DiverseHQ", href: "https://diversehq.gitbook.io" },
  { title: "EthGlobal.tv", href: "https://ethglobal.tv" },
  { title: "Gummys", href: "https://gummys.io" },
  { title: "Hey", href: "https://hey.xyz" },
  { title: "Huddle01", href: "https://huddle01.com" },
  { title: "Hypeshot", href: "https://www.hypeshot.io" },
  { title: "Kavarii", href: "https://kavarii.com" },
  { title: "Lens Media Snapshots", href: "https://www.lens.xyz" },
  { title: "Lenspeer", href: "https://lenspeer.com" },
  { title: "LensPlay", href: "https://lensplay.xyz" },
  { title: "LensPort", href: "https://lensport.io" },
  { title: "Lenster", href: "https://lenster.xyz" },
  { title: "Tape", href: "https://tape.xyz" },
  { title: "LensShare", href: "https://www.lens.xyz" },
  { title: "Livepeer Studio", href: "https://livepeer.studio" },
  { title: "Livespace", href: "https://linktr.ee/livespace" },
  { title: "LongTake NFT Publisher", href: "https://www.longtake.xyz" },
  { title: "Minds", href: "https://www.minds.com" },
  { title: "Mintflick", href: "https://mintflick.app" },
  { title: "Monaverse", href: "https://monaverse.com" },
  { title: "Orb", href: "https://orb.ac" },
  { title: "Picarto.tv", href: "https://picarto.tv" },
  { title: "Pinsta", href: "https://pinsta.xyz" },
  { title: "Radar", href: "https://www.radardao.xyz" },
  { title: "SankoTV", href: "https://sanko.tv" },
  { title: "Serraform (Decentraland)", href: "https://www.serraform.com" },
  { title: "Soclly", href: "https://app.soclly.com" },
  { title: "StreamETH", href: "https://info.streameth.org" },
  { title: "Switchboard", href: "https://switchboard.live" },
  { title: "The Lot Radio", href: "https://www.thelotradio.com" },
  { title: "Tribe Social", href: "https://www.tribesocial.io" },
  { title: "Unlonely", href: "https://www.unlonely.app" },
  { title: "Waves", href: "https://www.wav3s.app" },

  { title: "Tsunameme", href: "https://www.tsunameme.ai" },
  { title: "Cloud AI Generator", href: "https://ai-generator.livepeer.cloud" },
  { title: "Let's Generate", href: "https://letsgenerate.ai" },
  { title: "Inference By Stronk", href: "https://inference.stronk.rocks" },
  { title: "Origin Stories", href: "https://mobile.x.com" },
  { title: "Flipguard", href: "https://www.flipguard.xyz" },
  { title: "Refraction", href: "https://www.refractionfestival.com" },
  { title: "Kitana (Katana Video)", href: "https://katana.video" },
  { title: "New Coin", href: "https://www.newcoin.org" },
  { title: "Operator", href: "https://operator.io" },
];

export const showcaseData = [
  {
    title: "BeyondClub",
    subtitle: "Loyalty and membership",
    href: "https://www.beyondclub.xyz",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.beyondclub.xyz",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "No-code web3 loyalty/membership platform; included in Livepeer’s ecosystem list.",
    cta: "Follow @beyondClub_xyz for campaign announcements.",
    links: [
      { github: "https://github.com/BeyondClub" },
      { youtube: null },
      { blog: null },
      { x: "https://x.com/beyondClub_xyz" },
    ],
  }, // :contentReference[oaicite:1]{index=1}

  {
    title: "Bonfire",
    subtitle: "No-code community engagement platform for web3 creators.",
    href: "https://www.bonfire.xyz",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.bonfire.xyz",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Bonfire Networks (open source) – listed in the Livepeer ecosystem.",
    cta: "Read the repo + follow @SwitchToBonfire.",
    links: [
      { github: "https://github.com/bonfire-networks/bonfire-app" },
      { youtube: null },
      { blog: "https://bonfirenetworks.org" },
      { x: "https://x.com/SwitchToBonfire" },
    ],
  }, // :contentReference[oaicite:2]{index=2}

  {
    title: "Buttrfly",
    subtitle:
      "Connect with friends on Farcaster and Lens. Browse and mint content on Zora, Sound, and more.",
    href: "https://buttrfly.app",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://buttrfly.app",
    categoryTags: ["Apps", "Social Media"],
    productTags: [
      "Livepeer Network (ecosystem listing)",
      "Lens Protocol (app description)",
    ],
    description:
      "Decentralized social app (Lens) included in the Livepeer ecosystem; public X account exists.",
    cta: "Follow @buttrfly_app for releases/updates.",
    links: [
      { github: null },
      { youtube: null },
      { blog: null },
      { x: "https://x.com/buttrfly_app" },
    ],
  }, // :contentReference[oaicite:3]{index=3}

  {
    title: "DiverseHQ",
    subtitle: "Watch EthGlobal events live",
    href: "https://diversehq.gitbook.io",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem, but I did not find a verifiable official homepage/social in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:4]{index=4}

  {
    title: "EthGlobal.tv",
    subtitle: "Watch EthGlobal events live",
    href: "https://ethglobal.tv",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://ethglobal.tv",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "ETHGlobal streaming destination listed in Livepeer ecosystem.",
    cta: "Open the site during an ETHGlobal event.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:5]{index=5}

  {
    title: "Gummys",
    subtitle: "No-code community engagement platform for web3 creators.",
    href: "https://gummys.io",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps", "Community"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem; no official URL/social verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:6]{index=6}

  {
    title: "Hey",
    subtitle:
      "A community-built decentralized, and permissionless social media app built on Lens Protocol",
    href: "https://hey.xyz",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://hey.xyz",
    categoryTags: ["Apps", "Social Media"],
    productTags: ["Lens Protocol", "Livepeer Network (ecosystem listing)"],
    description: "Lens-based social app listed in Livepeer ecosystem.",
    cta: "Explore Hey and Lens posting.",
    links: [
      { github: "https://github.com/heyxyz" },
      { youtube: null },
      { blog: null },
      { x: null },
    ],
  }, // :contentReference[oaicite:7]{index=7}

  {
    title: "Huddle01",
    subtitle: "The world's first web3 native video meeting solution.",
    href: "https://huddle01.com",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://huddle01.com",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Web3-native video meeting platform listed in Livepeer ecosystem.",
    cta: "Check their site/docs for SDK + product updates.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:8]{index=8}

  {
    title: "Hypeshot",
    subtitle: "Crypto-enabled livestreaming",
    href: "https://www.hypeshot.io",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps", "Marketplaces"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed on Livepeer ecosystem; I found an active grants/community page mention but not a clean official homepage in this pass.",
    cta: "No verifiable source found (official site/social) in this pass.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:9]{index=9}

  {
    title: "Kavarii",
    subtitle:
      "Web3 video streaming platform that promotes freedom of expression and provides more monetization options for creators",
    href: "https://kavarii.com",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem; no official URL/social verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:10]{index=10}

  {
    title: "Lenspeer",
    subtitle: "All-in-One decentralized social platform",
    href: "https://lenspeer.com",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://lenspeer.com",
    categoryTags: ["Apps", "Video Streaming"],
    productTags: ["Lens Protocol", "Livepeer Network (ecosystem listing)"],
    description:
      "Lens-based social platform listed in ecosystem; official X exists.",
    cta: "Follow @Lenspeer for updates.",
    links: [
      { github: null },
      { youtube: null },
      { blog: null },
      { x: "https://x.com/Lenspeer" },
    ],
  }, // :contentReference[oaicite:11]{index=11}

  {
    title: "LensPlay",
    subtitle:
      "mobile-first decentralized video-sharing app that empowers creators, leveraging Lens Protocol and Livepeer to transform content sharing for a global audience.",
    href: "https://lensplay.xyz",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://lensplay.xyz",
    categoryTags: ["Apps"],
    productTags: [
      "Livepeer Protocol (explicit in ecosystem blurb)",
      "Lens Protocol",
    ],
    description:
      "Explicitly described (by Livepeer ecosystem page) as leveraging Lens + Livepeer for decentralized video sharing.",
    cta: "Open LensPlay and follow their socials (not verified in this pass).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:12]{index=12}

  {
    title: "LensPort",
    subtitle: "Discover, collect, and sell Post NFTs on Lens.",
    href: "https://lensport.io",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://lensport.io",
    categoryTags: ["Apps", "Social Media"],
    productTags: ["Lens Protocol", "Livepeer Network (ecosystem listing)"],
    description:
      "Lens content marketplace listed in ecosystem; site includes 'Join the community' and points to Lens + Twitter.",
    cta: "Use 'Join the community' on LensPort and follow Lens/Twitter links from the site.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:13]{index=13}

  {
    title: "LongTake NFT Publisher",
    subtitle:
      "Create a video NFT from files up to 10GB and share it on any NFT marketplace.",
    href: "https://www.longtake.xyz",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps", "Marketplaces"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem; I did not verify an official LongTake NFT Publisher homepage/social in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:14]{index=14}

  {
    title: "Minds",
    subtitle: "Free speech-focused decentralized social platform",
    href: "https://www.minds.com",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.minds.com",
    categoryTags: ["Social Media"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed in Livepeer ecosystem under Social Media.",
    cta: "Explore Minds channels; look for their official community links on-site.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:15]{index=15}

  {
    title: "Mintflick",
    subtitle: "Platform for minting and sharing video NFTs.",
    href: "https://mintflick.app",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://mintflick.app",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed in ecosystem as a video NFT mint/share platform.",
    cta: "Open Mintflick and look for their community links in footer/about.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:16]{index=16}

  {
    title: "Monaverse (Mona)",
    subtitle: "Interoperable 3D objects, avatars and experiences",
    href: "https://monaverse.com",
    mediaSrc: "https://www.youtube.com/@monaverse",
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://monaverse.com",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Mona is listed in ecosystem; official GitHub org + Discord + X exist.",
    cta: "Join their Discord and follow @monaverse.",
    links: [
      { github: "https://github.com/monaverse" },
      { youtube: "https://www.youtube.com/@monaverse" },
      { blog: null },
      { x: "https://x.com/monaverse" },
      { discord: "https://monaverse.com/discord" },
    ],
  }, // :contentReference[oaicite:17]{index=17}

  {
    title: "Orb",
    subtitle: "Decentralized social network alternative.",
    href: "https://orb.ac",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://orb.ac",
    categoryTags: ["Apps", "Social Media"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed in ecosystem under Social Media.",
    cta: "Open Orb and follow their on-site socials (not verified in this pass).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:18]{index=18}

  {
    title: "Picarto.tv",
    subtitle: "Creative live streaming service for artists",
    href: "https://picarto.tv",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://picarto.tv",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Creative livestreaming platform listed in ecosystem; official GitHub org exists.",
    cta: "Browse live streams; developers can inspect Picarto’s public repos.",
    links: [
      { github: "https://github.com/picartotv" },
      { youtube: null },
      { blog: null },
      { x: null },
    ],
  }, // :contentReference[oaicite:19]{index=19}

  {
    title: "Pinsta",
    subtitle: "Decentralized Image & Video Sharing service",
    href: "https://pinsta.xyz",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://pinsta.xyz",
    categoryTags: ["Social Media"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem; official GitHub org, Discord invite, and X handle are published on their GitHub org page.",
    cta: "Join their Discord and follow @PinstaApp.",
    links: [
      { github: "https://github.com/PinstaApp" },
      { youtube: null },
      { blog: null },
      { x: "https://x.com/PinstaApp" },
      { discord: "https://discord.com/invite/7eCKW2Y3az" },
    ],
  }, // :contentReference[oaicite:20]{index=20}

  {
    title: "Radar",
    subtitle: null,
    href: "https://www.radardao.xyz",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.radardao.xyz",
    categoryTags: ["Community"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed under Community in ecosystem.",
    cta: "Open RadarDAO site; use on-site socials (not verified in this pass).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:21]{index=21}

  {
    title: "SankoTV",
    subtitle: "A clubhouse for creatives",
    href: "https://sanko.tv",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://sanko.tv",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Creator clubhouse listed in ecosystem.",
    cta: "Open SankoTV and follow their published socials (not verified in this pass).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:22]{index=22}

  {
    title: "Serraform",
    subtitle: null,
    href: "https://www.serraform.com",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps", "Developer Tools"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem; I did not verify an official URL/social in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:23]{index=23}

  {
    title: "Soclly",
    subtitle: "Decentralized app for social connections.",
    href: "https://app.soclly.com",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://app.soclly.com",
    categoryTags: ["Social Media"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed under Social Media in ecosystem.",
    cta: "Open Soclly and look for official socials in-app/site (not verified in this pass).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:24]{index=24}

  {
    title: "StreamETH",
    subtitle: "Open-source livestreaming platform for Ethereum conferences.",
    href: "https://info.streameth.org",
    mediaSrc: "https://streameth.org/tv",
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://info.streameth.org",
    categoryTags: ["Apps", "Video Streaming", "AI-Powered Apps"],
    productTags: ["Livepeer Studio", "Livepeer AI"],
    description:
      "Listed in ecosystem; has an open-source repo; Livepeer forum proposal explicitly references Livepeer AI + Livepeer Studio usage.",
    cta: "Watch on StreamETH TV and browse the open-source repo.",
    links: [
      { github: "https://github.com/streamethorg/streameth-platform" },
      { youtube: null },
      { blog: null },
      { x: null },
    ],
  }, // :contentReference[oaicite:25]{index=25}

  {
    title: "Switchboard",
    subtitle: "Tool for launching decentralized livestreams.",
    href: "https://switchboard.live",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://switchboard.live",
    categoryTags: ["Developer Tools"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed under Developer Tools in ecosystem.",
    cta: "Open Switchboard and use their docs/onboarding.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:26]{index=26}

  {
    title: "The Lot Radio",
    subtitle: "24/7 Livestream of over 165 resident DJs",
    href: "https://www.thelotradio.com",
    mediaSrc: "https://www.youtube.com/thelotradio",
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.thelotradio.com",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Studio (case study)"],
    description:
      "Listed in ecosystem; Livepeer Studio published a customer/case story; YouTube channel provides continuous media.",
    cta: "Watch on YouTube; read the Livepeer Studio story.",
    links: [
      { github: null },
      { youtube: "https://www.youtube.com/thelotradio" },
      { blog: "https://livepeer.studio/blog/lotradio" },
      { x: null },
    ],
  }, // :contentReference[oaicite:27]{index=27}

  {
    title: "Tribe Social",
    subtitle:
      "Premium alternative to Facebook Private Groups with a custom app platform",
    href: "https://www.tribesocial.io",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.tribesocial.io",
    categoryTags: ["Apps", "Community"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem; actively maintained (Google Play listing shows updates).",
    cta: "Book a demo or install the Android app.",
    links: [
      { github: null },
      { youtube: null },
      { blog: "https://www.tribesocial.io/blog" },
      { x: null },
      {
        android:
          "https://play.google.com/store/apps/details?id=com.tribesocial.app",
      },
    ],
  }, // :contentReference[oaicite:28]{index=28}

  {
    title: "Unlonely",
    subtitle:
      "Crypto-native livestreaming platform with fun, gamified features",
    href: "https://www.unlonely.app",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.unlonely.app",
    categoryTags: ["Apps"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed in ecosystem; official X account exists.",
    cta: "Follow @unlonely_app for stream drops and updates.",
    links: [
      { github: null },
      { youtube: null },
      { blog: null },
      { x: "https://x.com/unlonely_app" },
    ],
  }, // :contentReference[oaicite:29]{index=29}

  {
    title: "Waves",
    subtitle: "Promote content onchain",
    href: "https://www.wav3s.app",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.wav3s.app",
    categoryTags: ["Social Media"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description: "Listed under Social Media in ecosystem.",
    cta: "Open WAV3S and find their official socials on-site (not verified in this pass).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:30]{index=30}

  // Video Streaming category-only item
  {
    title: "Livespace",
    subtitle:
      "Next-gen livestreaming platform built by creators, for creators.",
    href: "https://linktr.ee/livespace",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Video Streaming"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed in ecosystem under Video Streaming; I did not verify an official homepage/social in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:31]{index=31}

  // Social Media list items that are “names only” on the ecosystem page output we received
  {
    title: "Tape",
    subtitle:
      "Video-centric social app for sharing and interacting with clips.",
    href: "https://tape.xyz",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Social Media"],
    productTags: ["Livepeer Network (ecosystem listing)"],
    description:
      "Listed under Social Media; no official URL/social verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:32]{index=32}

  {
    title: "Lenster",
    subtitle: "Social platform for publishing on Lens Protocol.",
    href: "https://lenster.xyz",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Social Media"],
    productTags: ["Lens Protocol"],
    description:
      "Listed under Social Media; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:33]{index=33}

  {
    title: "LensShare",
    subtitle: "Media sharing app within the Lens ecosystem.",
    href: "https://www.lens.xyz",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Social Media"],
    productTags: ["Lens Protocol"],
    description:
      "Listed under Social Media; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:34]{index=34}

  {
    title: "Lens Media Snapshots",
    subtitle: "Decentralized media sharing app built on the Lens Protocol.",
    href: "https://www.lens.xyz",
    mediaSrc: null,
    logo: null,
    categoryTags: ["Apps", "Social Media"],
    productTags: ["Lens Protocol"],
    description:
      "Listed under Apps/Social Media; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:35]{index=35}

  // AI-Powered Apps (the ones with actual URLs visible in our ecosystem scrape)
  {
    title: "Tsunameme",
    subtitle: "Making GIF expressions with generative AI",
    href: "https://www.tsunameme.ai",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer AI (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:36]{index=36}

  {
    title: "Cloud AI Generator",
    subtitle: "A Livepeer Image and video Generation Testing Tool",
    href: "https://ai-generator.livepeer.cloud",
    mediaSrc: null,
    logo: "https://www.google.com/s2/favicons?sz=256&domain_url=https://ai-generator.livepeer.cloud",
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer Cloud"],
    description:
      "Livepeer-hosted generator/testing tool listed under AI-Powered Apps.",
    cta: "Open the generator and test outputs.",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:37]{index=37}

  {
    title: "Let's Generate",
    subtitle: "Image generation",
    href: "https://letsgenerate.ai",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer AI (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:38]{index=38}

  {
    title: "Inference (by Stronk)",
    subtitle: "Craft images and videos from text",
    href: "https://inference.stronk.rocks",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer AI (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:39]{index=39}

  {
    title: "Origin Stories",
    subtitle: "Custom generation tools & co-created experiences",
    href: "https://mobile.x.com",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer AI (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:40]{index=40}

  {
    title: "Flipguard",
    subtitle:
      "Web3 to discord with flipsuite for engagement, reward systems, games, and economy.",
    href: "https://www.flipguard.xyz",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer Network (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:41]{index=41}

  {
    title: "Refraction",
    subtitle: "Artist-owned community for digital art, music and culture",
    href: "https://www.refractionfestival.com",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer Network (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:42]{index=42}

  {
    title: "New Coin",
    subtitle: "Earn Newcoin based on your Creative Energy, measured in Watts.",
    href: "https://www.newcoin.org",
    mediaSrc: null,
    logo: null,
    categoryTags: ["AI-Powered Apps"],
    productTags: ["Livepeer Network (ecosystem listing only)"],
    description:
      "Listed under AI-Powered Apps; no official URL verified in this pass.",
    cta: "No verifiable source found (official link/social).",
    links: [{ github: null }, { youtube: null }, { blog: null }, { x: null }],
  }, // :contentReference[oaicite:43]{index=43}
];
