import { BookOpen, Book, Pen, Headphones, Eye, Plus, X, Train, Coffee, Footprints, Clock, Armchair, ChevronRight, MapPin, Zap, Link } from "lucide-react";
import { useState } from "react";
import type { Situation, Action, Mapping } from "../App";

const availableIcons = [Train, Coffee, Footprints, Clock, Armchair, Book, BookOpen, Pen, Headphones, Eye];
const availableColors = ["blue", "green", "purple", "amber", "gray", "indigo", "emerald"];

type Props = {
  situations: Situation[];
  setSituations: (situations: Situation[]) => void;
  actions: Action[];
  setActions: (actions: Action[]) => void;
  mappings: Mapping[];
  setMappings: (mappings: Mapping[]) => void;
};

export function ActionSelectionScreen({ situations, setSituations, actions, setActions, mappings, setMappings }: Props) {
  const [showSituationDialog, setShowSituationDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [showMappingDialog, setShowMappingDialog] = useState(false);
  
  const [newSituationName, setNewSituationName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [selectedColor, setSelectedColor] = useState("blue");
  
  const [newActionName, setNewActionName] = useState("");
  
  const [selectedSituationId, setSelectedSituationId] = useState<number | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);

  const handleAddSituation = () => {
    if (newSituationName.trim()) {
      const newSituation = {
        id: Date.now(),
        name: newSituationName,
        icon: availableIcons[selectedIcon],
        color: selectedColor,
      };
      setSituations([...situations, newSituation]);
      setNewSituationName("");
      setSelectedIcon(0);
      setSelectedColor("blue");
      setShowSituationDialog(false);
    }
  };

  const handleAddAction = () => {
    if (newActionName.trim()) {
      const newAction = {
        id: Date.now(),
        name: newActionName,
      };
      setActions([...actions, newAction]);
      setNewActionName("");
      setShowActionDialog(false);
    }
  };

  const handleAddMapping = () => {
    if (selectedSituationId && selectedActionId) {
      const newMapping = {
        id: Date.now(),
        situationId: selectedSituationId,
        actionId: selectedActionId,
      };
      setMappings([...mappings, newMapping]);
      setSelectedSituationId(null);
      setSelectedActionId(null);
      setShowMappingDialog(false);
    }
  };

  const closeAllDialogs = () => {
    setShowSituationDialog(false);
    setShowActionDialog(false);
    setShowMappingDialog(false);
    setNewSituationName("");
    setNewActionName("");
    setSelectedSituationId(null);
    setSelectedActionId(null);
    setSelectedIcon(0);
    setSelectedColor("blue");
  };

  return (
    <div className="flex flex-col h-full bg-[#fafaf9] px-5 pt-16 pb-28 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">状況とアクション</h1>
        <p className="text-sm text-gray-500">登録されているマッピング</p>
      </div>

      {/* Mappings Count */}
      <div className="mb-6">
        <p className="text-xs tracking-wide text-gray-400 font-medium">全 {mappings.length} 件</p>
      </div>

      {/* Mappings List */}
      <div className="space-y-3 mb-6">
        {mappings.map((mapping) => {
          const situation = situations.find(s => s.id === mapping.situationId);
          const action = actions.find(a => a.id === mapping.actionId);
          const SituationIcon = situation?.icon;
          
          const situationColorClasses = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
            amber: "bg-amber-50 text-amber-600",
            gray: "bg-gray-50 text-gray-600",
            indigo: "bg-indigo-50 text-indigo-600",
            emerald: "bg-emerald-50 text-emerald-600",
          };

          if (!situation || !action) return null;

          return (
            <div
              key={mapping.id}
              className="w-full bg-white rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Situation */}
                {SituationIcon && (
                  <>
                    <div className={`w-12 h-12 ${situationColorClasses[situation.color as keyof typeof situationColorClasses]} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <SituationIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-gray-800">{situation.name}</p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Arrow and Action */}
              <div className="flex items-center gap-3 mt-3 ml-1">
                <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-600">{action.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => setShowSituationDialog(true)}
          className="w-full bg-blue-500 text-white rounded-full py-3.5 px-6 shadow-lg hover:bg-blue-600 active:scale-98 transition-all font-medium flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          状況を追加
        </button>
        
        <button 
          onClick={() => setShowActionDialog(true)}
          className="w-full bg-emerald-500 text-white rounded-full py-3.5 px-6 shadow-lg hover:bg-emerald-600 active:scale-98 transition-all font-medium flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          アクションを追加
        </button>
        
        <button 
          onClick={() => setShowMappingDialog(true)}
          className="w-full bg-purple-500 text-white rounded-full py-3.5 px-6 shadow-lg hover:bg-purple-600 active:scale-98 transition-all font-medium flex items-center justify-center gap-2"
        >
          <Link className="w-5 h-5" />
          マッピングを追加
        </button>
      </div>

      {/* Add Situation Dialog */}
      {showSituationDialog && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={closeAllDialogs}
        >
          <div 
            className="bg-white w-full rounded-t-3xl p-6 pb-10 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">新しい状況</h2>
              <button 
                onClick={closeAllDialogs}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-6 mb-6">
              {/* Situation Name Input */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">状況名</label>
                <input
                  type="text"
                  value={newSituationName}
                  onChange={(e) => setNewSituationName(e.target.value)}
                  placeholder="例：満員電車"
                  className="w-full bg-gray-50 rounded-2xl px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-3 block">アイコン</label>
                <div className="grid grid-cols-5 gap-2">
                  {availableIcons.map((Icon, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIcon(index)}
                      className={`p-3 rounded-xl transition-all active:scale-95 ${
                        selectedIcon === index ? "bg-blue-100 ring-2 ring-blue-500" : "bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-gray-600 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-3 block">カラー</label>
                <div className="grid grid-cols-7 gap-2">
                  {availableColors.map((color) => {
                    const colorClasses = {
                      blue: "bg-blue-500",
                      green: "bg-green-500",
                      purple: "bg-purple-500",
                      amber: "bg-amber-500",
                      gray: "bg-gray-500",
                      indigo: "bg-indigo-500",
                      emerald: "bg-emerald-500",
                    };
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full transition-all active:scale-95 ${
                          colorClasses[color as keyof typeof colorClasses]
                        } ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-800" : ""}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddSituation}
              disabled={!newSituationName.trim()}
              className="w-full bg-blue-500 text-white rounded-full py-4 px-6 shadow-lg hover:bg-blue-600 active:scale-98 transition-all font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              追加する
            </button>
          </div>
        </div>
      )}

      {/* Add Action Dialog */}
      {showActionDialog && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={closeAllDialogs}
        >
          <div 
            className="bg-white w-full rounded-t-3xl p-6 pb-10 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">新しいアクション</h2>
              <button 
                onClick={closeAllDialogs}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600 mb-2 block">アクション名</label>
              <input
                type="text"
                value={newActionName}
                onChange={(e) => setNewActionName(e.target.value)}
                placeholder="例：英語の勉強をする"
                className="w-full bg-gray-50 rounded-2xl px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-400"
              />
            </div>

            <button 
              onClick={handleAddAction}
              disabled={!newActionName.trim()}
              className="w-full bg-emerald-500 text-white rounded-full py-4 px-6 shadow-lg hover:bg-emerald-600 active:scale-98 transition-all font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              追加する
            </button>
          </div>
        </div>
      )}

      {/* Add Mapping Dialog */}
      {showMappingDialog && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={closeAllDialogs}
        >
          <div 
            className="bg-white w-full rounded-t-3xl p-6 pb-10 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">マッピングを追加</h2>
              <button 
                onClick={closeAllDialogs}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-6 mb-6">
              {/* Situation Selection */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-3 block">状況を選択</label>
                <div className="grid grid-cols-2 gap-3">
                  {situations.map((situation) => {
                    const SituationIcon = situation.icon;
                    const isSelected = selectedSituationId === situation.id;
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
                        onClick={() => setSelectedSituationId(situation.id)}
                        className={`bg-gray-50 rounded-2xl p-4 transition-all active:scale-95 ${
                          isSelected ? "ring-2 ring-purple-500 bg-purple-50/30" : ""
                        }`}
                      >
                        <div className={`w-10 h-10 ${colorClasses[situation.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-2`}>
                          <SituationIcon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium text-gray-700 text-center">{situation.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Selection */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-3 block">アクションを選択</label>
                <div className="space-y-2">
                  {actions.map((action) => {
                    const isSelected = selectedActionId === action.id;
                    return (
                      <button
                        key={action.id}
                        onClick={() => setSelectedActionId(action.id)}
                        className={`w-full bg-gray-50 rounded-2xl p-4 transition-all active:scale-95 text-left ${
                          isSelected ? "ring-2 ring-purple-500 bg-purple-50/30" : ""
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-700">{action.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddMapping}
              disabled={!selectedSituationId || !selectedActionId}
              className="w-full bg-purple-500 text-white rounded-full py-4 px-6 shadow-lg hover:bg-purple-600 active:scale-98 transition-all font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              追加する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
