import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, Settings, Users } from "lucide-react"
import Dashboard from "@/components/dashboard"
import ScheduleGenerator from "@/components/schedule-generator"
import CourseManagement from "@/components/course-management"
import RoomManagement from "@/components/room-management"
import SettingsPanel from "@/components/settings-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SchedulePreview } from "@/components/schedule-preview"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">University Exam Scheduler</h1>
          <p className="text-muted-foreground">
            Manage and generate conflict-free exam timetables for your institution
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="timetable" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Timetable</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Generate</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Rooms</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="timetable" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Timetable</CardTitle>
                  <CardDescription>Complete view of the exam schedule for Spring Semester 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <SchedulePreview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="generator" className="space-y-4">
            <ScheduleGenerator />
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <CourseManagement />
          </TabsContent>

          <TabsContent value="rooms" className="space-y-4">
            <RoomManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

