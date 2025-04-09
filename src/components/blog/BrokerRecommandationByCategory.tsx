import { fetchBrokers } from '@/lib/brokersByCategory';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { categories } from '@/lib/categories';
import { Star } from 'lucide-react';
import { RichText } from '@/components/blog/RichText';

interface Broker {
    id: string;
    name: string;
    logo: string | { url: string } | null;
    category: string;
    minimumDeposit?: string;
    rating?: number;
    description?: any;
    referralLink?: string;
}

const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        } else {
            stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
        }
    }

    return stars;
};

const BrokerRecommandationByCategory = async ({
    category
}: {
    category: string
}) => {
    const data = await fetchBrokers(category, 3, 1);
    const brokers = data?.docs || [];
    console.log('brokers', brokers);

    if (!brokers || brokers.length === 0) {
        return (
            <div className="flex flex-col gap-8">
                <p className="text-md text-white">Aucun broker trouvé dans cette catégorie. 🤕</p>
            </div>
        );
    }

    return (
        <div>
            <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {brokers.map((broker) => {
                    const categoryInfo = categories.find(cat => cat.slug === broker.category) || {
                        name: broker.category,
                        color: 'bg-gray-500'
                    };

                    return (
                        <li key={broker.id} className='flex'>
                            <div className='flex flex-col justify-between bg-white p-6 rounded-lg shadow-md w-full hover:shadow-lg transition-shadow'>
                                <div>
                                    <div className='flex items-center gap-12 mb-4'>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}${typeof broker.logo === 'object' && broker.logo !== null
                                                ? broker.logo.url
                                                : broker.logo || '/default-broker-logo.png'
                                                }`}
                                            alt={broker.name}
                                            className="h-20 w-20 rounded-full object-cover border-2 border-gray-100"
                                        />

                                        <div className='flex flex-col justify-center'>
                                            <h3 className='text-xl font-bold text-gray-800'>
                                                {broker.referralLink ? (
                                                    <Link href={broker.referralLink} target="_blank" rel="noopener noreferrer">
                                                        {broker.name}
                                                    </Link>
                                                ) : (
                                                    <span>{broker.name}</span>
                                                )}
                                            </h3>


                                            <div className='flex items-center mb-2'>
                                                {broker.rating ? (
                                                    <>
                                                        <div className="flex mr-2">
                                                            {renderStars(broker.rating)}
                                                        </div>
                                                        <span className="text-sm text-gray-600">
                                                            {broker.rating.toFixed(1)}/5
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Pas encore noté</span>
                                                )}
                                            </div>

                                            <span className={`text-xs font-medium ${categoryInfo.color} text-white px-3 py-1 rounded-full w-max`}>
                                                {categoryInfo.name}
                                            </span>

                                            <div className='text-sm text-gray-600 my-3 font-bold'>
                                                {broker.minimumDeposit ? (
                                                    <p>💰 Dépôt min. : {broker.minimumDeposit}</p>
                                                ) : (
                                                    <p>💰 Pas de dépôt minimum</p>
                                                )}
                                            </div>
                                        </div>


                                    </div>



                                    <div className='prose prose-sm max-w-none text-gray-600 mb-4'>
                                        {broker.description && <RichText data={broker.description} />}
                                    </div>
                                </div>

                                {broker.referralLink && (
                                    <Link
                                        href={broker.referralLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full mt-auto ${buttonVariants({ variant: 'default' })} ${broker.color || 'bg-[#8B5CF6]'}! text-white flex items-center justify-center py-2 rounded-lg`}
                                    >
                                        Commencer avec {broker.name}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BrokerRecommandationByCategory;