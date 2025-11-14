"use client"

import type React from "react"
import { useReducer, useState } from "react"
import { PlusIcon, TrashIcon, PencilIcon, ArrowPathIcon, FunnelIcon } from "@heroicons/react/24/outline"
import { DragDropContext, Droppable, Draggable, type DropResult, type DraggableProvided } from "react-beautiful-dnd"

// Interface for a task
interface Task {
  id: number
  description: string
  completed: boolean
  status: "Urgent" | "En cours" | "Planifié" | "Terminé"
  category: "Consultation" | "Administration" | "Laboratoire" | "Pharmacie" | "Urgence"
  priority: 1 | 2 | 3 // 1: Haute, 2: Moyenne, 3: Basse
  dueDate?: string
}

// Initial state with more medical-focused tasks
const initialState: Task[] = [
  {
    id: 1,
    description: "Consultation Dr. Diallo - Patient #2458",
    completed: false,
    status: "Planifié",
    category: "Consultation",
    priority: 2,
    dueDate: "2024-03-16",
  },
  {
    id: 2,
    description: "Vérification des résultats d'analyses - Urgence",
    completed: false,
    status: "Urgent",
    category: "Laboratoire",
    priority: 1,
    dueDate: "2024-03-15",
  },
  {
    id: 3,
    description: "Mise à jour du stock de médicaments",
    completed: false,
    status: "En cours",
    category: "Pharmacie",
    priority: 2,
    dueDate: "2024-03-17",
  },
  {
    id: 4,
    description: "Réunion équipe médicale - Salle 204",
    completed: false,
    status: "Planifié",
    category: "Administration",
    priority: 2,
    dueDate: "2024-03-18",
  },
  {
    id: 5,
    description: "Cas d'urgence - Patient #3672",
    completed: false,
    status: "Urgent",
    category: "Urgence",
    priority: 1,
    dueDate: "2024-03-15",
  },
]

const taskReducer = (state: Task[], action: { type: string; payload: any }) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload]
    case "DELETE_TASK":
      return state.map((task) => (task.id === action.payload ? { ...task, completed: true } : task))
    case "RESTORE_TASK":
      return state.map((task) => (task.id === action.payload ? { ...task, completed: false } : task))
    case "TOGGLE_TASK":
      return state.map((task) => (task.id === action.payload ? { ...task, completed: !task.completed } : task))
    case "EDIT_TASK":
      return state.map((task) => (task.id === action.payload.id ? { ...task, ...action.payload.updates } : task))
    case "REORDER_TASKS":
      return action.payload
    default:
      return state
  }
}

const TaskList: React.FC = () => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState)
  const [newTask, setNewTask] = useState<string>("")
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>("")
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null)
  const [filter, setFilter] = useState<{
    status: string
    category: string
    priority: string
  }>({
    status: "",
    category: "",
    priority: "",
  })

  const addTask = () => {
    if (newTask.trim() === "") return
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        description: newTask,
        completed: false,
        status: "Planifié",
        category: "Administration",
        priority: 2,
      },
    })
    setNewTask("")
  }

  const deleteTask = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id })
    setShowDeleteModal(null)
  }

  const restoreTask = (id: number | null) => {
    if (id !== null) {
      dispatch({ type: "RESTORE_TASK", payload: id })
    }
  }

  const startEditing = (task: Task) => {
    setEditingTask(task.id)
    setEditText(task.description)
  }

  const saveEdit = (id: number) => {
    if (editText.trim() === "") return
    dispatch({
      type: "EDIT_TASK",
      payload: { id, updates: { description: editText } },
    })
    setEditingTask(null)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const reorderedTasks = Array.from(tasks)
    const [movedTask] = reorderedTasks.splice(result.source.index, 1)
    reorderedTasks.splice(result.destination.index, 0, movedTask)
    dispatch({ type: "REORDER_TASKS", payload: reorderedTasks })
  }

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.status === "" || task.status === filter.status) &&
      (filter.category === "" || task.category === filter.category) &&
      (filter.priority === "" || task.priority.toString() === filter.priority)
    )
  })

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "text-red-500"
      case 2:
        return "text-yellow-500"
      case 3:
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "En cours":
        return "bg-yellow-100 text-yellow-800"
      case "Planifié":
        return "bg-green-100 text-green-800"
      case "Terminé":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Consultation":
        return "👨‍⚕️"
      case "Administration":
        return "📋"
      case "Laboratoire":
        return "🔬"
      case "Pharmacie":
        return "💊"
      case "Urgence":
        return "🚑"
      default:
        return "📝"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestion des Tâches Médicales</h2>

        {/* Filtres */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-4 flex-wrap">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="p-2 border rounded-md"
            >
              <option value="">Tous les statuts</option>
              <option value="Urgent">Urgent</option>
              <option value="En cours">En cours</option>
              <option value="Planifié">Planifié</option>
              <option value="Terminé">Terminé</option>
            </select>

            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="p-2 border rounded-md"
            >
              <option value="">Toutes les catégories</option>
              <option value="Consultation">Consultation</option>
              <option value="Administration">Administration</option>
              <option value="Laboratoire">Laboratoire</option>
              <option value="Pharmacie">Pharmacie</option>
              <option value="Urgence">Urgence</option>
            </select>

            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="p-2 border rounded-md"
            >
              <option value="">Toutes les priorités</option>
              <option value="1">Haute</option>
              <option value="2">Moyenne</option>
              <option value="3">Basse</option>
            </select>
          </div>
        </div>

        {/* Ajout de tâche */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="flex-1 p-3 border rounded-l-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Nouvelle tâche médicale..."
          />
          <button
            onClick={addTask}
            disabled={newTask.trim() === ""}
            className="bg-green-500 text-white px-6 rounded-r-lg hover:bg-green-600 disabled:bg-gray-300 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Liste des tâches */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided: DraggableProvided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white rounded-lg shadow-sm p-4 ${
                          task.completed ? "opacity-50" : ""
                        } hover:shadow-md transition-shadow duration-200`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
                            className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                          />

                          <div className="flex-1">
                            {editingTask === task.id ? (
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => saveEdit(task.id)}
                                onKeyPress={(e) => e.key === "Enter" && saveEdit(task.id)}
                                className="w-full p-2 border rounded"
                                autoFocus
                              />
                            ) : (
                              <div className={task.completed ? "line-through text-gray-500" : ""}>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{getCategoryIcon(task.category)}</span>
                                  <span className="font-medium">{task.description}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
                                  >
                                    {task.status}
                                  </span>
                                  <span className={`${getPriorityColor(task.priority)}`}>
                                    {task.priority === 1 ? "⚡ Haute" : task.priority === 2 ? "⚪ Moyenne" : "🔵 Basse"}
                                  </span>
                                  {task.dueDate && (
                                    <span className="text-gray-500">
                                      📅 {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditing(task)}
                              className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(task.id)}
                              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Modal de confirmation de suppression */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-500 mb-6">
                Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action peut être annulée.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => deleteTask(showDeleteModal)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bouton de restauration */}
        {showDeleteModal && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={() => restoreTask(showDeleteModal)}
              className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <ArrowPathIcon className="h-5 w-5" />
              <span>Restaurer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList;