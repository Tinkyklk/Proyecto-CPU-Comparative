import React, { useState } from 'react';
import GPUCard from './GPUCard';

const GPUSelector = ({ gpus, selectedGPU, onSelect, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  const seriesOptions = ['all', ...new Set(gpus.map(gpu => gpu.series))];
  const brandOptions = ['all', ...new Set(gpus.map(gpu => gpu.brand))];

  const filteredGPUs = gpus.filter(gpu => {
    const matchesSearch = 
      gpu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpu.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeries = selectedSeries === 'all' || gpu.series === selectedSeries;
    const matchesBrand = selectedBrand === 'all' || gpu.brand === selectedBrand;

    return matchesSearch && matchesSeries && matchesBrand;
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
          <input
            type="text"
            placeholder="Modelo o marca..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Serie</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
          >
            {seriesOptions.map(series => (
              <option key={series} value={series}>
                {series === 'all' ? 'Todas las series' : series}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brandOptions.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'Todas las marcas' : brand}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGPUs.length > 0 ? (
          filteredGPUs.map(gpu => (
            <GPUCard
              key={gpu.id}
              gpu={gpu}
              isSelected={selectedGPU?.id === gpu.id}
              onSelect={() => onSelect(gpu)}
            />
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-gray-500">
            No se encontraron GPUs con los filtros seleccionados
          </div>
        )}
      </div>
    </div>
  );
};

export default GPUSelector;