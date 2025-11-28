import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">TRAKT</h1>
          <p className="text-2xl mb-8 text-blue-100">
            Track your adventures, unlock achievements, share experiences
          </p>
          <p className="text-lg mb-12 text-blue-50 max-w-2xl mx-auto">
            Explore national parks, ski resorts, museums, and more. Check in at locations,
            earn badges, and connect with fellow adventurers.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors border-2 border-white"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="text-4xl mb-4">🏞️</div>
            <h3 className="text-xl font-semibold mb-2">Discover Locations</h3>
            <p className="text-blue-50">
              Browse thousands of locations across categories like National Parks, museums, and stadiums.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Track Your Journey</h3>
            <p className="text-blue-50">
              Check in at locations, keep notes, and build your personal travel map.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Earn Achievements</h3>
            <p className="text-blue-50">
              Complete challenges, unlock badges, and celebrate your accomplishments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
