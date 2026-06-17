import React from 'react';

const Marquee = ({ artists = [] }: { artists?: { name: string }[] }) => {
  const items = artists.length > 0 ? artists : [
    { name: 'GONE.Fludd' },
    { name: 'ЛСП' },
    { name: 'Pharaoh' },
    { name: 'Oxxxymiron' },
    { name: 'Скриптонит' },
    { name: 'Гуф' },
    { name: 'Miyagi' },
    { name: 'Boulevard Depo' },
    { name: 'ATL' },
    { name: 'FACE' },
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-container my-8">
      <div className="marquee-content">
        {repeatedItems.map((artist, idx) => (
          <div key={idx} className="marquee-item">
            <div className="w-6 h-6 animate-spin" style={{ animationDuration: '6s', color: '#f59e0b' }}>✦</div>
            <span className="mx-1 text-white/20 font-light">✦</span>
            <span>{artist.name.toUpperCase()}</span>
            <span className="mx-1 text-white/20 font-light">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
