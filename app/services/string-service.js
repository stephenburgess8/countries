export function escapeLabelText(unescapedText) {
	let escapedText = unescapedText.replace(/\s/g, '')
	escapedText = escapedText.charAt(0).toLowerCase() + escapedText.slice(1)
	return escapedText
}
