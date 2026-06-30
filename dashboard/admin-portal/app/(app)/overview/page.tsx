export default function OverviewPage() {
  return (
    <>


      <div className="p-container-padding flex-1 min-h-[calc(100vh-64px)] bg-surface-container-low flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Good morning, Admin.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Here is the overview of the placement platform today.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Students on Roadmap</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">84</span>
            <span className="font-body-sm text-body-sm text-primary flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Doubts Raised</span>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">210</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Sessions Booked</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">143</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Sessions Completed</span>
            <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">118</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Avg Satisfaction</span>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">4.3</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/ 5</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-container-padding shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/50">
            <h3 className="font-headline-md text-headline-md text-on-surface">Sessions per week</h3>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export CSV
            </button>
          </div>
          <div className="flex-1 relative min-h-[250px] w-full bg-surface-container-low/30 rounded-lg border border-outline-variant/30 flex items-end p-4 gap-2">
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[30%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">12</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W1</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary/40 hover:bg-primary/60 rounded-t-sm h-[45%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">24</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W2</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary/60 hover:bg-primary/80 rounded-t-sm h-[35%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">18</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W3</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary/80 hover:bg-primary rounded-t-sm h-[60%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">42</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W4</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary hover:bg-primary/90 rounded-t-sm h-[80%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">65</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W5</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary hover:bg-primary/90 rounded-t-sm h-[70%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">54</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W6</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary/80 hover:bg-primary rounded-t-sm h-[90%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">82</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W7</div>
            </div>
            <div className="flex-1 h-full flex flex-col justify-end group">
              <div className="w-full bg-primary hover:bg-primary-container rounded-t-sm h-[100%] transition-all relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-label-caps text-label-caps">112</span>
              </div>
              <div className="text-center mt-2 font-label-caps text-label-caps text-on-surface-variant">W8</div>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-container-padding shadow-sm flex flex-col">
          <div className="mb-6 pb-4 border-b border-outline-variant/50">
            <h3 className="font-headline-md text-headline-md text-on-surface">Placement Rate</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center mb-6" style={{ background: "conic-gradient(#334155 0% 68%, #9eadc5 68% 88%, #ba1a1a 88% 100%)" }}>
              <div className="absolute inset-4 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="font-headline-lg text-headline-lg text-on-surface">68%</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">PLACED</span>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  <span className="font-body-md text-body-md text-on-surface">Placed</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">68%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-on-primary-container"></div>
                  <span className="font-body-md text-body-md text-on-surface">In Progress</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">20%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <span className="font-body-md text-body-md text-on-surface">Not Started</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">12%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-container-padding shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/50">
            <h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Sessions</h3>
            <button className="text-primary hover:text-primary-fixed font-body-sm text-body-sm font-semibold transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/50">
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Mentor</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Topic</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Date / Time</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-xs">AJ</div>
                    Alice Johnson
                  </td>
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface-variant">Mock Interview: System Design</td>
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface-variant">Today, 2:00 PM</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-secondary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/20 bg-inverse-on-surface/30 hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-xs">BS</div>
                    Bob Smith
                  </td>
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface-variant">Resume Review Clinic</td>
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface-variant">Today, 4:30 PM</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-secondary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-xs">CD</div>
                    Charlie Davis
                  </td>
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface-variant">Behavioral Q&amp;A Session</td>
                  <td className="py-3 px-4 font-data-cell text-data-cell text-on-surface-variant">Tomorrow, 10:00 AM</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-secondary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-surface-inverse text-on-primary-fixed bg-secondary-fixed border border-outline-variant rounded-xl p-container-padding shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0b1c30 1px, transparent 0)", backgroundSize: "20px 20px" }}></div>
          <div className="relative z-10 flex justify-between items-start mb-6">
            <h3 className="font-headline-md text-headline-md text-on-secondary-fixed">Live Monitor</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
              <span className="font-label-caps text-label-caps text-primary-container">ONLINE</span>
            </div>
          </div>
          <div className="relative z-10 space-y-6 flex-1">
            <div>
              <p className="font-label-caps text-label-caps text-on-secondary-fixed-variant opacity-80 mb-1">Active Users</p>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-secondary-fixed text-4xl">1,204</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <p className="font-label-caps text-label-caps text-on-secondary-fixed-variant opacity-80">Server Load</p>
                <span className="font-body-sm text-body-sm text-on-secondary-fixed">14%</span>
              </div>
              <div className="w-full bg-surface-dim/30 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-[14%]"></div>
              </div>
            </div>
          </div>
          <button className="relative z-10 mt-6 w-full bg-primary text-on-primary font-body-md text-body-md font-semibold py-3 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            Launch Monitor Console
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
