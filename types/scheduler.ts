// Course type definition
export interface Course {
  id: string
  name: string
  department: string
  year: number
  students: number
  difficulty: "Easy" | "Medium" | "Hard"
}

// Room type definition
export interface Room {
  id: string
  name: string
  capacity: number
  hasProjector: boolean
  hasComputers: boolean
  available: boolean
}

// Scheduling constraints
export interface ScheduleConstraints {
  startDate: string
  endDate: string
  dailySlots: number
  slotDuration: number
  allowWeekends: boolean
  excludedDates: string[]
  spacingDays: number
}

// Exam slot definition
export interface ExamSlot {
  date: string
  startTime: string
  endTime: string
  roomId?: string | null
  courseId?: string
}

// Conflict definition
export interface Conflict {
  courseId: string
  reason: string
}

// Complete schedule definition
export interface Schedule {
  slots: ExamSlot[]
  conflicts: Conflict[]
}

