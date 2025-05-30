"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, ImageIcon, Code, Network, Zap, RotateCcw } from "lucide-react"

interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  completed: boolean
}

export default function PerformanceChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      category: "Images",
      title: "Optimize image formats",
      description: "Use WebP/AVIF formats and appropriate sizing",
      impact: "high",
      completed: false,
    },
    {
      id: "2",
      category: "Images",
      title: "Implement lazy loading",
      description: "Load images only when they enter the viewport",
      impact: "medium",
      completed: false,
    },
    {
      id: "3",
      category: "JavaScript",
      title: "Code splitting",
      description: "Split bundles and load code on demand",
      impact: "high",
      completed: false,
    },
    {
      id: "4",
      category: "JavaScript",
      title: "Remove unused code",
      description: "Eliminate dead code and unused dependencies",
      impact: "medium",
      completed: false,
    },
    {
      id: "5",
      category: "CSS",
      title: "Critical CSS inlining",
      description: "Inline above-the-fold CSS to prevent render blocking",
      impact: "high",
      completed: false,
    },
    {
      id: "6",
      category: "Network",
      title: "Enable compression",
      description: "Use gzip/brotli compression for text assets",
      impact: "medium",
      completed: false,
    },
    {
      id: "7",
      category: "Network",
      title: "Optimize caching",
      description: "Set appropriate cache headers for static assets",
      impact: "medium",
      completed: false,
    },
    {
      id: "8",
      category: "Performance",
      title: "Preload critical resources",
      description: "Preload fonts, critical images, and key resources",
      impact: "medium",
      completed: false,
    },
  ])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const resetChecklist = () => {
    setItems(items.map((item) => ({ ...item, completed: false })))
  }

  const completedCount = items.filter((item) => item.completed).length
  const completionPercentage = (completedCount / items.length) * 100

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Images":
        return <ImageIcon className="w-4 h-4" />
      case "JavaScript":
        return <Code className="w-4 h-4" />
      case "CSS":
        return <Code className="w-4 h-4" />
      case "Network":
        return <Network className="w-4 h-4" />
      case "Performance":
        return <Zap className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Performance Optimization Checklist
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {completedCount}/{items.length} completed
            </Badge>
            <Button variant="outline" size="sm" onClick={resetChecklist}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Track your progress through essential performance optimizations</CardDescription>
        <Progress value={completionPercentage} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              {getCategoryIcon(category)}
              {category}
            </h3>
            <div className="space-y-2">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                    item.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Checkbox checked={item.completed} onCheckedChange={() => toggleItem(item.id)} className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                        {item.title}
                      </h4>
                      <Badge variant={getImpactColor(item.impact)} size="sm">
                        {item.impact} impact
                      </Badge>
                    </div>
                    <p className={`text-sm ${item.completed ? "text-gray-400" : "text-gray-600"}`}>
                      {item.description}
                    </p>
                  </div>
                  {item.completed && <CheckCircle className="w-5 h-5 text-green-500 mt-1" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
