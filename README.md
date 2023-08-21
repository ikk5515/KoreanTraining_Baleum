[![baleum 로고](https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/448cc151-d310-4dd1-b315-48aba12d3d87)](https://kr-training.shop)
<br>
<hr>
<br>


### [Baleum 사이트](https://kr-training.shop)


<h1>개발환경</h3>
<li>IntelliJ</li>
<li>Postman</li>
<li>DBeaver</li>
<li>Github</li>
<li>SpringBoot Version : 2.7.9</li>
<h1>사용기술</h1>
<h3>BackEnd</h3>
<li>Java 11</li>
<li>Spring Boot</li>
<li>Mybatis</li>
<h3>Build Tool</h3>
<li>Gradle</li>
<li>IntelliJ</li>
<h3>Database</h3>
<li>AWS RDS</li>
<li>MySQL 8.0.33</li>
<h3>FrontEnd</h3>
<li>React</li>
<li>TypeScript</li>

<h1>개요</h1>
<p>오늘날 세계화된 시대에 다양한 언어와 문화 간의 효과적인 의사소통은 점점 중요해지고 있다. 새로운 언어를 배우는 데 있어서 발음 습득은 의도한 메시지를 전달하는데 중요한 역할을 하는 것으로, 특히 외국인들이 한국어를 배우거나 발음에 어려움을 겪는 한국인들에게 중요하다.
  <br>사용자의 발음을 녹음하고 점수를 반환하는 웹 기반 플랫폼을 소개한다.
</p>

<br>

# WBS (작업분할구조도)
![wbs완](https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/a362f587-938a-40c4-94a8-21da7ecc820c)

<br>

# 아키텍처 (Architecture)
본 아키텍처는 프론트엔드 서버와 백엔드 서버 각각이 독립적으로 존재한다.<br> 이는 각자의 의존성을 허무는 것에 기여한다.<br><br>
<img width="624" alt="스크린샷 2023-06-13 오후 11 04 28" src="https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/09717943-004b-41fd-975f-54f23a323fa6">

<br>

# 시퀀스 다이어그램
서비스의 이벤트를 순서대로 표기하여 전체적인 흐름을 보여주는 다이어그램<br><br>
![순차다이어그램](https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/2a462e56-e5eb-40fb-a523-631205aef3b1)

<br>

# Etri AI AIP
주요 기능인 발음 평가에 사용된 API<br><br>
![image](https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/f28e7e39-52ae-469b-8c62-59b299ece146)
![image](https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/e507ee84-d8e1-4bc9-870a-0aefe1958786)

<br>

# 부가 로직 설명
사용자의 발음을 녹음하고 녹음된 음성파일의 데이터 처리과정<br><br>
<img width="1332" alt="스크린샷 2023-06-13 오후 11 31 33" src="https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/691f5fcd-bf70-4bbf-a137-5f5f0d8f623a">

<br>

# 시연
<img width="1221" alt="image" src="https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/f33ada13-4cae-4722-a714-866c136bbc52">
<img width="1219" alt="image" src="https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/5289f637-eace-4989-91c3-b1f05223ff57">
<img width="1220" alt="image" src="https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/9b62a014-048c-4f84-87ad-7c40ed09c75e">
<img width="1222" alt="image" src="https://github.com/gyojinnK/KoreanTraining_Baleum/assets/97776614/a4465299-7899-4aa7-9b42-c33aceda6a1e">
