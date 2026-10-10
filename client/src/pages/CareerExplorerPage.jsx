import React, { useState, useEffect } from 'react';
import { Compass, Search } from 'lucide-react';
import CareerCard from '../components/CareerCard';
import Input from '../components/Input';
import Select from '../components/Select';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { careerService } from '../services/careerService';

const SECTORS = [
  'All', 'Technology', 'Healthcare', 'Engineering', 'Agriculture', 'Finance',
  'Education', 'Research', 'Business', 'Design', 'Media', 'Government', 'Environment'
];

export default function CareerExplorerPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    sector: 'All',
  });

  useEffect(() => {
    fetchCareers();
  }, [filters]);

  const fetchCareers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await careerService.getCareers(filters);
      setCareers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch career paths.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-warmIvory flex items-center space-x-3">
          <Compass className="w-8 h-8 text-softLilac" />
          <span>Career Path Explorer</span>
        </h1>
        <p className="text-mutedText text-sm max-w-2xl">
          Discover modern industry career roles, skill requirements, and educational progression pathways.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-cardBg border border-borderColor rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-1/2">
            <Input
              placeholder="Search by career title, skill, or role..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <Select
              label="Filter by Sector"
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              options={SECTORS}
              placeholder=""
            />
          </div>
        </div>
      </div>

      {/* Career Grid */}
      {loading ? (
        <LoadingSpinner text="Fetching career pathways database..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchCareers} />
      ) : careers.length === 0 ? (
        <EmptyState
          title="No career paths found"
          description="Try searching with a different keyword or selecting 'All' sectors."
          onAction={() => setFilters({ search: '', sector: 'All' })}
          actionText="Reset Filters"
        />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-mutedText">
            <span>Showing {careers.length} career pathways</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <CareerCard key={career._id || career.id} career={career} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
