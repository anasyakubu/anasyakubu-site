// src/components/home/GitHubStats.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Flame, Users, BookMarked } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

// ---------- Types ----------

interface ContributionDay {
  date: string;       // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface ProfileResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface HoverInfo {
  day: ContributionDay;
  x: number;
  y: number;
}

// ---------- Config ----------

const GH_USERNAME = 'anasyakubu';

const LEVEL_CLASSES: Record<number, string> = {
  0: 'bg-white/[0.04] hover:bg-white/[0.08]',
  1: 'bg-amber-400/20 hover:bg-amber-400/30',
  2: 'bg-amber-400/40 hover:bg-amber-400/55',
  3: 'bg-amber-400/65 hover:bg-amber-400/80',
  4: 'bg-amber-400 hover:bg-amber-300',
};

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// ---------- Helpers ----------

/** Group contributions into weeks (columns) of 7 days. The API returns days
 *  starting on a Sunday, so we group by chunks of 7. */
function toWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

/** Build [{ index, label }] for month labels, placed at the first week of each month. */
function buildMonthLabels(weeks: ContributionDay[][]) {
  const labels: { index: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const first = week[0];
    if (!first) return;
    const month = new Date(first.date).getMonth();
    if (month !== lastMonth) {
      labels.push({ index: i, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });
  return labels;
}

function computeStreak(days: ContributionDay[]) {
  // Current streak: count back from the last day with count > 0
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (current > 0) break;
  }

  // Longest streak in window
  let longest = 0;
  let run = 0;
  for (const d of days) {
    if (d.count > 0) {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }
  return { current, longest };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ---------- Component ----------

const GitHubStats: React.FC = () => {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<HoverInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [contribRes, profileRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GH_USERNAME}?y=last`
          ),
          fetch(`https://api.github.com/users/${GH_USERNAME}`),
        ]);

        if (!contribRes.ok) throw new Error('Failed to load contributions');
        if (!profileRes.ok) throw new Error('Failed to load profile');

        const contribJson: ContributionsResponse = await contribRes.json();
        const profileJson: ProfileResponse = await profileRes.json();

        if (cancelled) return;
        setData(contribJson);
        setProfile(profileJson);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'Unknown error fetching GitHub data'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(
    () => (data ? toWeeks(data.contributions) : []),
    [data]
  );
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks]);
  const totalCount = useMemo(() => {
    if (!data) return 0;
    return Object.values(data.total).reduce((a, b) => a + b, 0);
  }, [data]);
  const streak = useMemo(
    () =>
      data ? computeStreak(data.contributions) : { current: 0, longest: 0 },
    [data]
  );

  // Hover handlers
  const handleEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    day: ContributionDay
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = (
      e.currentTarget.closest('.gh-grid-container') as HTMLDivElement
    )?.getBoundingClientRect();
    if (!parent) return;
    setHover({
      day,
      x: rect.left - parent.left + rect.width / 2,
      y: rect.top - parent.top,
    });
  };

  const handleLeave = () => setHover(null);

  return (
    <section
      id="github"
      className="relative bg-zinc-950 text-white border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 05</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Activity</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] font-medium">
              Public{' '}
              <span className="italic text-amber-400 font-light">commits</span>.
            </h2>
            <p className="mt-5 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed">
              A year of code, contributions, and weekend tinkering — pulled
              live from GitHub.
            </p>
          </div>

          <a
            href={`https://github.com/${GH_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.05] rounded-full transition-all"
          >
            <FaGithub className="w-4 h-4 text-amber-400" strokeWidth={2} />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300 group-hover:text-white transition-colors">
              @{GH_USERNAME}
            </span>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:rotate-45 transition-all" />
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
          <StatCell
            label="Total · Last year"
            value={loading ? null : totalCount.toLocaleString()}
            sub="contributions"
            icon={<FaGithub className="w-4 h-4" strokeWidth={2} />}
            loading={loading}
          />
          <StatCell
            label="Current streak"
            value={loading ? null : `${streak.current}`}
            sub={streak.current === 1 ? 'day' : 'days'}
            icon={<Flame className="w-4 h-4" strokeWidth={2} />}
            loading={loading}
            accent
          />
          <StatCell
            label="Public repos"
            value={loading || !profile ? null : `${profile.public_repos}`}
            sub="repositories"
            icon={<BookMarked className="w-4 h-4" strokeWidth={2} />}
            loading={loading}
          />
          <StatCell
            label="Followers"
            value={loading || !profile ? null : `${profile.followers}`}
            sub="on GitHub"
            icon={<Users className="w-4 h-4" strokeWidth={2} />}
            loading={loading}
          />
        </div>

        {/* Heatmap card */}
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400">
                {loading
                  ? 'Loading…'
                  : `${totalCount.toLocaleString()} contributions in the last year`}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6 relative gh-grid-container">
            {error ? (
              <ErrorState message={error} />
            ) : loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  {/* Month labels row */}
                  <div className="flex pl-7 mb-2 relative h-3">
                    {monthLabels.map(m => (
                      <span
                        key={`${m.index}-${m.label}`}
                        className="absolute font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500"
                        style={{ left: `${28 + m.index * 13}px` }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-[3px]">
                    {/* Day-of-week labels */}
                    <div className="flex flex-col gap-[3px] mr-1.5 pt-px">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-[10px] flex items-center"
                          style={{ minWidth: '20px' }}
                        >
                          {i === 1 && (
                            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                              Mon
                            </span>
                          )}
                          {i === 3 && (
                            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                              Wed
                            </span>
                          )}
                          {i === 5 && (
                            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                              Fri
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Weeks (columns) */}
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, di) => {
                          const day = week[di];
                          if (!day) {
                            return (
                              <div
                                key={di}
                                className="w-[10px] h-[10px] rounded-[2px] bg-transparent"
                              />
                            );
                          }
                          return (
                            <div
                              key={di}
                              onMouseEnter={e => handleEnter(e, day)}
                              onMouseLeave={handleLeave}
                              className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-colors duration-200 ${LEVEL_CLASSES[day.level]
                                }`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-between mt-5 pl-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      Longest streak · {streak.longest} {streak.longest === 1 ? 'day' : 'days'}
                    </span>

                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map(lv => (
                        <div
                          key={lv}
                          className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_CLASSES[lv]}`}
                        />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tooltip */}
            {hover && (
              <div
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
                style={{ left: `${hover.x}px`, top: `${hover.y - 8}px` }}
              >
                <div className="bg-zinc-900 border border-white/10 rounded-md px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)] whitespace-nowrap">
                  <div className="font-mono text-[11px] text-white">
                    {hover.day.count === 0
                      ? 'No contributions'
                      : `${hover.day.count} contribution${hover.day.count === 1 ? '' : 's'
                      }`}
                  </div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-zinc-500 mt-0.5">
                    {formatDate(hover.day.date)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-600 text-center">
          Data via{' '}
          <a
            href={`https://github.com/${GH_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-amber-400 transition-colors"
          >
            github.com/{GH_USERNAME}
          </a>{' '}
          · refreshes on page load
        </p>
      </div>
    </section>
  );
};

// ---------- Sub-components ----------

interface StatCellProps {
  label: string;
  value: string | null;
  sub: string;
  icon: React.ReactNode;
  loading?: boolean;
  accent?: boolean;
}

const StatCell: React.FC<StatCellProps> = ({
  label,
  value,
  sub,
  icon,
  loading,
  accent,
}) => (
  <div className="bg-zinc-950 p-6 group hover:bg-white/[0.02] transition-colors duration-300">
    <div className="flex items-center justify-between mb-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <span
        className={`${accent ? 'text-amber-400' : 'text-zinc-600'
          } group-hover:text-amber-400 transition-colors`}
      >
        {icon}
      </span>
    </div>
    {loading ? (
      <div className="h-12 w-24 bg-white/[0.04] rounded animate-pulse" />
    ) : (
      <div className="font-display text-5xl md:text-6xl leading-none tracking-[-0.04em] font-medium text-white group-hover:text-amber-400 transition-colors duration-300">
        {value}
      </div>
    )}
    <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
      {sub}
    </div>
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <div className="flex gap-[3px] pl-7">
    {Array.from({ length: 53 }).map((_, wi) => (
      <div key={wi} className="flex flex-col gap-[3px]">
        {Array.from({ length: 7 }).map((_, di) => (
          <div
            key={di}
            className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.04] animate-pulse"
            style={{ animationDelay: `${(wi * 7 + di) * 4}ms` }}
          />
        ))}
      </div>
    ))}
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="py-10 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/[0.05]">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-300">
        {message}
      </span>
    </div>
    <p className="mt-4 text-sm text-zinc-500 max-w-md mx-auto">
      The GitHub data couldn't load. This is usually temporary — refresh in a
      moment, or check the profile directly.
    </p>
  </div>
);

export default GitHubStats;