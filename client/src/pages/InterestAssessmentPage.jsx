import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, Compass } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { assessmentService } from '../services/assessmentService';

export default function InterestAssessmentPage() {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const qData = await assessmentService.getQuestions();
      setQuestions(qData);
    } catch (err) {
      setError(err.message || 'Failed to retrieve assessment questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionIndex, optionCategories) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionCategories,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const answerList = Object.values(selectedAnswers);
      const res = await assessmentService.submitAssessment(answerList);
      setResults(res);
    } catch (err) {
      setError(err.message || 'Failed to submit assessment answers.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Retrieving assessment questionnaire..." />;
  if (error && !results) return <ErrorMessage message={error} onRetry={fetchQuestions} />;

  // RESULTS SCREEN
  if (results) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-mustard-light border border-mustard/40 rounded-2xl flex items-center justify-center mx-auto text-ink shadow-atlas-sm">
            <CheckCircle2 className="w-8 h-8 text-teal" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-coral">EVALUATION COMPLETE</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal">
            Your Interest Profile Map
          </h1>
          <p className="text-ink-light text-sm max-w-lg mx-auto leading-relaxed">
            Based on your scenario responses, here is the breakdown of your primary cognitive and domain affinities.
          </p>
        </div>

        <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-6 shadow-atlas-sm">
          <h3 className="font-serif text-xl font-bold text-teal border-b border-borderAtlas pb-3">
            Domain Affinity Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {results.formattedProfile && results.formattedProfile.map((item) => {
              let badgeColor = 'bg-mustard-light border-mustard/40 text-ink';
              if (item.level === 'Medium') {
                badgeColor = 'bg-teal-pale border-teal/20 text-teal';
              } else if (item.level === 'Low') {
                badgeColor = 'bg-ivory border-borderAtlas text-ink-muted';
              }

              return (
                <div key={item.category} className="bg-ivory border border-borderAtlas rounded-xl p-4 flex justify-between items-center">
                  <span className="font-bold text-ink text-sm">{item.category}</span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeColor}`}>
                    {item.level} Affinity
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-sage-light border border-borderAtlas rounded-xl p-4 text-xs text-ink-light flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-teal shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Methodology Notice:</strong> This profile reflects your indicated academic affinities and preferences. It is designed to guide exploration and does not predict career success or guarantee university admission.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Button
            size="lg"
            onClick={() => navigate('/recommendations')}
            className="shadow-atlas"
          >
            <span>See My Course Recommendations</span>
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>
      </div>
    );
  }

  // MULTI-STEP QUESTIONNAIRE
  const currentQuestion = questions[currentStep];
  const isAnswered = selectedAnswers[currentStep] !== undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header & Progress Indicator */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-teal text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-coral" />
          <span>CAREERSCOPE INTEREST QUESTIONNAIRE</span>
        </div>
        <ProgressBar currentStep={currentStep + 1} totalSteps={questions.length} />
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="bg-surface border-2 border-borderAtlas rounded-2xl p-6 sm:p-8 space-y-6 shadow-atlas-sm">
          
          <div className="space-y-2 border-b border-borderAtlas pb-4">
            <span className="text-xs font-mono font-bold text-ink-muted uppercase">
              QUESTION {currentStep + 1} OF {questions.length} • {currentQuestion.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-teal leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-1">
            {currentQuestion.options.map((opt, idx) => {
              const selected = selectedAnswers[currentStep] === opt.categories;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(currentStep, opt.categories)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start space-x-3 group ${
                    selected
                      ? 'bg-mustard-light/70 border-mustard-dark text-ink shadow-atlas-sm'
                      : 'bg-ivory border-borderAtlas text-ink-light hover:border-teal hover:text-teal'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                      selected ? 'border-coral bg-coral text-white' : 'border-borderAtlas bg-surface group-hover:border-teal'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="leading-relaxed font-medium">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Step Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-borderAtlas">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <Button
              size="sm"
              onClick={handleNext}
              disabled={!isAnswered || submitting}
              className="flex items-center space-x-1"
            >
              <span>{submitting ? 'Calculating...' : currentStep === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}
