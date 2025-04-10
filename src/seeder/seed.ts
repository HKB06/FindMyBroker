
import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import config from '../payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seed = async () => {
  try {
    console.log('Démarrage du script seed...');

    await (payload as any).init({
      config,
      secret: process.env.PAYLOAD_SECRET,
      local: true,
    });

    console.log('✅ Payload initialisé avec succès');

    await payload.delete({ collection: 'brokers', where: {} });
    await payload.delete({ collection: 'questions', where: {} });
    console.log('✅ Collections brokers et questions nettoyées');

    const brokers: {
      name: string;
      category: 'assurance-vie' | 'bourse' | 'crypto-monnaies' | 'immobilier' | 'retraite' | 'trading' | 'autre';
      rating: number;
    }[] = [
      { name: 'Moneta Markets', category: 'trading', rating: 4 },
      { name: 'Vantage', category: 'trading', rating: 4 },
      { name: 'Exness', category: 'trading', rating: 5 },
      { name: 'IC Markets', category: 'trading', rating: 5 },
      { name: 'Pepperstone', category: 'trading', rating: 4 },
      { name: 'XTB', category: 'bourse', rating: 4 },
      { name: 'FXTM', category: 'trading', rating: 3 },
      { name: 'Axi', category: 'trading', rating: 3 },
      { name: 'AvaTrade', category: 'bourse', rating: 4 },
      { name: 'Plus500', category: 'trading', rating: 4 },
    ];
    

    for (const broker of brokers) {
      await payload.create({
        collection: 'brokers',
        data: {
          ...broker,
          isActive: true,
        },
      });
    }
    console.log('✅ 10 Brokers créés');

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
