import { useAuth } from '../../hooks/useAuth';
import { GoogleIcon } from '../../components/icons/GoogleIcon';

// A subtle SVG background pattern
const GridPattern = () => (
  <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1IDI1NSAyNTUgMC4wNSkiPjxwYXRoIGQ9Ik0wIC41SDMybTAtMTZWMzJNMjguNSAwVjMybS0xNi0uNVYzMm0tMTYtLjVWMzJtLjUtMTZIMzIiLz48L3N2Zz4=')] opacity-100"></div>
);

// Feature card component
interface FeatureCardProps {
    title: string;
    description: string;
    roleName: string;
}

const FeatureCard = ({ title, description, roleName }: FeatureCardProps) => (
  <div className="bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10 transition-transform hover:-translate-y-1">
    <h3 className="text-xl font-bold text-cyan-300 mb-2">{title}</h3>
    <p className="text-gray-300">
      As a <span className="font-semibold text-white">{roleName}</span>, {description}
    </p>
  </div>
);

const Onboarding = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative overflow-hidden">
      <GridPattern />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"></div>
      
      <div className="w-full max-w-5xl text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          Welcome to Bridge
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          The platform where your skills solve real-world problems and earn rewards. Connect, collaborate, and create impact.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            title="Post Challenges"
            roleName="Seeker"
            description="post challenges and find the best talent to solve them."
          />
          <FeatureCard 
            title="Showcase Skills"
            roleName="Solver"
            description="solve challenges, showcase your skills, and earn rewards."
          />
          <FeatureCard 
            title="Build Connections"
            roleName="Connector"
            description="connect seekers with solvers and earn a commission."
          />
        </div>

        <button 
          onClick={signInWithGoogle}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg font-semibold inline-flex items-center gap-3"
        >
          <GoogleIcon className="w-6 h-6" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
