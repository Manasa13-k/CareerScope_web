import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, Plus, BookOpen, Clock, GraduationCap, Award, Layers, Briefcase } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-warmIvory flex items-center space-x-3">
            <Scale className="w-8 h-8 text-electricLime" />
            <span>Course Comparison</span>
          </h1>
          <p className="text-mutedText text-sm mt-1">
            Compare duration, eligibility, skills, higher studies, and job roles side-by-side (Up to 3 courses).
          </p>
        </div>

        {comparedCourses.length < 3 && (
          <Button onClick={openAddModal} variant="primary" size="sm" className="flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Course to Compare</span>
          </Button>
        )}
      </div>

      {comparedCourses.length === 0 ? (
        <EmptyState
          title="No courses selected for comparison"
          description="Select up to 3 courses from the Course Explorer or Recommendations to compare them side-by-side."
          actionText="Explore Courses"
          actionLink="/courses"
          icon={Scale}
        />
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-mutedText w-1/4 bg-bgSecondary rounded-l-2xl border-b border-borderColor">
                  Attribute
                </th>
                {comparedCourses.map((course) => {
                  const cId = course._id || course.id;
                  return (
                    <th key={cId} className="p-4 text-left bg-cardBg border-b border-l border-borderColor relative min-w-[220px]">
                      <button
                        onClick={() => removeCourse(cId)}
                        className="absolute top-3 right-3 p-1 text-mutedText hover:text-red-400 transition"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <h3 className="font-bold text-warmIvory text-base pr-6">{course.name}</h3>
                      <p className="text-xs text-softLilac font-medium mt-1">{course.degreeType}</p>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-borderColor text-xs">
              
              {/* Duration */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-electricLime" />
                  <span>Duration</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-mutedText bg-cardBg/40 border-l border-borderColor">
                    <Badge variant="lime">{c.duration}</Badge>
                  </td>
                ))}
              </tr>

              {/* Streams */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60">
                  Intermediate Stream
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-mutedText bg-cardBg/40 border-l border-borderColor">
                    <div className="flex flex-wrap gap-1">
                      {c.streams && c.streams.map(st => (
                        <span key={st} className="px-2 py-0.5 bg-bgSecondary border border-borderColor text-warmIvory rounded">
                          {st}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Eligibility */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60 flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-softLilac" />
                  <span>Eligibility</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-warmIvory/90 bg-cardBg/40 border-l border-borderColor leading-relaxed">
                    {c.eligibility}
                  </td>
                ))}
              </tr>

              {/* Main Subjects */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-electricLime" />
                  <span>Main Subjects</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-mutedText bg-cardBg/40 border-l border-borderColor">
                    <ul className="list-disc list-inside space-y-1">
                      {c.mainSubjects && c.mainSubjects.map((sub, i) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Skills */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-softLilac" />
                  <span>Skills Developed</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-mutedText bg-cardBg/40 border-l border-borderColor">
                    <div className="flex flex-wrap gap-1">
                      {c.skills && c.skills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 bg-bgSecondary text-warmIvory rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Higher Studies */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-electricLime" />
                  <span>Higher Studies</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-mutedText bg-cardBg/40 border-l border-borderColor">
                    <ul className="list-disc list-inside space-y-1">
                      {c.higherStudies && c.higherStudies.map((hs, i) => (
                        <li key={i}>{hs}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Job Roles */}
              <tr>
                <td className="p-4 font-semibold text-warmIvory bg-bgSecondary/60 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-softLilac" />
                  <span>Career Job Roles</span>
                </td>
                {comparedCourses.map((c) => (
                  <td key={c._id || c.id} className="p-4 text-mutedText bg-cardBg/40 border-l border-borderColor">
                    <div className="flex flex-wrap gap-1">
                      {c.jobRoles && c.jobRoles.map((jr, i) => (
                        <Badge key={i} variant="lilac">{jr}</Badge>
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
        title="Select a Course to Compare"
      >
        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-mutedText text-xs py-4">Loading course catalog...</p>
          ) : (
            allCourses
              .filter(c => !comparedCourses.some(cc => (cc._id || cc.id) === (c._id || c.id)))
              .map((c) => (
                <div
                  key={c._id || c.id}
                  onClick={() => addCourseToCompare(c)}
                  className="bg-bgSecondary hover:bg-borderColor p-3 rounded-xl cursor-pointer border border-borderColor transition flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-warmIvory text-sm">{c.name}</h4>
                    <p className="text-xs text-mutedText">{c.degreeType} • {c.duration}</p>
                  </div>
                  <Plus className="w-4 h-4 text-electricLime" />
                </div>
              ))
          )}
        </div>
      </Modal>

    </div>
  );
}
