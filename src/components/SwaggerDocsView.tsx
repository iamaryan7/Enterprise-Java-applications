import React, { useState } from 'react';
import { 
  Terminal, 
  Send, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { ApiEndpointDoc, Role } from '../types';
import { MOCK_API_ENDPOINTS } from '../data/mockData';

type ApiEndpoint = ApiEndpointDoc;

const getEndpointTag = (ep: ApiEndpointDoc): string => {
  if (ep.tag) return ep.tag;
  if (ep.path.startsWith('/api/auth')) return 'Authentication';
  if (ep.path.startsWith('/api/users')) return 'Users (RBAC)';
  if (ep.path.startsWith('/api/employees')) return 'Employees';
  if (ep.path.startsWith('/api/departments')) return 'Departments';
  if (ep.path.startsWith('/api/audit')) return 'Audit Trail';
  if (ep.path.startsWith('/api/reports')) return 'Reports';
  return 'General';
};

const getEndpointRoles = (ep: ApiEndpointDoc): Role[] => {
  return ep.roles || ep.requiredRole || [];
};

const isAuthRequired = (ep: ApiEndpointDoc): boolean => {
  if (ep.requiresAuth !== undefined) return ep.requiresAuth;
  return ep.path !== '/api/auth/login';
};

const getRequestSample = (ep: ApiEndpointDoc): string => {
  if (ep.requestSample) return ep.requestSample;
  if (ep.requestBodySample) {
    return typeof ep.requestBodySample === 'string'
      ? ep.requestBodySample
      : JSON.stringify(ep.requestBodySample, null, 2);
  }
  return '';
};

const getResponseSample = (ep: ApiEndpointDoc): string => {
  if (typeof ep.responseSample === 'string') return ep.responseSample;
  return JSON.stringify(ep.responseSample, null, 2);
};

interface SwaggerDocsViewProps {
  currentJwtToken: string;
  userRole: Role;
  onTriggerToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => void;
}

export const SwaggerDocsView: React.FC<SwaggerDocsViewProps> = ({
  currentJwtToken,
  userRole,
  onTriggerToast
}) => {
  const [bearerToken, setBearerToken] = useState(currentJwtToken);
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [expandedEndpoints, setExpandedEndpoints] = useState<Record<string, boolean>>({
    'auth-login': true,
    'employees-get-all': true
  });
  const [activeTab, setActiveTab] = useState<Record<string, 'request' | 'response' | 'test'>>({});
  const [executionResults, setExecutionResults] = useState<Record<string, { status: number; duration: number; body: string }>>({});
  const [copiedCurl, setCopiedCurl] = useState<string | null>(null);

  const tags = ['ALL', 'Authentication', 'Users (RBAC)', 'Employees', 'Departments', 'Audit Trail', 'Reports'];

  const filteredEndpoints = MOCK_API_ENDPOINTS.filter(ep => 
    selectedTag === 'ALL' || getEndpointTag(ep) === selectedTag
  );

  const toggleExpand = (id: string) => {
    setExpandedEndpoints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const methodColors: Record<string, { badge: string; border: string }> = {
    GET: { badge: 'bg-sky-50 text-sky-700 border-sky-200', border: 'border-sky-200' },
    POST: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', border: 'border-emerald-200' },
    PUT: { badge: 'bg-amber-50 text-amber-700 border-amber-200', border: 'border-amber-200' },
    DELETE: { badge: 'bg-red-50 text-red-700 border-red-200', border: 'border-red-200' }
  };

  const handleExecute = (endpoint: ApiEndpoint) => {
    const startTime = performance.now();
    let status = 200;
    let body = getResponseSample(endpoint);
    const authRequired = isAuthRequired(endpoint);
    const requiredRoles = getEndpointRoles(endpoint);

    // Check auth simulation
    if (authRequired) {
      if (!bearerToken || bearerToken.length < 10) {
        status = 401;
        body = JSON.stringify({
          timestamp: new Date().toISOString(),
          status: 401,
          error: "Unauthorized",
          message: "Full authentication is required to access this resource. Provide valid Bearer token.",
          path: endpoint.path
        }, null, 2);
      } else if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        status = 403;
        body = JSON.stringify({
          timestamp: new Date().toISOString(),
          status: 403,
          error: "Forbidden",
          message: `Access Denied: Requires one of authority [${requiredRoles.join(', ')}]. Current principal has [ROLE_${userRole}].`,
          path: endpoint.path
        }, null, 2);
      }
    }

    if (status === 200 && endpoint.method === 'POST') {
      status = 201;
    } else if (status === 200 && endpoint.method === 'DELETE') {
      status = 200;
    }

    const duration = Math.round(performance.now() - startTime + Math.random() * 25 + 10);
    setExecutionResults(prev => ({
      ...prev,
      [endpoint.id]: { status, duration, body }
    }));

    onTriggerToast(
      status < 300 ? 'success' : status === 401 ? 'warning' : 'error',
      `HTTP ${status} - ${endpoint.method} ${endpoint.path}`,
      `Response completed in ${duration}ms`
    );
  };

  const copyCurl = (endpoint: ApiEndpoint) => {
    const reqSample = getRequestSample(endpoint);
    const curl = `curl -X ${endpoint.method} "https://api.enterprise.corp${endpoint.path}" \\\n  -H "Accept: application/json" \\\n  -H "Authorization: Bearer ${bearerToken.substring(0, 32)}..."${
      reqSample ? ` \\\n  -H "Content-Type: application/json" \\\n  -d '${reqSample.replace(/\n/g, '').replace(/\s+/g, ' ')}'` : ''
    }`;
    navigator.clipboard.writeText(curl);
    setCopiedCurl(endpoint.id);
    setTimeout(() => setCopiedCurl(null), 2000);
    onTriggerToast('info', 'cURL Command Copied');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / OpenAPI 3.0 Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                OpenAPI 3.0.3
              </span>
              <span className="text-xs text-slate-500 font-mono">springdoc-openapi-starter-webmvc-ui v2.6.0</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              <span>Swagger UI & REST API Specifications</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Live interactive testing sandbox. Spring Web MVC controllers with stateless JWT Bearer authorization and Bean Validation.
            </p>
          </div>

          {/* Token Controls */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-2 min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>JWT Authorization</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">
                ROLE_{userRole}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                placeholder="Bearer JWT Token..."
                className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-[11px] font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setBearerToken(currentJwtToken)}
                className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                title="Reset with current role token"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                selectedTag === tag ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Endpoints List */}
      <div className="space-y-3">
        {filteredEndpoints.map((ep) => {
          const isExpanded = !!expandedEndpoints[ep.id];
          const colors = methodColors[ep.method] || methodColors.GET;
          const result = executionResults[ep.id];

          return (
            <div
              key={ep.id}
              className={`rounded-xl border transition overflow-hidden shadow-xs ${
                isExpanded ? 'bg-white border-slate-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Endpoint Header Bar */}
              <div
                onClick={() => toggleExpand(ep.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer select-none gap-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${colors.badge}`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900 truncate">
                    {ep.path}
                  </span>
                  <span className="text-xs text-slate-500 truncate hidden sm:inline">
                    {ep.summary}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isAuthRequired(ep) ? (
                    <span className="flex items-center gap-1 text-[10px] text-amber-700 font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                      <Lock className="w-3 h-3 text-amber-600" />
                      <span>{getEndpointRoles(ep).length > 0 ? getEndpointRoles(ep).join(', ') : 'Auth'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-green-700 font-mono font-semibold px-2 py-0.5 rounded bg-green-50 border border-green-200">
                      Public
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCurl(ep);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                    title="Copy cURL"
                  >
                    {copiedCurl === ep.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Endpoint Details Drawer */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Description</h4>
                    <p className="text-slate-600 leading-relaxed">{ep.description}</p>
                  </div>

                  {/* Tabs: Request / Response / Live Test */}
                  <div className="border-b border-slate-200 flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab(prev => ({ ...prev, [ep.id]: 'request' }))}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                          (activeTab[ep.id] || 'request') === 'request' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        Request Sample
                      </button>
                      <button
                        onClick={() => setActiveTab(prev => ({ ...prev, [ep.id]: 'response' }))}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                          activeTab[ep.id] === 'response' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        200 OK Response Schema
                      </button>
                    </div>

                    <button
                      onClick={() => handleExecute(ep)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute Sandbox Request</span>
                    </button>
                  </div>

                  {/* Tab Body */}
                  <div>
                    {(activeTab[ep.id] || 'request') === 'request' && (
                      <div>
                        {getRequestSample(ep) ? (
                          <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                            {getRequestSample(ep)}
                          </pre>
                        ) : (
                          <div className="p-3 text-slate-500 italic">No request body required for this endpoint.</div>
                        )}
                      </div>
                    )}

                    {activeTab[ep.id] === 'response' && (
                      <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 font-mono text-[11px] overflow-x-auto">
                        {getResponseSample(ep)}
                      </pre>
                    )}
                  </div>

                  {/* Execution Output (if run) */}
                  {result && (
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2 shadow-xs animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            result.status >= 200 && result.status < 300 ? 'bg-green-50 text-green-700 border border-green-200' :
                            result.status === 401 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            HTTP {result.status}
                          </span>
                          <span className="text-slate-500 font-mono text-[11px]">Duration: {result.duration}ms</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">Content-Type: application/json</span>
                      </div>

                      <pre className="p-3 rounded-md bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-60">
                        {result.body}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
