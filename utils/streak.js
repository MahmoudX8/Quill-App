export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;
  const uniqueDays = [...new Set(
    dates.map(d => new Date(d).toISOString().split('T')[0])
  )].sort((a, b) => new Date(b) - new Date(a));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mostRecent = new Date(uniqueDays[0]);
  mostRecent.setHours(0, 0, 0, 0);

  const dayDiffFromToday = Math.round((today - mostRecent) / 86400000);
  if (dayDiffFromToday > 1) return 0;

  let streak = 1;
  for (let i = 0; i < uniqueDays.length - 1; i++) {
    const current = new Date(uniqueDays[i]);
    const next = new Date(uniqueDays[i + 1]);
    const diff = Math.round((current - next) / 86400000);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}