import { useState, type ReactElement } from 'react';
import { Briefcase, Code, UserPlus, Loader2 } from "lucide-react";

interface RoleSelectionProps {
  onSelect: (role: "solver" | "seeker" | "connector") => Promise<void>;
}

// A subtle SVG background pattern, consistent with Onboarding
const GridPattern = () => (
  <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1IDI1NSAyMDUgMC4wNSkiPjxwYXRoIGQ9Ik0wIC41SDMybTAtMTZWMzJNMjguNSAwVjMybS0xNi0uNVYzMm0tMTYtLjVWMzJtLjUtMTZIMzIiLz48L3N2Zz4=')] opacity-100"></div>
);

export const RoleSelection = ({ onSelect }: RoleSelectionProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelect = async (role: "solver" | "seeker" | "connector") => {
    setLoading(role);
    try {
      await onSelect(role);
    } catch (error) {
      console.error("Failed to assign role", error);
      setLoading(null); // Reset loading state on error
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <GridPattern />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"></div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-2">What brings you to Bridge?</h1>
        <p className="text-gray-400 text-lg">Select your primary role to get started.</p>
      </div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <RoleCard
          icon={<Code className="w-10 h-10 text-cyan-400" />}
          title="Solver"
          description="I have a technical skillset and want to solve challenges for cash and equity."
          onClick={() => handleSelect("solver")}
          isLoading={loading === "solver"}
          borderColor="border-cyan-500"
        />
        <RoleCard
          icon={<Briefcase className="w-10 h-10 text-lime-400" />}
          title="Seeker"
          description="I have a challenge that I need help with from a top-tier technical team."
          onClick={() => handleSelect("seeker")}
          isLoading={loading === "seeker"}
          borderColor="border-lime-500"
        />
        <RoleCard
          icon={<UserPlus className="w-10 h-10 text-fuchsia-400" />}
          title="Connector"
          description="I have a network of talented founders and want to connect them with opportunities."
          onClick={() => handleSelect("connector")}
          isLoading={loading === "connector"}
          borderColor="border-fuchsia-500"
        />
      </div>
    </div>
  );
};

interface RoleCardProps {
    icon: ReactElement;
    title: string;
    description: string;
    onClick: () => void;
    isLoading: boolean;
    borderColor: string;
}

const RoleCard = ({ icon, title, description, onClick, isLoading, borderColor }: RoleCardProps) => (
  <div
    onClick={!isLoading ? onClick : undefined}
    className={`bg-white/5 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10 w-80 h-72 flex items-center justify-center text-center transform transition-all duration-300 group relative overflow-hidden ${
      isLoading 
        ? "cursor-wait"
        : "cursor-pointer hover:scale-105 hover:shadow-2xl"
    }`}
  >
    {/* Hover glow effect */}
    {!isLoading && <div className={`absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 ${borderColor} shadow-[0_0_2rem_${borderColor}]`}></div>}
    
    <div className="relative z-10">
      {isLoading ? (
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
      ) : (
        <>
          <div className="flex items-center justify-center mb-6">{icon}</div>
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </>
      )}
    </div>
  </div>
);
