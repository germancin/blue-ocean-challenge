const BackgroundEffects = () => {
  return (
    <>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/lovable-uploads/5afc0bf4-60fc-4269-bbb3-bdafb47a4a7c.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) contrast(0.9)',
          transform: 'scale(1.1)',
          opacity: '0.9',
        }}
      />

      {/* Overlay with vertical lines for added depth */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 transform -skew-x-45"
            style={{ left: `${i * 15}%` }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;