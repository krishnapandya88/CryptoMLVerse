import React from 'react';
import { ExternalLink } from 'lucide-react';

export function NewsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="text-sm font-medium text-gray-400 mb-4">Breaking News</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Trump's Digital Currency Coming Soon
          </h3>
          <p className="text-gray-300 mb-4">
            Former President Trump announces plans to launch 'TrumpCoin' in Q2 2024, targeting political
            supporters and crypto enthusiasts.
          </p>
          <a
            href="https://www.lemonde.fr/en/economy/article/2025/02/03/trump-s-crypto-strategy-between-ambiguous-support-for-the-dollar-and-circumventing-the-fed_6737708_19.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-400 hover:text-purple-300"
          >
            Read article
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80"
          alt="Cryptocurrency"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-xl p-6 animate-pulse">
        <div className="text-sm font-medium text-yellow-400 mb-4">Featured</div>
        <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          TRENDING CRYPTO NEWS HERE
        </h3>
        <p className="text-gray-300 mb-4">
          Stay updated with the latest cryptocurrency trends, market analysis, and breaking news from around the world.
        </p>
        <a
          href="https://crypto.news"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300"
        >
          Visit Crypto.news
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}