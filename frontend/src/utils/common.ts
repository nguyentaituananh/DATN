export const changeTitleDocument = (title?: string): void => {
	document.title = `React App - ${title}`
}

export const formatDate = (date: Date | string, format = 'DD/MM/YYYY'): string => {
	const d = new Date(date)
	const day = d.getDate().toString().padStart(2, '0')
	const month = (d.getMonth() + 1).toString().padStart(2, '0')
	const year = d.getFullYear()

	switch (format) {
		case 'DD/MM/YYYY':
			return `${day}/${month}/${year}`
		case 'YYYY-MM-DD':
			return `${year}-${month}-${day}`
		default:
			return d.toLocaleDateString()
	}
}
