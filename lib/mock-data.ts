// Malaysian Mock Data for Fin Manage App

export interface MentalAccount {
  id: string;
  name: string;
  balance: number;
  target?: number;
  theme: "neutral" | "travel" | "shopping" | "food" | "emergency";
  icon: string;
  description?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface SavingStats {
  streak: number;
  currentSavings: number;
  monthlyTarget: number;
  interestRate: number;
  nextMilestone: number;
  nextMilestoneRate: number;
}

export interface SpendingData {
  month: string;
  actual: number;
  predicted: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: "decoration" | "food" | "accessory";
  isUnlocked: boolean;
  requiredStreak?: number;
}

export interface MicroSavingOption {
  id: string;
  amount: number;
  label: string;
  description: string;
  icon: string;
}

// Mental Accounts
export const mentalAccounts: MentalAccount[] = [
  {
    id: "daily",
    name: "Daily Account",
    balance: 250.0,
    theme: "neutral",
    icon: "wallet",
    description: "Everyday spending",
  },
  {
    id: "japan",
    name: "Japan Dream Trip",
    balance: 1500.0,
    target: 5000,
    theme: "travel",
    icon: "plane",
    description: "Tokyo & Kyoto adventure",
  },
  {
    id: "shoes",
    name: "Skechers Dream Shoes",
    balance: 89.5,
    target: 350,
    theme: "shopping",
    icon: "shoe",
    description: "Max Cushioning Elite",
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    balance: 2000.0,
    target: 10000,
    theme: "emergency",
    icon: "shield",
    description: "Safety net",
  },
];

// Group Saving Members
export const groupMembers: GroupMember[] = [
  { id: "aisyah", name: "Aisyah", initials: "A", color: "#ff006e" },
  { id: "yusuf", name: "Yusuf", initials: "Y", color: "#00f5d4" },
  { id: "mei", name: "Mei Ling", initials: "M", color: "#ffd166" },
  { id: "raj", name: "Raj", initials: "R", color: "#9d4edd" },
];

// User Saving Stats
export const savingStats: SavingStats = {
  streak: 15,
  currentSavings: 2450.0,
  monthlyTarget: 500,
  interestRate: 3.5,
  nextMilestone: 5000,
  nextMilestoneRate: 4.0,
};

// Spending trend data (6 months)
export const spendingData: SpendingData[] = [
  { month: "Jan", actual: 1200, predicted: 1150 },
  { month: "Feb", actual: 980, predicted: 1100 },
  { month: "Mar", actual: 1350, predicted: 1050 },
  { month: "Apr", actual: 890, predicted: 950 },
  { month: "May", actual: 1100, predicted: 900 },
  { month: "Jun", actual: 750, predicted: 850 },
];

// AI Insights
export const aiInsights = {
  currentMonth: "June",
  predictedSavings: 150,
  topCategory: "Food & Drinks",
  suggestion: "You could save RM85 by cooking at home twice a week!",
  spendingTrend: "decreasing" as const,
};

// Pet Rewards (Tank Decorations)
export const rewards: Reward[] = [
  {
    id: "neon-moss",
    name: "Neon Moss",
    description: "Glowing aquatic plant",
    type: "decoration",
    isUnlocked: true,
  },
  {
    id: "aqua-castle",
    name: "Aqua Castle",
    description: "Mini underwater castle",
    type: "decoration",
    isUnlocked: true,
  },
  {
    id: "bubble-treasure",
    name: "Bubble Treasure Chest",
    description: "Mysterious glowing chest",
    type: "decoration",
    isUnlocked: false,
    requiredStreak: 30,
  },
  {
    id: "crystal-coral",
    name: "Crystal Coral",
    description: "Shimmering coral formation",
    type: "decoration",
    isUnlocked: false,
    requiredStreak: 20,
  },
  {
    id: "lucky-coin",
    name: "Lucky Coin Stack",
    description: "Prosperity decoration",
    type: "decoration",
    isUnlocked: true,
  },
];

// Micro-Saving Options (Malaysian food context)
export const microSavingOptions: MicroSavingOption[] = [
  {
    id: "nasi-lemak",
    amount: 5,
    label: "Nasi Lemak",
    description: "Skip one packet",
    icon: "utensils",
  },
  {
    id: "chicken-rice",
    amount: 10,
    label: "Chicken Rice",
    description: "Cook at home instead",
    icon: "cooking-pot",
  },
  {
    id: "movie",
    amount: 15,
    label: "Movie Ticket",
    description: "Stream at home",
    icon: "film",
  },
];

// Yield Maximizer Milestones
export const yieldMilestones = [
  { amount: 0, rate: 3.0, label: "Start" },
  { amount: 1000, rate: 3.0, label: "RM1K" },
  { amount: 2500, rate: 3.5, label: "RM2.5K" },
  { amount: 5000, rate: 4.0, label: "RM5K" },
  { amount: 10000, rate: 4.5, label: "RM10K" },
];

// Pet (Koi) Stats
export const petStats = {
  name: "Kira",
  type: "Koi Fish",
  happiness: 85,
  health: 92,
  level: 5,
  feedCount: 3,
  maxFeedCount: 5,
};

// Quick Actions for Home
export const quickActions = [
  { id: "transfer", label: "Transfer", icon: "arrow-right-left" },
  { id: "pay", label: "Pay", icon: "credit-card" },
  { id: "top-up", label: "Top Up", icon: "plus-circle" },
  { id: "scan", label: "Scan", icon: "scan" },
];

// User Profile
export const userProfile = {
  name: "Ahmad",
  accountNumber: "**** 8234",
  totalBalance: 5847.5,
  currency: "RM",
};

// Format currency helper
export function formatRM(amount: number): string {
  return `RM ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Calculate progress percentage
export function calculateProgress(current: number, target: number): number {
  return Math.min((current / target) * 100, 100);
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export const fakeContacts: Contact[] = [
  { id: '1', name: 'Anis Najwa', phone: '012-3456789' },
  { id: '2', name: 'Aina Tasnim', phone: '011-9876543' },
  { id: '3', name: 'Mei Ling', phone: '017-2233445' },
  { id: '4', name: 'Raj', phone: '019-5566778' },
];

export const groupRewards = [
  { target: 10000, reward: "Special Gold Fin for Kira", type: "decoration" },
  { target: 15000, reward: "+0.5% p.a. Interest Bonus", type: "interest" },
];

// Add a global-ish state for the prototype
export const appState = {
  isPersonalPlanActive: false,
  isGroupSavingActive: false,
  groupPocketBalance: 8500.0,
  targetAmount: 10000.0,
  activePlan: {
    microSavingAmount: 10,
    autoSaveAmount: 10,
    autoSaveTrigger: 100,
  }
};
