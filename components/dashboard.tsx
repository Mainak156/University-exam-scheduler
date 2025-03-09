"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Calendar, CheckCircle2, Download, FileText } from "lucide-react"
import { SchedulePreview } from "@/components/schedule-preview"
import { useState } from "react"

export default function Dashboard() {
  const [scheduleGenerated, setScheduleGenerated] = useState(true)
  const [conflicts, setConflicts] = useState(0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Current Exam Schedule</CardTitle>
          <CardDescription>Spring Semester 2025</CardDescription>
        </CardHeader>
        <CardContent>
          {scheduleGenerated ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                  <span className="text-sm text-muted-foreground">Last generated: March 5, 2025</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="py-2">
                <SchedulePreview />
              </div>

              {conflicts > 0 ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Conflicts Detected</AlertTitle>
                  <AlertDescription>
                    There are {conflicts} scheduling conflicts that need to be resolved.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>No Conflicts</AlertTitle>
                  <AlertDescription>The current schedule is conflict-free and ready to be published.</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Calendar className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Active Schedule</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Generate a new exam schedule to get started. Make sure you have added courses and rooms first.
              </p>
              <Button>Generate Schedule</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Total Courses</dt>
                <dd className="text-sm font-medium">124</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Total Exams</dt>
                <dd className="text-sm font-medium">98</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Available Rooms</dt>
                <dd className="text-sm font-medium">18</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Exam Period</dt>
                <dd className="text-sm font-medium">May 10 - May 24</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="text-sm">Schedule generated</p>
                <p className="text-xs text-muted-foreground">March 5, 2025</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="text-sm">Constraints updated</p>
                <p className="text-xs text-muted-foreground">March 4, 2025</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-3 py-1">
                <p className="text-sm">3 courses added</p>
                <p className="text-xs text-muted-foreground">March 2, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

