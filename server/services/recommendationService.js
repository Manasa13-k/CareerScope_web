/**
 * Recommendation Service for CareerScope
 * Uses an explainable weighted scoring algorithm:
 * - Interest Match: 40%
 * - Stream / Subject Match: 30%
 * - Career Sector Match: 20%
 * - Skill Match: 10%
 */

function calculateCourseMatch(userProfile, course) {
  // Extract user parameters
  const userStream = userProfile.stream || '';
  const userSubjects = (userProfile.subjects || []).map(s => s.toLowerCase());
  
  // Combine user profile interests and assessment top interests
  const assessmentInterests = (userProfile.assessmentResults && userProfile.assessmentResults.topInterests) || [];
  const profileInterests = userProfile.interests || [];
  const userInterestsSet = new Set([
    ...profileInterests.map(i => i.toLowerCase()),
    ...assessmentInterests.map(i => i.toLowerCase())
  ]);
  
  const userSectors = (userProfile.preferredSectors || []).map(s => s.toLowerCase());
  const userSkills = (userProfile.skills || []).map(s => s.toLowerCase());

  // Extract course parameters
  const courseStreams = (course.streams || []).map(s => s.toUpperCase());
  const courseSubjects = (course.subjects || []).concat(course.mainSubjects || []).map(s => s.toLowerCase());
  const courseInterests = (course.interests || []).map(i => i.toLowerCase());
  const courseSectors = (course.sectors || []).map(s => s.toLowerCase());
  const courseSkills = (course.skills || []).map(s => s.toLowerCase());

  // 1. INTEREST MATCH (40 points max)
  const matchedInterestsRaw = courseInterests.filter(i => userInterestsSet.has(i));
  // Format matching interests with original casing from course
  const matchingInterests = course.interests.filter((i, idx) => userInterestsSet.has(courseInterests[idx]));

  let interestScore = 0;
  if (courseInterests.length > 0 && userInterestsSet.size > 0) {
    const ratio = matchedInterestsRaw.length / Math.min(courseInterests.length, userInterestsSet.size);
    interestScore = Math.min(1, ratio) * 40;
  } else if (courseInterests.length === 0) {
    interestScore = 20; // Default baseline if no interests defined on course
  }

  // 2. STREAM / SUBJECT MATCH (30 points max)
  let streamScore = 0;
  let subjectScore = 0;

  // Stream check (20 points max)
  if (userStream && courseStreams.includes(userStream.toUpperCase())) {
    streamScore = 20;
  } else if (courseStreams.includes('OTHER') || courseStreams.length === 0) {
    streamScore = 15;
  } else if (!userStream) {
    streamScore = 10;
  }

  // Subject check (10 points max)
  const matchedSubjectsRaw = courseSubjects.filter(sub => userSubjects.some(us => sub.includes(us) || us.includes(sub)));
  const matchingSubjects = (course.mainSubjects || course.subjects || []).filter((sub, idx) => {
    const lowerSub = courseSubjects[idx];
    return userSubjects.some(us => lowerSub.includes(us) || us.includes(lowerSub));
  });

  if (userSubjects.length > 0 && courseSubjects.length > 0) {
    const subRatio = matchedSubjectsRaw.length / Math.max(1, Math.min(userSubjects.length, courseSubjects.length));
    subjectScore = Math.min(1, subRatio) * 10;
  } else {
    subjectScore = 5;
  }

  const streamSubjectScore = streamScore + subjectScore;

  // 3. CAREER SECTOR MATCH (20 points max)
  const matchedSectorsRaw = courseSectors.filter(sec => userSectors.includes(sec));
  const matchingSectors = course.sectors.filter((sec, idx) => userSectors.includes(courseSectors[idx]));

  let sectorScore = 0;
  if (userSectors.length > 0 && courseSectors.length > 0) {
    const secRatio = matchedSectorsRaw.length / Math.max(1, Math.min(userSectors.length, courseSectors.length));
    sectorScore = Math.min(1, secRatio) * 20;
  } else if (userSectors.length === 0) {
    sectorScore = 10; // Baseline neutral match
  }

  // 4. SKILL MATCH (10 points max)
  const matchedSkillsRaw = courseSkills.filter(sk => userSkills.some(us => sk.includes(us) || us.includes(sk)));
  const matchingSkills = course.skills.filter((sk, idx) => {
    const lowerSk = courseSkills[idx];
    return userSkills.some(us => lowerSk.includes(us) || us.includes(lowerSk));
  });

  let skillScore = 0;
  if (userSkills.length > 0 && courseSkills.length > 0) {
    const skRatio = matchedSkillsRaw.length / Math.max(1, Math.min(userSkills.length, courseSkills.length));
    skillScore = Math.min(1, skRatio) * 10;
  } else {
    skillScore = 5;
  }

  // TOTAL SCORE
  let totalScore = interestScore + streamSubjectScore + sectorScore + skillScore;
  totalScore = Math.min(98, Math.max(45, Math.round(totalScore))); // Normalize score nicely between 45% and 98%

  // BUILD EXPLANATION
  let explanationParts = [];
  
  if (matchingInterests.length > 0) {
    explanationParts.push(`aligns with your interest in ${matchingInterests.join(' and ')}`);
  }
  
  if (userStream && courseStreams.includes(userStream.toUpperCase())) {
    explanationParts.push(`is directly accessible with your ${userStream} intermediate stream`);
  }
  
  if (matchingSubjects.length > 0) {
    explanationParts.push(`complements your background in ${matchingSubjects.slice(0, 2).join(' and ')}`);
  }

  if (matchingSectors.length > 0) {
    explanationParts.push(`fits your preferred ${matchingSectors.join(' & ')} sector`);
  }

  let explanation = '';
  if (explanationParts.length > 0) {
    explanation = 'This course ' + explanationParts.join(', ') + '.';
  } else {
    explanation = 'This course offers an exciting pathway matching your general academic background and potential growth areas.';
  }

  return {
    course,
    matchScore: totalScore,
    matchingInterests,
    matchingSubjects,
    matchingSectors: matchingSectors.length > 0 ? matchingSectors : (course.sectors || []).slice(0, 2),
    matchingSkills,
    explanation,
  };
}

function getRecommendations(userProfile, courses) {
  const scored = courses.map(course => calculateCourseMatch(userProfile, course));
  
  // Sort by match score descending
  scored.sort((a, b) => b.matchScore - a.matchScore);
  
  return scored;
}

module.exports = {
  calculateCourseMatch,
  getRecommendations,
};
