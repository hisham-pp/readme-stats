export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-900 font-sans p-8">
      <main className="flex w-full max-w-4xl flex-col mt-4">
        <div className="border-b border-zinc-800 pb-6 mb-10">
          <h1 className="text-4xl font-bold text-zinc-100 mb-4">
            API Documentation
          </h1>
          <p className="text-zinc-400 text-lg">
            A complete guide on how to interact with the Readme Stats API to
            generate dynamic SVGs for your GitHub profile.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/builder"
              className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors"
            >
              Go to API Builder
            </a>
            <a
              href="/icons"
              className="px-4 py-2 bg-zinc-800 text-white font-semibold rounded-md hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Browse Icons
            </a>
            <a
              href="/badges"
              className="px-4 py-2 bg-zinc-800 text-white font-semibold rounded-md hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Browse Badges
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-12 pb-12">
          {/* Base URL */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-200 mb-4">Base URL</h2>
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
              <code className="text-zinc-300 font-mono text-sm">
                https://readme-stats-theta-sepia.vercel.app
              </code>
            </div>
          </section>

          {/* Icon Marquee */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
                GET
              </span>
              <h2 className="text-2xl font-bold text-zinc-200">
                /api/tech-icon-marquee
              </h2>
            </div>
            <p className="text-zinc-400 mb-6">
              Generates an animated scrolling marquee of technology icons.
            </p>

            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Query Parameters
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-950 text-zinc-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Required</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">techs</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3 text-red-400">Yes</td>
                    <td className="px-4 py-3">
                      Comma-separated list of tech IDs (e.g.{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        react,nextjs,typescript
                      </code>
                      ). <br />
                      <span className="text-zinc-500 mt-1 block">
                        Advanced: Append{" "}
                        <code className="bg-zinc-800 px-1 rounded text-zinc-400">
                          :theme
                        </code>{" "}
                        to force a theme (e.g.{" "}
                        <code className="bg-zinc-800 px-1 rounded text-zinc-400">
                          react:dark
                        </code>
                        ).
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">theme</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      Color theme. Options:{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        default
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        dark
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        light
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">width</td>
                    <td className="px-4 py-3">number</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      ViewBox width of the SVG (default: 850)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">hasbg</td>
                    <td className="px-4 py-3">boolean</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      If{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        true
                      </code>
                      , adds a contrasting circle background behind each icon
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Badge Marquee */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
                GET
              </span>
              <h2 className="text-2xl font-bold text-zinc-200">
                /api/tech-badge-marquee
              </h2>
            </div>
            <p className="text-zinc-400 mb-6">
              Generates an animated scrolling marquee of technology badges.
            </p>

            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Query Parameters
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-950 text-zinc-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Required</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">techs</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3 text-red-400">Yes</td>
                    <td className="px-4 py-3">
                      Comma-separated list of tech IDs (e.g.{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        react,nextjs,typescript
                      </code>
                      ).
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">width</td>
                    <td className="px-4 py-3">number</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      ViewBox width of the SVG (default: 850)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Languages */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
                GET
              </span>
              <h2 className="text-2xl font-bold text-zinc-200">
                /api/top-langs
              </h2>
            </div>
            <p className="text-zinc-400 mb-6">
              Generates a card displaying the user's most used programming
              languages on GitHub.
            </p>

            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Query Parameters
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-950 text-zinc-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Required</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">
                      username
                    </td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3 text-red-400">Yes</td>
                    <td className="px-4 py-3">
                      GitHub username (e.g.{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        hisham-pp
                      </code>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">theme</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      Color theme. Options:{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        default
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        dark
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        light
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">type</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      Visual layout style. Options:{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        default
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        icon
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        badge
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        treemap-icon
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        treemap-badge
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* GitHub Stats */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
                GET
              </span>
              <h2 className="text-2xl font-bold text-zinc-200">/api/stats</h2>
            </div>
            <p className="text-zinc-400 mb-6">
              Generates a summary card of a user's GitHub activity and
              statistics.
            </p>

            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Query Parameters
            </h3>
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-950 text-zinc-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Required</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">
                      username
                    </td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3 text-red-400">Yes</td>
                    <td className="px-4 py-3">GitHub username</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-zinc-300">theme</td>
                    <td className="px-4 py-3">string</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">
                      Color theme. Options:{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        default
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        dark
                      </code>
                      ,{" "}
                      <code className="bg-zinc-800 px-1 py-0.5 rounded">
                        light
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Example Usage */}
          <section className="bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-lg mt-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">
              Markdown Examples
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              You can simply paste the generated URLs into an image tag in your{" "}
              <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">
                README.md
              </code>{" "}
              file. Here are some examples of different configurations:
            </p>
            <div className="relative">
              <pre className="bg-[#0d1117] p-4 rounded-lg overflow-x-auto text-sm text-zinc-300 border border-zinc-800 font-mono">
                {`<!-- Stats Card (Dark Theme) -->
<a href="https://github.com/hisham-pp">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/stats?username=hisham-pp&theme=dark" alt="GitHub Stats" />
</a>

<!-- Tech Badge Marquee -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/tech-badge-marquee?techs=react,nextjs,typescript,tailwindcss,nodejs" alt="Tech Stack" />

<!-- Top Languages with Custom Icons (Default Theme) -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=hisham-pp&type=icon&theme=default" alt="Top Languages" />

<!-- Tech Icon Marquee with Backgrounds (Dark Theme) -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/tech-icon-marquee?techs=docker,kubernetes,aws,linux&theme=dark&hasbg=true" alt="Infrastructure" />

<!-- Advanced: Mixing Themes per-icon! -->
<!-- You can force a specific theme for an individual icon using the syntax \`tech:theme\` -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/tech-icon-marquee?techs=react:dark,nextjs:light,aws:default" alt="Mixed Themes" />`}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
