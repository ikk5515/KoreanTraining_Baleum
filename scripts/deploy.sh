#!/usr/bin/env bash

REPOSITORY=/home/ikk5515/app/KoreanTraining_Baleum/startupProject
cd $REPOSITORY

APP_NAME=startupProject-0.0.1-SNAPSHOT.jar
JAR_NAME=$(ls $REPOSITORY/build/libs/ | grep 'SNAPSHOT.jar' | tail -n 1)
JAR_PATH=$REPOSITORY/build/libs/$JAR_NAME

CURRENT_PID=$(pgrep -f $APP_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할 애플리케이션이 없습니다."
else
  echo "> kill -9 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

echo "> Deploy - $JAR_PATH "
nohup java -jar $JAR_PATH > /home/ikk5515/deploy.log 2> /home/ikk5515/app/KoreanTraining_Baleum/deploy_err.log < /home/ikk5515/deploy.log &
