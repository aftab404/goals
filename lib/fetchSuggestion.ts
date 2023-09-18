import formatTodos from "./formatTodos"

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodos(board)

    const response = await fetch("/api/genSummary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todos})
    })

    const data = await response.json()
    const {content} = data

    return data
}

export default fetchSuggestion