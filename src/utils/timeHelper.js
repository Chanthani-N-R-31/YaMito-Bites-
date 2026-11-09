export function getCafeStatus() {
  // Compute current time in Asia/Kolkata (IST)
  const now = new Date();
  const istFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
  const parts = istFormatter.formatToParts(now);
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
  
  // Operating hours: 2:00 PM (14:00) until 1:00 AM (01:00 next day)
  // That means: from 14:00 to 23:59, OR from 00:00 to 00:59 is OPEN.
  const isOpen = (hour >= 14 && hour < 24) || (hour >= 0 && hour < 1);
  
  let statusText = "";
  if (isOpen) {
    if (hour >= 0 && hour < 1) {
      statusText = `Open Now • Closes at 1:00 AM (${60 - minute}m left)`;
    } else {
      statusText = "Open Now • Closes 1:00 AM";
    }
  } else {
    if (hour < 14) {
      statusText = "Closed Now • Opens today at 2:00 PM";
    } else {
      statusText = "Closed Now • Opens at 2:00 PM";
    }
  }

  const timeString = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(now);

  return {
    isOpen,
    statusText,
    timeString
  };
}
