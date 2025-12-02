import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import type { Challenge } from '../../lib/schemas';

// Skeleton loader for a card
const SkeletonCard = () => (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex justify-between items-center mt-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </CardContent>
    </Card>
  );

// Mock data for "Synthetic Liquidity"
const MOCK_CHALLENGES: Challenge[] = [
    {
      id: "mock-1",
      title: "AI-Powered Personalized Learning Platform",
      description: "Develop an adaptive learning system that uses machine learning to create personalized learning paths for students.",
      budgetRange: '$100k-$500k',
      isStealth: false,
      industryTags: ['EdTech', 'AI', 'Machine Learning'],
      createdAt: new Date(),
      publicAlias: ''
    },
    {
      id: "mock-2",
      title: "Decentralized Identity Verification",
      description: "Build a blockchain-based identity management solution to give users control over their digital identities.",
      budgetRange: '$50k-$250k',
      isStealth: true,
      publicAlias: "Stealth Startup",
      industryTags: ['Blockchain', 'Identity', 'Security'],
      createdAt: new Date(),
    },
    {
      id: "mock-3",
      title: "Sustainable Urban Farming Automation",
      description: "Create an IoT and robotics system to automate vertical farming in urban environments, optimizing for yield and resource usage.",
      budgetRange: '$250k-$1M',
      isStealth: false,
      industryTags: ['AgriTech', 'IoT', 'Robotics', 'Sustainability'],
      createdAt: new Date(),
      publicAlias: ''
    },
  ];


// Main Component
export default function ChallengeFeed() {
  const { user } = useAuth(); // Although unused, good for future personalization
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Service function to fetch challenges
    const fetchChallenges = async () => {
      setLoading(true);
      setError(null);
      try {
        const challengesCollection = collection(db, 'challenges');
        const q = query(challengesCollection, orderBy('createdAt', 'desc'), limit(20));
        const querySnapshot = await getDocs(q);
        const challengesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Challenge));
        setChallenges(challengesData);
      } catch (err) {
        setError('Failed to fetch challenges. Please try again later.');
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // Reusable card rendering function
  const renderChallengeCard = (challenge: Challenge) => (
    <Card key={challenge.id} className="transition-all hover:shadow-xl hover:-translate-y-1 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl font-bold mb-1">{challenge.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                    {challenge.isStealth ? challenge.publicAlias : "Verified Enterprise"}
                </CardDescription>
            </div>
            <Badge variant={challenge.isStealth ? "amber" : "emerald"}>
                {challenge.isStealth ? "Stealth Mode" : "Verified Client"}
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">{challenge.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {challenge.industryTags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold text-green-600">{challenge.budgetRange}</span>
            <Button onClick={() => navigate(`/challenge/${challenge.id}`)}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );

  // Loading State
  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  // Error State
  if (error) {
    return <div className="text-center py-10 px-4 bg-red-50 text-red-600 rounded-lg">{error}</div>;
  }

  // Main Render
  return (
    <div className="space-y-6">
      {/* Real Data */}
      {challenges.length > 0 && challenges.map(renderChallengeCard)}

      {/* Synthetic Liquidity (Empty State) */}
      {!loading && challenges.length === 0 && (
        <div>
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-800">No Exact Matches Found</h2>
            <p className="text-gray-600 mt-2">Here are 3 opportunities matching your skill profile:</p>
          </div>
          <div className="space-y-4">
            {MOCK_CHALLENGES.map(renderChallengeCard)}
          </div>
        </div>
      )}
    </div>
  );
}
