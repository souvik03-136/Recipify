export const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export const formatCalories = (calories) => {
  return `${calories} cal`
}

export const formatMacros = (nutrition) => {
  return `P: ${nutrition.protein}g · C: ${nutrition.carbs}g · F: ${nutrition.fat}g`
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str, length = 100) => {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}