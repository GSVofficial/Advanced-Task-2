"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Gauge, ImageIcon, Code, Network, Zap, Monitor, ArrowLeft } from "lucide-react"
import Link from "next/link"
import LighthouseRunner from "@/components/lighthouse-runner"
import PerformanceChecklist from "@/components/performance-checklist"

const tools = [
  {
    name: "Google Lighthouse",
    description: "Comprehensive performance, accessibility, and SEO auditing",
    category: "Analysis",
    url: "https://developers.google.com/web/tools/lighthouse",
    icon: Gauge,
    features: ["Performance scoring", "Core Web Vitals", "Best practices", "Accessibility audit"],
  },
  {
    name: "WebPageTest",
    description: "Detailed performance testing with waterfall charts",
    category: "Analysis",
    url: "https://www.webpagetest.org/",
    icon: Monitor,
    features: ["Multi-location testing", "Connection simulation", "Filmstrip view", "Performance budget"],
  },
  {
    name: "GTmetrix",
    description: "Performance monitoring with historical data",
    category: "Monitoring",
    url: "https://gtmetrix.com/",
    icon: Zap,
    features: ["Performance monitoring", "Historical reports", "Alerts", "Video playback"],
  },
  {
    name: "TinyPNG",
    description: "Smart PNG and JPEG compression",
    category: "Images",
    url: "https://tinypng.com/",
    icon: ImageIcon,
    features: ["Lossless compression", "Batch processing", "API access", "WebP conversion"],
  },
  {
    name: "Bundle Analyzer",
    description: "Analyze and optimize JavaScript bundles",
    category: "JavaScript",
    url: "https://www.npmjs.com/package/webpack-bundle-analyzer",
    icon: Code,
    features: ["Bundle visualization", "Size analysis", "Dependency tracking", "Tree shaking insights"],
  },
  {
    name: "Chrome DevTools",
    description: "Built-in performance profiling and debugging",
    category: "Development",
    url: "https://developers.google.com/web/tools/chrome-devtools",
    icon: Network,
    features: ["Performance profiler", "Network analysis", "Coverage report", "Lighthouse integration"],
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Analyzer
            </Button>
          </Link>
          <div className="text-center space-y-4 flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Performance Tools</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Essential tools and utilities for analyzing and optimizing web performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LighthouseRunner />
          <PerformanceChecklist />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Tools</CardTitle>
            <CardDescription>
              Professional tools for comprehensive performance analysis and optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Card key={tool.name} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <tool.icon className="w-6 h-6 text-blue-600" />
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <ul className="space-y-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Tool
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
