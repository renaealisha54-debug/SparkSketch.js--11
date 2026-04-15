// src/services/AetherService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const AETHER_VAULT_KEY = '@aether_vault';

export const AetherService = {
  // Retrieve the entire project vault
  async getVault() {
    try {
      const data = await AsyncStorage.getItem(AETHER_VAULT_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Failed to load vault:", e);
      return {};
    }
  },

  // Save/Update a specific project file
  async saveFile(fileId, content) {
    const vault = await this.getVault();
    vault[fileId] = { 
      content, 
      updatedAt: Date.now() 
    };
    await AsyncStorage.setItem(AETHER_VAULT_KEY, JSON.stringify(vault));
  },

  // Clear the workspace
  async resetVault() {
    await AsyncStorage.removeItem(AETHER_VAULT_KEY);
  }
};
