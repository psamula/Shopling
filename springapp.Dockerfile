FROM maven:3-eclipse-temurin-18-alpine AS build
WORKDIR /workspace
COPY . /workspace/
RUN mvn package -DskipTests

FROM maven:3-eclipse-temurin-18-alpine
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait
COPY --from=build /workspace/target/shopling-0.0.1-SNAPSHOT.jar /app.jar
CMD /wait
ENTRYPOINT ["java","-jar","/app.jar"]