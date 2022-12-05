const truncate = (input: string) => (input?.length > 130 ? `${input.substring(0, 125)}...` : input)

export default truncate
