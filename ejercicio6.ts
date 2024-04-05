    // Definimos el tipo para las prioridades de las tareas
    type Priority = "Alta" | "Media" | "Baja";

    // Definimos el tipo para el estado de las tareas
    type Status = "pendientes" | "completadas";
    
    type Description =
    | {type: "file", file: File}
    | {type: "text", text: string}

    // Definimos la estructura de una tarea
    interface Task {
        description: Description;
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
                    if(task.description.type==="text"){
                        console.log(`- ${task.description.text}`);
                    }else
                        console.log(`- Ruta del archivo: ${task.description.file.name}`);                 
                });
            });
        }
    }

    // Creamos un array de tareas
    const tasks: Task[] = [
        { description: {type: "text", text: "Terminar el informe"}, priority: "Alta", status: "pendientes" },
        { description: {type: "text", text: "Comprar leche"}, priority: "Baja", status: "pendientes" },
        { description: {type: "text", text: "Llamar al cliente"}, priority: "Media", status: "pendientes" },
        { description: {type: "text", text: "Hacer ejercicio"}, priority: "Alta", status: "completadas" },
        { description: {type: "text", text: "Estudiar TypeScript"}, priority: "Alta", status: "pendientes" },
        { description: {type: "text", text: "Ir a cargar la sube"}, priority: "Media", status: "completadas" },
        { description: {type: "text", text: "Tarea de matemática"}, priority: "Media", status: "pendientes" },
        { description: {type: "text", text: "Leer el libro"}, priority: "Baja", status: "pendientes" },
        { description: {type: "text", text: "Andar en bicicleta"}, priority: "Media", status: "pendientes" },
        { description: {type: "text", text: "Lavar el auto"}, priority: "Media", status: "pendientes" },
        { description: {type: "text", text: "Lavar los platos"}, priority: "Media", status: "pendientes" },
        { description: {type: "text", text: "Cocinar"}, priority: "Baja", status: "pendientes" }

    ];

    // Agregamos las tareas al mapa
    tasks.forEach(task => addTask(task));

    // Mostramos solo las tareas pendientes
    showTasksByStatusAndPriority("pendientes");