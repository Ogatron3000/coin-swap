export default function convertToDateFormat(date) {
    date = new Date(date)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute:'2-digit',
    })
}
