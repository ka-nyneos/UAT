import React from "react";
import { Calendar, Clock } from "lucide-react";

const ForwardMaturityAnalysisCard: React.FC = () => {
  return (
    <div className="bg-primary-lt rounded-2xl border border-primary p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-secondary-color-lt rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-text">Forward Maturity Analysis</h3>
          <p className="text-sm text-secondary-text-dark">Upcoming Settlements and Exposures</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 h-96">
        {[
          {
            label: "Next 30 Days",
            amount: "$78.4K",
            contracts: "24 Contracts",
            gradient: "bg-secondary-color-lt",
            border: "border-primary",
            text: "text-primary",
            icon: "text-primary",
          },
          {
            label: "31-90 Days",
            amount: "$124.7K",
            contracts: "38 Contracts",
            gradient: "bg-secondary-color-lt",
            border: "border-primary",
            text: "text-primary",
            icon: "text-primary",
          },
          {
            label: "91-180 Days",
            amount: "$89.2K",
            contracts: "29 Contracts",
            gradient: "bg-secondary-color-lt",
            border: "border-primary",
            text: "text-primary",
            icon: "text-primary",
          },
          {
            label: "180+ Days",
            amount: "$52.1K",
            contracts: "16 Contracts",
            gradient: "bg-secondary-color-lt",
            border: "border-primary",
            text: "text-primary",
            icon: "text-primary",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`${item.gradient} p-6 rounded-xl ${item.border} border flex flex-col justify-center min-h-[180px]`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className={`w-5 h-5 ${item.icon}`} />
              <h4 className={`text-base font-medium ${item.text}`}>{item.label}</h4>
            </div>
            <p className="text-3xl font-bold text-secondary-text-dark mb-2">{item.amount}</p>
            <p className="text-sm text-secondary-text">{item.contracts}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForwardMaturityAnalysisCard;
