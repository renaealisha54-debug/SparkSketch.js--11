import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FileTabs = ({ files, activeFile, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bar}>
      {files.map(file => (
        <TouchableOpacity 
          key={file} 
          style={[styles.tab, activeFile === file && styles.activeTab]}
          onPress={() => onSelect(file)}
        >
          <Text style={[styles.text, activeFile === file && styles.activeText]}>{file}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bar: { backgroundColor: '#1e1e1e', height: 40, borderBottomWidth: 1, borderBottomColor: '#333' },
  tab: { paddingHorizontal: 15, justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#333' },
  activeTab: { backgroundColor: '#2d2d2d', borderBottomWidth: 2, borderBottomColor: '#007acc' },
  text: { color: '#888', fontSize: 12 },
  activeText: { color: '#fff', fontWeight: 'bold' }
});

export default FileTabs;
