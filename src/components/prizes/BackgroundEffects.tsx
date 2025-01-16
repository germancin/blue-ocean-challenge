const BackgroundEffects = () => {
  return (
    <>
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'url("/lovable-uploads/db3c09dc-87e2-4a05-8402-c46511f89887.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1.1) contrast(1.1)',
          transform: 'scale(1.1)',
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