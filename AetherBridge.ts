// src/services/aetherBridge.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const aetherBridge = {
  async deploy(files: ProjectFile[]): Promise<boolean> {
    try {
      // Atomic write: Overwrite the vault with the latest state
      await AsyncStorage.setItem('@aether_vault', JSON.stringify(files));
      return true;
    } catch (e) {
      console.error("Vault Write Error:", e);
      return false;
    }
  }
};
