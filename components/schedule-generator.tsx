"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Loader2, X, Plus } from "lucide-react"
import { generateSchedule } from "@/lib/scheduler"

export default function ScheduleGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [algorithm, setAlgorithm] = useState("graph-coloring")
  const [spacingDays, setSpacingDays] = useState(1)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 300)

    try {
      // This would call the actual scheduling algorithm
      await generateSchedule({
        algorithm,
        spacingDays,
        // other parameters
      })

      setProgress(100)
      setTimeout(() => {
        setIsGenerating(false)
      }, 500)
    } catch (error) {
      console.error("Error generating schedule:", error)
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Exam Schedule</CardTitle>
          <CardDescription>Configure parameters and constraints for the exam schedule generation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="exam-period">Exam Period</Label>
                  <DatePickerWithRange className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="algorithm">Algorithm</Label>
                  <Select defaultValue={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger id="algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="graph-coloring">Graph Coloring</SelectItem>
                      <SelectItem value="csp">Constraint Satisfaction</SelectItem>
                      <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departments">Departments</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="departments">
                      <SelectValue placeholder="Select departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="eng">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academic-year">Academic Year</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="academic-year">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="daily-slots">Daily Exam Slots</Label>
                  <Select defaultValue="2">
                    <SelectTrigger id="daily-slots">
                      <SelectValue placeholder="Select slots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Slot</SelectItem>
                      <SelectItem value="2">2 Slots</SelectItem>
                      <SelectItem value="3">3 Slots</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slot-duration">Exam Duration (hours)</Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="slot-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Hours</SelectItem>
                      <SelectItem value="3">3 Hours</SelectItem>
                      <SelectItem value="4">4 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="spacing-slider">Minimum Days Between Difficult Exams</Label>
                    <span className="text-sm text-muted-foreground">{spacingDays} day(s)</span>
                  </div>
                  <Slider
                    id="spacing-slider"
                    min={0}
                    max={3}
                    step={1}
                    value={[spacingDays]}
                    onValueChange={(value) => setSpacingDays(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Optimization Priority</Label>
                  <Select defaultValue="student">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student Convenience</SelectItem>
                      <SelectItem value="resource">Resource Utilization</SelectItem>
                      <SelectItem value="balanced">Balanced Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="constraints" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="weekend-exams" />
                  <Label htmlFor="weekend-exams">Allow Weekend Exams</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="holiday-exams" />
                  <Label htmlFor="holiday-exams">Allow Holiday Exams</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="consecutive-exams" defaultChecked />
                  <Label htmlFor="consecutive-exams">Prevent Consecutive Exams for Students</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="difficult-spacing" defaultChecked />
                  <Label htmlFor="difficult-spacing">Space Out Difficult Exams</Label>
                </div>

                <div className="pt-2">
                  <Label>Excluded Dates</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      May 15, 2025
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      May 20, 2025
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Button variant="outline" size="sm" className="h-6">
                      <Plus className="h-3 w-3 mr-1" /> Add Date
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Generate Schedule
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {isGenerating && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Generation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Building conflict graph...</span>
                <span>{progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

