import React, { useState, useEffect } from 'react';
import { 
  Shirt, PartyPopper, Briefcase, Home, ShoppingBag, 
  Palmtree, Heart, Users, Sun, Cloud, Snowflake, 
  ThermometerSun, User, UserCircle 
} from 'lucide-react';

const AdvancedOutfitRecommender = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    occasion: '',
    gender: '',
    season: '',
    climate: '',
    bodyType: '',
    skinTone: '',
    height: ''
  });

  const [recommendations, setRecommendations] = useState(null);

  const filters = {
    gender: [
      { id: 'male', name: 'Male', icon: User },
      { id: 'female', name: 'Female', icon: UserCircle }
    ],
    occasions: [
      { id: 'home', name: 'At Home', icon: Home },
      { id: 'office', name: 'At Office', icon: Briefcase },
      { id: 'office-party', name: 'Office Party', icon: PartyPopper },
      { id: 'date-night', name: 'Date Night', icon: Heart },
      { id: 'friend-party', name: 'Party with Friends', icon: Users },
      { id: 'picnic', name: 'Outing (Picnic)', icon: Palmtree },
      { id: 'shopping', name: 'Shopping/Casual', icon: ShoppingBag }
    ],
    seasons: [
      { id: 'spring', name: 'Spring', icon: Sun, 
        tips: 'Lightweight fabrics, breathable materials, layerable pieces' },
      { id: 'summer', name: 'Summer', icon: ThermometerSun, 
        tips: 'Cotton, linen, light colors, breathable fabrics' },
      { id: 'autumn', name: 'Autumn', icon: Cloud, 
        tips: 'Medium weight fabrics, layers, warm colors' },
      { id: 'winter', name: 'Winter', icon: Snowflake, 
        tips: 'Warm fabrics, full sleeves, jackets, thermal wear' }
    ],
    climates: [
      { id: 'humid', name: 'Humid', 
        tips: 'Loose-fitting clothes, moisture-wicking fabrics' },
      { id: 'dry', name: 'Dry', 
        tips: 'Lightweight, breathable materials' },
      { id: 'hot', name: 'Hot', 
        tips: 'Cotton, light colors, loose fits' },
      { id: 'cold', name: 'Cold', 
        tips: 'Insulating materials, layered clothing' }
    ],
    bodyTypes: [
      { id: 'hourglass', name: 'Hourglass',
        tips: 'Fitted clothing that accentuates the waist, wrap dresses, high-waisted bottoms' },
      { id: 'pear', name: 'Pear',
        tips: 'A-line skirts, boot cut pants, detailed tops to balance proportions' },
      { id: 'rectangle', name: 'Rectangle',
        tips: 'Create curves with peplum tops, belted dresses, layered pieces' },
      { id: 'apple', name: 'Apple',
        tips: 'Empire waist dresses, vertical patterns, structured jackets' },
      { id: 'athletic', name: 'Athletic',
        tips: 'Ruffles, pleats, feminine details to add curves' }
    ],
    skinTones: [
      { id: 'fair', name: 'Fair',
        colors: ['Navy', 'Soft pink', 'Ruby red', 'Gray', 'Blue'] },
      { id: 'medium', name: 'Medium',
        colors: ['Jewel tones', 'Earth tones', 'Coral', 'Olive green'] },
      { id: 'wheatish', name: 'Wheatish',
        colors: ['Deep purple', 'Forest green', 'Brown', 'Maroon'] },
      { id: 'dark', name: 'Dark',
        colors: ['White', 'Bright colors', 'Pastels', 'Gold'] }
    ],
    heights: [
      { id: 'petite', name: 'Petite (Under 5\'4")',
        tips: 'Vertical stripes, monochromatic looks, high-waisted items' },
      { id: 'average', name: 'Average (5\'4" - 5\'8")',
        tips: 'Most styles work well, balanced proportions' },
      { id: 'tall', name: 'Tall (Over 5\'8")',
        tips: 'Long lines, maxi dresses, horizontal details' }
    ]
  };

  const clothingDatabase = {
    male: {
      formal: {
        hot: ['Light cotton suit', 'Linen blazer with chinos', 'Short-sleeve dress shirt'],
        cold: ['Wool suit', 'Turtleneck with blazer', 'Cashmere sweater with dress pants']
      },
      casual: {
        hot: ['Cotton t-shirt with shorts', 'Linen shirt with light pants', 'Tank top with cargo shorts'],
        cold: ['Sweater with jeans', 'Hoodie with thermal pants', 'Fleece jacket with warm pants']
      }
    },
    female: {
      formal: {
        hot: ['Sleeveless shift dress', 'Light blazer with silk top', 'Cotton wrap dress'],
        cold: ['Wool dress with tights', 'Sweater dress with boots', 'Pants suit with thermal layer']
      },
      casual: {
        hot: ['Sundress', 'Cotton top with shorts', 'Light blouse with skirt'],
        cold: ['Sweater with leggings', 'Turtleneck dress', 'Warm jacket with jeans']
      }
    }
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const generateRecommendations = () => {
    const baseRecommendations = clothingDatabase[selectedFilters.gender]?.[
      selectedFilters.occasion?.includes('office') ? 'formal' : 'casual'
    ]?.[
      ['summer', 'spring'].includes(selectedFilters.season) ? 'hot' : 'cold'
    ] || [];

    const bodyTypeTips = filters.bodyTypes.find(bt => bt.id === selectedFilters.bodyType)?.tips;
    const colorRecommendations = filters.skinTones.find(st => st.id === selectedFilters.skinTone)?.colors;

    setRecommendations({
      outfits: baseRecommendations,
      bodyTypeTips,
      colorRecommendations,
      seasonalTips: filters.seasons.find(s => s.id === selectedFilters.season)?.tips,
      climateTips: filters.climates.find(c => c.id === selectedFilters.climate)?.tips
    });
  };

  useEffect(() => {
    if (Object.values(selectedFilters).some(v => v)) {
      generateRecommendations();
    }
  }, [selectedFilters]);

  const FilterSection = ({ title, items, category }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleFilterChange(category, item.id)}
            className={`p-2 rounded-lg border transition-all ${
              selectedFilters[category] === item.id
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 justify-center">
              {item.icon && <item.icon className="w-4 h-4" />}
              <span className="text-sm">{item.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Smart Outfit Recommender
          </h2>
          <div className="space-y-6">
            <FilterSection title="Gender" items={filters.gender} category="gender" />
            <FilterSection title="Occasion" items={filters.occasions} category="occasion" />
            <FilterSection title="Season" items={filters.seasons} category="season" />
            <FilterSection title="Climate" items={filters.climates} category="climate" />
            <FilterSection title="Body Type" items={filters.bodyTypes} category="bodyType" />
            <FilterSection title="Skin Tone" items={filters.skinTones} category="skinTone" />
            <FilterSection title="Height" items={filters.heights} category="height" />
          </div>
        </div>
      </div>

      {recommendations && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Personalized Recommendations</h2>
          <div className="space-y-6">
            {recommendations.outfits && (
              <div>
                <h3 className="font-semibold mb-2">Suggested Outfits:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {recommendations.outfits.map((outfit, idx) => (
                    <li key={idx}>{outfit}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendations.bodyTypeTips && (
              <div>
                <h3 className="font-semibold mb-2">Style Tips for Your Body Type:</h3>
                <p>{recommendations.bodyTypeTips}</p>
              </div>
            )}

            {recommendations.colorRecommendations && (
              <div>
                <h3 className="font-semibold mb-2">Recommended Colors:</h3>
                <p>{recommendations.colorRecommendations.join(', ')}</p>
              </div>
            )}

            {recommendations.seasonalTips && (
              <div>
                <h3 className="font-semibold mb-2">Seasonal Considerations:</h3>
                <p>{recommendations.seasonalTips}</p>
              </div>
            )}

            {recommendations.climateTips && (
              <div>
                <h3 className="font-semibold mb-2">Climate-Specific Tips:</h3>
                <p>{recommendations.climateTips}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOutfitRecommender;