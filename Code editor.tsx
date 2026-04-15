// src/components/Editor/CodeEditor.tsx
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

export const CodeEditor = ({ value, onChange }) => {
  const webViewRef = useRef(null);

  const injectedJavaScript = `
    const codeEl = document.getElementById('code');
    // Debounce listener to keep the bridge efficient
    let timeout = null;
    codeEl.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        window.ReactNativeWebView.postMessage(codeEl.textContent);
      }, 300);
    });
  `;

  return (
    <WebView
      ref={webViewRef}
      source={{ html: htmlTemplate(value) }}
      onMessage={(event) => onChange(event.nativeEvent.data)}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled={true}
      // Ensure hardware acceleration for smooth scrolling
      androidLayerType="hardware"
    />
  );
};
