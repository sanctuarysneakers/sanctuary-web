
export function SafePromiseAll(promises, def = null) {
	return Promise.all(
		promises.map(p => p.catch(error => def))
	)
}