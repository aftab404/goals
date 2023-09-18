import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodoCard } from "./TodoCard";
import { useBoardStore } from "@/store/BoardStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: { [key in TypedColumn]: string } = {
  todo: "To Do",
  inprogress: "In-Progress",
  done: "Done",
};

export const Column = ({ id, todos, index }: Props) => {
  const [searchString, setShowModal, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setShowModal,
    state.setNewTaskType,
  ]);
  const filteredTodos: Todo[] = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchString.toLowerCase())
  );

  function handleAdd() {
    setNewTaskType(id);
    setShowModal(true);
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="test-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                    {filteredTodos.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button
                      onClick={handleAdd}
                      className="text-green-500 hover:text-green-600"
                    >
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
