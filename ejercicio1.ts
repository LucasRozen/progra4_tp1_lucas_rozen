// Definimos el tipo para las prioridades de las tareas
type Priority = "Alta" | "Media" | "Baja";

// Definimos el tipo para el estado de las tareas
type Status = "pendientes" | "completadas";

// Definimos la estructura de una tarea
interface Task {
    description: string;
    priority: Priority;
    status: Status;
}

// Creamos un mapa para almacenar las tareas agrupadas por estado y prioridad
const tasksByStatusAndPriority: Map<Status, Map<Priority, Task[]>> = new Map([
    ["pendientes", new Map([
        ["Alta", [] as Task[]],
        ["Media", [] as Task[]],
        ["Baja", [] as Task[]]
    ])],
    ["completadas", new Map([
        ["Alta", [] as Task[]],
        ["Media", [] as Task[]],
        ["Baja", [] as Task[]]
    ])]
]);

// Función para agregar una tarea al mapa
function addTask(task: Task) {
    const statusMap = tasksByStatusAndPriority.get(task.status);
    if (statusMap) {
        const priorityTasks = statusMap.get(task.priority);
        if (priorityTasks) {
            priorityTasks.push(task);
        }
    }
}

// Función para mostrar tareas según su estado
function showTasksByStatusAndPriority(status: Status) {
    console.log(`Tareas ${status}:`);
    const statusMap = tasksByStatusAndPriority.get(status);
    if (statusMap) {
        statusMap.forEach((tasksArray) => {
            tasksArray.forEach(task => {
                console.log(`- ${task.description}`);
            });
        });
    }
}

// Creamos un array de tareas
const tasks: Task[] = [
    { description: "Terminar el informe", priority: "Alta", status: "pendientes" },
    { description: "Comprar leche", priority: "Baja", status: "pendientes" },
    { description: "Llamar al cliente", priority: "Media", status: "pendientes" },
    { description: "Hacer ejercicio", priority: "Alta", status: "completadas" },
    { description: "Estudiar TypeScript", priority: "Alta", status: "pendientes" },
    { description: "Ir a cargar la sube", priority: "Media", status: "completadas" },
    { description: "Tarea de matemática", priority: "Media", status: "pendientes" },
    { description: "Leer el libro", priority: "Baja", status: "pendientes" },
    { description: "Andar en bicicleta", priority: "Media", status: "pendientes" },
    { description: "Lavar el auto", priority: "Media", status: "pendientes" },
    { description: "Lavar los platos", priority: "Media", status: "pendientes" },
    { description: "Cocinar", priority: "Baja", status: "pendientes" }
    
];

// Agregamos las tareas al mapa
tasks.forEach(task => addTask(task));

// Mostramos solo las tareas pendientes
showTasksByStatusAndPriority("pendientes");
