'use client'

import { useBoardStore } from '@/store/BoardStore'
import { useEffect } from 'react'

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { Column } from './Column'



export const Board = () => {

    const getBoards = useBoardStore(state => state.getBoard)
    const board = useBoardStore(state => state.board)
    const setBoard = useBoardStore(state => state.setBoard)
    const updateDB = useBoardStore(state => state.updateDB)
    
    useEffect(() => {
        getBoards()
    }, [getBoards])

    console.log(board)

    const handleOnDragEnd = (result:DropResult) => {

        const { destination, source, type } = result


        if(!destination) return;

        if(type === 'column') {
            const entries = Array.from(board.columns.entries())
            const [removed] = entries.splice(source.index, 1)
            entries.splice(destination.index, 0, removed)
            const rearrangedColumns = new Map(entries)
            setBoard({...board, columns: rearrangedColumns})
            return;
            
        }

        const columns = Array.from(board.columns)
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol : Column = {

            id: startColIndex[0],
            todos: startColIndex[1].todos
        }
        
        const finishCol : Column = {

            id: finishColIndex[0],
            todos: finishColIndex[1].todos

        }

        if (!startCol || !finishCol) return;

        if (source.index === destination.index && source.droppableId === destination.droppableId) return;

        const newTodos = startCol.todos
        const [todoMoved] = newTodos.splice(source.index, 1)
        
        if(startCol.id === finishCol.id) {
            newTodos.splice(destination.index, 0, todoMoved)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }
            const newColumns = new Map(board.columns)
            newColumns.set(newCol.id, newCol)
            setBoard({...board, columns: newColumns})
        } else {
            const newStartTodos = startCol.todos
            const newFinishTodos = finishCol.todos
            newFinishTodos.splice(destination.index, 0, todoMoved)
            const newStartCol = {
                id: startCol.id,
                todos: newStartTodos
            }
            const newFinishCol = {
                id: finishCol.id,
                todos: newFinishTodos
            }
            const newColumns = new Map(board.columns)
            newColumns.set(newStartCol.id, newStartCol)
            newColumns.set(newFinishCol.id, newFinishCol)

            updateDB(todoMoved, newFinishCol.id)
            setBoard({...board, columns: newColumns})
        }

    }


  return (
     <DragDropContext onDragEnd={handleOnDragEnd}>
         <Droppable droppableId='board' direction='horizontal' type='column'>
             {(provided) => (
                 <div
                    className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column
                            key={id}
                            id={id}
                            todos={column.todos}
                            index={index}
                        />
                    ))}
                 </div>
             )}
        </Droppable>
     </DragDropContext>
  )
}
