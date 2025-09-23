import { format, formatDistance, formatRelative } from 'date-fns'

export function formatDate(date: string | Date, formatStr = 'PPP') {
  return format(new Date(date), formatStr)
}

export function formatRelativeTime(date: string | Date) {
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export function formatRelativeDate(date: string | Date) {
  return formatRelative(new Date(date), new Date())
}

export function formatMessageTime(date: string | Date) {
  const messageDate = new Date(date)
  const now = new Date()
  const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return format(messageDate, 'HH:mm')
  } else if (diffInHours < 168) { // 7 days
    return format(messageDate, 'EEE HH:mm')
  } else {
    return format(messageDate, 'MMM d, HH:mm')
  }
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function formatQuotaUsage(used: number, limit: number) {
  const percentage = Math.round((used / limit) * 100)
  return {
    percentage,
    text: `${used}/${limit} messages`,
    isWarning: percentage >= 80,
    isError: percentage >= 95
  }
}