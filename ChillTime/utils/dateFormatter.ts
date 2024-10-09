export function formatDate(date: Date, format = "YYYY-MM-DD"): string {
  // 日付フォーマット関数を実装
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return format
    .replace("YYYY", year.toString())
    .replace("MM", month)
    .replace("DD", day);
}
