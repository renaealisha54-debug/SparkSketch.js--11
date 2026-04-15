// src/services/aetherBridge.ts
import { AetherService } from './AetherService';

export const aetherBridge = {
  async deploy(files: ProjectFile[]): Promise<boolean> {
    try {
      // Corrected: Mapping over 'files' array, not a single 'file'
      for (const f of files) {
        await AetherService.saveFile(f.id, f.content);
      }
      return true;
    } catch (e) {
      console.error("Bridge Error:", e);
      return false;
    }
  }
};
