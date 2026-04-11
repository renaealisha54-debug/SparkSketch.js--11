// src/services/projectService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project, ProjectFile } from '../types/project';

const PROJECTS_KEY = '@spark_projects';
const CURRENT_PROJECT_KEY = '@current_project';

export const projectService = {
  async saveProject(project: Project): Promise<void> {
    try {
      const projects = await this.getAllProjects();
      const existingIndex = projects.findIndex(p => p.id === project.id);
      
      if (existingIndex !== -1) {
        projects[existingIndex] = { ...project, lastModified: new Date().toISOString() };
      } else {
        projects.push({ ...project, lastModified: new Date().toISOString() });
      }
      
      await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save project', e);
    }
  },

  async getAllProjects(): Promise<Project[]> {
    try {
      const data = await AsyncStorage.getItem(PROJECTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async loadCurrentProject(): Promise<Project | null> {
    try {
      const data = await AsyncStorage.getItem(CURRENT_PROJECT_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async setCurrentProject(project: Project): Promise<void> {
    await AsyncStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(project));
  },

  // For Aether deployment (keeps backward compatibility)
  async deployToAether(project: Project): Promise<boolean> {
    try {
      await AsyncStorage.setItem('@aether_vault', JSON.stringify(project.files));
      return true;
    } catch (e) {
      console.error('Deploy failed', e);
      return false;
    }
  }
};
