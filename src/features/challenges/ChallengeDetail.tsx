import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface Challenge {
  id: string;
  title: string;
  description: string;
  isDraft: boolean;
}

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'challenges', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setChallenge({ id: docSnap.id, ...docSnap.data() } as Challenge);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching challenge: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-surface">Loading Challenge...</div>;
  }

  if (!challenge) {
    return <div className="flex items-center justify-center h-screen bg-surface">Challenge not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">{challenge.title}</CardTitle>
            {challenge.isDraft && <Badge variant="outline">Draft</Badge>}
          </div>
          <CardDescription>This is a draft generated from the onboarding flow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{challenge.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
