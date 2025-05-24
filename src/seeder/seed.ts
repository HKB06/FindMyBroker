// scripts/seed.ts
import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import config from '../payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Charge les variables d’environnement
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seed() {
  try {
    console.log('🚀 Démarrage du seed…');

    // Initialisation de Payload
    await (payload as any).init({
      config,
      secret: process.env.PAYLOAD_SECRET,
      local: true,
    });
    console.log('✅ Payload initialisé');

    // Vider les collections existantes
    await payload.delete({ collection: 'brokers', where: {} });
    console.log('🗑️  Collections brokers nettoyées');

    // Liste des brokers avec catégories & caractéristiques
    const brokers = [
      {
        name: 'Moneta Markets',
        category: 'trading' as const,
        rating: 4,
        minimumDeposit: 100,
        tradingFees: 0.7,
        tradingInstruments: ['Forex', 'CFDs', 'Options'],
        features: ['Trading Mobile', 'Copy Trading'],
        experienceLevel: 'Intermédiaire',
        tradingStyles: ['Day Trading', 'Swing Trading'],
        referralLink: 'https://moneta.markets/ref123',
        color: 'bg-[#1E3A8A]',
        affiliateLink: 'https://affil.moneta.markets/track',
      },
      {
        name: 'Vantage',
        category: 'trading' as const,
        rating: 5,
        minimumDeposit: 200,
        tradingFees: 0.5,
        tradingInstruments: ['Forex', 'CFDs', 'Futures'],
        features: ['Trading API', 'Support 24/7'],
        experienceLevel: 'Expert',
        tradingStyles: ['Scalping', 'Long Terme'],
        referralLink: 'https://vantage.com/ref456',
        color: 'bg-[#047857]',
        affiliateLink: 'https://affil.vantage.com/track',
      },
      {
        name: 'Exness',
        category: 'trading' as const,
        rating: 5,
        minimumDeposit: 1,
        tradingFees: 0.4,
        tradingInstruments: ['Forex', 'Crypto'],
        features: ['Interface Simple', 'Copy Trading'],
        experienceLevel: 'Débutant',
        tradingStyles: ['Day Trading'],
        referralLink: 'https://exness.com/ref789',
        color: 'bg-[#B91C1C]',
        affiliateLink: 'https://affil.exness.com/track',
      },
      {
        name: 'IC Markets',
        category: 'trading' as const,
        rating: 5,
        minimumDeposit: 200,
        tradingFees: 0.3,
        tradingInstruments: ['Forex', 'ETFs', 'Options'],
        features: ['Trading Mobile', 'Support 24/7'],
        experienceLevel: 'Intermédiaire',
        tradingStyles: ['Scalping', 'Swing Trading'],
        referralLink: 'https://icmarkets.com/ref321',
        color: 'bg-[#065F46]',
        affiliateLink: 'https://affil.icmarkets.com/track',
      },
      {
        name: 'Pepperstone',
        category: 'trading' as const,
        rating: 4,
        minimumDeposit: 100,
        tradingFees: 0.6,
        tradingInstruments: ['Forex', 'Futures'],
        features: ['Copy Trading', 'Support 24/7'],
        experienceLevel: 'Expert',
        tradingStyles: ['Long Terme'],
        referralLink: 'https://pepperstone.com/ref654',
        color: 'bg-[#4B5563]',
        affiliateLink: 'https://affil.pepperstone.com/track',
      },
      {
        name: 'XTB',
        category: 'bourse' as const,
        rating: 4,
        minimumDeposit: 500,
        tradingFees: 0.2,
        tradingInstruments: ['Actions', 'ETFs'],
        features: ['Interface Simple', 'Formation'],
        experienceLevel: 'Débutant',
        tradingStyles: ['Long Terme', 'Swing Trading'],
        referralLink: 'https://xtb.com/ref987',
        color: 'bg-[#2563EB]',
        affiliateLink: 'https://affil.xtb.com/track',
      },
      {
        name: 'FXTM',
        category: 'trading' as const,
        rating: 3,
        minimumDeposit: 50,
        tradingFees: 0.8,
        tradingInstruments: ['Forex', 'CFDs'],
        features: ['Trading Mobile'],
        experienceLevel: 'Intermédiaire',
        tradingStyles: ['Day Trading'],
        referralLink: 'https://fxtm.com/ref159',
        color: 'bg-[#D97706]',
        affiliateLink: 'https://affil.fxtm.com/track',
      },
      {
        name: 'Axi',
        category: 'trading' as const,
        rating: 3,
        minimumDeposit: 0,
        tradingFees: 0.9,
        tradingInstruments: ['Forex', 'Options'],
        features: ['Trading API'],
        experienceLevel: 'Expert',
        tradingStyles: ['Scalping'],
        referralLink: 'https://axi.com/ref753',
        color: 'bg-[#9333EA]',
        affiliateLink: 'https://affil.axi.com/track',
      },
      {
        name: 'AvaTrade',
        category: 'bourse' as const,
        rating: 4,
        minimumDeposit: 1000,
        tradingFees: 0.25,
        tradingInstruments: ['Actions', 'Crypto', 'ETFs'],
        features: ['Formation', 'Support 24/7'],
        experienceLevel: 'Débutant',
        tradingStyles: ['Long Terme', 'Swing Trading'],
        referralLink: 'https://avatrade.com/ref852',
        color: 'bg-[#059669]',
        affiliateLink: 'https://affil.avatrade.com/track',
      },
      {
        name: 'Plus500',
        category: 'crypto-monnaies' as const,
        rating: 4,
        minimumDeposit: 100,
        tradingFees: 0.5,
        tradingInstruments: ['Crypto', 'CFDs'],
        features: ['Interface Simple', 'Copy Trading'],
        experienceLevel: 'Intermédiaire',
        tradingStyles: ['Day Trading', 'Swing Trading'],
        referralLink: 'https://plus500.com/ref456',
        color: 'bg-[#6B7280]',
        affiliateLink: 'https://affil.plus500.com/track',
      },
    ];

    // Création
    for (const b of brokers) {
      await (payload as any).create({
        collection: 'brokers',
        data: { ...b, isActive: true },
        overrideAccess: true,
      });
    }
    console.log(`✅ ${brokers.length} brokers créés`);

    // (Re)création d’une question d’exemple
    await payload.create({
      collection: 'questions',
      data: {
        question: "Quel est votre niveau d’expérience en trading ?",
        category: 'experience_level',
        order: 1,
        weight: 'normal',
        choices: [
          { answerText: 'Débutant',     impacts: [{ criterion: 'beginner_friendly', points: 5 }] },
          { answerText: 'Intermédiaire', impacts: [{ criterion: 'intermediate',      points: 3 }] },
          { answerText: 'Expert',        impacts: [{ criterion: 'advanced',          points: 1 }] },
        ],
      },
    });
    console.log('✅ Question seed insérée');

    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur durant le seed:', err);
    process.exit(1);
  }
}

seed();
