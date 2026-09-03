import React, { useState } from 'react';
import { 
  FolderGit2, 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  Database, 
  ShieldCheck, 
  Terminal, 
  TestTube2, 
  Container, 
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import { JAVA_PROJECT_FILES } from '../data/javaProjectCode';
import { JavaCodeFile } from '../types';

interface SourceCodeViewProps {
  onTriggerToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => void;
}

export const SourceCodeView: React.FC<SourceCodeViewProps> = ({ onTriggerToast }) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(JAVA_PROJECT_FILES[0]?.path || 'pom.xml');
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const selectedFile = JAVA_PROJECT_FILES.find(f => f.path === selectedFilePath) || JAVA_PROJECT_FILES[0];

  const categories = ['ALL', 'Maven', 'Database', 'Config', 'Model', 'Repository', 'Security', 'DTO', 'Service', 'Controller', 'Exception', 'Test', 'DevOps', 'Docs'];

  const filteredFiles = JAVA_PROJECT_FILES.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.path.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onTriggerToast('success', 'Source File Copied', `${selectedFile.name} copied to clipboard`);
  };

  const handleDownloadFile = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onTriggerToast('info', 'File Downloaded', `Downloaded ${selectedFile.name}`);
  };

  const handleDownloadAllZip = () => {
    // Generate a single bundled text package containing all files formatted for immediate compilation
    const bundleContent = JAVA_PROJECT_FILES.map(f => `// ==========================================\n// FILE: ${f.path}\n// ==========================================\n${f.content}\n\n`).join('\n');
    const blob = new Blob([bundleContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `enterprise-java-spring-boot-3-complete-source.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onTriggerToast('success', 'Complete Source Bundle Downloaded', 'Contains all 25+ Java 21 / Spring Boot 3 classes and config files');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-600" />
            <span>Complete Production Java 21 & Spring Boot 3 Source Tree</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full enterprise codebase: Maven pom.xml, JPA entities, Spring Security 6 JWT, MySQL 8 DDL, services, controllers, and tests.
          </p>
        </div>

        <button
          onClick={handleDownloadAllZip}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Complete Project Bundle</span>
        </button>
      </div>

      {/* Main Code Explorer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        {/* Left Col: File Tree Navigator (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col h-[650px] bg-slate-50/50">
          {/* Search and Category Filter */}
          <div className="p-3 border-b border-slate-200 space-y-2 bg-white">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search classes, pom, sql..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Files List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1.5">
            {filteredFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFilePath(file.path)}
                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition ${
                  selectedFilePath === file.path
                    ? 'bg-blue-50 text-blue-900 border border-blue-200 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode2 className={`w-4 h-4 shrink-0 ${
                    file.language === 'java' ? 'text-amber-500' :
                    file.language === 'sql' ? 'text-sky-500' :
                    file.language === 'xml' ? 'text-emerald-500' :
                    'text-blue-500'
                  }`} />
                  <div className="truncate">
                    <div className="truncate text-slate-900 font-medium">{file.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">{file.path}</div>
                  </div>
                </div>

                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 ml-1 border border-slate-200">
                  {file.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Code Viewer (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[650px] bg-[#0F172A]">
          {/* File Action Bar */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
            <div className="flex items-center gap-2 truncate">
              <FileCode2 className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="truncate">
                <span className="font-mono text-xs font-bold text-white">{selectedFile.name}</span>
                <span className="text-[11px] text-slate-400 font-mono ml-2 hidden sm:inline">{selectedFile.path}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Download single file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code Viewer Box with Syntax Highlighting Look */}
          <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-slate-200 bg-[#0F172A]">
            <pre className="whitespace-pre overflow-x-auto">
              {selectedFile.content}
            </pre>
          </div>

          {/* File Footer */}
          <div className="p-2.5 border-t border-slate-800 bg-slate-900 text-[11px] text-slate-400 flex items-center justify-between px-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Java 21 LTS / Spring Boot 3.3.4 Production Validated</span>
            </span>
            <span className="font-mono">{selectedFile.content.split('\n').length} lines</span>
          </div>
        </div>
      </div>
    </div>
  );
};
