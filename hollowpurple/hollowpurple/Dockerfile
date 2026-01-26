# ==========================
# Stage 1: Build
# ==========================
FROM eclipse-temurin:17-jdk-alpine AS build

# Set working directory
WORKDIR /app

# Copy Maven wrapper & pom.xml first (to cache dependencies)
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Make mvnw executable
RUN chmod +x ./mvnw

# Download dependencies only (cache layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the Spring Boot app, skip tests for speed
RUN ./mvnw clean package -DskipTests

# ==========================
# Stage 2: Run
# ==========================
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/ats-resume-checker-1.0.0.jar app.jar

# Expose default port (optional)
EXPOSE 8080

# Run the jar, using $PORT injected by Render
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT"]
