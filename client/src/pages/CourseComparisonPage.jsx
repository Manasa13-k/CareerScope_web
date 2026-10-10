import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, Plus, BookOpen, Clock, GraduationCap, Award, Layers, Briefcase, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { courseService } from '../services/courseService';

export default function CourseComparisonPage() {
  const [comparedCourses, setComparedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCompare = localStorage.getItem('careerscope_compare');
    if (savedCompare) {
      setComparedCourses(JSON.parse(savedCompare));
    }
  }, []);

  const openAddModal = async () => {
    setIsModalOpen(true);
    if (allCourses.length === 0) {
      setLoading(true);
      try {
        const data = await courseService.getCourses();
        setAllCourses(data);
      } catch (err) {
        console.error('Failed to load courses for modal:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeCourse = (id) => {
    const updated = comparedCourses.filter(c => (c._id || c.id) !== id);
    setComparedCourses(updated);
    localStorage.setItem('careerscope_compare', JSON.stringify(updated));
  };

  const addCourseToCompare = (course) => {
    const courseId = course._id || course.id;
    if (comparedCourses.some(c => (c._id || c.id) === courseId)) return;
    if (comparedCourses.length >= 3) {
      alert('Maximum of 3 courses can be compared at a time.');
      return;
    }
    const updated = [...comparedCourses, course];
    setComparedCourses(updated);
    localStorage.setItem('careerscope_compare', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-borderAtlas pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-mustard-light border border-mustard/40 rounded-full text-ink text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-teal" />
            <span>SIDE-BY-SIDE MATRIX</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-teal tracking-tight">
            Course Comparison Matrix
          </h1>
          <p className="text-ink-light text-sm max-w-xl leading-relaxed">
            Evaluate duration, prerequisite stream eligibility, core topics, and professional outcomes across up to 3 selected degree programs.
          </p>
        </div>

        {comparedCourses.length < 3 && (
          <Button onClick={openAddModal} variant="primary" size="md" className="flex items-center space-x-1.5 shadow-atlas-sm">
            <Plus className="w-4 h-4" />
            <span>Add Course to Matrix ({comparedCourses.length}/3)</span>
          </Button>
        )}
      </div>

      {comparedCourses.length === 0 ? (
        <EmptyState
          title="No courses currently selected in the matrix"
          description="Select up to 3 undergraduate programs from the Course Directory or Recommended Matches to compare their curriculums side-by-side."
          actionText="Browse Course Directory"
          actionLink="/courses"
          icon={Scale}
        />
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[700px] border-collapse bg-surface border border-borderAtlas rounded-2xl overflow-hidden shadow-atlas-sm">
            <thead>
              <tr>
                <th className="p-5 text-left text-xs font-bold uppercase tracking-wider text-teal w-1/4 bg-ivory border-b border-borderAtlas">
                  Program Attribute
                </th>
                {comparedCourses.map((course) => {
                  const cId = course._id || course.id;
                  return (
                    <th key={cId} className="p-5 text-left bg-surface border-b border-l border-borderAtlas relative min-w-[240px]">
                      <button
                        onClick={() => removeCourse(cId)}
                        className="absolute top-3 right-3 p-1 text-ink-muted hover:text-coral transition rounded-full hover:bg-sage-light"
                        title="Remove from comparison"
                        aria-label="Remove course"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-coral block mb-1">
                        {course.degreeType}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-teal pr-6">{course.name}</h3>
                      <Link to={`/courses/${cId}`} className="text-[11px] font-bold text-teal hover:text-coral inline-flex items-center space-x-1 mt-2">
                        <span>View Full Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-borderAtlas text-xs">
              
              {/* Duration */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-mustard-dark" />
                  <span>Duration</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink bg-surface border-l border-borderAtlas">
                    <Badge variant="mustard">{c.duration}</Badge>
                  </td>
                ))}
              </tr>

              {/* Streams */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60">
                  Intermediate Stream
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink bg-surface border-l border-borderAtlas">
                    <div className="flex flex-wrap gap-1">
                      {c.streams && c.streams.map(st => (
                        <span key={st} className="px-2 py-0.5 bg-ivory border border-borderAtlas text-teal font-semibold rounded text-[11px]">
                          {st}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Eligibility */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60 flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-coral" />
                  <span>Eligibility</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink-light bg-surface border-l border-borderAtlas leading-relaxed">
                    {c.eligibility}
                  </td>
                ))}
              </tr>

              {/* Main Subjects */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-teal" />
                  <span>Main Subjects</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink bg-surface border-l border-borderAtlas">
                    <ul className="space-y-1">
                      {c.mainSubjects && c.mainSubjects.map((sub, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Skills */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-mustard-dark" />
                  <span>Competencies</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink bg-surface border-l border-borderAtlas">
                    <div className="flex flex-wrap gap-1">
                      {c.skills && c.skills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 bg-sage-light text-teal rounded text-[11px] font-medium border border-borderAtlas">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Higher Studies */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-teal" />
                  <span>Higher Studies</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink-light bg-surface border-l border-borderAtlas">
                    <ul className="space-y-1">
                      {c.higherStudies && c.higherStudies.map((hs, i) => (
                        <li key={i}>• {hs}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Job Roles */}
              <tr>
                <td className="p-4 font-bold text-teal bg-ivory/60 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-coral" />
                  <span>Career Roles</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-ink bg-surface border-l border-borderAtlas">
                    <div className="flex flex-wrap gap-1">
                      {c.jobRoles && c.jobRoles.map((jr, i) => (
                        <Badge key={i} variant="teal">{jr}</Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

      {/* Add Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select a Program to Compare"
      >
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {loading ? (
            <p className="text-center text-ink-muted text-xs py-6">Loading course directory...</p>
          ) : (
            allCourses
              .filter(c => !comparedCourses.some(cc => (cc._id || cc.id) === (c._id || c.id)))
              .map((c) => (
                <div
                  key={c._id || c.id}
                  onClick={() => addCourseToCompare(c)}
                  className="bg-ivory hover:bg-sage-light p-3.5 rounded-xl cursor-pointer border border-borderAtlas transition flex justify-between items-center group"
                >
                  <div>
                    <h4 className="font-serif text-base font-bold text-teal group-hover:text-coral transition">{c.name}</h4>
                    <p className="text-xs text-ink-light">{c.degreeType} • {c.duration}</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-surface border border-borderAtlas flex items-center justify-center text-teal group-hover:bg-coral group-hover:text-white transition">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))
          )}
        </div>
      </Modal>

    </div>
  );
}
