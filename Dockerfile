FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

COPY pom.xml .
COPY src ./src

RUN mvn package -DskipTests

FROM registry.access.redhat.com/ubi9/openjdk-25-runtime:1.24

WORKDIR /app

COPY --from=build /build/target/quarkus-app/ /app/

EXPOSE 8080

CMD ["java", "-jar", "/app/quarkus-run.jar"]