import React, { useState, useEffect } from "react";
import axios from "axios";

type CurrencyData = {
  code: string;
  amount: string;
  hedgeRatio?: number;
};

type BusinessUnit = {
  name: string;
  total: string;
  currencies: CurrencyData[];
};

const BusinessUnitExposureCard: React.FC = () => {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessUnitData = async () => {
      try {
        const res = await axios.get(
          "https://backend-5n7t.onrender.com/api/exposureUpload/buintexp"
        );
        
        setBusinessUnits(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch business unit data:", err);
        setError("Failed to load business unit data");
        setLoading(false);
      }
    };

    fetchBusinessUnitData();
  }, []);

  const getHedgeRatioColor = (ratio?: number) => {
    if (!ratio) return "bg-gray-100 text-gray-600";
    return ratio < 50 
      ? "bg-red-50 text-red-600" 
      : ratio > 75 
        ? "bg-green-50 text-green-600" 
        : "bg-yellow-50 text-yellow-600";
  };

  const getCurrencyColor = (code: string) => {
    const colors: Record<string, string> = {
      USD: "text-yellow-600",
      EUR: "text-yellow-200",
      GBP: "text-blue-400",
      CNY: "text-yellow-400",
      JPY: "text-blue-200",
      CAD: "text-green-300",
      CHF: "text-cyan-300",
      AUD: "text-[#9FD999]",
      INR: "text-blue-500"
    };
    return colors[code] || "text-gray-600";
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      "bg-gradient-to-br from-[#9CD69833] to-[#61B17833]",
      "bg-gradient-to-tl from-[#9CD69833] to-[#61B17833]", 
      "bg-gradient-to-b from-[#9CD69833] to-[#61B17833]",
      "bg-gradient-to-t from-[#9CD69833] to-[#61B17833]",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-primary-lg p-6 text-center">
        <p>Loading business unit data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-primary-lg p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary-color rounded-xl shadow-sm border border-primary-lg overflow-hidden">

      <div className="bg-primary-lt px-6 py-4 border-b border-primary-lt">
        <h3 className="text-lg font-semibold text-secondary-text">Business Unit Exposure</h3>
        <p className="text-sm text-secondary-text-dark">Net exposure and hedging status by business unit</p>
      </div>

      <div className="grid m-4 grid-cols-1 md:grid-cols-2 gap-4">
        {businessUnits.map((unit, index) => (
          <div 
            key={unit.name} 
            className={`border border-primary-lg rounded-lg p-4 hover:shadow-md transition-shadow ${getCardGradient(index)}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-secondary-text-dark">{unit.name}</h4>
              <span className="text-xl font-bold text-primary-lt">{unit.total}</span>
            </div>
            
            <div className="space-y-2">
              {unit.currencies.map((currency) => (
                <div 
                  key={`${unit.name}-${currency.code}`} 
                  className="flex justify-between items-center p-2 bg-primary-md rounded"
                >
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${getCurrencyColor(currency.code)} bg-opacity-30`}></span>
                    <span className="text-sm text-secondary-text-dark font-medium">
                      <span className={getCurrencyColor(currency.code)}>{currency.code}</span> : {currency.amount}
                    </span>
                  </div>
                  
                  {currency.hedgeRatio && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getHedgeRatioColor(currency.hedgeRatio)}`}>
                      {currency.hedgeRatio}% hedged
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="bg-secondary-color-lt px-6 py-3 text-xs text-primary border-t border-primary-lg">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default BusinessUnitExposureCard;