// src/components/Editor/FileTabs.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ProjectFile } from '../../types/project';

interface FileTabsProps {
  files: ProjectFile[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onAddFile: () => void;
}

export const FileTabs: React.FC<FileTabsProps> = ({ files, activeFileId, onFileSelect, onAddFile }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {files.map(file => (
          <TouchableOpacity
            key={file.id}
            style={[
              styles.tab,
              activeFileId === file.id && styles.activeTab
            ]}
            onPress={() => onFileSelect(file.id)}
          >
            <Text style={[styles.tabText, activeFileId === file.id && styles.activeTabText]}>
              {file.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.addBtn} onPress={onAddFile}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    backgroundColor: '#1e1e1e', 
    borderBottomWidth: 1, 
    borderBottomColor: '#333' 
  },
  scroll: { flex: 1 },
  tab: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderBottomWidth: 3, 
    borderBottomColor: 'transparent' 
  },
  activeTab: { borderBottomColor: '#58a6ff' },
  tabText: { color: '#888', fontWeight: '500' },
  activeTabText: { color: '#fff' },
  addBtn: { 
    paddingHorizontal: 16, 
    justifyContent: 'center', 
    backgroundColor: '#252526' 
  },
  addText: { color: '#58a6ff', fontSize: 20, fontWeight: 'bold' }
});
