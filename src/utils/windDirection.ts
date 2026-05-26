const directions = ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风'];

export function getWindDirectionText(degree: number | null | undefined): string {
  if (degree === null || degree === undefined || Number.isNaN(degree)) {
    return '--';
  }
  const index = Math.round((((degree % 360) + 360) % 360) / 45) % 8;
  return directions[index];
}
