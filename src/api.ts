import { StudyPlanRequest, StudyPlanResponse, Topic } from "./types";
import { ShowUserDTO } from './../server/src/dtos/ShowUserDTO';

const mockTopics: Topic[] = [
  { id: 1, name: "React", description: "Componentes, hooks e estado", category: "Frontend" },
  { id: 2, name: "TypeScript", description: "Tipos sólidos para JavaScript", category: "Frontend" },
  { id: 3, name: "Node.js", description: "Construção de APIs e microsserviços", category: "Backend" },
  { id: 4, name: "SQL", description: "Consultas e modelagem de dados", category: "Database" },
  { id: 5, name: "Docker", description: "Containerização de aplicações", category: "DevOps" },
];

export async function fetchTopics(): Promise<Topic[]> {
  await new Promise(resolve => setTimeout(resolve, 250));
  return mockTopics;
}

export async function createStudyPlan(payload: StudyPlanRequest): Promise<StudyPlanResponse> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const plan: StudyPlanResponse = {
    title: `Plano de estudo: ${payload.prompt}`,
    summary: `Estimativa para ${payload.weeks} semanas com ${payload.hoursPerWeek} horas por semana.`,
    weeks: Array.from({ length: payload.weeks }, (_, index) => ({
      week: index + 1,
      title: `Semana ${index + 1}`,
      objectives: [
        `Tema principal: ${payload.prompt}`,
        "Revisão de conceitos chave",
        "Prática com exercícios e projetos"
      ],
      topics: payload.topicIds ? payload.topicIds.map(id => mockTopics.find(topic => topic.id === id)?.name || "Tópico selecionado") : ["Tópico sugerido"],
    })),
  };
  return plan;
}

export async function fetchAllUsers(): Promise<ShowUserDTO[]> {
  const res = await fetch("http://localhost:3000/user/users");

  if (!res.ok) throw new Error("Failed to load all users");

  const data = await res.json();

  return data.users;
}
