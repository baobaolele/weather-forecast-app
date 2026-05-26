import type { DailyWeather, HourlyWeather, TrendAnalysisResult } from '../types/weather';

function numbers(values: Array<number | null>): number[] {
  return values.filter((value): value is number => value !== null && !Number.isNaN(value));
}

export function analyzeWeatherTrend(hourly: HourlyWeather[], daily: DailyWeather[]): TrendAnalysisResult {
  const future6Hours = hourly.slice(0, 6);
  const future12Hours = hourly.slice(0, 12);
  const currentTemperature = future6Hours[0]?.temperature;
  const after6HourTemperature = future6Hours[future6Hours.length - 1]?.temperature;

  let temperatureText = '未来 6 小时温度整体较稳定';
  let isCooling = false;
  if (currentTemperature !== null && currentTemperature !== undefined && after6HourTemperature !== null && after6HourTemperature !== undefined) {
    const diff = after6HourTemperature - currentTemperature;
    if (diff > 3) {
      temperatureText = '未来 6 小时有明显升温趋势';
    } else if (diff < -3) {
      temperatureText = '未来 6 小时有明显降温趋势';
      isCooling = true;
    }
  }

  const maxRainProbability = Math.max(...numbers(future12Hours.map((item) => item.precipitationProbability)), 0);
  let rainText = '未来 12 小时降雨风险较低';
  if (maxRainProbability >= 60) {
    rainText = '未来 12 小时降雨风险较高，建议携带雨具';
  } else if (maxRainProbability >= 30) {
    rainText = '未来 12 小时可能有降雨，请关注天气变化';
  }

  const maxWindSpeed = Math.max(...numbers(future12Hours.map((item) => item.windSpeed)), 0);
  let windText = '风力整体较平稳';
  if (maxWindSpeed >= 50) {
    windText = '大风风险较高，建议减少户外活动';
  } else if (maxWindSpeed >= 38) {
    windText = '风力较大，外出请注意安全';
  }

  // 优先使用小时级白天 UV，缺失时用日级最大 UV 兜底。
  const daytimeUvValues = numbers(
    future12Hours
      .filter((item) => {
        const hour = new Date(item.time).getHours();
        return hour >= 8 && hour <= 17;
      })
      .map((item) => item.uvIndex)
  );
  const dailyUvValues = numbers(daily.slice(0, 2).map((item) => item.uvIndexMax));
  const maxUv = Math.max(...(daytimeUvValues.length ? daytimeUvValues : dailyUvValues), 0);
  let uvText = '紫外线风险相对较低';
  if (maxUv >= 8) {
    uvText = '紫外线很强，建议减少暴晒并做好防护';
  } else if (maxUv >= 6) {
    uvText = '紫外线较强，建议做好防晒';
  }

  const suggestions: string[] = [];
  if (maxRainProbability >= 60) {
    suggestions.push('建议携带雨伞或雨衣，通勤时预留更多时间。');
  } else if (maxRainProbability >= 30) {
    suggestions.push('可能出现短时降雨，出门前再确认一次天气变化。');
  }
  if (isCooling) {
    suggestions.push('气温有下降趋势，建议适当添衣。');
  }
  if (maxUv >= 6) {
    suggestions.push('白天外出建议做好防晒，帽子和太阳镜会更舒服。');
  }
  if (maxWindSpeed >= 38) {
    suggestions.push('风力偏大时减少长时间户外活动，骑行注意安全。');
  }
  if (suggestions.length === 0) {
    suggestions.push('天气整体较稳定，适合通勤、散步或安排短途出行。');
    suggestions.push('仍建议关注临近时段预报，方便及时调整安排。');
  }

  const level: TrendAnalysisResult['level'] =
    maxRainProbability >= 60 || maxWindSpeed >= 50 || maxUv >= 8 ? 'warning' : maxRainProbability >= 30 || maxWindSpeed >= 38 || maxUv >= 6 ? 'notice' : 'good';

  return {
    temperatureText,
    rainText,
    windText,
    uvText,
    suggestions: suggestions.slice(0, 4),
    level
  };
}
