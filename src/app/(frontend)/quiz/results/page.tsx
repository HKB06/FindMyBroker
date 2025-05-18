"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import GridLines from "@/components/graphics/GridLines";
import { ScanSearch, Trophy, Medal, Award, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo?: { url: string };
  description?: string;
  rating: number;
}

interface QuizResults {
  success: boolean;
  topBrokers?: Broker[];
  summary: string;
  answers?: { questionId: string; selectedAnswer: string }[];
}

export default function ResultsPage(): React.ReactElement {
  const router = useRouter();

  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);

  // Radix dialog state
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("quizResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  if (!results) {
    return (
      <MessageScreen
        title="Résultats non trouvés"
        text="Veuillez d’abord compléter le quiz."
      />
    );
  }

  const topBrokers = results.topBrokers ?? [];
  const { summary, answers } = results;
  const icons = [Trophy, Medal, Award] as LucideIcon[];

  if (topBrokers.length === 0) {
    return (
      <MessageScreen
        title="Aucune recommandation trouvée"
        text="Essayez de refaire le quiz pour affiner vos critères."
      />
    );
  }

  return (
    <>
      <div className="h-max w-screen flex flex-col items-center pt-24 md:pt-36 pb-16">
        <GridLines cols={12} rows={7} />

        <div className="flex justify-center w-10/12 z-10 bg-white dark:bg-[#1F2937] py-12 md:py-16 border rounded-lg border-gray-300 dark:border-gray-700">
          <div className="flex flex-col gap-8 w-10/12">
            <Logo />

            <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">
              Voici les brokers qui vous correspondent le mieux
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topBrokers.map((broker, i) => {
                const Icon = icons[i] ?? Award;
                return (
                  <BrokerCard
                    key={broker.id}
                    broker={broker}
                    Icon={Icon}
                    index={i}
                  />
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <Button
                variant="outline"
                className="border-2 border-green-light text-green-light hover:text-green-light/70 hover:border-green-light/70"
                onClick={() => setOpen(true)}
              >
                Recevoir plus de brokers
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

      {/* Radix Dialog pour l’e-mail */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

    <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-[90vw] max-w-md shadow-lg flex flex-col gap-4">
        {/* Titre accessible */}
        <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
          Version détaillée (10 brokers)
        </Dialog.Title>

        {/* Bouton de fermeture */}
        <Dialog.Close asChild>
          <button
            aria-label="Fermer"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </Dialog.Close>

        {/* Champ email */}
        <input
          type="email"
          placeholder="Votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600"
        />

        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        <Button
          disabled={sending || !email}
          className="bg-green-light text-white hover:bg-green-light/70"
          onClick={() =>
            sendDetailed(
              email,
              answers ?? [],
              setSending,
              setErrorMsg,
              setOpen,
              router
            )
          }
        >
          {sending ? "Envoi …" : "Recevoir le rapport"}
        </Button>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
    </>
  );
}

// ───────────────────────────────────────────────────────
// Composants auxiliaires
// ───────────────────────────────────────────────────────

function Logo(): React.ReactElement {
  return (
    <div className="flex items-center gap-2 text-xl md:text-2xl text-black dark:text-white">
      <ScanSearch size={28} className="text-green-dark" />
      <span className="bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text">
        FindMyBroker<span className="font-bold">.io</span>
      </span>
    </div>
  );
}

interface BrokerCardProps {
  broker: Broker;
  Icon: LucideIcon;
  index: number;
}

function BrokerCard({
  broker,
  Icon,
  index,
}: BrokerCardProps): React.ReactElement {
  const teaser = broker.description
    ? `${broker.description.substring(0, 120)}…`
    : "Pas de description disponible.";

  let iconColor = "text-orange-500";
  if (index === 0) iconColor = "text-yellow-500";
  else if (index === 1) iconColor = "text-gray-400";

  return (
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={24} className={iconColor} />
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
        {teaser}
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
}

function MessageScreen({
  title,
  text,
}: {
  title: string;
  text: string;
}): React.ReactElement {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4 dark:text-white">
          {title}
        </h1>
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

function Centered({ children }: { children: ReactNode }): React.ReactElement {
  return <div className="h-screen flex items-center justify-center">{children}</div>;
}

function Spinner(): React.ReactElement {
  return (
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-light" />
  );
}

async function sendDetailed(
  email: string,
  answers: { questionId: string; selectedAnswer: string }[],
  setSending: (b: boolean) => void,
  setError: (msg: string) => void,
  close: (open: boolean) => void,
  router: ReturnType<typeof useRouter>
): Promise<void> {
  setSending(true);
  setError("");
  try {
    const res = await fetch("/api/quiz/detailed-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, answers }),
    });
    if (!res.ok) throw new Error("Erreur serveur");
    const data = await res.json();
    localStorage.setItem("quizDetailed", JSON.stringify(data));
    close(false);
    router.push("/quiz/detailed");
  } catch (err) {
    console.error(err);
    setError("Impossible d'envoyer le rapport. Réessayez.");
  } finally {
    setSending(false);
  }
}
