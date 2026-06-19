import fs from 'fs';
import path from 'path';

const assetsDir = './client/public/assets';

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const svgTemplate = (title, content, bgColor = '#050C1A', strokeColor = '#D4AF37') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bg-grad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${bgColor === '#050C1A' ? '#0D1B3E' : bgColor}" />
      <stop offset="100%" stop-color="#050C1A" />
    </radialGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4E8D1" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg-grad)" />
  
  <!-- Outer luxury border -->
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.3" />
  <rect x="30" y="30" width="740" height="540" fill="none" stroke="url(#gold-grad)" stroke-width="0.5" opacity="0.15" />
  
  <!-- Corner designs -->
  <path d="M 20 60 L 20 20 L 60 20" fill="none" stroke="url(#gold-grad)" stroke-width="3" />
  <path d="M 780 60 L 780 20 L 740 20" fill="none" stroke="url(#gold-grad)" stroke-width="3" />
  <path d="M 20 540 L 20 580 L 60 580" fill="none" stroke="url(#gold-grad)" stroke-width="3" />
  <path d="M 780 540 L 780 580 L 740 580" fill="none" stroke="url(#gold-grad)" stroke-width="3" />

  <!-- Center Graphic -->
  <g transform="translate(400, 270)">
    ${content}
  </g>

  <!-- Title Text -->
  <text x="400" y="520" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="28" font-weight="bold" fill="url(#gold-grad)" letter-spacing="4" filter="url(#glow)">
    ${title.toUpperCase()}
  </text>
  <text x="400" y="550" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="10" font-weight="light" fill="#F4E8D1" opacity="0.6" letter-spacing="3">
    URBAN MAHARAJA FINE DINING
  </text>
</svg>
`;

const assets = [
  {
    filename: 'hero-bg.svg',
    title: 'The Royal Court',
    bgColor: '#4A0E17',
    content: `
      <!-- Mandala pattern -->
      <circle cx="0" cy="0" r="150" fill="none" stroke="url(#gold-grad)" stroke-width="1" opacity="0.2" />
      <circle cx="0" cy="0" r="100" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.4" />
      <circle cx="0" cy="0" r="50" fill="none" stroke="url(#gold-grad)" stroke-width="2" opacity="0.6" />
      
      <!-- Crown in center -->
      <path d="M -40 20 L -50 -20 L -20 -5 L 0 -30 L 20 -5 L 50 -20 L 40 20 Z" fill="url(#gold-grad)" filter="url(#glow)" opacity="0.85" />
      <circle cx="0" cy="-35" r="5" fill="#F4E8D1" />
      <circle cx="-53" cy="-25" r="4" fill="#F4E8D1" />
      <circle cx="53" cy="-25" r="4" fill="#F4E8D1" />
      
      <!-- Sunburst spokes -->
      <g opacity="0.25">
        ${Array.from({ length: 16 }).map((_, i) => `
          <line x1="0" y1="0" x2="${Math.cos((i * Math.PI) / 8) * 180}" y2="${Math.sin((i * Math.PI) / 8) * 180}" stroke="url(#gold-grad)" stroke-width="1" />
        `).join('')}
      </g>
    `
  },
  {
    filename: 'story-chef.svg',
    title: 'Culinary Masterpieces',
    bgColor: '#4A0E17',
    content: `
      <!-- Chef Shield -->
      <path d="M -60 -80 L 60 -80 C 60 -80 70 20 0 100 C -70 20 -60 -80 -60 -80 Z" fill="none" stroke="url(#gold-grad)" stroke-width="2" filter="url(#glow)" />
      
      <!-- Crossed spoons -->
      <path d="M -30 30 L 30 -30" stroke="url(#gold-grad)" stroke-width="4" stroke-linecap="round" />
      <path d="M 30 30 L -30 -30" stroke="url(#gold-grad)" stroke-width="4" stroke-linecap="round" />
      
      <!-- Crown emblem -->
      <path d="M -20 -10 L -25 -25 L -10 -18 L 0 -32 L 10 -18 L 25 -25 L 20 -10 Z" fill="url(#gold-grad)" />
      <circle cx="0" cy="15" r="10" fill="url(#gold-grad)" />
    `
  },
  {
    filename: 'food-lobster.svg',
    title: 'Tandoori Lobster Durbar',
    content: `
      <!-- Plate -->
      <circle cx="0" cy="0" r="120" fill="none" stroke="url(#gold-grad)" stroke-width="2" opacity="0.3" />
      <circle cx="0" cy="0" r="100" fill="none" stroke="url(#gold-grad)" stroke-width="1" stroke-dasharray="5,5" opacity="0.5" />
      
      <!-- Lobster shape -->
      <path d="M 0 -70 C -15 -70 -25 -40 -20 20 C -15 40 -25 70 0 80 C 25 70 15 40 20 20 C 25 -40 15 -70 0 -70 Z" fill="url(#gold-grad)" opacity="0.8" />
      <path d="M -15 -50 C -35 -60 -45 -40 -40 -20 C -35 0 -20 -20 -20 -20" fill="none" stroke="url(#gold-grad)" stroke-width="3" />
      <path d="M 15 -50 C 35 -60 45 -40 40 -20 C 35 0 20 -20 20 -20" fill="none" stroke="url(#gold-grad)" stroke-width="3" />
      
      <!-- Garnish leaf -->
      <path d="M -10 30 Q -30 45 -20 60 Q 0 45 -10 30 Z" fill="#22c55e" opacity="0.6" />
    `
  },
  {
    filename: 'food-thali.svg',
    title: 'Maharaja Royal Thali',
    content: `
      <!-- Big Tray -->
      <circle cx="0" cy="0" r="130" fill="none" stroke="url(#gold-grad)" stroke-width="3" filter="url(#glow)" />
      <circle cx="0" cy="0" r="122" fill="none" stroke="url(#gold-grad)" stroke-width="0.5" opacity="0.5" />
      
      <!-- Katoris (Bowls) -->
      ${Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * 80;
        const y = Math.sin(angle) * 80;
        return `
          <circle cx="${x}" cy="${y}" r="28" fill="#0D1B3E" stroke="url(#gold-grad)" stroke-width="1.5" />
          <circle cx="${x}" cy="${y}" r="24" fill="none" stroke="url(#gold-grad)" stroke-width="0.5" opacity="0.3" />
        `;
      }).join('')}
      
      <!-- Rice bowl in Center -->
      <circle cx="0" cy="0" r="38" fill="#050C1A" stroke="url(#gold-grad)" stroke-width="2" />
      <circle cx="0" cy="0" r="32" fill="url(#gold-grad)" opacity="0.3" />
    `
  },
  {
    filename: 'food-biryani.svg',
    title: 'Shahi Dum Biryani',
    content: `
      <!-- Handi (Clay pot) outline -->
      <path d="M -60 40 C -60 80 -40 100 0 100 C 40 100 60 80 60 40 L 50 -10 C 50 -20 30 -30 0 -30 C -30 -30 -50 -20 -50 -10 Z" fill="none" stroke="url(#gold-grad)" stroke-width="2.5" filter="url(#glow)" />
      
      <!-- Pot neck ring -->
      <ellipse cx="0" cy="-15" rx="45" ry="10" fill="none" stroke="url(#gold-grad)" stroke-width="2" />
      <ellipse cx="0" cy="-30" rx="35" ry="8" fill="url(#gold-grad)" opacity="0.7" />
      
      <!-- Steam lines -->
      <path d="M -15 -45 Q -20 -65 -10 -85" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.5" stroke-linecap="round" />
      <path d="M 0 -48 Q 5 -70 -5 -90" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.7" stroke-linecap="round" />
      <path d="M 15 -45 Q 10 -65 20 -85" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.5" stroke-linecap="round" />
    `
  },
  {
    filename: 'food-paneer.svg',
    title: 'Paneer Khazana Tikka',
    content: `
      <!-- Fire pit overlay -->
      <ellipse cx="0" cy="80" rx="100" ry="20" fill="none" stroke="#4A0E17" stroke-width="3" opacity="0.5" />
      
      <!-- Skewer -->
      <line x1="-120" y1="20" x2="120" y2="-20" stroke="url(#gold-grad)" stroke-width="3" filter="url(#glow)" />
      
      <!-- Paneer Cubes -->
      <rect x="-60" y="-30" width="35" height="40" rx="4" fill="url(#gold-grad)" stroke="url(#gold-grad)" stroke-width="1" />
      <rect x="-10" y="-22" width="35" height="40" rx="4" fill="url(#gold-grad)" stroke="url(#gold-grad)" stroke-width="1" />
      <rect x="40" y="-15" width="35" height="40" rx="4" fill="url(#gold-grad)" stroke="url(#gold-grad)" stroke-width="1" />
      
      <!-- Capsicum slices in between -->
      <rect x="-20" y="-12" width="8" height="30" rx="1" fill="#22c55e" opacity="0.7" />
      <rect x="30" y="-5" width="8" height="30" rx="1" fill="#22c55e" opacity="0.7" />
    `
  },
  {
    filename: 'food-chicken.svg',
    title: 'Murgh Tikka Lahori',
    content: `
      <!-- Platter -->
      <ellipse cx="0" cy="60" rx="120" ry="30" fill="none" stroke="url(#gold-grad)" stroke-width="1" opacity="0.4" />
      
      <!-- Skewer -->
      <line x1="-110" y1="-10" x2="110" y2="10" stroke="url(#gold-grad)" stroke-width="3" filter="url(#glow)" />
      
      <!-- Chicken Pieces (Rounded irregular shapes) -->
      <path d="M -70 -25 C -50 -35 -40 -15 -50 0 C -60 15 -80 5 -70 -25 Z" fill="url(#gold-grad)" />
      <path d="M -20 -15 C 0 -25 10 -5 0 10 C -10 25 -30 15 -20 -15 Z" fill="url(#gold-grad)" />
      <path d="M 30 -5 C 50 -15 60 5 50 20 C 40 35 20 25 30 -5 Z" fill="url(#gold-grad)" />
    `
  },
  {
    filename: 'food-dessert.svg',
    title: 'Royal Falooda Kulfi',
    content: `
      <!-- Chalice Glass -->
      <path d="M -40 -60 L 40 -60 L 30 10 C 20 40 10 50 10 70 L -10 70 C -10 50 -20 40 -30 10 Z" fill="none" stroke="url(#gold-grad)" stroke-width="2" filter="url(#glow)" />
      <ellipse cx="0" cy="-60" rx="40" ry="8" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" />
      <path d="M -25 70 L 25 70 L 20 95 L -20 95 Z" fill="none" stroke="url(#gold-grad)" stroke-width="2" />
      
      <!-- Kulfi slice inside -->
      <path d="M -20 -50 L 20 -50 L 10 0 L -10 0 Z" fill="url(#gold-grad)" opacity="0.8" />
      
      <!-- Falooda curls -->
      <path d="M -15 -10 Q -30 10 -10 20 T 15 30" fill="none" stroke="#F4E8D1" stroke-width="1.5" opacity="0.6" />
      <path d="M -5 -20 Q 20 0 5 15 T -15 35" fill="none" stroke="#F4E8D1" stroke-width="1.5" opacity="0.5" />
    `
  },
  {
    filename: 'ambience-sheesh.svg',
    title: 'Sheesh Mahal Suite',
    content: `
      <!-- Arches framework -->
      <path d="M -150 100 L -150 -50 C -150 -150 150 -150 150 -50 L 150 100" fill="none" stroke="url(#gold-grad)" stroke-width="2.5" filter="url(#glow)" />
      <path d="M -120 100 L -120 -40 C -120 -120 120 -120 120 -40 L 120 100" fill="none" stroke="url(#gold-grad)" stroke-width="1" opacity="0.4" />
      
      <!-- Chandelier Hanging -->
      <line x1="0" y1="-100" x2="0" y2="-40" stroke="url(#gold-grad)" stroke-width="2" />
      <path d="M -40 -40 L 40 -40 C 40 -40 30 0 0 10 C -30 0 -40 -40 -40 -40 Z" fill="url(#gold-grad)" opacity="0.8" />
      
      <!-- Glowing dots (crystals) -->
      <circle cx="0" cy="20" r="4" fill="#F4E8D1" />
      <circle cx="-20" cy="12" r="3" fill="#F4E8D1" />
      <circle cx="20" cy="12" r="3" fill="#F4E8D1" />
      <circle cx="-35" cy="5" r="2.5" fill="#F4E8D1" />
      <circle cx="35" cy="5" r="2.5" fill="#F4E8D1" />
    `
  },
  {
    filename: 'ambience-courtyard.svg',
    title: 'Peacock Pavilion',
    content: `
      <!-- Peacock silhouette -->
      <path d="M -20 80 Q -10 60 -10 10 C -10 -15 -30 -30 -30 -45 C -30 -60 -15 -70 0 -70 C 15 -70 20 -50 15 -35 C 10 -20 30 0 30 40 Q 30 70 40 80 Z" fill="url(#gold-grad)" filter="url(#glow)" />
      
      <!-- Crown on bird head -->
      <path d="M -3 -75 L -10 -90 L 0 -85 L 10 -90 L 3 -75" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" />
      <circle cx="-10" cy="-93" r="2" fill="#F4E8D1" />
      <circle cx="0" cy="-88" r="2" fill="#F4E8D1" />
      <circle cx="10" cy="-93" r="2" fill="#F4E8D1" />

      <!-- Arched gateway behind -->
      <path d="M -120 80 C -120 -80 120 -80 120 80" fill="none" stroke="url(#gold-grad)" stroke-width="1.5" opacity="0.3" />
    `
  },
  {
    filename: 'ambience-darbar.svg',
    title: 'The Grand Darbar',
    content: `
      <!-- Palace Pillars -->
      <line x1="-140" y1="-100" x2="-140" y2="100" stroke="url(#gold-grad)" stroke-width="6" />
      <line x1="140" y1="-100" x2="140" y2="100" stroke="url(#gold-grad)" stroke-width="6" />
      
      <!-- Pillar capital arcs -->
      <path d="M -160 -100 Q -140 -80 -120 -100" fill="none" stroke="url(#gold-grad)" stroke-width="2" />
      <path d="M 120 -100 Q 140 -80 160 -100" fill="none" stroke="url(#gold-grad)" stroke-width="2" />

      <!-- Center table -->
      <ellipse cx="0" cy="50" rx="90" ry="20" fill="none" stroke="url(#gold-grad)" stroke-width="2.5" filter="url(#glow)" />
      
      <!-- Flower Vase in Center -->
      <path d="M -10 50 L 10 50 L 8 25 L -8 25 Z" fill="url(#gold-grad)" />
      <circle cx="0" cy="15" r="10" fill="#4A0E17" stroke="url(#gold-grad)" stroke-width="1" />
    `
  }
];

// Write all SVGs
assets.forEach(asset => {
  const content = svgTemplate(asset.title, asset.content, asset.bgColor);
  const filePath = path.join(assetsDir, asset.filename);
  fs.writeFileSync(filePath, content);
});

console.log('[Assets] Successfully generated all premium royal SVG vector visuals in client/public/assets/');
