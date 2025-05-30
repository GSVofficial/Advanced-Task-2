"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import {
  Zap,
  Globe,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Gauge,
  ImageIcon,
  Code,
  Network,
  Cpu,
  HardDrive,
  Settings,
} from "lucide-react"

interface LighthouseMetrics {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  pwa: number
  fcp: number
  lcp: number
  cls: number
  fid: number
  ttfb: number
}

interface PerformanceIssue {
  type: "critical" | "warning" | "info"
  category: string
  title: string
  description: string
  impact: string
  solution: string
  savings?: string
}

export default function PerformanceOptimizer() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [metrics, setMetrics] = useState<LighthouseMetrics | null>(null)
  const [issues, setIssues] = useState<PerformanceIssue[]>([])

  const mockAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      setMetrics({
        performance: 67,
        accessibility: 89,
        bestPractices: 83,
        seo: 92,
        pwa: 45,
        fcp: 2.1,
        lcp: 3.8,
        cls: 0.15,
        fid: 180,
        ttfb: 850,
      })

      setIssues([
        {
          type: "critical",
          category: "Images",
          title: "Serve images in next-gen formats",
          description: "Image formats like WebP and AVIF often provide better compression than PNG or JPEG.",
          impact: "Potential savings of 1.2s",
          solution: "Convert images to WebP/AVIF format using Next.js Image component",
          savings: "1.2s",
        },
        {
          type: "critical",
          category: "JavaScript",
          title: "Remove unused JavaScript",
          description: "Remove dead code and unused polyfills to reduce bundle size.",
          impact: "Potential savings of 890ms",
          solution: "Use tree shaking and code splitting with dynamic imports",
          savings: "890ms",
        },
        {
          type: "warning",
          category: "CSS",
          title: "Eliminate render-blocking resources",
          description: "Resources are blocking the first paint of your page.",
          impact: "Potential savings of 450ms",
          solution: "Inline critical CSS and defer non-critical stylesheets",
          savings: "450ms",
        },
        {
          type: "warning",
          category: "Network",
          title: "Enable text compression",
          description: "Text-based resources should be served with compression.",
          impact: "Potential savings of 320ms",
          solution: "Enable gzip/brotli compression on your server",
          savings: "320ms",
        },
        {
          type: "info",
          category: "Caching",
          title: "Serve static assets with efficient cache policy",
          description: "A long cache lifetime can speed up repeat visits.",
          impact: "Potential savings of 200ms",
          solution: "Set appropriate cache headers for static assets",
          savings: "200ms",
        },
      ])

      setIsAnalyzing(false)
    }, 3000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 50) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "images":
        return <ImageIcon className="w-4 h-4" />
      case "javascript":
        return <Code className="w-4 h-4" />
      case "css":
        return <Code className="w-4 h-4" />
      case "network":
        return <Network className="w-4 h-4" />
      case "caching":
        return <HardDrive className="w-4 h-4" />
      default:
        return <Cpu className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Performance Optimizer</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze your website's performance using Google Lighthouse metrics and get actionable recommendations to
            improve load times and user experience.
          </p>
          <div className="flex justify-center">
            <Link href="/tools">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Performance Tools
              </Button>
            </Link>
          </div>
        </div>

        {/* URL Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Website Analysis
            </CardTitle>
            <CardDescription>Enter your website URL to start performance analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://your-website.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={mockAnalysis} disabled={isAnalyzing || !url} className="min-w-[120px]">
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Analyze
                  </div>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <Alert>
                <Clock className="w-4 h-4" />
                <AlertDescription>Running Lighthouse analysis... This may take a few moments.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {metrics && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Core Metrics</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="solutions">Solutions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Lighthouse Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Lighthouse Scores</CardTitle>
                  <CardDescription>Overall performance metrics for your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: "Performance", score: metrics.performance, icon: Zap },
                      { label: "Accessibility", score: metrics.accessibility, icon: Eye },
                      { label: "Best Practices", score: metrics.bestPractices, icon: CheckCircle },
                      { label: "SEO", score: metrics.seo, icon: Globe },
                      { label: "PWA", score: metrics.pwa, icon: Smartphone },
                    ].map((item) => (
                      <div key={item.label} className="text-center space-y-2">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${getScoreBg(item.score)}`}
                        >
                          <item.icon className={`w-6 h-6 ${getScoreColor(item.score)}`} />
                        </div>
                        <div>
                          <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>{item.score}</div>
                          <div className="text-sm text-gray-600">{item.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Critical Issues</p>
                        <p className="text-2xl font-bold text-red-600">
                          {issues.filter((i) => i.type === "critical").length}
                        </p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Potential Savings</p>
                        <p className="text-2xl font-bold text-green-600">2.86s</p>
                      </div>
                      <Clock className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Overall Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(metrics.performance)}`}>
                          {metrics.performance}/100
                        </p>
                      </div>
                      <Gauge className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                  <CardDescription>Key metrics that impact user experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      label: "First Contentful Paint (FCP)",
                      value: `${metrics.fcp}s`,
                      target: "< 1.8s",
                      status: metrics.fcp > 1.8 ? "poor" : metrics.fcp > 1.0 ? "needs-improvement" : "good",
                    },
                    {
                      label: "Largest Contentful Paint (LCP)",
                      value: `${metrics.lcp}s`,
                      target: "< 2.5s",
                      status: metrics.lcp > 2.5 ? "poor" : metrics.lcp > 2.0 ? "needs-improvement" : "good",
                    },
                    {
                      label: "Cumulative Layout Shift (CLS)",
                      value: metrics.cls.toString(),
                      target: "< 0.1",
                      status: metrics.cls > 0.25 ? "poor" : metrics.cls > 0.1 ? "needs-improvement" : "good",
                    },
                    {
                      label: "First Input Delay (FID)",
                      value: `${metrics.fid}ms`,
                      target: "< 100ms",
                      status: metrics.fid > 300 ? "poor" : metrics.fid > 100 ? "needs-improvement" : "good",
                    },
                    {
                      label: "Time to First Byte (TTFB)",
                      value: `${metrics.ttfb}ms`,
                      target: "< 600ms",
                      status: metrics.ttfb > 800 ? "poor" : metrics.ttfb > 600 ? "needs-improvement" : "good",
                    },
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{metric.value}</span>
                          <Badge
                            variant={
                              metric.status === "good"
                                ? "default"
                                : metric.status === "needs-improvement"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {metric.status === "good"
                              ? "Good"
                              : metric.status === "needs-improvement"
                                ? "Needs Improvement"
                                : "Poor"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">Target: {metric.target}</div>
                      <Progress
                        value={metric.status === "good" ? 100 : metric.status === "needs-improvement" ? 60 : 30}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              {issues.map((issue, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2 mt-1">
                        {getIssueIcon(issue.type)}
                        {getCategoryIcon(issue.category)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{issue.title}</h3>
                          {issue.savings && (
                            <Badge variant="outline" className="text-green-600">
                              Save {issue.savings}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{issue.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{issue.category}</Badge>
                          <span className="text-sm text-gray-500">{issue.impact}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="solutions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Guide</CardTitle>
                  <CardDescription>Step-by-step solutions to fix performance issues</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {issues.map((issue, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        {getCategoryIcon(issue.category)}
                        {issue.title}
                      </h3>
                      <p className="text-gray-600">{issue.solution}</p>
                      {issue.category === "Images" && (
                        <div className="bg-gray-50 p-3 rounded text-sm">
                          <code>{`// Next.js Image optimization
import Image from 'next/image'

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for above-the-fold images
  placeholder="blur" // optional
/>`}</code>
                        </div>
                      )}
                      {issue.category === "JavaScript" && (
                        <div className="bg-gray-50 p-3 rounded text-sm">
                          <code>{`// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})

// Tree shaking with ES modules
import { specificFunction } from 'library'`}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
