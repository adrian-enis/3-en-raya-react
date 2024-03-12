export const Square = ({ children, isSelected, updateBoard, index, color }) => {
  const handleClick = () => {
    updateBoard(index)

  }
  const className = `square ${isSelected ? "is-selected" : ""}`
  return (
    <div className={className} onClick={handleClick} style={{ backgroundColor: color }}>{children}</div>
  )
}