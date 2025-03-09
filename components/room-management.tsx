"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

// Sample room data
const initialRooms = [
  { id: "HALL-A", name: "Main Hall A", capacity: 150, hasProjector: true, hasComputers: false, available: true },
  { id: "HALL-B", name: "Main Hall B", capacity: 120, hasProjector: true, hasComputers: false, available: true },
  { id: "HALL-C", name: "Main Hall C", capacity: 100, hasProjector: true, hasComputers: false, available: true },
  { id: "LAB-1", name: "Computer Lab 1", capacity: 40, hasProjector: true, hasComputers: true, available: true },
  { id: "LAB-2", name: "Computer Lab 2", capacity: 35, hasProjector: true, hasComputers: true, available: true },
]

export default function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [newRoom, setNewRoom] = useState({
    id: "",
    name: "",
    capacity: 0,
    hasProjector: false,
    hasComputers: false,
    available: true,
  })

  const filteredRooms = rooms.filter(
    (room) =>
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRoom = () => {
    setRooms([...rooms, { ...newRoom, id: newRoom.id.toUpperCase() }])
    setNewRoom({
      id: "",
      name: "",
      capacity: 0,
      hasProjector: false,
      hasComputers: false,
      available: true,
    })
  }

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  const toggleRoomAvailability = (id: string) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, available: !room.available } : room)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Enter the details for the new exam room.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-id" className="text-right">
                  Room ID
                </Label>
                <Input
                  id="room-id"
                  value={newRoom.id}
                  onChange={(e) => setNewRoom({ ...newRoom, id: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room-name" className="text-right">
                  Room Name
                </Label>
                <Input
                  id="room-name"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newRoom.capacity.toString()}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: Number.parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Has Projector</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    checked={newRoom.hasProjector}
                    onCheckedChange={(checked) => setNewRoom({ ...newRoom, hasProjector: checked })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Has Computers</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    checked={newRoom.hasComputers}
                    onCheckedChange={(checked) => setNewRoom({ ...newRoom, hasComputers: checked })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddRoom}>
                Add Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Rooms</CardTitle>
          <CardDescription>Manage rooms available for exam scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Capacity</TableHead>
                <TableHead className="hidden md:table-cell">Features</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.id}</TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{room.capacity}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1">
                      {room.hasProjector && <Badge variant="outline">Projector</Badge>}
                      {room.hasComputers && <Badge variant="outline">Computers</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch checked={room.available} onCheckedChange={() => toggleRoomAvailability(room.id)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRoom(room.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

