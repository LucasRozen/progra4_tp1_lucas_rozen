namespace ej5 {
        // Definimos el tipo para las prioridades de las tareas
        type Priority = "Alta" | "Media" | "Baja";

        // Definimos el tipo para el estado de las tareas
        type Status = "pendientes" | "completadas";
    
        // Definimos la estructura de una tarea
        interface Task {
            description: string;
            priority: Priority;
            status: Status;
            deadline: Date;
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
                    if(tasksArray[0].priority!=="Alta")
                        tasksArray.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
                    tasksArray.forEach(task => {                      
                        if (task.priority!=="Alta")
                            console.log(`- ${task.description}. Deadline: ${task.deadline}`);
                        else
                            console.log(`- ${task.description}`);
                    });
                });
            }
        }
    
        // Creamos un array de tareas
        const tasks: Task[] = [
            { description: "Terminar el informe", priority: "Alta", status: "pendientes", deadline: new Date("0000-00-00") },
            { description: "Comprar leche", priority: "Baja", status: "pendientes", deadline: new Date("2024-05-02") },
            { description: "Llamar al cliente", priority: "Media", status: "pendientes", deadline: new Date("2024-04-10") },
            { description: "Hacer ejercicio", priority: "Alta", status: "completadas", deadline: new Date("0000-00-00") },
            { description: "Estudiar TypeScript", priority: "Alta", status: "pendientes", deadline: new Date("0000-00-00") },
            { description: "Ir a cargar la sube", priority: "Media", status: "completadas", deadline: new Date("2024-04-14") },
            { description: "Tarea de matemática", priority: "Media", status: "pendientes", deadline: new Date("2024-04-25") },
            { description: "Leer el libro", priority: "Baja", status: "pendientes", deadline: new Date("2024-08-04") },
            { description: "Andar en bicicleta", priority: "Media", status: "pendientes", deadline: new Date("2024-05-10") },
            { description: "Lavar el auto", priority: "Media", status: "pendientes", deadline: new Date("2024-05-20") },
            { description: "Lavar los platos", priority: "Alta", status: "pendientes", deadline: new Date("0000-00-00") },
            { description: "Cocinar", priority: "Baja", status: "pendientes", deadline: new Date("2024-07-25") }
    
        ];
    
        // Agregamos las tareas al mapa
        tasks.forEach(task => addTask(task));
    
        // Mostramos solo las tareas pendientes
        showTasksByStatusAndPriority("pendientes");
}

