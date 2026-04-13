import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import CodeEditor from '../components/Editor/CodeEditor';
import { AetherBridge } from '../services/aetherBridge';

const SketchScreen = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleUpdate = (code: string) => {
    // Every time the user types, we "re-bridge" the code for the WebView
    const bundled = AetherBridge.prepareDeployment(code);
    setHtmlContent(bundled);
  };

  return (
    <View style={styles.container}>
      {/* Top half: The Editor */}
      <View style={styles.editorPane}>
        <CodeEditor onChange={handleUpdate} />
      </View>

      {/* Bottom half: The Live Visual Preview */}
      <View style={styles.previewPane}>
        <WebView 
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  editorPane: { flex: 1 },
  previewPane: { flex: 1, borderTopWidth: 2, borderColor: '#444' },
  webview: { flex: 1, backgroundColor: '#fff' }
});

export default SketchScreen;
