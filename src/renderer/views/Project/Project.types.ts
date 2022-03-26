export type ProjectModule = {
  type: string;
}

export type ProjectDetails = {
  id: number;
  name: string;
  modules: ProjectModule[];
}