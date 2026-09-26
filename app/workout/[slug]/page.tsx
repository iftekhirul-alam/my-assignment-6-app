import { IWorkout } from '@/components/types';
import WorkoutDetailsClient from './WorkoutDetailsClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const fetchSingleWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`API response failure state code tracking target: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Endpoint data hydration failure link issue:", error);
    return null;
  }
};

export default async function WorkoutPage({ params }: PageProps) {
  const { slug } = await params;
  const workout = await fetchSingleWorkout(slug);

  if (!workout) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">Workout routine dataset record not found on live database registers.</p>
      </div>
    );
  }

  return <WorkoutDetailsClient workout={workout} />;
}