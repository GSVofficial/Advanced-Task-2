"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Monitor, Smartphone, Wifi, WifiOff, Play, CheckCircle } from "lucide-react"

interface LighthouseConfig {
  device: "mobile" | "desktop"
  throttling: "none" | "slow-4g" | "fast-3g"
  categories: string[]
}

export default function LighthouseRunner() {
  const [config, setConfig] = useState<LighthouseConfig>({
    device: "mobile",
    throttling: "slow-4g",
    categories: ["performance", "accessibility", "best-practices", "seo"],
  })
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const runLighthouse = async () => {
    setIsRunning(true)
    setProgress(0)
    setCompleted(false)

    // Simulate lighthouse run with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          setCompleted(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const resetRunner = () => {
    setProgress(0)
    setCompleted(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          Lighthouse Configuration
        </CardTitle>
        <CardDescription>Configure your Lighthouse audit settings for accurate performance testing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs
          value={config.device}
          onValueChange={(value) => setConfig({ ...config, device: value as "mobile" | "desktop" })}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Desktop
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          <label className="text-sm font-medium">Network Throttling</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "none", label: "No throttling", icon: Wifi },
              { value: "fast-3g", label: "Fast 3G", icon: Wifi },
              { value: "slow-4g", label: "Slow 4G", icon: WifiOff },
            ].map((option) => (
              <Button
                key={option.value}
                variant={config.throttling === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setConfig({ ...config, throttling: option.value as any })}
                className="flex items-center gap-2"
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Audit Categories</label>
          <div className="flex flex-wrap gap-2">
            {["performance", "accessibility", "best-practices", "seo", "pwa"].map((category) => (
              <Badge
                key={category}
                variant={config.categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  const newCategories = config.categories.includes(category)
                    ? config.categories.filter((c) => c !== category)
                    : [...config.categories, category]
                  setConfig({ ...config, categories: newCategories })
                }}
              >
                {category.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Running Lighthouse audit...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {completed && (
          <Alert>
            <CheckCircle className="w-4 h-4" />
            <AlertDescription>
              Lighthouse audit completed successfully! Check the main dashboard for results.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button onClick={runLighthouse} disabled={isRunning || config.categories.length === 0} className="flex-1">
            {isRunning ? "Running Audit..." : "Run Lighthouse Audit"}
          </Button>
          {completed && (
            <Button variant="outline" onClick={resetRunner}>
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
