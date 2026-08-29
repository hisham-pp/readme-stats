import { techMap, techGroups } from "@/config/techs.config";



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-zinc-900 font-sans p-8 pt-16">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center mb-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4">
            Tech Stack Marquee Combinations
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            These SVGs are generated entirely on the server via the <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">/api/tech-badge-marquee</code> and <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">/api/tech-icon-marquee</code> endpoints. 
            You can use the absolute URL directly in your GitHub <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">README.md</code> files.
            Use the <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">?techs=</code> query parameter to select specific technologies, or head over to the <strong><a href="/builder" className="text-zinc-200 underline">API Builder</a></strong> to visually configure your URLs!
          </p>
          <a
            href="https://github.com/hisham-pp/readme-stats"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 font-medium rounded-md hover:bg-white transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        <section className="w-full bg-zinc-950 p-8 rounded-xl border border-zinc-800 shadow-2xl mb-12">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">
            Top Languages Stats
          </h2>
          <div className="w-full bg-[#0d1117] p-8 rounded-lg flex flex-col items-center justify-center gap-8 overflow-hidden border border-zinc-800 mb-8">
            <div className="w-full">
              <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Default Style</p>
              <img src="/api/top-langs?username=hisham-pp&v=2" alt="Top Languages Default" className="max-w-full mx-auto" />
            </div>
            <div className="w-full">
              <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Icon Style</p>
              <img src="/api/top-langs?username=hisham-pp&type=icon&v=2" alt="Top Languages Icons" className="max-w-full mx-auto" />
            </div>
            <div className="w-full">
              <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Badge Style</p>
              <img src="/api/top-langs?username=hisham-pp&type=badge&v=2" alt="Top Languages Badges" className="max-w-full mx-auto" />
            </div>
            <div className="w-full">
              <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Treemap Icon Style</p>
              <img src="/api/top-langs?username=hisham-pp&type=treemap-icon&v=2" alt="Top Languages Treemap Icons" className="max-w-full mx-auto" />
            </div>
            <div className="w-full">
              <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Treemap Badge Style</p>
              <img src="/api/top-langs?username=hisham-pp&type=treemap-badge&v=2" alt="Top Languages Treemap Badges" className="max-w-full mx-auto" />
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            Render your most-used languages using standard dots, detailed icons <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">?type=icon</code>, bold badges <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">?type=badge</code>, or a beautiful Treemap visualization <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">?type=treemap-icon</code> / <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">?type=treemap-badge</code>.
          </p>
        </section>

        <div className="w-full flex flex-col gap-12">
          {techGroups.map((group) => {
            const queryStr = group.keys.join(",");
            return (
              <section key={group.title} className="w-full bg-zinc-950 p-8 rounded-xl border border-zinc-800 shadow-2xl">
                <h2 className="text-xl font-semibold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">
                  {group.title}
                </h2>
                
                {/* Marquee Previews */}
                <div className="w-full bg-[#0d1117] p-8 rounded-lg flex flex-col items-center justify-center gap-8 overflow-hidden border border-zinc-800 mb-8">
                  <div className="w-full">
                    <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Badge Marquee</p>
                    <img src={`/api/tech-badge-marquee?techs=${queryStr}&v=7`} alt={`${group.title} Badge Marquee`} className="max-w-full mx-auto" />
                  </div>
                  <div className="w-full">
                    <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Icon Marquee</p>
                    <img src={`/api/tech-icon-marquee?techs=${queryStr}&v=7`} alt={`${group.title} Icon Marquee`} className="max-w-full mx-auto" />
                  </div>
                  <div className="w-full">
                    <p className="text-xs text-zinc-500 mb-2 text-center uppercase tracking-wider">Icon Marquee (With Background)</p>
                    <img src={`/api/tech-icon-marquee?techs=${queryStr}&hasbg=true&v=7`} alt={`${group.title} Icon Marquee with BG`} className="max-w-full mx-auto" />
                  </div>
                </div>
                
                {/* Available Technologies Grid for this Group */}
                <h3 className="text-sm font-medium text-zinc-400 mb-4">
                  Keys Available in this Group
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {group.keys.map((tech) => {
                    const techData = techMap[tech];
                    if (!techData || !techData.badge) return null; // In case of a typo in the array
                    return (
                      <div key={tech} className="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                        <div className="h-8 flex items-center justify-center mb-2">
                          <img src={`/badges/default/${techData.badge}`} alt={tech} className="max-h-full" />
                        </div>
                        <code className="text-[10px] text-zinc-400 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded truncate max-w-full">
                          {tech}
                        </code>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
