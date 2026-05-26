export function formatNumber(value: number | null | undefined, digits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '--';
  }
  return value.toFixed(digits);
}

export function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || '--';
  }
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || '--';
  }
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function formatWeekday(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '--';
  }
  return new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(date);
}

export function formatHour(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '--';
  }
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}
