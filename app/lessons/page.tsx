'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';

export default function LessonsPage() {
  const lessonPlans = [
    {
      id: 'young-learners',
      title: 'Young Learners (Ages 5-11)',
      level: 'A0-A1',
      duration: '8 weeks',
      hours: '20-24 contact hours',
      description: 'Game-based, interactive learning with songs, movement, and visual activities. Perfect for building confidence and basic vocabulary.',
      color: 'from-pink-400 to-rose-500',
      topics: ['Colors & Shapes', 'Animals', 'Family & Home', 'Food', 'Actions', 'Emotions', 'Weather'],
      highlights: [
        '30-40 minute lessons (short attention spans)',
        'Games, songs, and movement-based learning',
        'Weekly stickers and certificates',
        'Parent involvement guides',
        '60+ vocabulary words mastered'
      ],
      download: '/curriculum/young-learners-lesson-plans.md'
    },
    {
      id: 'beginner',
      title: 'Beginner (Teens & Adults)',
      level: 'A1-A2',
      duration: '6 weeks',
      hours: '72 total learning hours',
      description: 'Foundation course covering daily conversations, basic grammar, and real-world scenarios. Build speaking confidence from ground zero.',
      color: 'from-blue-400 to-cyan-500',
      topics: ['Introductions', 'Daily Routine', 'Family', 'Shopping', 'Travel', 'Pronunciation', 'Conversations'],
      highlights: [
        '60-minute structured lessons',
        'Real conversation examples and dialogues',
        'Practical role-play scenarios',
        'Weekly confidence assessments',
        'Complete curriculum with homework'
      ],
      download: '/curriculum/beginner-lesson-plans.md'
    },
    {
      id: 'intermediate',
      title: 'Intermediate (Teens & Adults)',
      level: 'A2-B1',
      duration: '8 weeks',
      hours: '104 total learning hours',
      description: 'Build professional communication skills and fluency. Perfect for workplace readiness and complex discussions.',
      color: 'from-green-400 to-emerald-500',
      topics: ['Opinions & Reasoning', 'Professional Skills', 'Small Talk', 'Advanced Vocabulary', 'Complex Discussions'],
      highlights: [
        'Professional workplace scenarios',
        'Meeting & presentation techniques',
        'Business email communication',
        '20-minute fluency assessments',
        'Leadership communication skills'
      ],
      download: '/curriculum/intermediate-lesson-plans.md'
    },
    {
      id: 'advanced',
      title: 'Advanced (Teens & Adults)',
      level: 'B1-B2+',
      duration: '8 weeks',
      hours: '116 total learning hours',
      description: 'Master sophisticated argumentation, cultural nuance, and specialized vocabulary. Near-native fluency.',
      color: 'from-purple-400 to-indigo-500',
      topics: ['Argumentation', 'Cultural Nuance', 'Idioms & Phrasal Verbs', 'Professional Communication', 'Academic Discourse'],
      highlights: [
        'Formal debate and persuasion',
        'Idiomatic expressions and nuance',
        'Field-specific vocabulary',
        '15-minute professional presentations',
        '4 specialized track options'
      ],
      download: '/curriculum/advanced-lesson-plans.md'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Lesson Curriculum</h1>
          <p className="text-xl text-blue-100">
            From absolute beginner to advanced fluency. All lesson plans ready to teach.
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-3xl font-bold">4</p>
              <p className="text-blue-100">Complete Programs</p>
            </div>
            <div>
              <p className="text-3xl font-bold">30</p>
              <p className="text-blue-100">Weeks of Content</p>
            </div>
            <div>
              <p className="text-3xl font-bold">~290</p>
              <p className="text-blue-100">Learning Hours</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100+</p>
              <p className="text-blue-100">Lesson Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Quick Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lessonPlans.map((plan) => (
              <a
                key={plan.id}
                href={`#${plan.id}`}
                className="p-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
              >
                <h3 className="font-bold truncate">{plan.title}</h3>
                <p className="text-sm text-gray-300">{plan.level}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Lesson Plan Cards */}
        <div className="space-y-8">
          {lessonPlans.map((plan) => (
            <div
              key={plan.id}
              id={plan.id}
              className="bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              {/* Header Bar */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <h2 className="text-3xl font-bold mb-2">{plan.title}</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold opacity-90">Level</p>
                    <p className="text-xl font-bold">{plan.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold opacity-90">Duration</p>
                    <p className="text-xl font-bold">{plan.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold opacity-90">Total Hours</p>
                    <p className="text-xl font-bold">{plan.hours}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Description */}
                <p className="text-lg text-gray-300 mb-6">{plan.description}</p>

                {/* Topics */}
                <div className="mb-8">
                  <h3 className="text-white font-bold text-lg mb-3">Topics Covered</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {plan.topics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-600 text-gray-100 px-3 py-2 rounded text-sm"
                      >
                        ✓ {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-white font-bold text-lg mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {plan.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start">
                        <span className="text-green-400 mr-3 mt-1">●</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={plan.download}
                    download
                    className={`flex-1 bg-gradient-to-r ${plan.color} text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2`}
                  >
                    <Download size={20} />
                    Download Full Plan
                  </a>
                  <button className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition">
                    View Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Information */}
        <div className="mt-16 bg-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Complete Learning Path</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-white font-bold mb-2">Young Learners Track (Ages 5-11)</h3>
              <p className="text-gray-300">
                Start with game-based, fun learning. 8 weeks of colorful, interactive lessons with songs, movement, and play-based activities.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-white font-bold mb-2">Teen & Adult Beginner Track</h3>
              <p className="text-gray-300">
                Start from zero. 6 weeks covering daily life, family, shopping, travel. Build confidence with real conversations.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-2">
              <h3 className="text-white font-bold mb-2">Intermediate Professional Track</h3>
              <p className="text-gray-300">
                Perfect for work. 8 weeks of professional skills, meetings, presentations, and sophisticated communication.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-6 py-2">
              <h3 className="text-white font-bold mb-2">Advanced Mastery Track</h3>
              <p className="text-gray-300">
                Near-native fluency. 8 weeks of advanced argumentation, cultural nuance, idioms, and specialized vocabulary.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-600 rounded-lg">
            <p className="text-gray-100 mb-4">
              <span className="font-bold text-white">Total Program Scope:</span> 30 weeks of instruction, ~290 hours of total learning time (contact + homework), and progression from A0 to B2+ proficiency levels.
            </p>
            <p className="text-gray-100">
              Each lesson plan includes detailed warmups, core content, speaking practice exercises, real conversations, homework assignments, and assessment rubrics.
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Download the lesson plan that matches your students' level. Each plan is complete with lesson details, activities, songs, games, and assessment methods.
          </p>
          <Link
            href="/programs"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition"
          >
            Book a Trial Lesson
          </Link>
        </div>
      </div>
    </div>
  );
}
