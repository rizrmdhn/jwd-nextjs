"use client";

import * as React from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { parseAsIsoDate, useQueryStates } from "nuqs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [{ startDate, endDate }, setDateRange] = useQueryStates({
    startDate: parseAsIsoDate.withDefault(startOfMonth(new Date())),
    endDate: parseAsIsoDate.withDefault(endOfMonth(new Date())),
  });

  const date: DateRange = {
    from: startDate,
    to: endDate,
  };

  const handleSelect = (newDate: DateRange | undefined) => {
    if (newDate?.from) {
      void setDateRange({
        startDate: newDate.from,
        endDate: newDate.to ?? endDate,
      });
    }
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
