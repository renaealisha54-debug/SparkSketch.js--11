// Example in SketchScreen.tsx
const [currentProject, setCurrentProject] = useState<Project>({
  id: 'proj-1',
  name: 'New Spark Project',
  files: [
    { id: 'f1', name: 'index.html', content: '<h1>Hello</h1>', type: 'html', language: 'html' },
    { id: 'f2', name: 'script.js', content: 'console.log("ready");', type: 'js', language: 'javascript' }
  ],
  lastModified: new Date().toISOString()
});

const [activeFileId, setActiveFileId] = useState('f1');

const activeFile = currentProject.files.find(f => f.id === activeFileId);

const handleCodeChange = (newContent: string) => {
  setCurrentProject(prev => ({
    ...prev,
    files: prev.files.map(f => 
      f.id === activeFileId ? { ...f, content: newContent } : f
    )
  }));
};

const handleDeploy = async () => {
  await aetherBridge.deploy(currentProject);
};

// In JSX:
<FileTabs 
  files={currentProject.files}
  activeFileId={activeFileId}
  onFileSelect={setActiveFileId}
  onAddFile={() => {/* logic to add new file */}}
/>

<CodeEditor 
  value={activeFile?.content || ''} 
  onChange={handleCodeChange} 
  language={activeFile?.language || 'html'} 
/>
