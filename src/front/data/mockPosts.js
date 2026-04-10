export const mockPosts = [
  {
    id: 1,
    company: {
      name: 'Valve Corporation',
      logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop',
      verified: true,
    },
    content: {
      text: "🎮 Counter-Strike 2 Major Update!\n\nWe're excited to announce a massive content update featuring:\n• New competitive map: Anubis\n• Improved smoke physics\n• Enhanced matchmaking system\n• 20+ weapon skin additions\n\nDownload now and jump into the action!",
      image: 'https://images.unsplash.com/photo-1628089700970-0012c5718efc?w=1080&q=80',
      type: 'update',
    },
    timestamp: '2 hours ago',
    stats: {
      likes: 45823,
      comments: 1247,
      shares: 892,
    },
  },
  {
    id: 2,
    company: {
      name: 'CD PROJEKT RED',
      logo: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=100&h=100&fit=crop',
      verified: true,
    },
    content: {
      text: '🌃 Cyberpunk 2077: Phantom Liberty Expansion\n\nNight City has never looked better. Experience an all-new spy-thriller campaign starring Idris Elba.',
      image: 'https://images.unsplash.com/photo-1641650265007-b2db704cd9f3?w=1080&q=80',
      type: 'release',
    },
    timestamp: '5 hours ago',
    stats: {
      likes: 67234,
      comments: 2341,
      shares: 1456,
    },
  },
  // ... puedes añadir el resto siguiendo este formato
];