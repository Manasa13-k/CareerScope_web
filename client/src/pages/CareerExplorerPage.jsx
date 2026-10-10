import React, { useState, useEffect } from 'react';
import { Compass, Search, RotateCcw } from 'lucide-react';
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
      setError(err.message || 'Failed to load career paths.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="border-b border-borderAtlas pb-6 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-coral-light border border-coral/30 rounded-full text-coral-dark text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-coral" />
          <span>CAREER PATHWAYS DIRECTORY</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
          Industry Career Explorer
        </h1>
        
        <p className="text-ink-light text-sm sm:text-base max-w-2xl leading-relaxed">
          Discover modern professional careers, requisite domain skills, and their prerequisite undergraduate degrees across 12 economic sectors.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-4 shadow-atlas-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-1/2">
            <Input
              placeholder="Search by career role, keyword, or skill..."
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

        {/* Sector Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-borderAtlas/60 text-xs">
          <span className="font-bold text-ink-muted uppercase tracking-wider mr-1">Sector:</span>
          {SECTORS.slice(0, 7).map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => handleFilterChange('sector', sec)}
              className={`px-2.5 py-1 rounded-md font-semibold border transition ${
                filters.sector === sec
                  ? 'bg-teal text-white border-teal'
                  : 'bg-ivory border-borderAtlas text-ink-light hover:border-teal'
              }`}
            >
              {sec}
            </button>
          ))}
          {SECTORS.length > 7 && (
            <span className="text-[11px] text-ink-muted italic pl-1">+ {SECTORS.length - 7} more in dropdown</span>
          )}
        </div>
      </div>

      {/* Career Cards Grid */}
      {loading ? (
        <LoadingSpinner text="Retrieving career pathways..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchCareers} />
      ) : careers.length === 0 ? (
        <EmptyState
          title="No career pathways found"
          description="Try broadening your sector selection or clearing your keyword search."
          onAction={() => setFilters({ search: '', sector: 'All' })}
          actionText="Reset Career Filters"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-ink-muted uppercase tracking-wider border-b border-borderAtlas pb-2">
            <span>Mapped {careers.length} vocational and professional roles</span>
            <span className="font-mono text-teal">INDUSTRY ROADMAP</span>
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
