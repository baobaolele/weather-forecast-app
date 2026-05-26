interface WeatherCodeInfo {
  text: string;
  emoji: string;
}

const weatherCodeMap: Record<number, WeatherCodeInfo> = {
  0: { text: '晴', emoji: '☀️' },
  1: { text: '大部晴朗', emoji: '🌤️' },
  2: { text: '局部多云', emoji: '⛅' },
  3: { text: '多云', emoji: '☁️' },
  45: { text: '雾', emoji: '🌫️' },
  48: { text: '霜雾', emoji: '🌫️' },
  51: { text: '小毛毛雨', emoji: '🌦️' },
  53: { text: '毛毛雨', emoji: '🌦️' },
  55: { text: '较强毛毛雨', emoji: '🌧️' },
  56: { text: '冻毛毛雨', emoji: '🌧️' },
  57: { text: '较强冻毛毛雨', emoji: '🌧️' },
  61: { text: '小雨', emoji: '🌧️' },
  63: { text: '中雨', emoji: '🌧️' },
  65: { text: '大雨', emoji: '🌧️' },
  66: { text: '冻雨', emoji: '🌧️' },
  67: { text: '强冻雨', emoji: '🌧️' },
  71: { text: '小雪', emoji: '🌨️' },
  73: { text: '中雪', emoji: '🌨️' },
  75: { text: '大雪', emoji: '❄️' },
  77: { text: '雪粒', emoji: '🌨️' },
  80: { text: '阵雨', emoji: '🌦️' },
  81: { text: '较强阵雨', emoji: '🌧️' },
  82: { text: '强阵雨', emoji: '⛈️' },
  85: { text: '阵雪', emoji: '🌨️' },
  86: { text: '强阵雪', emoji: '❄️' },
  95: { text: '雷雨', emoji: '⛈️' },
  96: { text: '雷雨伴冰雹', emoji: '⛈️' },
  99: { text: '强雷雨伴冰雹', emoji: '⛈️' }
};

export function getWeatherInfo(code: number | null | undefined): WeatherCodeInfo {
  if (code === null || code === undefined) {
    return { text: '未知', emoji: '🌡️' };
  }
  return weatherCodeMap[code] ?? { text: '未知天气', emoji: '🌡️' };
}
