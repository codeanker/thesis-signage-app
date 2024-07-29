export const formatDate = (timestamp: number, format?: 'timeOnly' | 'dateOnly') => {
  const currentDate = new Date(timestamp * 1000)
  const formattedMinutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
  switch (format) {
    case 'timeOnly':
      return `${currentDate.getHours()}:${formattedMinutes} Uhr`
    case 'dateOnly':
      return `${currentDate.getDate()}.${currentDate.getMonth() + 1}.`
    default:
      return `${currentDate.getDate()}.${currentDate.getMonth() + 1}. um ${currentDate.getHours()}:${formattedMinutes} Uhr`
  }
}
