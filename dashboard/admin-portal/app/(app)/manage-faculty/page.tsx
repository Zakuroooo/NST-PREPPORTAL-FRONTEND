"use client";

import { useState } from 'react';

const mockFacultyData = [
  { id: 1, name: 'Dr. Alan Mathison', initials: 'AM', stream: 'Computer Science', status: 'ACTIVE', email: 'alan@university.edu' },
  { id: 2, name: 'Prof. Sarah Jenkins', initials: 'SJ', stream: 'Mathematics', status: 'ACTIVE', email: 's.jenkins@university.edu' },
  { id: 3, name: 'Dr. Marcus Reed', initials: 'MR', stream: 'Software Engineering', status: 'INVITE PENDING', email: 'm.reed@university.edu' },
  { id: 4, name: 'Prof. Elena Lopez', initials: 'EL', stream: 'Data Science', status: 'ACTIVE', email: 'elena.l@university.edu' },
  { id: 5, name: 'Dr. Rachel Green', initials: 'RG', stream: 'Machine Learning', status: 'ACTIVE', email: 'r.green@university.edu' },
  { id: 6, name: 'Dr. Sheldon Cooper', initials: 'SC', stream: 'Quantitative Analysis', status: 'ACTIVE', email: 's.cooper@university.edu' },
  { id: 7, name: 'Prof. John Doe', initials: 'JD', stream: 'Cybersecurity', status: 'INVITE PENDING', email: 'j.doe@university.edu' },
  { id: 8, name: 'Dr. Emily Brown', initials: 'EB', stream: 'Cloud Computing', status: 'ACTIVE', email: 'e.brown@university.edu' },
  { id: 9, name: 'Dr. Michael Chen', initials: 'MC', stream: 'Artificial Intelligence', status: 'ACTIVE', email: 'm.chen@university.edu' },
  { id: 10, name: 'Prof. Lisa Wong', initials: 'LW', stream: 'Web Development', status: 'ACTIVE', email: 'l.wong@university.edu' },
  { id: 11, name: 'Dr. David Smith', initials: 'DS', stream: 'Database Systems', status: 'ACTIVE', email: 'd.smith@university.edu' },
  { id: 12, name: 'Prof. James Wilson', initials: 'JW', stream: 'Computer Networks', status: 'INVITE PENDING', email: 'j.wilson@university.edu' },
  { id: 13, name: 'Dr. Anna Taylor', initials: 'AT', stream: 'Software Testing', status: 'ACTIVE', email: 'a.taylor@university.edu' },
  { id: 14, name: 'Prof. Robert Moore', initials: 'RM', stream: 'Information Systems', status: 'ACTIVE', email: 'r.moore@university.edu' },
  { id: 15, name: 'Dr. William White', initials: 'WW', stream: 'DevOps Engineering', status: 'ACTIVE', email: 'w.white@university.edu' },
  { id: 16, name: 'Prof. Charles Harris', initials: 'CH', stream: 'Human-Computer Interaction', status: 'ACTIVE', email: 'c.harris@university.edu' },
  { id: 17, name: 'Dr. Daniel Clark', initials: 'DC', stream: 'Internet of Things', status: 'INVITE PENDING', email: 'd.clark@university.edu' },
  { id: 18, name: 'Prof. Thomas Lewis', initials: 'TL', stream: 'Blockchain Technology', status: 'ACTIVE', email: 't.lewis@university.edu' },
  { id: 19, name: 'Dr. Richard Walker', initials: 'RW', stream: 'Mobile App Development', status: 'ACTIVE', email: 'r.walker@university.edu' },
  { id: 20, name: 'Prof. Joseph Hall', initials: 'JH', stream: 'Game Development', status: 'ACTIVE', email: 'j.hall@university.edu' },
];

export default function ManageFacultyPage() {
  const [faculty, setFaculty] = useState(mockFacultyData);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  
  // Edit State
  const [editingFaculty, setEditingFaculty] = useState<any>(null);
  
  // Remove State
  const [removingFacultyId, setRemovingFacultyId] = useState<number | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Add Faculty State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: '', email: '', stream: '' });

  const toggleMenu = (id: number) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditingFaculty({ ...editingFaculty, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    setFaculty(faculty.map(f => (f.id === editingFaculty.id ? editingFaculty : f)));
    setEditingFaculty(null);
  };

  const confirmRemove = () => {
    if (removingFacultyId !== null) {
      setFaculty(faculty.filter(f => f.id !== removingFacultyId));
      setRemovingFacultyId(null);
      // Adjust pagination if needed
      if (paginatedFaculty.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleNewFacultyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const submitNewFaculty = () => {
    const newId = faculty.length > 0 ? Math.max(...faculty.map(f => f.id)) + 1 : 1;
    // Extract initials, skipping titles like Dr. or Prof.
    const nameParts = newFaculty.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, '').split(' ').filter(Boolean);
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : (nameParts[0] ? nameParts[0].substring(0, 2).toUpperCase() : 'NA');

    const newEntry = {
      id: newId,
      name: newFaculty.name,
      email: newFaculty.email,
      stream: newFaculty.stream,
      initials,
      status: 'INVITE PENDING'
    };

    setFaculty([newEntry, ...faculty]);
    setIsAddModalOpen(false);
    setNewFaculty({ name: '', email: '', stream: '' });
  };

  // Filter and Pagination Logic
  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.stream.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* Add Faculty Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-lg w-full max-w-md p-8 border border-outline-variant/30 relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-on-surface">Add New Faculty</h2>
            
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Full Name</label>
                <input
                  name="name"
                  placeholder="Dr. John Doe"
                  value={newFaculty.name}
                  onChange={handleNewFacultyChange}
                  className="w-full px-3 py-2.5 bg-surface border border-outline-variant rounded-md focus:outline-none focus:border-primary text-on-surface"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
                <input
                  name="email"
                  placeholder="john.doe@university.edu"
                  value={newFaculty.email}
                  onChange={handleNewFacultyChange}
                  className="w-full px-3 py-2.5 bg-surface border border-outline-variant rounded-md focus:outline-none focus:border-primary text-on-surface"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Subject/Department</label>
                <div className="relative">
                  <select
                    name="stream"
                    value={newFaculty.stream}
                    onChange={handleNewFacultyChange}
                    className="w-full px-3 py-2.5 bg-surface border border-outline-variant rounded-md focus:outline-none focus:border-primary text-on-surface appearance-none pr-10"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <button 
                onClick={submitNewFaculty}
                disabled={!newFaculty.name || !newFaculty.email || !newFaculty.stream}
                className="w-full mt-2 py-3 bg-[#5442f5] text-white rounded-md hover:bg-[#4335c4] transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-70 shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                Add Faculty & Send Invite
              </button>

              <div className="mt-4 p-4 bg-surface-container-low border border-outline-variant/30 rounded-md flex items-start gap-3">
                <span className="material-symbols-outlined text-on-surface-variant mt-0.5">lock</span>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  A 2FA setup link will be included in the invitation email. Faculty must complete security verification before accessing placement data.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingFaculty && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Edit Faculty Details</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Name</label>
                <input
                  name="name"
                  value={editingFaculty.name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
                <input
                  name="email"
                  value={editingFaculty.email}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Stream / Expertise</label>
                <input
                  name="stream"
                  value={editingFaculty.stream}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setEditingFaculty(null)}
                className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container hover:text-on-primary-container"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {removingFacultyId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-2">Remove Faculty</h2>
            <p className="text-on-surface-variant mb-6">Are you sure you want to remove this faculty member? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setRemovingFacultyId(null)}
                className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container"
              >
                No, Keep
              </button>
              <button 
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-container-padding flex-1 min-h-[calc(100vh-64px)] bg-surface-container-low flex flex-col gap-6 relative" onClick={() => activeMenuId && setActiveMenuId(null)}>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-shadow"
              placeholder="Search by name or stream..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset pagination on search
              }}
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-on-primary font-body-md font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span className="material-symbols-outlined">add</span>Add New Faculty
          </button>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          {/* Right Panel: Current Faculty */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Current Faculty
              </h2>
              {searchQuery && (
                <span className="text-body-sm text-on-surface-variant">
                  Showing {filteredFaculty.length} result(s)
                </span>
              )}
            </div>
            
            {paginatedFaculty.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedFaculty.map((member) => (
                  <div key={member.id} className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
                          {member.initials}
                        </div>
                        <div>
                          <h3 className="font-headline-md text-on-surface text-base">
                            {member.name}
                          </h3>
                          <p className="font-body-sm text-on-surface-variant">
                            {member.stream}
                          </p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps font-bold ${member.status === 'ACTIVE' ? 'bg-teal-50 text-teal-700 border border-teal-200/50' : 'bg-amber-50 text-amber-700 border border-amber-200/50'}`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30 relative">
                      <span className="font-body-sm text-on-surface-variant truncate">
                        {member.email}
                      </span>
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleMenu(member.id); }}
                          className="text-secondary hover:text-primary transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            more_vert
                          </span>
                        </button>
                        
                        {/* Hover / Dropdown Menu */}
                        {activeMenuId === member.id && (
                          <div className="absolute right-0 bottom-full mb-2 w-32 bg-surface rounded-lg shadow-lg border border-outline-variant/50 overflow-hidden z-10 py-1">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setEditingFaculty(member); setActiveMenuId(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setRemovingFacultyId(member.id); setActiveMenuId(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface border border-outline-variant/50 rounded-xl p-10 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">person_off</span>
                <p className="text-on-surface font-medium">No faculty found.</p>
                <p className="text-on-surface-variant text-sm mt-1">Try adjusting your search criteria.</p>
              </div>
            )}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded font-medium transition-colors ${
                      currentPage === page 
                        ? 'bg-primary text-on-primary' 
                        : 'border border-outline-variant hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                TOTAL FACULTY
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                {faculty.length}
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                ACTIVE INVITES
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                {faculty.filter(f => f.status === 'INVITE PENDING').length.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                ENGAGEMENT RATE
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                92%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
