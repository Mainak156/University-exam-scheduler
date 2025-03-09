"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data for the schedule preview
const scheduleData = {
  "2025-05-10": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "CS101: Intro to Programming",
      room: "Hall A",
      students: 120,
      department: "Computer Science",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "MATH201: Calculus II",
      room: "Hall B",
      students: 85,
      department: "Mathematics",
    },
  ],
  "2025-05-11": [
    { time: "9:00 AM - 12:00 PM", course: "PHYS101: Physics I", room: "Hall C", students: 95, department: "Physics" },
    {
      time: "2:00 PM - 5:00 PM",
      course: "ENG102: Technical Writing",
      room: "Hall A",
      students: 75,
      department: "English",
    },
  ],
  "2025-05-12": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "CS201: Data Structures",
      room: "Hall B",
      students: 65,
      department: "Computer Science",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "CHEM101: General Chemistry",
      room: "Hall C",
      students: 80,
      department: "Chemistry",
    },
  ],
  "2025-05-13": [
    { time: "9:00 AM - 12:00 PM", course: "BIO101: Biology I", room: "Hall A", students: 90, department: "Biology" },
    {
      time: "2:00 PM - 5:00 PM",
      course: "HIST101: World History",
      room: "Hall B",
      students: 70,
      department: "History",
    },
  ],
  "2025-05-14": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "ECON201: Microeconomics",
      room: "Hall C",
      students: 75,
      department: "Economics",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "PSYCH101: Intro to Psychology",
      room: "Hall A",
      students: 110,
      department: "Psychology",
    },
  ],
  "2025-05-16": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "SOC101: Introduction to Sociology",
      room: "Hall B",
      students: 85,
      department: "Sociology",
    },
    { time: "2:00 PM - 5:00 PM", course: "PHIL201: Ethics", room: "Hall C", students: 60, department: "Philosophy" },
  ],
  "2025-05-17": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "CS301: Algorithms",
      room: "Hall A",
      students: 55,
      department: "Computer Science",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "MATH301: Linear Algebra",
      room: "Hall B",
      students: 45,
      department: "Mathematics",
    },
  ],
  "2025-05-18": [
    { time: "9:00 AM - 12:00 PM", course: "PHYS201: Physics II", room: "Hall C", students: 70, department: "Physics" },
    { time: "2:00 PM - 5:00 PM", course: "ART101: Art History", room: "Hall A", students: 65, department: "Art" },
  ],
  "2025-05-19": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "MUS101: Music Appreciation",
      room: "Hall B",
      students: 55,
      department: "Music",
    },
    { time: "2:00 PM - 5:00 PM", course: "LANG101: Spanish I", room: "Hall C", students: 40, department: "Languages" },
  ],
  "2025-05-21": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "BUS201: Business Management",
      room: "Hall A",
      students: 95,
      department: "Business",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "COMM101: Public Speaking",
      room: "Hall B",
      students: 75,
      department: "Communications",
    },
  ],
  "2025-05-22": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "CS401: Software Engineering",
      room: "Hall C",
      students: 50,
      department: "Computer Science",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "STAT201: Statistics",
      room: "Hall A",
      students: 85,
      department: "Statistics",
    },
  ],
  "2025-05-23": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "GEOG101: World Geography",
      room: "Hall B",
      students: 70,
      department: "Geography",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "POL101: Political Science",
      room: "Hall C",
      students: 65,
      department: "Political Science",
    },
  ],
  "2025-05-24": [
    {
      time: "9:00 AM - 12:00 PM",
      course: "ANTH101: Introduction to Anthropology",
      room: "Hall A",
      students: 60,
      department: "Anthropology",
    },
    {
      time: "2:00 PM - 5:00 PM",
      course: "JOUR101: Journalism",
      room: "Hall B",
      students: 55,
      department: "Journalism",
    },
  ],
}

// Helper function to format date
function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

// Get all dates in order
const allDates = Object.keys(scheduleData).sort()

export function SchedulePreview() {
  const [currentView, setCurrentView] = useState<"calendar" | "list">("calendar")
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  // Calculate week ranges
  const weeksCount = Math.ceil(allDates.length / 7)
  const currentWeekDates = allDates.slice(currentWeek * 7, (currentWeek + 1) * 7)

  // Filter by department if selected
  const filteredScheduleData = { ...scheduleData }
  if (selectedDepartment) {
    Object.keys(filteredScheduleData).forEach((date) => {
      filteredScheduleData[date] = filteredScheduleData[date].filter((exam) => exam.department === selectedDepartment)
    })
  }

  // Get all departments for filter
  const allDepartments = Array.from(
    new Set(
      Object.values(scheduleData)
        .flat()
        .map((exam) => exam.department),
    ),
  ).sort()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(currentView === "calendar" && "bg-primary text-primary-foreground")}
            onClick={() => setCurrentView("calendar")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(currentView === "list" && "bg-primary text-primary-foreground")}
            onClick={() => setCurrentView("list")}
          >
            <Clock className="mr-2 h-4 w-4" />
            List View
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            onChange={(e) => setSelectedDepartment(e.target.value || null)}
            value={selectedDepartment || ""}
          >
            <option value="">All Departments</option>
            {allDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentView === "calendar" && (
        <>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek((prev) => Math.max(0, prev - 1))}
              disabled={currentWeek === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous Week
            </Button>
            <span className="text-sm font-medium">
              Week {currentWeek + 1} of {weeksCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek((prev) => Math.min(weeksCount - 1, prev + 1))}
              disabled={currentWeek === weeksCount - 1}
            >
              Next Week <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentWeekDates.map((date) => (
              <Card key={date} className="p-4">
                <h3 className="font-medium text-lg mb-2">{formatDate(date)}</h3>
                <div className="space-y-3">
                  {filteredScheduleData[date]?.map((exam, idx) => (
                    <div key={idx} className="p-3 border rounded-md bg-background">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="font-medium">{exam.course}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span>{exam.time}</span>
                            <span>•</span>
                            <span>{exam.room}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{exam.department}</Badge>
                          <Badge variant="secondary">{exam.students} students</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!filteredScheduleData[date] || filteredScheduleData[date].length === 0) && (
                    <div className="text-center py-3 text-muted-foreground">No exams scheduled for this day</div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {currentView === "list" && (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="hidden md:table-cell">Room</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="text-right">Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDates.flatMap((date) =>
                (filteredScheduleData[date] || []).map((exam, idx) => (
                  <TableRow key={`${date}-${idx}`}>
                    <TableCell>{formatDate(date).split(",")[0]}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                    <TableCell className="font-medium">{exam.course}</TableCell>
                    <TableCell className="hidden md:table-cell">{exam.room}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{exam.department}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{exam.students}</TableCell>
                  </TableRow>
                )),
              )}
              {allDates.flatMap((date) => filteredScheduleData[date] || []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No exams found matching the selected filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

