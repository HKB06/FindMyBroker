import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import config from '../payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const envPath = path.resolve(__dirname, '../../.env');
console.log('[DEBUG] Chemin vers .env :', envPath);


dotenv.config({ path: envPath });


console.log('DATABASE_URI (stringified) =>', JSON.stringify(process.env.DATABASE_URI));
console.log('[DEBUG] DATABASE_URI :', process.env.DATABASE_URI);
console.log('[DEBUG] NEXT_PUBLIC_SERVER_URL :', process.env.NEXT_PUBLIC_SERVER_URL);

const seed = async () => {
  try {
    console.log('Démarrage du script seed...');

    
    await (payload as any).init({
      config,
      secret: process.env.PAYLOAD_SECRET,
      local: true,
    });

    console.log('✅ Payload initialisé avec succès');

    
    console.log('Suppression de tous les brokers et questions existants...');
    await payload.delete({ collection: 'brokers', where: {} });
    await payload.delete({ collection: 'questions', where: {} });
    console.log('✅ Collections brokers et questions nettoyées');

    
    const brokers: {
      name: string;
      category: 'assurance-vie' | 'bourse' | 'crypto-monnaies' | 'immobilier' | 'retraite' | 'trading' | 'autre';
      rating: number;
    }[] = [
      { name: 'Broker A', category: 'bourse', rating: 5 },
      { name: 'Broker B', category: 'crypto-monnaies', rating: 4 },
      { name: 'Broker C', category: 'trading', rating: 3 },
    ];

    for (const broker of brokers) {
      console.log('Création du broker :', broker.name);
      await payload.create({
        collection: 'brokers',
        data: {
          ...broker,
          isActive: true,
        },
      });
    }
    console.log('✅ Brokers créés');

    
    console.log('Création de la question d’exemple...');
    await payload.create({
      collection: 'questions',
      data: {
        question: 'Quel est votre niveau d’expérience en trading ?',
        category: 'experience_level',
        order: 1,
        weight: 'normal',
        choices: [
          {
            answerText: 'Débutant',
            impacts: [{ criterion: 'beginner_friendly', points: 5 }],
          },
          {
            answerText: 'Intermédiaire',
            impacts: [{ criterion: 'intermediate', points: 3 }],
          },
          {
            answerText: 'Expert',
            impacts: [{ criterion: 'advanced', points: 1 }],
          },
        ],
      },
    });
    console.log('✅ Données seed insérées avec succès');

    
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur pendant le seed :', err);
    process.exit(1);
  }
};

seed();
