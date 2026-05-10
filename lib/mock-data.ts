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
  { amount: 0, rate: 2.0, label: "Start" },
  { amount: 1000, rate: 2.4, label: "RM1K" },
  { amount: 2500, rate: 2.8, label: "RM2.5K" },
  { amount: 5000, rate: 3.2, label: "RM5K" },
  { amount: 10000, rate: 3.55, label: "RM10K" },
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

// lib/mock-data.ts (or lib/quiz-data.ts)

export type PersonaType = 'dataGeek' | 'visionary' | 'social' | 'micro' | 'impulse' | 'zen' | 'guardian' | 'balancer';


export const personaConfigs: Record<PersonaType, { name: string; fishColor: string; defaultLayout: string[]; analysis: string; defaultAccounts: MentalAccount[] }> = {
  dataGeek: { 
    name: "The Data Geek", 
    fishColor: "neon", 
    defaultLayout: ["YieldMaximizer", "ExpenseRadar", "AIInsights", "GoalTimeline"],
    analysis: "You have an analytical mind. You find joy in optimizing every cent and watching your wealth grow through data-driven decisions.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 500.0, target: 1500, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "High-Yield FD", balance: 10000.0, target: 20000, theme: "neutral", icon: "trending-up", description: "Fixed Deposit" },
      { id: "3", name: "Tech Gadgets", balance: 800.0, target: 3000, theme: "shopping", icon: "laptop", description: "New gear fund" }
    ]
  },
  visionary: { 
    name: "The Visionary", 
    fishColor: "galaxy", 
    defaultLayout: ["MentalAccounts", "GoalTimeline", "AIInsights", "MicroSavings"],
    analysis: "You save with a purpose. Your big dreams drive your financial discipline, turning every goal into a reachable destination.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 350.0, target: 1000, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Japan Dream Trip", balance: 1500.0, target: 5000, theme: "travel", icon: "plane", description: "Tokyo & Kyoto" },
      { id: "3", name: "Skechers Dream Shoes", balance: 89.5, target: 350, theme: "shopping", icon: "shopping-bag", description: "Max Cushioning" }
    ]
  },
  social: { 
    name: "The Social Butterfly", 
    fishColor: "sakura", 
    defaultLayout: ["GroupSavings", "SavingStreak", "MentalAccounts", "ExpenseRadar"],
    analysis: "Saving is a team sport for you. You thrive on friendly competition and the support of your community to stay on track.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 600.0, target: 1500, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Weekend Gatherings", balance: 120.0, target: 400, theme: "food", icon: "utensils", description: "Cafe hopping" },
      { id: "3", name: "Gifts Fund", balance: 50.0, target: 200, theme: "shopping", icon: "gift", description: "Birthdays & Weddings" }
    ]
  },
  micro: { 
    name: "The Micro-Saver", 
    fishColor: "calico", 
    defaultLayout: ["MicroSavings", "SavingStreak", "MentalAccounts", "AIInsights"],
    analysis: "You understand that small drops make an ocean. Your strength lies in consistency and making saving an effortless daily habit.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 250.0, target: 800, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Spare Change Box", balance: 145.5, target: 500, theme: "neutral", icon: "coins", description: "Round-up savings" },
      { id: "3", name: "Coffee Savings", balance: 45.0, target: 150, theme: "food", icon: "coffee", description: "Skipped lattes" }
    ]
  },
  impulse: { 
    name: "The Impulse Spender", 
    fishColor: "fire", 
    defaultLayout: ["AIInsights", "ExpenseRadar", "MicroSavings", "SavingStreak"],
    analysis: "You live for the moment! We're here to help you balance your spontaneous joy with the security of a healthy savings habit.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 150.0, target: 1000, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Fun Money", balance: 300.0, target: 500, theme: "shopping", icon: "shopping-cart", description: "Guilt-free spending" },
      { id: "3", name: "Cooling-off Vault", balance: 200.0, target: 1000, theme: "emergency", icon: "lock", description: "Locked for 48 hrs" }
    ]
  },
  zen: { 
    name: "The Zen Saver", 
    fishColor: "cloud", 
    defaultLayout: ["YieldMaximizer", "SavingStreak", "MentalAccounts", "GroupSavings"],
    analysis: "You value peace of mind over complexity. You prefer automated systems that allow you to live life without worrying about the numbers.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 800.0, target: 2000, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Auto-Invest", balance: 5000.0, target: 15000, theme: "neutral", icon: "refresh-cw", description: "Robo-advisor" },
      { id: "3", name: "Peace of Mind", balance: 8000.0, target: 10000, theme: "emergency", icon: "shield", description: "Safe buffer" }
    ]
  },
  guardian: { 
    name: "The Guardian", 
    fishColor: "armor", 
    defaultLayout: ["MentalAccounts", "ExpenseRadar", "YieldMaximizer", "SavingStreak"],
    analysis: "Security is your top priority. You build financial fortresses to protect yourself and your loved ones from life's uncertainties.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 400.0, target: 1000, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Emergency Fund", balance: 15000.0, target: 20000, theme: "emergency", icon: "shield", description: "6 Months Expenses" },
      { id: "3", name: "Medical Reserve", balance: 2500.0, target: 5000, theme: "emergency", icon: "heart", description: "Insurance buffer" }
    ]
  },
  balancer: { 
    name: "The Balancer", 
    fishColor: "gold", 
    defaultLayout: ["SavingStreak", "YieldMaximizer", "MentalAccounts", "AIInsights"],
    analysis: "You've mastered the middle path. You enjoy the fruits of your labor today while maintaining a steady eye on your future security.",
    defaultAccounts: [
      { id: "1", name: "Daily Account", balance: 500.0, target: 1200, theme: "neutral", icon: "wallet", description: "Everyday spending" },
      { id: "2", name: "Rainy Day", balance: 3000.0, target: 5000, theme: "emergency", icon: "umbrella", description: "Just in case" },
      { id: "3", name: "Weekend Getaway", balance: 450.0, target: 1000, theme: "travel", icon: "map", description: "Short trips" }
    ]
  }
};

export const quizQuestions = [
  {
    question: "Imagine you just received an unexpected $1000 bonus. What's your first move?",
    options: [
      { text: "Put it straight into a high-yield account or investment.", tags: ["dataGeek", "balancer"], points: 2 },
      { text: "Awesome! Straight into my 'Japan Trip' or 'New Car' fund.", tags: ["visionary"], points: 2 },
      { text: "Lock it in my emergency fund. Better safe than sorry.", tags: ["guardian"], points: 2 },
      { text: "Treat my friends to a nice dinner or clear my shopping cart!", tags: ["impulse", "social"], points: 2 }
    ]
  },
  {
    question: "When you are about to buy a $15 artisan coffee, what crosses your mind?",
    options: [
      { text: "If I skip this today, I save $450 a month! *walks away*", tags: ["micro"], points: 2 },
      { text: "I should ask my colleagues if they want to order together.", tags: ["social"], points: 2 },
      { text: "I deserve a treat after working so hard.", tags: ["impulse", "zen"], points: 2 },
      { text: "I'll quickly check if my 'Food & Beverage' budget allows it.", tags: ["dataGeek", "balancer"], points: 2 }
    ]
  },
  {
    question: "What is your biggest obstacle when trying to save money?",
    options: [
      { text: "It's too much effort. I just want it to be automated.", tags: ["zen"], points: 2 },
      { text: "It's boring to do it alone. I lose motivation easily.", tags: ["social", "visionary"], points: 1 },
      { text: "Random impulse buys that ruin my entire monthly plan.", tags: ["impulse"], points: 2 },
      { text: "Nothing really, I actually enjoy watching my net worth grow.", tags: ["dataGeek", "micro"], points: 1 }
    ]
  },
  {
    question: "The app notifies you: 'You have a 30-day saving streak!' Your reaction?",
    options: [
      { text: "Nice! Show me the growth chart and analytics.", tags: ["dataGeek"], points: 2 },
      { text: "Yes! One step closer to my ultimate dream goal.", tags: ["visionary"], points: 2 },
      { text: "Phew, seeing that balance gives me peace of mind.", tags: ["guardian"], points: 2 },
      { text: "Great. I'm keeping a good balance of saving and living.", tags: ["balancer"], points: 2 }
    ]
  },
  {
    question: "If your digital Koi fish could talk, what should it remind you daily?",
    options: [
      { text: "'Hey! Put the phone down and stop browsing shopping apps!'", tags: ["impulse", "guardian"], points: 2 },
      { text: "'If you pack your lunch today, that's another $10 saved!'", tags: ["micro"], points: 2 },
      { text: "'Just keep swimming... your money is auto-saving safely.'", tags: ["zen"], points: 2 },
      { text: "'Your spending is down 15% this month compared to projections.'", tags: ["dataGeek", "balancer"], points: 2 }
    ]
  }
];

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

export interface GroupInstance {
  id: string;
  name: string;
  balance: number;
  members: GroupMember[];
}

export interface GroupMember {
  id: string;
  name: string;
  initials: string;
  color: string;
  phone?: string; 
}

// 🔥 Merged global-ish state for the prototype
export const appState = {
  // From V1 (Quiz & Persona state)
  userPersona: null as PersonaType | null,
  hasFinishedQuiz: false,
  
  // From V2 (Saving Plan & Group state)
  isPersonalPlanActive: false,
  isGroupSavingActive: false, 
  groups: [] as GroupInstance[], 
  groupPocketBalance: 0.0,
  targetAmount: 10000.0,
  hasUnclaimedReward: true,
  activePlan: {
    microSavingAmount: 10,
    autoSaveAmount: 10,
    autoSaveTrigger: 100,
  }
};
