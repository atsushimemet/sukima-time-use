import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { BookOpen, Pen, Headphones } from "lucide-react";

const weekData = [
  { day: "月", minutes: 45 },
  { day: "火", minutes: 72 },
  { day: "水", minutes: 58 },
  { day: "木", minutes: 91 },
  { day: "金", minutes: 63 },
  { day: "土", minutes: 105 },
  { day: "日", minutes: 88 },
];

const activities = [
  { name: "読書", time: "2時間15分", icon: BookOpen, color: "emerald" },
  { name: "執筆", time: "45分", icon: Pen, color: "amber" },
  { name: "ポッドキャスト", time: "1時間32分", icon: Headphones, color: "purple" },
];

export function WeeklyReviewScreen() {
  const totalMinutes = weekData.reduce((sum, day) => sum + day.minutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="flex flex-col h-full bg-[#fafaf9] px-5 pt-16 pb-28 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">週次レビュー</h1>
        <p className="text-sm text-gray-500">2026年3月3日 - 3月9日</p>
      </div>

      {/* Total Time */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-8 shadow-sm mb-6">
        <p className="text-sm text-gray-600 mb-2">今週の生産的な時間</p>
        <p className="text-4xl font-semibold text-gray-800">{hours}時間{minutes}分</p>
        <p className="text-xs text-emerald-700 mt-2">↑ 先週より12%増加</p>
      </div>

      {/* Activities Breakdown */}
      <div className="mb-6">
        <p className="text-xs tracking-wide text-gray-400 mb-3 font-medium">今週の活動</p>
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const colorClasses = {
              emerald: "bg-emerald-50 text-emerald-600",
              amber: "bg-amber-50 text-amber-600",
              purple: "bg-purple-50 text-purple-600",
            };

            return (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className={`w-11 h-11 ${colorClasses[activity.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{activity.name}</p>
                </div>
                <p className="text-base font-semibold text-gray-800">{activity.time}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="mb-6">
        <p className="text-xs tracking-wide text-gray-400 mb-3 font-medium">日別の概要</p>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weekData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `${value}分`}
              />
              <Bar dataKey="minutes" radius={[8, 8, 0, 0]}>
                {weekData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#10b981" opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reflection */}
      <div className="bg-blue-50 rounded-3xl p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-700 mb-2">今週の振り返り</p>
        <p className="text-xs text-gray-600 leading-relaxed">
          今週は通勤時間をうまく活用できました。カフェでの執筆時間を増やすことも検討してみましょう。
        </p>
      </div>
    </div>
  );
}
