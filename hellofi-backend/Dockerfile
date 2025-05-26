# Use OpenJDK 17 Alpine image (lightweight)
FROM openjdk:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy everything from your project to the container
COPY . .

# Make mvnw executable (if you use Maven wrapper)
RUN chmod +x ./mvnw

# Build the Spring Boot app, skip tests to speed up
RUN ./mvnw clean package -DskipTests

# Run the built jar (replace with your actual jar file name)
CMD ["java", "-jar", "target/hellofi-backend-0.0.1-SNAPSHOT.jar"]
