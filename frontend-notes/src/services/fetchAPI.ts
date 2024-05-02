
export const fetchAPI = async (url: string, options?: RequestInit) => {
	const response = await fetch(`http://localhost:8080/${url}`, options)
	if (!response.ok) {
		throw new Error(`Erro ao fazer a requisição: ${response.statusText}`);
	}
	return await response;
}