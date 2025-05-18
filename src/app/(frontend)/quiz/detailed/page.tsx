"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GridLines from "@/components/graphics/GridLines";
import { Trophy, Medal, Award } from "lucide-react";

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo?: { url: string };
  description: string;
  rating: number;
}

export default function DetailedPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    extendedBrokers: Broker[];
    profileSummary: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("quizDetailed");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      // Pas de données → on renvoie au quiz
      router.replace("/quiz");
    }
  }, [router]);

  if (!data) {
    // Chargeur rapide ou rien
    return null;
  }

  const { extendedBrokers, profileSummary } = data;
  const icons = [Trophy, Medal, Award];

  return (
    <div className="h-max w-screen flex flex-col items-center pt-24 pb-16">
      <GridLines cols={12} rows={7} />

      <div className="flex justify-center w-10/12 z-10 bg-white dark:bg-[#1F2937] py-12 md:py-16 border rounded-lg border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-8 w-10/12">
          <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">
            Rapport détaillé
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {profileSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extendedBrokers.map((broker, i) => {
              const Icon = icons[i] ?? Award;
              return (
                <div
                  key={broker.id}
                  className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon
                      size={24}
                      className={
                        i === 0
                          ? "text-yellow-500"
                          : i === 1
                          ? "text-gray-400"
                          : "text-orange-500"
                      }
                    />
                    <h3 className="text-lg font-semibold dark:text-white">
                      {broker.name}
                    </h3>
                  </div>

                  {broker.logo && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={broker.logo.url}
                        alt={broker.name}
                        className="h-12 object-contain"
                      />
                    </div>
                  )}

                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                   {broker.description
                     ? `${broker.description.substring(0, 120)}…`
                     : 'Pas de description disponible.'}
                 </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium dark:text-white">
                      Note : {broker.rating} / 5
                    </span>
                    <Link href={`/brokers/${broker.slug}`}>
                      <Button className="text-white bg-green-light hover:bg-green-light/70 text-sm">
                        Voir détails
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Link href="/brokers">
              <Button className="text-white bg-green-light hover:bg-green-light/70">
                Voir tous les brokers
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline">Reprendre le quiz</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
