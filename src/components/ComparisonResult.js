import React from 'react';

const ComparisonResult = ({ gpu1, gpu2 }) => {
  if (!gpu1 || !gpu2) return null;

  const compareValues = (val1, val2) => {
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      const diff = ((val1 - val2) / val2) * 100;
      return {
        value: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`,
        isBetter: diff > 0
      };
    }
    return { value: 'N/A', isBetter: false };
  };

  return (
    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Resultado de la Comparación</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Especificación</th>
              <th className="text-left py-3">{gpu1.name}</th>
              <th className="text-left py-3">{gpu2.name}</th>
              <th className="text-left py-3">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(gpu1).filter(key => typeof gpu1[key] !== 'object').map((key) => (
              <tr key={key} className="border-b">
                <td className="py-3 capitalize">{key}</td>
                <td className="py-3">{gpu1[key]}</td>
                <td className="py-3">{gpu2[key]}</td>
                <td className="py-3">
                  {typeof gpu1[key] === 'number' && typeof gpu2[key] === 'number' ? (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      compareValues(gpu1[key], gpu2[key]).isBetter 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {compareValues(gpu1[key], gpu2[key]).value}
                    </span>
                  ) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonResult;