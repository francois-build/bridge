import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Users, Target } from 'lucide-react';

const RoleCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  disabled,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  disabled: boolean;
}) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`bg-surface rounded-xl p-6 text-center shadow-mechanical transition-all duration-300 ${!disabled ? 'cursor-pointer hover:shadow-levitated hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'}`}>
    <Icon className="w-12 h-12 text-action mx-auto mb-4" />
    <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
    <p className="text-primary/60 text-sm">{description}</p>
  </div>
);

export const RoleSelection = () => {
  const { assignRole, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = async (role: 'solver' | 'seeker') => {
    if (!user) return;
    try {
      await assignRole(role);
      navigate(`/onboarding/${role}`);
    } catch (error) {
      console.error("Error in role selection:", error);
    }
  };

  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
        Choose Your Role
      </h1>
      <p className="text-primary/70 mb-12 max-w-xl mx-auto">
        Are you here to solve complex technical challenges, or are you looking to
        hire top-tier talent to build your vision?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <RoleCard
          icon={Target}
          title="Solver"
          description="I am a builder, an engineer, a creative technologist ready to tackle challenges."
          onClick={() => handleSelectRole('solver')}
          disabled={loading || !user}
        />
        <RoleCard
          icon={Users}
          title="Seeker"
          description="I am a founder, a product manager, a visionary looking to post a challenge."
          onClick={() => handleSelectRole('seeker')}
          disabled={loading || !user}
        />
      </div>
      {(loading || !user) && 
        <p className="mt-4 text-sm text-primary/50">Connecting to authentication service...</p>
      }
    </div>
  );
};
