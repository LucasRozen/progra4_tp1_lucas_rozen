// Definimos el tipo para las prioridades de las tareas
type Priority = "Alta" | "Media" | "Baja";

// Definimos el tipo para el estado de las tareas
type Status = "pendiente" | "completado";

// Definimos la estructura de una tarea
interface Task {
    description: string;
    priority: Priority;
    status: Status;
    assignedTo: string; // Persona asignada a la tarea
}

// Creamos un mapa para almacenar las tareas agrupadas por estado y prioridad,
// y organizadas por persona
const tasksByStatusPriorityAndAssignee: Map<Status, Map<Priority, Map<string, Task[]>>> = new Map([
    ["pendiente", new Map([
        ["Alta", new Map()],
        ["Media", new Map()],
        ["Baja", new Map()]
    ])],
    ["completado", new Map([
        ["Alta", new Map()],
        ["Media", new Map()],
        ["Baja", new Map()]
    ])]
]);

// Función para agregar una tarea al mapa
function addTask(task: Task) {
    const statusMap = tasksByStatusPriorityAndAssignee.get(task.status);
    if (statusMap) {
        const priorityMap = statusMap.get(task.priority);
        if (priorityMap) {
            const assigneeTasks = priorityMap.get(task.assignedTo);
            if (assigneeTasks) {
                assigneeTasks.push(task);
            } else {
                priorityMap.set(task.assignedTo, [task]);
            }
        }
    }
}

// Función para mostrar las tareas según su estado, prioridad y asignadas a una persona
function showTasksByStatusPriorityAndAssignee(status: Status, assignee: string) {
    console.log(`Tareas en estado ${status} de ${assignee}:`);
    const statusMap = tasksByStatusPriorityAndAssignee.get(status);
    if (statusMap) {
        statusMap.forEach(priorityMap=>{
            if (priorityMap) {
                const assigneeTasks = priorityMap.get(assignee);
                if (assigneeTasks) {
                    assigneeTasks.forEach(task => {
                        console.log(`- ${task.description}`);
                    });
                }
            }
        })      
    }
}

// Creamos un array de tareas
const tasks: Task[] = [
    { description: "Terminar el informe", priority: "Alta", status: "pendiente", assignedTo: "María" },
    { description: "Comprar leche", priority: "Baja", status: "pendiente", assignedTo: "Laura" },
    { description: "Llamar al cliente", priority: "Media", status: "pendiente", assignedTo: "Juan" },
    { description: "Hacer ejercicio", priority: "Alta", status: "completado", assignedTo: "María" },
    { description: "Estudiar TypeScript", priority: "Alta", status: "pendiente", assignedTo: "Santiago" },
    { description: "Ir a cargar la sube", priority: "Media", status: "completado", assignedTo: "María" },
    { description: "Tarea de matemática", priority: "Media", status: "pendiente", assignedTo: "Santiago" },
    { description: "Leer el libro", priority: "Baja", status: "pendiente", assignedTo: "María" },
    { description: "Andar en bicicleta", priority: "Media", status: "pendiente", assignedTo: "Juan" },
    { description: "Lavar el auto", priority: "Media", status: "pendiente", assignedTo: "María" },
    { description: "Lavar los platos", priority: "Media", status: "pendiente", assignedTo: "María" },
    { description: "Cocinar", priority: "Baja", status: "pendiente", assignedTo: "Juan" }
];

// Agregamos las tareas al mapa
tasks.forEach(task => addTask(task));

// Mostramos las tareas pendientes asignadas a Juan
showTasksByStatusPriorityAndAssignee("pendiente", "Juan");

// Mostramos las tareas pendientes asignadas a María
showTasksByStatusPriorityAndAssignee("pendiente", "María");
