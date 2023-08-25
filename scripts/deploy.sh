#!/bin/bash
BUILD_JAR=$(ls /home/ikk5515/app/KoreanTraining_Baleum/startupProject/build/libs/startupProject-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)
echo ">>> build 파일명: $JAR_NAME" >> /home/ikk5515/app/KoreanTraining_Baleum/deploy.log

echo ">>> build 파일 복사" >> /home/ikk5515/app/KoreanTraining_Baleum/deploy.log
DEPLOY_PATH=/home/ikk5515/app/KoreanTraining_Baleum/
cp $BUILD_JAR $DEPLOY_PATH

echo ">>> 현재 실행중인 애플리케이션 pid 확인" >> /home/ikk5515/app/KoreanTraining_Baleum/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo ">>> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ikk5515/app/KoreanTraining_Baleum/deploy.log
else
  echo ">>> kill -9 $CURRENT_PID"
  kill -9 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
echo ">>> DEPLOY_JAR 배포"    >> /home/ikk5515/app/KoreanTraining_Baleum/deploy.log
nohup java -jar $DEPLOY_JAR >> /home/ikk5515/deploy.log 2>/home/ikk5515/app/KoreanTraining_Baleum/deploy_err.log &
