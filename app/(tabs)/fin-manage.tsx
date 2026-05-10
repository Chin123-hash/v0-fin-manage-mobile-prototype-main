import React, { useCallback, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";

// Existing Components
import { SavingStreak } from "@/components/fin-manage/SavingStreak";
import { YieldMaximizer } from "@/components/fin-manage/YieldMaximizer";
import { AIInsights } from "@/components/fin-manage/AIInsights";
import { MentalAccounts } from "@/components/fin-manage/MentalAccounts";
import { NudgeBanner } from "@/components/fin-manage/NudgeBanner";
import { KoiFish } from "@/components/fin-manage/KoiFish";
import { DigitalTank } from "@/components/fin-manage/DigitalTank"; 
import { GroupSavingCard } from "@/components/saving-plan/GroupSavingCard"; 
import { ManageSavingPlan } from "@/components/fin-manage/ManageSavingPlan";

// Mock data and types
import { 
  savingStats, 
  quizQuestions, 
  personaConfigs, 
  PersonaType, 
  type MentalAccount,
  appState 
} from "@/lib/mock-data";

// ==========================================
// ✨ Decorated Dashboard Widgets
// ==========================================

const MicroSavings = () => (
  <View className="bg-background-card border border-border rounded-3xl p-5 shadow-sm h-[200px] flex-col justify-between">
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-foreground font-bold text-lg">Micro Savings</Text>
        <Text className="text-foreground-muted text-xs mt-1">Skip a treat, boost your wealth</Text>
      </View>
      <View className="bg-accent/10 p-3 rounded-full">
        <Text className="text-accent text-xl">☕</Text>
      </View>
    </View>
    <View className="bg-background rounded-2xl p-4 flex-row justify-between items-center border border-border/50">
       <View>
         <Text className="text-foreground font-semibold">Artisan Coffee</Text>
         <Text className="text-accent font-bold text-sm mt-1">Save RM15.00</Text>
       </View>
       <Text className="text-foreground-muted text-sm line-through">RM15.00</Text>
    </View>
    <TouchableOpacity className="bg-accent w-full py-3 rounded-xl items-center shadow-sm">
      <Text className="text-white font-bold text-sm">Save RM15 to Vault Now</Text>
    </TouchableOpacity>
  </View>
);

const ExpenseRadar = () => (
  <View className="bg-background-card border border-border rounded-3xl p-5 shadow-sm h-[200px] flex-col justify-between">
     <View className="flex-row justify-between items-center">
        <Text className="text-foreground font-bold text-lg">Expense Radar</Text>
        <View className="bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
           <Text className="text-red-500 text-[10px] uppercase tracking-wider font-bold">Warning</Text>
        </View>
     </View>
     <View className="bg-red-500/5 rounded-2xl p-4 border border-red-500/20 flex-1 justify-center mt-3">
        <View className="flex-row justify-between items-center mb-3">
           <Text className="text-foreground font-semibold">🍔 Food & Bev</Text>
           <Text className="text-red-500 font-bold text-base">90%</Text>
        </View>
        <View className="h-3 w-full bg-red-500/20 rounded-full overflow-hidden mb-3">
          <View className="h-full bg-red-500 rounded-full" style={{ width: '90%' }} />
        </View>
        <View className="flex-row justify-between">
           <Text className="text-foreground-muted text-xs font-medium">RM900 Spent</Text>
           <Text className="text-foreground-muted text-xs font-medium">RM1,000 Limit</Text>
        </View>
     </View>
  </View>
);

const GoalTimeline = () => (
  <View className="bg-background-card border border-border rounded-3xl p-5 shadow-sm h-[200px] flex-col justify-between">
     <View className="flex-row justify-between items-center">
        <Text className="text-foreground font-bold text-lg">Goal Timeline</Text>
        <Text className="text-foreground-muted text-xs">Based on current rate</Text>
     </View>
     <View className="flex-row items-center bg-background p-3 rounded-2xl border border-border/50 mt-2 mb-2">
        <View className="w-14 h-14 bg-accent/10 rounded-xl items-center justify-center mr-4">
           <Text className="text-2xl">🇯🇵</Text>
        </View>
        <View className="flex-1">
           <Text className="text-foreground font-bold text-base mb-1">Japan Trip</Text>
           <View className="flex-row items-baseline">
             <Text className="text-accent font-extrabold text-2xl">45</Text>
             <Text className="text-foreground-muted text-xs font-medium ml-1">Days Left</Text>
           </View>
        </View>
     </View>
     <View className="pt-3 border-t border-border flex-row justify-between items-center">
       <Text className="text-foreground-muted text-xs font-medium">Estimated complete:</Text>
       <Text className="text-foreground font-bold text-xs">July 15, 2026</Text>
     </View>
  </View>
);

// Removed GroupSavings from ALL_WIDGETS so it doesn't show up in the customizer
const ALL_WIDGETS = [
  { id: "SavingStreak", title: "Saving Streak", desc: "Track consecutive saving days." },
  { id: "YieldMaximizer", title: "Yield Maximizer", desc: "Current interest & milestones." },
  { id: "AIInsights", title: "AI Spending Insights", desc: "AI spending analysis." },
  { id: "MentalAccounts", title: "Mental Accounts", desc: "Goal-based category tracking." },
  { id: "MicroSavings", title: "Micro Savings", desc: "1-tap small daily savings." },
  { id: "ExpenseRadar", title: "Expense Radar", desc: "Budget limit warnings." },
  { id: "GoalTimeline", title: "Goal Timeline", desc: "Predict when you hit your goals." },
];

export default function FinManageScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [userPersona, setUserPersona] = useState<PersonaType | null>(appState.userPersona);
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize layout, explicitly filtering out GroupSavings just in case it is in mock-data
  const [activeLayout, setActiveLayout] = useState<string[]>(
    userPersona ? personaConfigs[userPersona].defaultLayout.filter(id => id !== "GroupSavings") : []
  );
  
  const [showResultModal, setShowResultModal] = useState(false);
  const [mentalAccounts, setMentalAccounts] = useState<MentalAccount[]>([]);

  // V2 State 
  const [isPlanActive, setIsPlanActive] = useState(appState.isPersonalPlanActive);
  const [currentStreak, setCurrentStreak] = useState(savingStats.streak);

  useFocusEffect(
    useCallback(() => {
      const previouslyActive = isPlanActive;
      const currentlyActive = appState.isPersonalPlanActive;

      setIsPlanActive(currentlyActive);
      setCurrentStreak(currentlyActive ? savingStats.streak : 0);

      if (!previouslyActive && currentlyActive) {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    }, [isPlanActive])
  );

  const handleRefresh = () => {
    setIsPlanActive(appState.isPersonalPlanActive);
    if (!appState.isPersonalPlanActive) setCurrentStreak(0);
  };

  const handleNavigateToPetHub = () => {
    router.push("/pet-hub");
  };

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const newLayout = [...activeLayout];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLayout.length) return;
    [newLayout[index], newLayout[targetIndex]] = [newLayout[targetIndex], newLayout[index]];
    setActiveLayout(newLayout);
  };

  const handleAddAccount = (name: string) => {
    const newAcc: MentalAccount = {
      id: Date.now().toString(),
      name: name,
      balance: 0,
      target: 1000,
      theme: "neutral",
      icon: "wallet",
      description: "New Account"
    };
    setMentalAccounts([...mentalAccounts, newAcc]);
  };

  const handleDeleteAccount = (id: string) => {
    setMentalAccounts(mentalAccounts.filter(a => a.id !== id));
  };

  const handleAnswer = (tags: string[], points: number) => {
    const newScores = { ...scores };
    tags.forEach(tag => {
      newScores[tag] = (newScores[tag] || 0) + points;
    });
    setScores(newScores);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let topPersona: PersonaType = "balancer";
      let maxScore = -1;
      Object.keys(newScores).forEach(key => {
        if (newScores[key] > maxScore) {
          maxScore = newScores[key];
          topPersona = key as PersonaType;
        }
      });

      appState.userPersona = topPersona;
      appState.hasFinishedQuiz = true;

      setUserPersona(topPersona);
      // Filter out GroupSavings so it doesn't duplicate when persona is chosen
      setActiveLayout(personaConfigs[topPersona].defaultLayout.filter(id => id !== "GroupSavings"));
      
      if (personaConfigs[topPersona].defaultAccounts) {
        setMentalAccounts(personaConfigs[topPersona].defaultAccounts);
      }
      
      setShowResultModal(true); 
    }
  };

  const toggleWidget = (widgetId: string) => {
    if (activeLayout.includes(widgetId)) {
      setActiveLayout(activeLayout.filter(id => id !== widgetId));
    } else {
      if (activeLayout.length >= 4) {
        Alert.alert("Limit Reached", "You can only select up to 4 widgets.");
      } else {
        setActiveLayout([...activeLayout, widgetId]);
      }
    }
  };

  // 1. Quiz Interface
  if (!userPersona) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    return (
      <SafeAreaView className="flex-1 bg-background justify-center px-6">
        <Text className="text-accent font-bold text-sm mb-2">Question {currentQuestionIndex + 1} of {quizQuestions.length}</Text>
        <Text className="text-foreground font-bold text-2xl mb-8">{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity 
            key={index}
            className="bg-background-card p-4 rounded-xl mb-3 border border-border"
            activeOpacity={0.7}
            onPress={() => handleAnswer(option.tags, option.points)}
          >
            <Text className="text-foreground text-base">{option.text}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  }

  const config = personaConfigs[userPersona];

  // 2. Advanced Edit Layout Interface
  if (isEditing) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <View className="px-4 py-4 flex-row justify-between items-center border-b border-border">
          <View>
            <Text className="text-foreground font-bold text-xl">Edit Layout</Text>
            <Text className="text-foreground-muted text-xs">{activeLayout.length}/4 Selected</Text>
          </View>
          <TouchableOpacity className="bg-accent px-4 py-2 rounded-full" onPress={() => setIsEditing(false)}>
            <Text className="text-white text-sm font-bold">Done</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="text-accent font-bold mb-3 uppercase tracking-wider text-xs">Current Order (4 Slots)</Text>
            <View>
              {[0, 1, 2, 3].map((slotIndex) => {
                const id = activeLayout[slotIndex];
                if (id) {
                  const widgetInfo = ALL_WIDGETS.find(w => w.id === id);
                  return (
                    <View 
                      key={`slot-${slotIndex}`} 
                      className="flex-row items-center bg-background-cardLight px-3 rounded-xl mb-2 border border-border shadow-sm"
                      style={{ height: 56 }}
                    >
                      <View className="w-7 h-7 rounded-lg bg-accent/10 items-center justify-center mr-3">
                        <Text className="text-accent font-bold text-sm">{slotIndex + 1}</Text>
                      </View>
                      <Text className="text-foreground font-semibold flex-1" numberOfLines={1}>{widgetInfo?.title}</Text>
                      <View className="flex-row h-full items-center">
                        <TouchableOpacity onPress={() => moveWidget(slotIndex, 'up')} disabled={slotIndex === 0} className={`px-3 h-full justify-center ${slotIndex === 0 ? 'opacity-10' : 'opacity-100'}`}>
                          <Text className="text-accent font-bold text-xl">↑</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => moveWidget(slotIndex, 'down')} disabled={slotIndex === activeLayout.length - 1} className={`px-3 h-full justify-center ${slotIndex === activeLayout.length - 1 ? 'opacity-10' : 'opacity-100'}`}>
                          <Text className="text-accent font-bold text-xl">↓</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                } 
                return (
                  <View key={`empty-slot-${slotIndex}`} className="flex-row items-center px-3 rounded-xl mb-2 border border-dashed border-border/60 bg-transparent" style={{ height: 56 }}>
                    <View className="w-7 h-7 rounded-lg bg-border/20 items-center justify-center mr-3">
                      <Text className="text-foreground-muted font-bold text-sm">{slotIndex + 1}</Text>
                    </View>
                    <Text className="text-foreground-muted italic flex-1">Empty Slot</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View className="pb-10">
            <Text className="text-foreground font-bold mb-3 uppercase tracking-wider text-xs">Available Widgets</Text>
            {ALL_WIDGETS.map(widget => {
              const isSelected = activeLayout.includes(widget.id);
              return (
                <TouchableOpacity 
                  key={widget.id}
                  activeOpacity={0.7}
                  onPress={() => toggleWidget(widget.id)}
                  className={`p-4 rounded-2xl mb-3 border ${isSelected ? 'border-accent bg-accent/5' : 'border-border bg-background-card'}`}
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className={`font-bold text-base ${isSelected ? 'text-accent' : 'text-foreground'}`}>{widget.title}</Text>
                      <Text className="text-foreground-muted text-xs mt-1" numberOfLines={1}>{widget.desc}</Text>
                    </View>
                    <View className={`w-6 h-6 rounded-full border items-center justify-center ${isSelected ? 'border-accent bg-accent' : 'border-border opacity-30'}`}>
                      {isSelected && <Text className="text-white text-xs font-bold">✓</Text>}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity className="mt-4 py-4 items-center border border-border rounded-xl bg-background-cardLight" onPress={() => setActiveLayout(config.defaultLayout.filter(id => id !== "GroupSavings"))}>
              <Text className="text-foreground-muted font-bold text-sm">Reset to Persona Default</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const widgetDictionary: Record<string, React.ReactNode> = {
    SavingStreak: <View className="mb-6 -mx-4" key="streak"><SavingStreak streak={currentStreak} /></View>,
    YieldMaximizer: <View className="mb-6 -mx-4" key="yield"><YieldMaximizer currentSavings={savingStats.currentSavings} currentRate={isPlanActive ? 4.0 : 2.4} /></View>,
    AIInsights: <View className="mb-6 -mx-4" key="ai"><AIInsights /></View>,
    
    // 🔥 Restored to standard view without the negative margins or forced heights!
    MentalAccounts: (
      <View className="mb-6" key="mental">
        <MentalAccounts 
          accounts={mentalAccounts}
          onAddAccount={handleAddAccount}
          onDeleteAccount={handleDeleteAccount}
        />
      </View>
    ),
    
    MicroSavings: <View className="mb-6" key="micro"><MicroSavings /></View>,
    ExpenseRadar: <View className="mb-6" key="radar"><ExpenseRadar /></View>,
    GoalTimeline: <View className="mb-6" key="timeline"><GoalTimeline /></View>,
  };

  // 4. Main Dashboard
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Modal animationType="fade" transparent={true} visible={showResultModal} onRequestClose={() => setShowResultModal(false)}>
        <View className="flex-1 justify-center items-center px-6 bg-black/60">
          <View className="bg-background-card w-full rounded-[40px] p-8 border border-accent/20 items-center shadow-2xl">
            <TouchableOpacity className="absolute top-6 right-6 p-2 z-10" onPress={() => setShowResultModal(false)}>
              <Text className="text-foreground-muted text-xl font-bold">✕</Text>
            </TouchableOpacity>
            <Text className="text-accent font-bold uppercase tracking-widest text-xs mb-2 mt-2">Quiz Completed!</Text>
            <Text className="text-foreground font-bold text-2xl mb-6 text-center">Meet Your Financial Spirit Animal</Text>
            <View className="w-48 h-48 bg-accent/5 rounded-full items-center justify-center mb-6 border border-accent/10">
               <KoiFish size={150} color={config.fishColor as any} />
            </View>
            <Text className="text-accent font-extrabold text-3xl mb-4 text-center">{config.name}</Text>
            <View className="bg-background p-5 rounded-2xl border border-border mb-8 w-full">
              <Text className="text-foreground-muted text-center leading-5 italic">"{config.analysis}"</Text>
            </View>
            <TouchableOpacity className="bg-accent w-full py-4 rounded-2xl items-center shadow-lg" onPress={() => setShowResultModal(false)}>
              <Text className="text-white font-bold text-lg">Awesome, let's go!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView ref={scrollRef} className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-4 py-4 flex-row justify-between items-center">
          <View>
            <Text className="text-foreground font-bold text-2xl">Fin Manage</Text>
            <Text className="text-foreground-muted text-sm">Persona: <Text className="text-accent font-semibold">{config.name}</Text></Text>
          </View>
          <TouchableOpacity className="bg-background-cardLight px-3 py-1.5 rounded-full border border-accent/30" onPress={() => setIsEditing(true)}>
            <Text className="text-accent text-xs font-bold">Edit Layout</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleNavigateToPetHub}
          activeOpacity={0.9}
          className="mx-4 mb-6 shadow-xl shadow-black/40 relative overflow-hidden rounded-3xl"
        >
          <DigitalTank height={180} koiColor={config.fishColor} />
          <View className="absolute bottom-2 left-2 bg-background/80 rounded-lg px-3 py-1 border border-accent/10">
            <Text className="text-accent text-xs font-bold">Kira the Koi • LVL 5</Text>
          </View>
        </TouchableOpacity>

        {/* 🔥 Conditional Top Area: Nudge Banner vs Active Plans */}
        {!isPlanActive ? (
          <View className="mx-4 mb-6">
            <NudgeBanner onPress={() => router.push("/saving-plan")} />
          </View>
        ) : (
          <>
            <View className="px-4 mb-6">
              <ManageSavingPlan onUpdate={handleRefresh} />
            </View>

            <View className="px-4 mb-6">
              <GroupSavingCard />
            </View>
          </>
        )}

        {/* Dynamic Customized Widgets */}
        <View className="px-4">
          {activeLayout.map(widgetName => widgetDictionary[widgetName] || (
            <View key={widgetName} className="mb-6 bg-background-card border border-border rounded-3xl p-5 shadow-sm justify-center items-center h-[200px]">
              <Text className="text-foreground-muted font-medium">{ALL_WIDGETS.find(w => w.id === widgetName)?.title || widgetName}</Text>
              <Text className="text-foreground-muted text-xs mt-1">Component Coming Soon</Text>
            </View>
          ))}
        </View>

        {activeLayout.length < 4 && (
          <TouchableOpacity onPress={() => setIsEditing(true)} className="mx-4 mt-2 mb-6 p-5 border border-dashed border-accent/40 rounded-2xl items-center bg-accent/5">
            <Text className="text-accent font-bold">+ Add widget ({activeLayout.length}/4)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}