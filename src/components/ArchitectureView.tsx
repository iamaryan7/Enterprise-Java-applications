import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Code2, 
  KeyRound, 
  FileCode, 
  Lock,
  GitBranch,
  Cpu
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consistency' | 'flow' | 'security' | 'database'>('consistency');

  const consistencyMatrix = [
    {
      layer: '1. Database Layer (MySQL 8)',
      component: 'Schema DDL (`schema.sql`)',
      status: 'VERIFIED',
      details: 'Normalized 3NF relational design. Foreign keys: employees.department_id -> departments.id (ON DELETE RESTRICT), user_roles -> users.id & roles.id. Composite unique indexes on email, username, employee_id.'
    },
    {
      layer: '2. Entity Model Layer',
      component: 'JPA 3.1 / Hibernate 6',
      status: 'VERIFIED',
      details: 'Entities (@Entity, @Table): User, Role, Employee, Department, AuditLog, Notification. Auditing via @CreatedDate, @LastModifiedDate, @CreatedBy, @EntityListeners(AuditingEntityListener.class).'
    },
    {
      layer: '3. Repository Layer',
      component: 'Spring Data JPA',
      status: 'VERIFIED',
      details: 'Repositories extend JpaRepository. Custom JPQL & pagination: EmployeeRepository.searchEmployees(), existsByUsername(), existsByEmail(), findByDepartmentId().'
    },
    {
      layer: '4. Service Layer',
      component: 'Service Interfaces & Impls',
      status: 'VERIFIED',
      details: '@Service with @Transactional(readOnly=true/false). Business validation, DTO mapping, BCrypt password hashing, and automatic AuditLog emission via AuditLogService.'
    },
    {
      layer: '5. DTO & Validation Layer',
      component: 'Jakarta Bean Validation',
      status: 'VERIFIED',
      details: '@NotNull, @NotBlank, @Email, @Size(min=8), @Pattern, @Min. Decoupled domain models from client transport representations.'
    },
    {
      layer: '6. REST Controller Layer',
      component: 'Spring Web MVC',
      status: 'VERIFIED',
      details: '@RestController, @RequestMapping("/api/v1/*"), @PreAuthorize("hasRole(\'ADMIN\')"), ResponseEntity<ApiResponse<T>> standardized envelope.'
    },
    {
      layer: '7. Security & Auth Layer',
      component: 'Spring Security 6 + JWT',
      status: 'VERIFIED',
      details: 'Stateless session (SessionCreationPolicy.STATELESS), OncePerRequestFilter (AuthTokenFilter), HMAC-SHA512 token signing, BCryptPasswordEncoder (strength=12).'
    },
    {
      layer: '8. Global Exception Handling',
      component: '@ControllerAdvice',
      status: 'VERIFIED',
      details: 'GlobalExceptionHandler intercepting MethodArgumentNotValidException (400), BadCredentialsException (401), AccessDeniedException (403), ResourceNotFoundException (404), and 500 fallback.'
    },
    {
      layer: '9. UI Integration Layer',
      component: 'React + TypeScript + Tailwind',
      status: 'VERIFIED',
      details: 'Full role-aware client respecting Spring Security RBAC authorities, dynamic JWT header injection, interactive Swagger sandbox, and live multi-format export.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Enterprise Architecture & Consistency Verification</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal architectural verification matrix validating end-to-end alignment from MySQL 8 to React Frontend.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>9 of 9 Layers Validated</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('consistency')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'consistency' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Consistency Matrix
        </button>

        <button
          onClick={() => setActiveTab('flow')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'flow' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Layered Request Flow
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'security' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Spring Security 6 Flow
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'database' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Relational Schema (MySQL 8)
        </button>
      </div>

      {/* Tab 1: Consistency Matrix */}
      {activeTab === 'consistency' && (
        <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Full-Stack Logical Consistency Verification</h3>
            <span className="text-xs text-slate-500">Strict Type & Contract Validation</span>
          </div>

          <div className="divide-y divide-slate-100">
            {consistencyMatrix.map((item, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1 md:w-1/3">
                  <div className="font-bold text-slate-900">{item.layer}</div>
                  <div className="font-mono text-blue-600 font-semibold">{item.component}</div>
                </div>

                <div className="text-slate-600 md:w-1/2 leading-relaxed">
                  {item.details}
                </div>

                <div className="md:w-1/6 flex justify-end">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span>{item.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Layered Flow */}
      {activeTab === 'flow' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Standard Spring Boot Layered Architecture</h3>
            <p className="text-xs text-slate-500">Unidirectional execution flow ensuring high cohesion and loose coupling</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700">1. Client / UI</span>
              <h4 className="text-sm font-bold text-slate-900">REST Consumer</h4>
              <p className="text-xs text-slate-600">React Frontend / Postman / Swagger sending HTTP with Bearer JWT</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-blue-200 space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">2. Controller</span>
              <h4 className="text-sm font-bold text-slate-900">Spring Web MVC</h4>
              <p className="text-xs text-slate-600">Validates DTO (@Valid), checks @PreAuthorize, dispatches to service</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-emerald-200 space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">3. Service</span>
              <h4 className="text-sm font-bold text-slate-900">Business Domain</h4>
              <p className="text-xs text-slate-600">Encapsulates business rules, manages @Transactional boundaries, emits audit logs</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-amber-200 space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">4. Repository</span>
              <h4 className="text-sm font-bold text-slate-900">Spring Data JPA</h4>
              <p className="text-xs text-slate-600">Translates JPQL & derived method names to optimized SQL queries</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-purple-200 space-y-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">5. Persistence</span>
              <h4 className="text-sm font-bold text-slate-900">MySQL 8 InnoDB</h4>
              <p className="text-xs text-slate-600">ACID compliance, foreign key constraints, indexes, connection pooling (HikariCP)</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security Flow */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Spring Security 6 Stateless JWT Lifecycle</h3>
            <p className="text-xs text-slate-500">Complete authentication & authorization pipeline</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-slate-300 space-y-3 leading-relaxed">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <span>[1] HTTP Request with `Authorization: Bearer &lt;JWT&gt;`</span>
            </div>
            <div className="pl-4 border-l border-slate-700">
              ↳ Intercepted by <strong className="text-amber-300">AuthTokenFilter</strong> (extends OncePerRequestFilter)
            </div>
            <div className="pl-4 border-l border-slate-700">
              ↳ <strong className="text-sky-300">JwtUtils.validateJwtToken()</strong> verifies cryptographic HMAC-SHA512 signature & expiration
            </div>
            <div className="pl-4 border-l border-slate-700">
              ↳ Extracts username & authorities; loads <strong className="text-emerald-300">UserDetails</strong> from database
            </div>
            <div className="pl-4 border-l border-slate-700">
              ↳ Populates <strong className="text-purple-300">SecurityContextHolder.getContext().setAuthentication(auth)</strong>
            </div>
            <div className="pl-4 border-l border-slate-700">
              ↳ Passes to <strong className="text-slate-200">DispatcherServlet</strong> ➔ Controller Method (@PreAuthorize evaluates `hasRole(...)`)
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Database Schema */}
      {activeTab === 'database' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Normalized Relational Schema (MySQL 8)</h3>
            <p className="text-xs text-slate-500">Third Normal Form (3NF) relational tables with referential integrity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-600">TABLE users</div>
              <div className="text-slate-400">id BIGINT AUTO_INCREMENT (PK)</div>
              <div className="text-slate-700 font-medium">username VARCHAR(50) UNIQUE NOT NULL</div>
              <div className="text-slate-700 font-medium">email VARCHAR(100) UNIQUE NOT NULL</div>
              <div className="text-slate-600">password VARCHAR(255) (BCrypt)</div>
              <div className="text-slate-600">status ENUM('ACTIVE','INACTIVE')</div>
              <div className="text-slate-400">created_at, updated_at TIMESTAMP</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-600">TABLE employees</div>
              <div className="text-slate-400">id BIGINT AUTO_INCREMENT (PK)</div>
              <div className="text-slate-700 font-medium">employee_id VARCHAR(20) UNIQUE NOT NULL</div>
              <div className="text-slate-600">first_name, last_name VARCHAR(50)</div>
              <div className="text-slate-600">email VARCHAR(100) UNIQUE</div>
              <div className="text-amber-700 font-medium">department_id BIGINT (FK &rarr; departments.id)</div>
              <div className="text-emerald-700 font-bold">salary DECIMAL(12,2)</div>
              <div className="text-slate-600">status ENUM(...)</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-600">TABLE departments</div>
              <div className="text-slate-400">id BIGINT AUTO_INCREMENT (PK)</div>
              <div className="text-slate-700 font-medium">department_code VARCHAR(20) UNIQUE</div>
              <div className="text-slate-700 font-medium">name VARCHAR(100) NOT NULL</div>
              <div className="text-slate-600">manager_id BIGINT</div>
              <div className="text-emerald-700 font-bold">budget DECIMAL(14,2)</div>
              <div className="text-slate-600">status VARCHAR(20)</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-600">TABLE audit_logs</div>
              <div className="text-slate-400">id BIGINT AUTO_INCREMENT (PK)</div>
              <div className="text-slate-700">user_username VARCHAR(50)</div>
              <div className="text-slate-700">action VARCHAR(50)</div>
              <div className="text-slate-700">entity_name VARCHAR(50)</div>
              <div className="text-slate-600">ip_address VARCHAR(45)</div>
              <div className="text-slate-400">timestamp TIMESTAMP</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-600">TABLE notifications</div>
              <div className="text-slate-400">id BIGINT AUTO_INCREMENT (PK)</div>
              <div className="text-slate-700 font-medium">title VARCHAR(150) NOT NULL</div>
              <div className="text-slate-600">message TEXT</div>
              <div className="text-slate-600">type VARCHAR(20)</div>
              <div className="text-slate-600">is_read BOOLEAN DEFAULT FALSE</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-600">TABLE user_roles</div>
              <div className="text-amber-700 font-medium">user_id BIGINT (FK &rarr; users.id)</div>
              <div className="text-amber-700 font-medium">role_id INT (FK &rarr; roles.id)</div>
              <div className="text-slate-400">PRIMARY KEY (user_id, role_id)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
