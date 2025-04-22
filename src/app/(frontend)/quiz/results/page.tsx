"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GridLines from "@/components/graphics/GridLines";
import { ScanSearch, Trophy, Medal, Award } from "lucide-react";

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo?: { url: string };
  description: string;
  rating: number;
}
interface QuizResults {
  success: boolean;
  topBrokers?: Broker[];
  summary: string;
  answers?: unknown;
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);

  /* Récupère les résultats stockés par QuizPage */
  useEffect(() => {
    const stored = localStorage.getItem("quizResults");
    if (stored) setResults(JSON.parse(stored));
    setLoading(false);
  }, []);

  /* ─── États intermédiaires ───────────────────────────── */
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-light" />
      </div>
    );

  if (!results)
    return (
      <MessageScreen
        title="Résultats non trouvés"
        text="Veuillez d’abord compléter le quiz."
      />
    );

  /* Données avec garde */
  const topBrokers = results.topBrokers ?? [];
  const { summary, answers } = results;
  const icons = [Trophy, Medal, Award];

  if (!topBrokers.length)
    return (
      <MessageScreen
        title="Aucune recommandation trouvée"
        text="Essayez de refaire le quiz pour affiner vos critères."
      />
    );

  /* ─── Rendu principal ────────────────────────────────── */
  return (
    <div className="h-max w-screen flex flex-col items-center pt-24 md:pt-36 pb-16">
      <GridLines cols={12} rows={7} />

      <div className="flex justify-center w-10/12 z-10 bg-white dark:bg-[#1F2937] py-12 md:py-16 border rounded-lg border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-8 w-10/12">
          {/* Logo */}
          <Logo />

          {/* Titre & résumé */}
          <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">
            Voici les brokers qui vous correspondent le mieux
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{summary}</p>

          {/* Cartes brokers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topBrokers.map((broker, i) => {
              const Icon = icons[i] ?? Award;
              return (
                <BrokerCard key={broker.id} broker={broker} Icon={Icon} index={i} />
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button
              variant="outline"
              className="border-2 border-green-light text-green-light hover:text-green-light/70 hover:border-green-light/70"
              onClick={() => handleDetailedReport(answers)}
            >
              Recevoir un rapport détaillé
            </Button>

            <Link href="/quiz">
              <Button className="text-white bg-green-light hover:bg-green-light/70">
                Refaire le quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sous‑composants utilitaires ─────────────────────── */

function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl md:text-2xl text-black dark:text-white">
      <ScanSearch size={28} className="text-green-dark" />
      <span className="bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text">
        FindMyBroker<span className="font-bold">.io</span>
      </span>
    </div>
  );
}

function BrokerCard({
  broker,
  Icon,
  index,
}: {
  broker: Broker;
  Icon: typeof Trophy;
  index: number;
}) {
  return (
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Icon
          size={24}
          className={
            index === 0
              ? "text-yellow-500"
              : index === 1
              ? "text-gray-400"
              : "text-orange-500"
          }
        />
        <h3 className="text-lg font-semibold dark:text-white">{broker.name}</h3>
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
        {broker.description?.substring(0, 120)}...
      </p>

      <div className="flex justify-between items-center">
        <RatingStars rating={broker.rating} />
        <Link href={`/brokers/${broker.slug}`}>
          <Button className="text-white bg-green-light hover:bg-green-light/70 text-sm">
            Voir détails
          </Button>
        </Link>
      </div>
    </div>
  );
}

function RatingStars({ rating = 0 }: { rating: number }) {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2 dark:text-white">Note&nbsp;:</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function MessageScreen({ title, text }: { title: string; text: string }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4 dark:text-white">{title}</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{text}</p>
        <Link href="/quiz">
          <Button className="text-white bg-green-light hover:bg-green-light/70">
            Faire le quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}

function handleDetailedReport(answers: unknown) {
  const email = prompt(
    "Entrez votre email pour recevoir un rapport détaillé :"
  );
  if (!email) return;

  fetch("/api/quiz/detailed-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, email }),
  })
    .then((res) => res.json())
    .then(() => alert("Rapport détaillé envoyé à votre email !"))
    .catch((err) => {
      console.error("Error sending detailed report:", err);
      alert("Erreur lors de l'envoi du rapport détaillé.");
    });
}
