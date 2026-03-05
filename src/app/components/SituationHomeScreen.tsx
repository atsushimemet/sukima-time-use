import { Search } from "lucide-react";
import { useState } from "react";
import type { Situation, Action, Mapping } from "../App";

type Props = {
  situations: Situation[];
  actions: Action[];
  mappings: Mapping[];
};

export function SituationHomeScreen({ situations, actions, mappings }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSituation, setSelectedSituation] = useState<number | null>(null);

  // Create a map of situationId to action for quick lookup
  const situationActionMap = new Map<number, string>();
  mappings.forEach((mapping) => {
    const action = actions.find(a => a.id === mapping.actionId);
    if (action) {
      situationActionMap.set(mapping.situationId, action.name);
    }
  });

  const filteredSituations = situations.filter((situation) => {
    const actionName = situationActionMap.get(situation.id) || "";
    return (
      situation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col h-full bg-[#fafaf9] px-5 pt-16 pb-28 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">私のスキマ時間</h1>
        <p className="text-sm text-gray-500">今、何をしますか？</p>
      </div>

      {/* Search Field */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="状況やアクションを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full pl-14 pr-5 py-4 shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* All Situations */}
      <div>
        <p className="text-xs tracking-wide text-gray-400 mb-3 font-medium">
          {searchQuery ? `検索結果 (${filteredSituations.length}件)` : "すべての状況"}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {filteredSituations.map((situation) => {
            const Icon = situation.icon;
            const actionName = situationActionMap.get(situation.id);
            const hasAction = !!actionName;
            
            const colorClasses = {
              blue: "bg-blue-50 text-blue-600",
              green: "bg-green-50 text-green-600",
              purple: "bg-purple-50 text-purple-600",
              amber: "bg-amber-50 text-amber-600",
              gray: "bg-gray-50 text-gray-600",
              indigo: "bg-indigo-50 text-indigo-600",
              emerald: "bg-emerald-50 text-emerald-600",
            };

            return (
              <button
                key={situation.id}
                onClick={() => setSelectedSituation(situation.id)}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <div className={`w-14 h-14 ${colorClasses[situation.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center mb-2">{situation.name}</p>
                {hasAction ? (
                  <p className="text-xs text-gray-500 text-center">{actionName}</p>
                ) : (
                  <p className="text-xs text-gray-400 text-center">タップして設定</p>
                )}
              </button>
            );
          })}
        </div>
        {filteredSituations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">該当する状況が見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}
