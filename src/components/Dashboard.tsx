import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Circle,
  TrendingUp,
  TrendingDown,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Layout,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "../lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const INITIAL_CATEGORIES = [
  {
    id: "content",
    title: "Content Volume Requirements",
    icon: FileText,
    description: "Create and publish 20-30 original, high-quality articles.",
    tasks: [
      {
        id: "c1",
        title: "Publish 20-30 articles",
        description: "Ensure minimum word count of 1,000 words per post.",
        completed: false,
      },
      {
        id: "c2",
        title: "Ensure uniqueness",
        description:
          "All content must be unique, well-researched, and provide substantial value.",
        completed: false,
      },
      {
        id: "c3",
        title: "Implement content calendar",
        description:
          "Systematically produce and publish articles before submitting application.",
        completed: false,
      },
    ],
  },
  {
    id: "visuals",
    title: "Visual Evidence (E-E-A-T)",
    icon: ImageIcon,
    description:
      "Replace generic stock images with original photography and authentic video content.",
    tasks: [
      {
        id: "v1",
        title: "Remove stock images",
        description:
          "Replace all generic stock images and AI-generated visuals.",
        completed: false,
      },
      {
        id: "v2",
        title: "Document testing processes",
        description: "Capture screenshots of actual procedures you perform.",
        completed: false,
      },
      {
        id: "v3",
        title: "Create custom infographics",
        description:
          "Verify every visual element demonstrates firsthand experience.",
        completed: false,
      },
    ],
  },
  {
    id: "transparency",
    title: "Transparency Infrastructure",
    icon: ShieldCheck,
    description: "Build comprehensive About Us and Contact pages.",
    tasks: [
      {
        id: "t1",
        title: "About Us page",
        description:
          "Feature detailed author biographies with verifiable credentials and professional headshots.",
        completed: false,
      },
      {
        id: "t2",
        title: "Social links",
        description:
          "Include links to social media profiles or professional websites.",
        completed: false,
      },
      {
        id: "t3",
        title: "Contact page",
        description:
          "Establish a Contact page with a legitimate business email, physical address, and functional form.",
        completed: false,
      },
      {
        id: "t4",
        title: "Main navigation",
        description:
          "Ensure both pages are easily accessible from your main navigation menu.",
        completed: false,
      },
    ],
  },
  {
    id: "performance",
    title: "Technical Performance",
    icon: Zap,
    description: "Optimize page load speed and eliminate crawl errors.",
    tasks: [
      {
        id: "p1",
        title: "Mobile load speed",
        description:
          "Achieve a mobile page load speed of 2.5 seconds or faster.",
        completed: false,
      },
      {
        id: "p2",
        title: "Eliminate crawl errors",
        description:
          "Conduct a complete technical audit to eliminate all errors in Search Console.",
        completed: false,
      },
      {
        id: "p3",
        title: "Technical SEO",
        description: "Implement proper XML sitemaps and fix broken links.",
        completed: false,
      },
      {
        id: "p4",
        title: "Asset optimization",
        description:
          "Optimize images, enable browser caching, and ensure mobile responsiveness.",
        completed: false,
      },
    ],
  },
  {
    id: "design",
    title: "Design Compliance Protocol",
    icon: Layout,
    description:
      "Create a clean, professional layout without intrusive elements.",
    tasks: [
      {
        id: "d1",
        title: "Remove existing ads",
        description:
          "Remove all existing advertisements, affiliate banners, and promotional pop-ups.",
        completed: false,
      },
      {
        id: "d2",
        title: "Clean layout",
        description:
          "Create a professional layout with intuitive navigation, readable typography, and adequate white space.",
        completed: false,
      },
      {
        id: "d3",
        title: "Cross-browser testing",
        description:
          "Test user experience across multiple browsers and devices.",
        completed: false,
      },
    ],
  },
];

const INITIAL_METRICS = [
  {
    id: "m1",
    name: "Mobile Load Speed (s)",
    before: 5.2,
    after: null,
    target: 2.5,
    unit: "s",
    better: "lower" as const,
  },
  {
    id: "m2",
    name: "Published Articles",
    before: 5,
    after: null,
    target: 30,
    unit: "posts",
    better: "higher" as const,
  },
  {
    id: "m3",
    name: "Crawl Errors",
    before: 42,
    after: null,
    target: 0,
    unit: "errors",
    better: "lower" as const,
  },
  {
    id: "m4",
    name: "Original Images (%)",
    before: 10,
    after: null,
    target: 100,
    unit: "%",
    better: "higher" as const,
  },
];

export default function Dashboard() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    INITIAL_CATEGORIES[0].id,
  );

  const toggleTask = (categoryId: string, taskId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          tasks: cat.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        };
      }),
    );
  };

  const updateMetricAfter = (metricId: string, value: string) => {
    const numValue = value === "" ? null : Number(value);
    setMetrics((prev) =>
      prev.map((m) => (m.id === metricId ? { ...m, after: numValue } : m)),
    );
  };

  const overallProgress = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    categories.forEach((cat) => {
      totalTasks += cat.tasks.length;
      completedTasks += cat.tasks.filter((t) => t.completed).length;
    });
    return Math.round((completedTasks / totalTasks) * 100);
  }, [categories]);

  const chartData = useMemo(() => {
    // Generate some dummy historical data leading up to the current progress
    return [
      { name: "Week 1", progress: 10 },
      { name: "Week 2", progress: 25 },
      { name: "Week 3", progress: 45 },
      { name: "Week 4", progress: overallProgress > 45 ? overallProgress : 45 },
    ];
  }, [overallProgress]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-2">
            AdSense Approval Tracker
          </h1>
          <p className="text-neutral-500 text-lg max-w-2xl">
            Comprehensive strategy execution dashboard for meeting Google
            AdSense requirements.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-neutral-100">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-neutral-100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${overallProgress}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-medium">
              {overallProgress}%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              Overall Readiness
            </p>
            <p className="text-2xl font-semibold text-neutral-900">Phase 1</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-medium tracking-tight">
            Implementation Checklist
          </h2>

          <div className="space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const completedTasks = category.tasks.filter(
                (t) => t.completed,
              ).length;
              const totalTasks = category.tasks.length;
              const isExpanded = expandedCategory === category.id;
              const isFullyCompleted = completedTasks === totalTasks;

              return (
                <div
                  key={category.id}
                  className={cn(
                    "bg-white rounded-2xl border transition-all duration-200 overflow-hidden",
                    isExpanded
                      ? "border-neutral-300 shadow-md"
                      : "border-neutral-200 shadow-sm hover:border-neutral-300",
                    isFullyCompleted &&
                      !isExpanded &&
                      "border-emerald-200 bg-emerald-50/30",
                  )}
                >
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : category.id)
                    }
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-3 rounded-xl",
                          isFullyCompleted
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-neutral-100 text-neutral-600",
                        )}
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900">
                          {category.title}
                        </h3>
                        <p className="text-sm text-neutral-500 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-neutral-500">
                        {completedTasks} / {totalTasks}
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="text-neutral-400" />
                      ) : (
                        <ChevronRight className="text-neutral-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-2 border-t border-neutral-100">
                          <div className="space-y-3 mt-4">
                            {category.tasks.map((task) => (
                              <button
                                key={task.id}
                                onClick={() => toggleTask(category.id, task.id)}
                                className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left group"
                              >
                                <div className="mt-0.5 flex-shrink-0">
                                  {task.completed ? (
                                    <CheckCircle2
                                      className="text-emerald-500"
                                      size={20}
                                    />
                                  ) : (
                                    <Circle
                                      className="text-neutral-300 group-hover:text-neutral-400"
                                      size={20}
                                    />
                                  )}
                                </div>
                                <div>
                                  <p
                                    className={cn(
                                      "text-sm font-medium transition-colors",
                                      task.completed
                                        ? "text-neutral-400 line-through"
                                        : "text-neutral-900",
                                    )}
                                  >
                                    {task.title}
                                  </p>
                                  <p
                                    className={cn(
                                      "text-xs mt-1 transition-colors",
                                      task.completed
                                        ? "text-neutral-400"
                                        : "text-neutral-500",
                                    )}
                                  >
                                    {task.description}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium tracking-tight mb-6">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {metrics.map((metric) => {
                const isTargetMet =
                  metric.after !== null &&
                  (metric.better === "higher"
                    ? metric.after >= metric.target
                    : metric.after <= metric.target);

                const progressPercent =
                  metric.after !== null
                    ? metric.better === "higher"
                      ? Math.min(
                          100,
                          Math.max(
                            0,
                            ((metric.after - metric.before) /
                              (metric.target - metric.before)) *
                              100,
                          ),
                        )
                      : Math.min(
                          100,
                          Math.max(
                            0,
                            ((metric.before - metric.after) /
                              (metric.before - metric.target)) *
                              100,
                          ),
                        )
                    : 0;

                return (
                  <div
                    key={metric.id}
                    className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-medium text-neutral-600">
                        {metric.name}
                      </h4>
                      {isTargetMet ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          <CheckCircle2 size={12} /> Target Met
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">
                          Target: {metric.target}
                          {metric.unit}
                        </span>
                      )}
                    </div>

                    <div className="flex items-end gap-4 mb-4">
                      <div className="flex-1">
                        <p className="text-xs text-neutral-400 mb-1">Before</p>
                        <p className="text-lg font-mono text-neutral-500">
                          {metric.before}
                          {metric.unit}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-neutral-400 mb-1">Current</p>
                        <div className="relative">
                          <input
                            type="number"
                            value={metric.after === null ? "" : metric.after}
                            onChange={(e) =>
                              updateMetricAfter(metric.id, e.target.value)
                            }
                            placeholder="---"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 pr-10 text-lg font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm pointer-events-none">
                            {metric.unit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isTargetMet ? "bg-emerald-500" : "bg-indigo-500",
                        )}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-medium mb-2">Progress Velocity</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Your readiness trajectory over the last 4 weeks.
            </p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorProgress"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#10b981" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorProgress)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
