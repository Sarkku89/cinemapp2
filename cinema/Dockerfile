# Use an official OpenJDK runtime as a base image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file into the container
COPY target/cinema-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port that your application will run on
EXPOSE 8080

# Specify the command to run on container start
CMD ["java", "-jar", "app.jar"]