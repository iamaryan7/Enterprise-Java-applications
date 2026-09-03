import { JavaCodeFile } from '../types';

export const JAVA_PROJECT_FILES: JavaCodeFile[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    packagePath: 'root',
    category: 'Config',
    language: 'xml',
    description: 'Maven Project Object Model with Spring Boot 3.3.4, Java 21, Security, JPA, JWT, MySQL & OpenAPI',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>enterprise-management-system</artifactId>
    <version>1.0.0</version>
    <name>enterprise-management-system</name>
    <description>Production Ready Enterprise Management System built on Spring Boot 3 and Java 21</description>

    <properties>
        <java.version>21</java.version>
        <jjwt.version>0.12.6</jjwt.version>
        <springdoc.version>2.6.0</springdoc.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- MySQL Database Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JWT Authentication (JJWT 0.12.x) -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- OpenAPI / Swagger 3 -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>\${springdoc.version}</version>
        </dependency>

        <!-- Apache POI for Excel Reports -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.3.0</version>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing Dependencies -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>\${java.version}</source>
                    <target>\${java.version}</target>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>\${lombok.version}</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/EnterpriseApplication.java',
    name: 'EnterpriseApplication.java',
    packagePath: 'com.example.enterpriseapp',
    category: 'Config',
    language: 'java',
    description: 'Spring Boot Main Application Entry Point with JPA Auditing',
    content: `package com.example.enterpriseapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableJpaAuditing
public class EnterpriseApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnterpriseApplication.class, args);
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/ERole.java',
    name: 'ERole.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'Enum representing enterprise user authorization roles',
    content: `package com.example.enterpriseapp.entity;

public enum ERole {
    ROLE_ADMIN,
    ROLE_MANAGER,
    ROLE_EMPLOYEE,
    ROLE_USER
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/Role.java',
    name: 'Role.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'JPA Role entity mapping RBAC permissions in database',
    content: `package com.example.enterpriseapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, unique = true, nullable = false)
    private ERole name;
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/User.java',
    name: 'User.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'JPA User entity with BCrypt password, many-to-many roles and audit timestamps',
    content: `package com.example.enterpriseapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @NotBlank
    @Size(max = 100)
    @Email
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String password;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/Department.java',
    name: 'Department.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'JPA Department entity with manager relationship and employee hierarchy',
    content: `package com.example.enterpriseapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "department_code", unique = true, nullable = false, length = 20)
    private String departmentCode;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private boolean active = true;

    @Column(precision = 15, scale = 2)
    private BigDecimal budget;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = false)
    @Builder.Default
    private List<Employee> employees = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/Employee.java',
    name: 'Employee.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'JPA Employee entity with personal details, department link, salary and audit logs',
    content: `package com.example.enterpriseapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees", indexes = {
    @Index(name = "idx_emp_id", columnList = "employee_id"),
    @Index(name = "idx_emp_email", columnList = "email"),
    @Index(name = "idx_emp_dept", columnList = "department_id")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "employee_id", unique = true, nullable = false, length = 30)
    private String employeeId;

    @NotBlank
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @NotBlank
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(length = 25)
    private String phone;

    @Column(length = 255)
    private String address;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @NotBlank
    @Column(nullable = false, length = 80)
    private String designation;

    @NotNull
    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;

    @NotNull
    @Positive
    @Column(precision = 12, scale = 2, nullable = false)
    private BigDecimal salary;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    @Builder.Default
    private Status status = Status.ACTIVE;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum Status {
        ACTIVE, INACTIVE, ON_LEAVE, TERMINATED
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/AuditLog.java',
    name: 'AuditLog.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'JPA AuditLog entity recording all security, transactional and mutation operations',
    content: `package com.example.enterpriseapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs", indexes = {
    @Index(name = "idx_audit_timestamp", columnList = "timestamp"),
    @Index(name = "idx_audit_user", columnList = "username")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 50)
    private String user;

    @Column(length = 30)
    private String role;

    @Column(nullable = false, length = 50)
    private String action;

    @Column(nullable = false, length = 50)
    private String entity;

    @Column(name = "entity_id", length = 50)
    private String entityId;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 20)
    private String status;
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/entity/Notification.java',
    name: 'Notification.java',
    packagePath: 'com.example.enterpriseapp.entity',
    category: 'Entity',
    language: 'java',
    description: 'JPA Notification entity for internal broadcasting and alerts',
    content: `package com.example.enterpriseapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(name = "is_read", nullable = false)
    @Builder.Default
    private boolean read = false;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "recipient_role", length = 30)
    private String recipientRole;
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/repository/EmployeeRepository.java',
    name: 'EmployeeRepository.java',
    packagePath: 'com.example.enterpriseapp.repository',
    category: 'Repository',
    language: 'java',
    description: 'Spring Data JPA Repository with custom query methods and pagination',
    content: `package com.example.enterpriseapp.repository;

import com.example.enterpriseapp.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeId(String employeeId);

    Optional<Employee> findByEmail(String email);

    boolean existsByEmployeeId(String employeeId);

    boolean existsByEmail(String email);

    Page<Employee> findByDepartmentId(Long departmentId, Pageable pageable);

    Page<Employee> findByStatus(Employee.Status status, Pageable pageable);

    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.employeeId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.designation) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Employee> searchEmployees(@Param("keyword") String keyword, Pageable pageable);

    long countByStatus(Employee.Status status);
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/repository/DepartmentRepository.java',
    name: 'DepartmentRepository.java',
    packagePath: 'com.example.enterpriseapp.repository',
    category: 'Repository',
    language: 'java',
    description: 'Spring Data JPA Repository for Departments',
    content: `package com.example.enterpriseapp.repository;

import com.example.enterpriseapp.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentCode(String departmentCode);

    boolean existsByDepartmentCode(String departmentCode);

    boolean existsByName(String name);
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/repository/UserRepository.java',
    name: 'UserRepository.java',
    packagePath: 'com.example.enterpriseapp.repository',
    category: 'Repository',
    language: 'java',
    description: 'Spring Data JPA Repository for Users',
    content: `package com.example.enterpriseapp.repository;

import com.example.enterpriseapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/security/JwtUtils.java',
    name: 'JwtUtils.java',
    packagePath: 'com.example.enterpriseapp.security',
    category: 'Security',
    language: 'java',
    description: 'JWT Utility token provider with HMAC-SHA512 key parsing and token validation',
    content: `package com.example.enterpriseapp.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("\${enterprise.app.jwtSecret:dGhpcy1pcy1hLXZlcnktc2VjdXJlLWFuZC1sb25nLXNlY3JldC1rZXktZm9yLWp3dC1zaWduaW5nLTI1Ni1iaXQtY29tcGxpYW50}")
    private String jwtSecret;

    @Value("\${enterprise.app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .subject(userPrincipal.getUsername())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), Jwts.SIG.HS512)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().verifyWith(key()).build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/security/SecurityConfig.java',
    name: 'SecurityConfig.java',
    packagePath: 'com.example.enterpriseapp.security',
    category: 'Security',
    language: 'java',
    description: 'Spring Security 6 configuration with stateless JWT filter chain and RBAC rules',
    content: `package com.example.enterpriseapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, AuthEntryPointJwt unauthorizedHandler) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> {})
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public Endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                // Admin Restricted
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                .requestMatchers("/api/audit-logs/**").hasRole("ADMIN")
                // Manager & Admin
                .requestMatchers("/api/employees/delete/**").hasRole("ADMIN")
                .requestMatchers("/api/employees/**").hasAnyRole("ADMIN", "MANAGER")
                .requestMatchers("/api/departments/delete/**").hasRole("ADMIN")
                .requestMatchers("/api/departments/**").hasAnyRole("ADMIN", "MANAGER", "EMPLOYEE", "USER")
                .requestMatchers("/api/reports/**").hasAnyRole("ADMIN", "MANAGER")
                .requestMatchers("/api/dashboard/**").authenticated()
                .requestMatchers("/api/notifications/**").authenticated()
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/controller/EmployeeController.java',
    name: 'EmployeeController.java',
    packagePath: 'com.example.enterpriseapp.controller',
    category: 'Controller',
    language: 'java',
    description: 'REST Controller for Employee CRUD, search, pagination and department filtering',
    content: `package com.example.enterpriseapp.controller;

import com.example.enterpriseapp.dto.EmployeeCreateDto;
import com.example.enterpriseapp.dto.EmployeeDto;
import com.example.enterpriseapp.dto.PagedResponse;
import com.example.enterpriseapp.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee Management", description = "Endpoints for employee operations")
@SecurityRequirement(name = "Bearer Authentication")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get paginated employees with optional search and department filtering")
    public ResponseEntity<PagedResponse<EmployeeDto>> getEmployees(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String sort) {
        return ResponseEntity.ok(employeeService.getAllEmployees(keyword, departmentId, page, size, sort));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
    @Operation(summary = "Get employee by primary ID")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Create new employee record")
    public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeCreateDto createDto) {
        EmployeeDto created = employeeService.createEmployee(createDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Update employee details")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeCreateDto updateDto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, updateDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete employee record (Admin only)")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/controller/AuthController.java',
    name: 'AuthController.java',
    packagePath: 'com.example.enterpriseapp.controller',
    category: 'Controller',
    language: 'java',
    description: 'REST Controller for JWT authentication, registration and login',
    content: `package com.example.enterpriseapp.controller;

import com.example.enterpriseapp.dto.JwtResponse;
import com.example.enterpriseapp.dto.LoginRequest;
import com.example.enterpriseapp.dto.SignupRequest;
import com.example.enterpriseapp.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for login, register and token validation")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and return JWT bearer token")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user account")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return ResponseEntity.ok(authService.register(signUpRequest));
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/service/EmployeeService.java',
    name: 'EmployeeService.java',
    packagePath: 'com.example.enterpriseapp.service',
    category: 'Service',
    language: 'java',
    description: 'Service interface contract for employee business logic',
    content: `package com.example.enterpriseapp.service;

import com.example.enterpriseapp.dto.EmployeeCreateDto;
import com.example.enterpriseapp.dto.EmployeeDto;
import com.example.enterpriseapp.dto.PagedResponse;

public interface EmployeeService {
    PagedResponse<EmployeeDto> getAllEmployees(String keyword, Long departmentId, int page, int size, String sort);
    EmployeeDto getEmployeeById(Long id);
    EmployeeDto createEmployee(EmployeeCreateDto createDto);
    EmployeeDto updateEmployee(Long id, EmployeeCreateDto updateDto);
    void deleteEmployee(Long id);
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/service/impl/EmployeeServiceImpl.java',
    name: 'EmployeeServiceImpl.java',
    packagePath: 'com.example.enterpriseapp.service.impl',
    category: 'Service',
    language: 'java',
    description: 'Implementation of employee business logic with audit logging and transactional boundary',
    content: `package com.example.enterpriseapp.service.impl;

import com.example.enterpriseapp.dto.EmployeeCreateDto;
import com.example.enterpriseapp.dto.EmployeeDto;
import com.example.enterpriseapp.dto.PagedResponse;
import com.example.enterpriseapp.entity.Department;
import com.example.enterpriseapp.entity.Employee;
import com.example.enterpriseapp.exception.DuplicateResourceException;
import com.example.enterpriseapp.exception.ResourceNotFoundException;
import com.example.enterpriseapp.repository.DepartmentRepository;
import com.example.enterpriseapp.repository.EmployeeRepository;
import com.example.enterpriseapp.service.AuditLogService;
import com.example.enterpriseapp.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AuditLogService auditLogService;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               DepartmentRepository departmentRepository,
                               AuditLogService auditLogService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.auditLogService = auditLogService;
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeDto> getAllEmployees(String keyword, Long departmentId, int page, int size, String sort) {
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc") 
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));

        Page<Employee> employeePage;
        if (keyword != null && !keyword.trim().isEmpty()) {
            employeePage = employeeRepository.searchEmployees(keyword.trim(), pageable);
        } else if (departmentId != null) {
            employeePage = employeeRepository.findByDepartmentId(departmentId, pageable);
        } else {
            employeePage = employeeRepository.findAll(pageable);
        }

        List<EmployeeDto> content = employeePage.getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return new PagedResponse<>(content, employeePage.getNumber(), employeePage.getSize(),
                employeePage.getTotalElements(), employeePage.getTotalPages(), employeePage.isLast());
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
        return mapToDto(employee);
    }

    @Override
    public EmployeeDto createEmployee(EmployeeCreateDto createDto) {
        if (employeeRepository.existsByEmail(createDto.getEmail())) {
            throw new DuplicateResourceException("Employee with email " + createDto.getEmail() + " already exists");
        }

        Department department = departmentRepository.findById(createDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", createDto.getDepartmentId()));

        String generatedEmployeeId = "EMP" + (1000 + employeeRepository.count() + 1);

        Employee employee = Employee.builder()
                .employeeId(generatedEmployeeId)
                .firstName(createDto.getFirstName())
                .lastName(createDto.getLastName())
                .email(createDto.getEmail())
                .phone(createDto.getPhone())
                .address(createDto.getAddress())
                .dateOfBirth(createDto.getDateOfBirth())
                .gender(createDto.getGender())
                .department(department)
                .designation(createDto.getDesignation())
                .joiningDate(createDto.getJoiningDate())
                .salary(createDto.getSalary())
                .status(createDto.getStatus() != null ? createDto.getStatus() : Employee.Status.ACTIVE)
                .build();

        Employee saved = employeeRepository.save(employee);
        auditLogService.logAction("CREATE", "EMPLOYEE", saved.getEmployeeId(), 
                "Created employee: " + saved.getFirstName() + " " + saved.getLastName());

        return mapToDto(saved);
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeCreateDto updateDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));

        Department department = departmentRepository.findById(updateDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", updateDto.getDepartmentId()));

        employee.setFirstName(updateDto.getFirstName());
        employee.setLastName(updateDto.getLastName());
        employee.setPhone(updateDto.getPhone());
        employee.setAddress(updateDto.getAddress());
        employee.setDateOfBirth(updateDto.getDateOfBirth());
        employee.setGender(updateDto.getGender());
        employee.setDepartment(department);
        employee.setDesignation(updateDto.getDesignation());
        employee.setSalary(updateDto.getSalary());
        if (updateDto.getStatus() != null) {
            employee.setStatus(updateDto.getStatus());
        }

        Employee updated = employeeRepository.save(employee);
        auditLogService.logAction("UPDATE", "EMPLOYEE", updated.getEmployeeId(), 
                "Updated details for employee: " + updated.getFirstName() + " " + updated.getLastName());

        return mapToDto(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));

        employeeRepository.delete(employee);
        auditLogService.logAction("DELETE", "EMPLOYEE", employee.getEmployeeId(), 
                "Deleted employee record: " + employee.getFirstName() + " " + employee.getLastName());
    }

    private EmployeeDto mapToDto(Employee employee) {
        return EmployeeDto.builder()
                .id(employee.getId())
                .employeeId(employee.getEmployeeId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .address(employee.getAddress())
                .dateOfBirth(employee.getDateOfBirth())
                .gender(employee.getGender())
                .departmentId(employee.getDepartment() != null ? employee.getDepartment().getId() : null)
                .departmentName(employee.getDepartment() != null ? employee.getDepartment().getName() : "Unassigned")
                .designation(employee.getDesignation())
                .joiningDate(employee.getJoiningDate())
                .salary(employee.getSalary())
                .status(employee.getStatus())
                .createdDate(employee.getCreatedDate())
                .updatedDate(employee.getUpdatedDate())
                .build();
    }
}`
  },
  {
    path: 'src/main/java/com/example/enterpriseapp/exception/GlobalExceptionHandler.java',
    name: 'GlobalExceptionHandler.java',
    packagePath: 'com.example.enterpriseapp.exception',
    category: 'Exception',
    language: 'java',
    description: 'Unified RestControllerAdvice returning standardized enterprise error payloads',
    content: `package com.example.enterpriseapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResourceException(DuplicateResourceException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.FORBIDDEN.value())
                .message("Access denied: You do not possess the required permissions.")
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("message", "Validation failed for request fields");
        response.put("errors", errors);
        response.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        ErrorResponse error = ErrorResponse.builder()
                .success(false)
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("An unexpected internal error occurred: " + ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`
  },
  {
    path: 'src/main/resources/application.properties',
    name: 'application.properties',
    packagePath: 'src/main/resources',
    category: 'Config',
    language: 'properties',
    description: 'Spring Boot configuration with environment variable defaults and HikariCP pool',
    content: `# Server Port & Context
server.port=8080
server.servlet.context-path=/

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://\${DB_HOST:localhost}:\${DB_PORT:3306}/\${DB_NAME:enterprise_db}?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=\${DB_USERNAME:root}
spring.datasource.password=\${DB_PASSWORD:root123}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# HikariCP Connection Pool Settings
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.connection-timeout=20000

# Hibernate / JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# JWT Security Configuration
enterprise.app.jwtSecret=\${JWT_SECRET:dGhpcy1pcy1hLXZlcnktc2VjdXJlLWFuZC1sb25nLXNlY3JldC1rZXktZm9yLWp3dC1zaWduaW5nLTI1Ni1iaXQtY29tcGxpYW50}
enterprise.app.jwtExpirationMs=86400000

# OpenAPI / Swagger
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html

# Actuator
management.endpoints.web.exposure.include=health,info,metrics`
  },
  {
    path: 'database/schema.sql',
    name: 'schema.sql',
    packagePath: 'database',
    category: 'Database',
    language: 'sql',
    description: 'Production MySQL 8 normalized DDL script with foreign keys, indexes and sample seed data',
    content: `-- ====================================================================
-- ENTERPRISE MANAGEMENT SYSTEM (EMS) - MYSQL 8 RELATIONAL DATABASE DDL
-- Author: Senior Enterprise Architect
-- ====================================================================

CREATE DATABASE IF NOT EXISTS enterprise_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE enterprise_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_user_username (username),
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Roles Table
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. User-Roles Junction Table (Many-to-Many)
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Departments Table
CREATE TABLE departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    manager_id BIGINT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    budget DECIMAL(15,2) DEFAULT 0.00,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_dept_code (department_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Employees Table
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(25),
    address VARCHAR(255),
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    department_id BIGINT,
    designation VARCHAR(80) NOT NULL,
    joining_date DATE NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED') NOT NULL DEFAULT 'ACTIVE',
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_emp_id (employee_id),
    INDEX idx_emp_email (email),
    INDEX idx_emp_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Circular manager FK link
ALTER TABLE departments
ADD CONSTRAINT fk_department_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL;

-- 6. Audit Logs Table
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    role VARCHAR(30),
    action VARCHAR(50) NOT NULL,
    entity VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50),
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    description TEXT,
    status VARCHAR(20) DEFAULT 'SUCCESS',
    INDEX idx_audit_time (timestamp),
    INDEX idx_audit_entity (entity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Notifications Table
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'INFO',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    recipient_role VARCHAR(30) DEFAULT 'ALL',
    INDEX idx_notif_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ====================================================================
-- SEED DATA (Default password for all accounts: Password@123)
-- BCrypt Hash: $2a$10$wE9Kx7m6eQcZ1U2sF4xyeOq6Jj07/HnC4a4jX7F3fP5wG7tM8kH2y
-- ====================================================================
INSERT INTO roles (id, name) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_MANAGER'),
(3, 'ROLE_EMPLOYEE'),
(4, 'ROLE_USER');

INSERT INTO users (id, username, email, password, first_name, last_name, enabled) VALUES
(1, 'admin', 'admin@enterprise.corp', '$2a$10$wE9Kx7m6eQcZ1U2sF4xyeOq6Jj07/HnC4a4jX7F3fP5wG7tM8kH2y', 'Alexander', 'Wright', TRUE),
(2, 'manager_sarah', 'sarah.connor@enterprise.corp', '$2a$10$wE9Kx7m6eQcZ1U2sF4xyeOq6Jj07/HnC4a4jX7F3fP5wG7tM8kH2y', 'Sarah', 'Connor', TRUE),
(3, 'emp_david', 'david.miller@enterprise.corp', '$2a$10$wE9Kx7m6eQcZ1U2sF4xyeOq6Jj07/HnC4a4jX7F3fP5wG7tM8kH2y', 'David', 'Miller', TRUE),
(4, 'user_emily', 'emily.watson@enterprise.corp', '$2a$10$wE9Kx7m6eQcZ1U2sF4xyeOq6Jj07/HnC4a4jX7F3fP5wG7tM8kH2y', 'Emily', 'Watson', TRUE);

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO departments (id, department_code, name, description, is_active, budget) VALUES
(1, 'ENG-01', 'Software Engineering', 'Enterprise backend and cloud systems', TRUE, 1250000.00),
(2, 'HR-02', 'Human Resources', 'People ops, talent acquisition and compliance', TRUE, 380000.00),
(3, 'FIN-03', 'Finance & Accounting', 'Corporate fiscal management and payroll', TRUE, 620000.00);

INSERT INTO employees (id, employee_id, first_name, last_name, email, phone, address, date_of_birth, gender, department_id, designation, joining_date, salary, status) VALUES
(1, 'EMP1001', 'Alexander', 'Wright', 'alexander.wright@enterprise.corp', '+1 (555) 234-8901', 'Seattle, WA', '1988-04-12', 'MALE', 1, 'Principal Enterprise Architect', '2021-03-15', 165000.00, 'ACTIVE'),
(2, 'EMP1002', 'Sarah', 'Connor', 'sarah.connor@enterprise.corp', '+1 (555) 892-4411', 'San Francisco, CA', '1990-09-24', 'FEMALE', 2, 'Director of People Operations', '2021-06-01', 142000.00, 'ACTIVE'),
(3, 'EMP1003', 'David', 'Miller', 'david.miller@enterprise.corp', '+1 (555) 431-7789', 'Austin, TX', '1993-11-05', 'MALE', 1, 'Senior Backend Engineer (Spring)', '2022-01-10', 130000.00, 'ACTIVE');

UPDATE departments SET manager_id = 1 WHERE id = 1;
UPDATE departments SET manager_id = 2 WHERE id = 2;`
  },
  {
    path: 'Dockerfile',
    name: 'Dockerfile',
    packagePath: 'root',
    category: 'DevOps',
    language: 'dockerfile',
    description: 'Multi-stage Dockerfile compiling Java 21 Spring Boot app with Eclipse Temurin runtime',
    content: `# Stage 1: Build JAR using Maven and Java 21
FROM maven:3.9.8-eclipse-temurin-21 AS builder
WORKDIR /build

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Minimal Production JRE Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Non-root user for security compliance
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /build/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]`
  },
  {
    path: 'docker-compose.yml',
    name: 'docker-compose.yml',
    packagePath: 'root',
    category: 'DevOps',
    language: 'yaml',
    description: 'Multi-container orchestration for Spring Boot 3 app and MySQL 8 with healthchecks',
    content: `version: '3.8'

services:
  mysqldb:
    image: mysql:8.0.36
    container_name: enterprise_mysql_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: enterprise_db
      MYSQL_USER: springuser
      MYSQL_PASSWORD: springpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  spring-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: enterprise_spring_app
    restart: unless-stopped
    depends_on:
      mysqldb:
        condition: service_healthy
    environment:
      DB_HOST: mysqldb
      DB_PORT: 3306
      DB_NAME: enterprise_db
      DB_USERNAME: springuser
      DB_PASSWORD: springpassword
      JWT_SECRET: dGhpcy1pcy1hLXZlcnktc2VjdXJlLWFuZC1sb25nLXNlY3JldC1rZXktZm9yLWp3dC1zaWduaW5nLTI1Ni1iaXQtY29tcGxpYW50
    ports:
      - "8080:8080"

volumes:
  mysql_data:`
  },
  {
    path: 'src/test/java/com/example/enterpriseapp/EmployeeServiceTest.java',
    name: 'EmployeeServiceTest.java',
    packagePath: 'com.example.enterpriseapp',
    category: 'Docs',
    language: 'java',
    description: 'JUnit 5 and Mockito unit tests verifying employee service business logic',
    content: `package com.example.enterpriseapp;

import com.example.enterpriseapp.dto.EmployeeCreateDto;
import com.example.enterpriseapp.dto.EmployeeDto;
import com.example.enterpriseapp.entity.Department;
import com.example.enterpriseapp.entity.Employee;
import com.example.enterpriseapp.exception.ResourceNotFoundException;
import com.example.enterpriseapp.repository.DepartmentRepository;
import com.example.enterpriseapp.repository.EmployeeRepository;
import com.example.enterpriseapp.service.AuditLogService;
import com.example.enterpriseapp.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Employee sampleEmployee;
    private Department sampleDepartment;

    @BeforeEach
    void setUp() {
        sampleDepartment = Department.builder()
                .id(1L)
                .name("Software Engineering")
                .departmentCode("ENG-01")
                .build();

        sampleEmployee = Employee.builder()
                .id(1L)
                .employeeId("EMP1001")
                .firstName("Alexander")
                .lastName("Wright")
                .email("alexander.wright@enterprise.corp")
                .department(sampleDepartment)
                .designation("Principal Enterprise Architect")
                .joiningDate(LocalDate.now())
                .salary(new BigDecimal("165000.00"))
                .status(Employee.Status.ACTIVE)
                .build();
    }

    @Test
    @DisplayName("Should return employee DTO when employee exists")
    void testGetEmployeeById_Success() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(sampleEmployee));

        EmployeeDto result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals("EMP1001", result.getEmployeeId());
        assertEquals("Alexander", result.getFirstName());
        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when employee does not exist")
    void testGetEmployeeById_NotFound() {
        when(employeeRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> employeeService.getEmployeeById(99L));
        verify(employeeRepository, times(1)).findById(99L);
    }
}`
  }
];
