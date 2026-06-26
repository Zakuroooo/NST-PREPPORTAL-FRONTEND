"use client";

import { useState } from "react";
import { Plus, Calendar as CalendarIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockSessionRequests, SessionRequest, SessionStatus } from "@/lib/data/sessionRequests";
import { cn } from "@/lib/utils";

export default function RequestsPage() {
  const [requests, setRequests] = useState<SessionRequest[]>(mockSessionRequests);
  const [open, setOpen] = useState(false);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const updateStatus = (id: string, newStatus: SessionStatus) => {
    setRequests(current =>
      current.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    toast.success(`Request ${newStatus} successfully!`);
  };

  const handleAddRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReq: SessionRequest = {
      id: `req-${Date.now()}`,
      studentName: formData.get("name") as string,
      studentInitials: (formData.get("name") as string).split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase(),
      branch: "Computer Science",
      year: "Year 3",
      topicTag: formData.get("topic") as string,
      preferredDate: formData.get("date") as string,
      preferredTime: formData.get("time") as string,
      note: "",
      status: "pending",
    };
    setRequests([...requests, newReq]);
    setOpen(false);
    toast.success("New request added");
  };

  return (
    <div className="space-y-6 relative pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-[#534AB7]/10 text-[#534AB7] hover:bg-[#534AB7]/20 border border-[#534AB7]/20">
            All Requests
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            This Week
          </Button>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Showing {pendingCount} pending actions
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {requests.map((request) => (
          <Card key={request.id} className="flex flex-col shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 relative">
              <div className="flex gap-4">
                <div className="h-12 w-12 shrink-0 rounded-full bg-[#534AB7] flex items-center justify-center text-white font-semibold text-lg">
                  {request.studentInitials}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-none mb-1.5">{request.studentName}</h3>
                  <p className="text-sm text-gray-500">{request.branch} • {request.year}</p>
                </div>
              </div>
              <Badge 
                variant={request.status === "accepted" ? "default" : request.status === "pending" ? "secondary" : "destructive"}
                className={cn(
                  "capitalize font-medium shadow-none absolute top-6 right-6",
                  request.status === "accepted" && "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
                  request.status === "pending" && "bg-amber-50 text-amber-700 hover:bg-amber-50",
                  request.status === "declined" && "bg-red-50 text-red-700 hover:bg-red-50"
                )}
              >
                {request.status}
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 pt-4">
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-indigo-50/50 text-[#534AB7] border-indigo-100 shadow-none hover:bg-indigo-50/50">
                      {request.topicTag}
                    </Badge>
                    <div className="flex items-center text-sm font-medium text-gray-600 ml-2">
                      <CalendarIcon className="mr-1.5 h-4 w-4 shrink-0 text-gray-400" />
                      {request.preferredDate}, {request.preferredTime}
                    </div>
                  </div>
                  {request.note && (
                    <div className="text-sm italic text-gray-500">
                      "{request.note}"
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            {request.status === "pending" && (
              <CardFooter className="flex gap-3 pt-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" 
                  onClick={() => updateStatus(request.id, "accepted")}
                >
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm"
                  onClick={() => updateStatus(request.id, "declined")}
                >
                  Decline
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-[#534AB7] hover:bg-[#433b9f] flex items-center justify-center p-0"
            />
          }
        >
          <Plus className="h-6 w-6 text-white" />
          <span className="sr-only">Add Request</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Session Request</DialogTitle>
            <DialogDescription>
              Create a new doubt-clearing session request manually.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddRequest} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Student Name</Label>
              <Input id="name" name="name" required placeholder="e.g. Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" name="topic" required placeholder="e.g. System Design" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" required placeholder="Oct 16, 2026" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" required placeholder="10:00 AM" />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="bg-[#534AB7] hover:bg-[#433b9f]">Add Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
