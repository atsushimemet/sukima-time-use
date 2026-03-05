import { useState } from "react";
import { Home, CheckSquare, BarChart3, Train, Coffee, Footprints, Clock, Armchair, BookOpen } from "lucide-react";
import { SituationHomeScreen } from "./components/SituationHomeScreen";
import { ActionSelectionScreen } from "./components/ActionSelectionScreen";
import { WeeklyReviewScreen } from "./components/WeeklyReviewScreen";

const initialSituations = [
  { id: 1, name: "満員電車", icon: Train, color: "blue" },
  { id: 2, name: "グリーン車", icon: Train, color: "green" },
  { id: 3, name: "徒歩移動", icon: Footprints, color: "purple" },
  { id: 4, name: "カフェ", icon: Coffee, color: "amber" },
  { id: 5, name: "待ち時間", icon: Clock, color: "gray" },
  { id: 6, name: "休憩中", icon: Armchair, color: "indigo" },
];

const initialActions = [
  { id: 1, name: "紙の本を読む" },
  { id: 2, name: "Kindleで読書" },
  { id: 3, name: "ノートを書く" },
  { id: 4, name: "ポッドキャストを聞く" },
  { id: 5, name: "ノートを見返す" },
];

const initialMappings = [
  { id: 1, situationId: 2, actionId: 1 },
  { id: 2, situationId: 1, actionId: 2 },
  { id: 3, situationId: 4, actionId: 3 },
  { id: 4, situationId: 3, actionId: 4 },
  { id: 5, situationId: 5, actionId: 5 },
];

export type Situation = {
  id: number;
  name: string;
  icon: any;
  color: string;
};

export type Action = {
  id: number;
  name: string;
};

export type Mapping = {
  id: number;
  situationId: number;
  actionId: number;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [situations, setSituations] = useState<Situation[]>(initialSituations);
  const [actions, setActions] = useState<Action[]>(initialActions);
  const [mappings, setMappings] = useState<Mapping[]>(initialMappings);

  const tabs = [
    { id: "home", label: "ホーム", icon: Home },
    { id: "actions", label: "アクション", icon: CheckSquare },
    { id: "review", label: "振り返り", icon: BarChart3 },
  ];

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-gray-100 overflow-hidden">
      {/* iPhone Frame */}
      <div className="absolute inset-0 flex flex-col">
        {/* Screen Content */}
        <div className="flex-1 relative overflow-hidden">
          {activeTab === "home" && (
            <SituationHomeScreen 
              situations={situations}
              actions={actions}
              mappings={mappings}
            />
          )}
          {activeTab === "actions" && (
            <ActionSelectionScreen 
              situations={situations}
              setSituations={setSituations}
              actions={actions}
              setActions={setActions}
              mappings={mappings}
              setMappings={setMappings}
            />
          )}
          {activeTab === "review" && <WeeklyReviewScreen />}
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50">
          <div className="flex items-center justify-around px-6 pt-2 pb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1 min-w-[60px] transition-all active:scale-95"
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-emerald-100" 
                      : "bg-transparent"
                  }`}>
                    <Icon 
                      className={`w-6 h-6 transition-colors ${
                        isActive 
                          ? "text-emerald-600" 
                          : "text-gray-400"
                      }`} 
                    />
                  </div>
                  <span className={`text-[10px] font-medium transition-colors ${
                    isActive 
                      ? "text-emerald-600" 
                      : "text-gray-500"
                  }`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
