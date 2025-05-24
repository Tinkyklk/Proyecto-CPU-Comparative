import React from 'react';

const GPUCard = ({ gpu, isSelected, onSelect }) => {
  const getPerformanceLevel = (price, cores) => {
    const perfPerDollar = cores / price;
    if (perfPerDollar > 15) return 'value';
    if (perfPerDollar > 8) return 'balanced';
    return 'premium';
  };

  const performanceLevel = getPerformanceLevel(gpu.price, gpu.cores);
  const performanceColor = {
    value: 'text-green-400 border-green-400',
    balanced: 'text-yellow-400 border-yellow-400',
    premium: 'text-purple-400 border-purple-400'
  };

  return (
    <div 
      className={`p-6 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden border-2 ${
        isSelected 
          ? `${performanceColor[performanceLevel]} bg-gray-800/80 shadow-lg hover-glow` 
          : 'border-gray-700 bg-gray-800/50 hover:border-cyan-400'
      } float-card`}
      onClick={onSelect}
    >
      {/* Efecto RGB bajo la tarjeta */}
      <div className={`absolute -z-10 top-0 left-0 w-full h-full ${
        isSelected ? 'opacity-30' : 'opacity-0'
      } transition-opacity duration-500`} style={{
        background: `linear-gradient(135deg, ${performanceLevel === 'value' ? 'rgba(52, 211, 153, 0.3)' : 
          performanceLevel === 'balanced' ? 'rgba(234, 179, 8, 0.3)' : 'rgba(168, 85, 247, 0.3)'}, transparent)`
      }}></div>

      {performanceLevel === 'value' && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-10">
          BEST BANG 4 BUCK
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className={`w-14 h-14 rounded-lg mr-4 flex items-center justify-center ${
          gpu.brand === 'NVIDIA' 
            ? 'bg-green-900/40 border border-green-400/50' 
            : 'bg-red-900/40 border border-red-400/50'
        }`}>
          <span className={`text-xs font-bold ${gpu.brand === 'NVIDIA' ? 'text-green-400' : 'text-red-400'}`}>
            {gpu.brand}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-xl font-bold truncate ${gpu.brand === 'NVIDIA' ? 'text-green-400' : 'text-red-400'}`}>
            {gpu.name}
          </h3>
          <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-2">{gpu.series}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              performanceLevel === 'value' ? 'bg-green-900/20 text-green-400 border-green-400/30' :
              performanceLevel === 'balanced' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-400/30' :
              'bg-purple-900/20 text-purple-400 border-purple-400/30'
            }`}>
              {performanceLevel === 'value' ? 'ECO GAMER' :
               performanceLevel === 'balanced' ? 'SWEET SPOT' : 'ULTRA PREMIUM'}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">VRAM</p>
          <p className="font-bold text-white text-lg">{gpu.vram}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Núcleos</p>
          <p className="font-bold text-white text-lg">{gpu.cores.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Precio</p>
          <p className="font-bold text-white text-lg">${gpu.price}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Power</p>
          <p className="font-bold text-white text-lg">{gpu.powerConsumption}</p>
        </div>
      </div>
    </div>
  );
};

export default GPUCard;