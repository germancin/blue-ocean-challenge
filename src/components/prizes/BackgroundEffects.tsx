const BackgroundEffects = () => {
  return (
    <>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("/lovable-uploads/2eca4db5-1876-4e6d-986b-871fcd2f75f2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />

      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-1 bg-bright-blue transform -skew-x-45"
            style={{ left: `${i * 15}%` }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;