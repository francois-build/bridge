import { useState, type ReactElement } from 'react';
import { Briefcase, Code, UserPlus, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

interface RoleSelectionProps {
  onSelect: (role: "solver" | "seeker" | "connector") => Promise<void>;
}

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface text-primary p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-2">What brings you to Bridge?</h1>
        <p className="text-primary-muted text-lg">Select your primary role to get started.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RoleCard
          icon={<Code className="w-10 h-10 text-action" />}
          title="Solver"
          description="I have a technical skillset and want to solve challenges for cash and equity."
          onClick={() => handleSelect("solver")}
          isLoading={loading === "solver"}
        />
        <RoleCard
          icon={<Briefcase className="w-10 h-10 text-success" />}
          title="Seeker"
          description="I have a challenge that I need help with from a top-tier technical team."
          onClick={() => handleSelect("seeker")}
          isLoading={loading === "seeker"}
        />
        <RoleCard
          icon={<UserPlus className="w-10 h-10 text-warning" />}
          title="Connector"
          description="I have a network of talented founders and want to connect them with opportunities."
          onClick={() => handleSelect("connector")}
          isLoading={loading === "connector"}
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
}

const RoleCard = ({ icon, title, description, onClick, isLoading }: RoleCardProps) => (
  <Card
    onClick={!isLoading ? onClick : undefined}
    className={`w-80 h-72 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group ${
      isLoading 
        ? "cursor-wait"
        : "cursor-pointer"
    }`}
  >
    <CardHeader className="items-center">
        <div className="w-24 h-24 rounded-full bg-surface shadow-concave flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-pressed">
            {isLoading ? <Loader2 className="w-12 h-12 text-primary-muted animate-spin" /> : icon}
        </div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
    {isLoading && !icon && (
        <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary-muted animate-spin" />
        </div>
    )}
  </Card>
);
