import { Mail, Briefcase, GraduationCap, Calendar, MapPin, Building2, User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-6 pb-6 relative">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center -mt-12 mb-4 bg-white shadow-sm overflow-hidden">
             <div className="flex items-center justify-center w-full h-full bg-blue-600 text-white text-3xl font-bold">
               PS
             </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prof. Sharma</h1>
              <p className="text-gray-500 font-medium">Senior Faculty, Computer Science Dept.</p>
              
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  12+ Years Experience
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Bangalore Campus
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  sharma.p@newtonschool.co
                </div>
              </div>
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {["Data Structures", "Algorithms", "System Design", "Cloud Architecture"].map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Contact Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User className="w-4 h-4" /> Employee ID: EMP-4092
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Building2 className="w-4 h-4" /> Department: CS & Engineering
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" /> Joined: Aug 2021
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Mentorship Impact</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">450+</div>
                <div className="text-xs text-gray-500 mt-1">Students Mentored</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">120</div>
                <div className="text-xs text-gray-500 mt-1">Mock Interviews</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-xs text-gray-500 mt-1">Placement Rate</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-xs text-gray-500 mt-1">Rating (out of 5)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { title: "Completed Mock Interview with Aarav Patel", time: "2 hours ago" },
                { title: "Resolved doubt on System Design", time: "5 hours ago" },
                { title: "Updated curriculum for Cloud Architecture", time: "1 day ago" },
                { title: "Hosted group session on Dynamic Programming", time: "3 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
