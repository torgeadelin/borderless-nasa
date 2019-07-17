
export const truncate = (input, size = 35) => {

    if (input != null) {
        if (input.length <= size) return input
        return input.slice(0, size) + "..."
    }
}