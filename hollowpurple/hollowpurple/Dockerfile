# Use official Java 17 image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy everything from backend folder
COPY . .

# Build the Spring Boot app using Maven, skip tests for speed
RUN ./mvnw clean package -DskipTests

# Expose Spring Boot default port
EXPOSE 8080

# Run the generated jar (matches the built jar automatically)
CMD ["sh", "-c", "java -jar target/*.jar"]
