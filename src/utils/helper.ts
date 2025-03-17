import { format } from "date-fns";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};


export function formatCurrency(
    value: number,
    currency: string = 'EUR',
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  
  export function getCurrentWeekTimestamps() {
    const now = new Date();
    const dayOfWeek = now.getUTCDay(); // 0 (Sun) to 6 (Sat)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust if today is Sunday
  
    const timestamps = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setUTCDate(now.getUTCDate() + mondayOffset + i);
        // date.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
        // timestamps.push(Math.floor(date.getTime() / 1000)); // Convert to Unix timestamp
        const formattedDate=format(date, 'EEEE, MMM d');
        timestamps.push(formattedDate)
    }

    return timestamps;
}



  export function generateTimeSlots(startHour:number, endHour:number) {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
        const startTime = new Date();
        startTime.setHours(hour, 0, 0, 0);
        
        const endTime = new Date();
        endTime.setHours(hour + 1, 0, 0, 0);
        
        const formatTime = (date:Date) => 
            date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        slots.push(`${formatTime(startTime)} - ${formatTime(endTime)}`);
    }
    return slots;
}

