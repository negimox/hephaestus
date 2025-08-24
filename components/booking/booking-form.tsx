"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Phone, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
}

interface BookingFormProps {
  service: Service;
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

const phoneModels = [
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15 Plus",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14 Plus",
  "iPhone 14",
  "Samsung Galaxy S24 Ultra",
  "Samsung Galaxy S24+",
  "Samsung Galaxy S24",
  "Samsung Galaxy S23 Ultra",
  "Google Pixel 8 Pro",
  "Google Pixel 8",
  "OnePlus 12",
  "Other (specify in notes)",
];

export function BookingForm({ service }: BookingFormProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deviceModel: "",
    deviceCondition: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        service: service.title,
        date: selectedDate?.toISOString(),
        time: selectedTime,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        deviceModel: formData.deviceModel,
        deviceCondition: formData.deviceCondition,
        notes: formData.notes,
      };

      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        toast.error(err?.error || "Failed to create booking");
      } else {
        const data = await res.json();
        toast.success("Booking created. Redirecting to confirmation...");

        // Navigate to confirmation page with booking id
        const bookingId = data?.id;
        if (bookingId) {
          router.push(`/bookings/confirmed?bookingId=${bookingId}`);
        } else {
          // Fallback: reset form
          setSelectedDate(undefined);
          setSelectedTime(undefined);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            deviceModel: "",
            deviceCondition: "",
            notes: "",
          });
        }
      }
    } catch (error) {
      console.error("Booking submit error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.deviceModel;

  // Disable past dates and Sundays
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date and Time Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
            <div className="w-full md:w-64">
              <Label className="text-sm font-medium mb-2 block">
                Choose Date
              </Label>
              <div className="rounded-md border p-2 w-full h-80">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Available Times
              </Label>
              {selectedDate ? (
                <ScrollArea className="w-full h-80 rounded-md border">
                  <div className="w-full h-full flex flex-col gap-3 p-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="flex flex-row text-left py-2"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Please select a date first
                </p>
              )}
            </div>
          </div>
          {selectedDate && selectedTime && (
            <Badge variant="secondary" className="mt-4">
              Appointment: {selectedDate.toLocaleDateString()} at {selectedTime}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Device Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="deviceModel">Device Model *</Label>
            <Select
              value={formData.deviceModel}
              onValueChange={(value) => handleInputChange("deviceModel", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your device model" />
              </SelectTrigger>
              <SelectContent>
                {phoneModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="deviceCondition">Device Condition</Label>
            <Select
              value={formData.deviceCondition}
              onValueChange={(value) =>
                handleInputChange("deviceCondition", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Describe the current condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minor-damage">
                  Minor damage (small cracks, scratches)
                </SelectItem>
                <SelectItem value="moderate-damage">
                  Moderate damage (large cracks, some functionality lost)
                </SelectItem>
                <SelectItem value="severe-damage">
                  Severe damage (shattered screen, major issues)
                </SelectItem>
                <SelectItem value="not-working">
                  Device not working at all
                </SelectItem>
                <SelectItem value="water-damage">Water damage</SelectItem>
                <SelectItem value="other">Other (specify in notes)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Please describe the issue in detail or any special requirements..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </Button>
        <Button type="button" variant="outline" size="lg" asChild>
          <a href={`/services/${service.id}`}>Back to Service</a>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        * Required fields. By booking an appointment, you agree to our terms of
        service and privacy policy.
      </p>
    </form>
  );
}
