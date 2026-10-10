import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
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
      setError(err.message || 'Failed to load assessment questions.');
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
      setError(err.message || 'Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading Assessment..." />;
  if (error && !results) return <ErrorMessage message={error} onRetry={fetchQuestions} />;

  // RESULTS SCREEN
  if (results) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-electricLime/10 border border-electricLime/30 rounded-2xl flex items-center justify-center mx-auto text-electricLime">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-warmIvory">
            Your Interest Profile
          </h1>
          <p className="text-mutedText text-sm max-w-lg mx-auto">
            Based on your answers, here is a breakdown of your key domain inclinations.
          </p>
        </div>

        <Card className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-softLilac border-b border-borderColor pb-3">
            Domain Alignment Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.formattedProfile && results.formattedProfile.map((item) => {
              let badgeColor = 'bg-electricLime/10 border-electricLime/30 text-electricLime';
              if (item.level === 'Medium') {
                badgeColor = 'bg-softLilac/10 border-softLilac/30 text-softLilac';
              } else if (item.level === 'Low') {
                badgeColor = 'bg-bgSecondary border-borderColor text-mutedText';
              }

              return (
                <div key={item.category} className="bg-bgSecondary border border-borderColor rounded-xl p-4 flex justify-between items-center">
                  <span className="font-semibold text-warmIvory text-sm">{item.category}</span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeColor}`}>
                    {item.level}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-cardBg border border-borderColor rounded-xl p-4 text-xs text-mutedText flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-softLilac shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Disclaimer:</strong> This profile reflects your indicated preferences and academic background. It is a guide to explore matching options and does not guarantee specific career outcomes or institute admissions.
            </p>
          </div>
        </Card>

        <div className="text-center pt-4">
          <Button
            size="lg"
            onClick={() => navigate('/recommendations')}
            className="shadow-xl shadow-electricLime/10"
          >
            <span>See My Course Recommendations</span>
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>
      </div>
    );
  }

  // MULTI-STEP QUIZ INTERFACE
  const currentQuestion = questions[currentStep];
  const isAnswered = selectedAnswers[currentStep] !== undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      
      {/* Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-softLilac text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-electricLime" />
          <span>Interest Assessment</span>
        </div>
        <ProgressBar currentStep={currentStep + 1} totalSteps={questions.length} />
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <Card className="space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-semibold text-mutedText uppercase tracking-wider">
              Question {currentStep + 1} of {questions.length}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-warmIvory leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const selected = selectedAnswers[currentStep] === opt.categories;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentStep, opt.categories)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition duration-200 flex items-start space-x-3 ${
                    selected
                      ? 'bg-electricLime/10 border-electricLime text-warmIvory'
                      : 'bg-bgSecondary border-borderColor text-warmIvory/80 hover:border-softLilac hover:text-warmIvory'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                      selected ? 'border-electricLime bg-electricLime text-bgMain' : 'border-borderColor'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-borderColor">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
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

        </Card>
      )}

    </div>
  );
}
