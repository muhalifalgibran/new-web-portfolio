import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from '@/components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface ApiResponse {
  total: { lastYear: number };
  contributions: ContributionDay[];
}

const GITHUB_USERNAME = 'muhalifalgibran';

function getContributionColor(level: number): string {
  const colors = [
    'rgba(255, 255, 255, 0.05)',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
  ];
  return colors[level] || colors[0];
}

function groupIntoWeeks(contributions: ContributionDay[]): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push({ days: contributions.slice(i, i + 7) });
  }
  return weeks;
}

function getMonthLabels(weeks: ContributionWeek[]): { name: string; span: number }[] {
  const months: { name: string; span: number }[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let currentMonth = -1;

  for (const week of weeks) {
    const firstDay = week.days[0];
    if (!firstDay) continue;
    const month = new Date(firstDay.date).getMonth();
    if (month !== currentMonth) {
      currentMonth = month;
      months.push({ name: monthNames[month], span: 1 });
    } else {
      months[months.length - 1].span++;
    }
  }

  return months;
}

export default function GitHubContributions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data: ApiResponse = await res.json();
        const grouped = groupIntoWeeks(data.contributions);
        setWeeks(grouped);
        setTotalContributions(data.total.lastYear);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        graphRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: graphRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error]);

  if (error) return null;

  const monthLabels = getMonthLabels(weeks);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          ref={headingRef}
          title={t('GitHub Activity', 'Aktivitas GitHub')}
        />

        <div ref={graphRef} className="glass-card p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-foreground">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                @{GITHUB_USERNAME}
              </a>
            </div>
            {!loading && (
              <span className="badge-modern bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                {totalContributions} {t('contributions this year', 'kontribusi tahun ini')}
              </span>
            )}
          </div>

          {/* Contribution Graph */}
          {loading ? (
            <div className="h-32 flex items-center justify-center text-sm text-muted-foreground">
              {t('Loading contributions...', 'Memuat kontribusi...')}
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              {/* Month labels */}
              <div className="flex mb-1 ml-8" style={{ gap: '0px' }}>
                {monthLabels.map((label, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-muted-foreground"
                    style={{ width: `${label.span * 16}px`, flexShrink: 0 }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-0">
                {/* Day labels */}
                <div className="flex flex-col justify-around pr-2" style={{ height: `${7 * 16}px` }}>
                  {['Mon', 'Wed', 'Fri'].map((day) => (
                    <span key={day} className="text-[10px] text-muted-foreground leading-[13px]">
                      {t(day, day === 'Mon' ? 'Sen' : day === 'Wed' ? 'Rab' : 'Jum')}
                    </span>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex" style={{ gap: '2px' }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: '2px' }}>
                      {week.days.map((day, di) => (
                        <div
                          key={`${wi}-${di}`}
                          className="rounded-sm"
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: getContributionColor(day.level),
                          }}
                          title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-[10px] text-muted-foreground">
                  {t('Less', 'Sedikit')}
                </span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="rounded-sm"
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: getContributionColor(level),
                    }}
                  />
                ))}
                <span className="text-[10px] text-muted-foreground">
                  {t('More', 'Banyak')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
