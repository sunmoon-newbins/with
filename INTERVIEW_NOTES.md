# 📝 WITH 프로젝트 면접 대비 정리

> WYD 세계 청년대회 참가자를 위한 여행 소통 및 도우미 앱  
> 해커톤 참가 수상작 | 2024.09.22 ~ 2024.10.06

---

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [프론트엔드 핵심 구현](#4-프론트엔드-핵심-구현)
5. [백엔드 핵심 구현](#5-백엔드-핵심-구현)
6. [주요 기능별 동작 흐름](#6-주요-기능별-동작-흐름)
7. [설계 패턴 및 기술적 의사결정](#7-설계-패턴-및-기술적-의사결정)
8. [면접 예상 질문과 답변](#8-면접-예상-질문과-답변)

---

## 1. 프로젝트 개요

### 한 줄 소개
**WITH**는 WYD 세계 청년대회에 참가하는 외국인 여행자를 위한 **여행 일정 공유, 실시간 채팅, 챗봇, 공공 와이파이 검색** 기능을 제공하는 모바일 앱입니다.

### 주요 기능 4가지
| 기능 | 설명 |
|------|------|
| **현지인 추천** | 한국의 관광명소·숙소·맛집 추천, 여행 일정 게시 및 열람 |
| **새로운 만남** | 관광 루트에 따라 새로운 사람과 동행할 수 있는 여행 매칭 |
| **챗봇** | AI 챗봇으로 외국인 여행자의 궁금증 해결 |
| **공공 와이파이** | 공공 와이파이 위치 정보 제공 |

### 팀 구성 (4인)
- 서한수 - Backend
- 방채담 - Backend
- **박준엽 - Frontend**
- 강소희 - Frontend

---

## 2. 기술 스택

### Frontend
| 카테고리 | 기술 | 선정 이유 |
|----------|------|----------|
| **프레임워크** | React Native (Expo) | iOS/Android 크로스 플랫폼 개발, 빠른 프로토타이핑 |
| **상태관리** | Zustand + AsyncStorage | 가볍고 보일러플레이트가 적음, 영속 상태 관리 용이 |
| **내비게이션** | React Navigation (Stack, Bottom Tab, Drawer) | React Native 표준 내비게이션 라이브러리 |
| **HTTP 통신** | Axios | Promise 기반 비동기 HTTP, 인터셉터 지원 |
| **실시간 통신** | WebSocket (Native) | 서버와 양방향 실시간 메시징 |
| **지도** | React Native Maps + Google Places API | 관광지 검색 및 위치 표시 |
| **이미지** | Expo Image Picker + Firebase Storage | 갤러리/카메라 접근, 클라우드 이미지 저장 |
| **국제화** | i18next | 다국어 지원 (한국어/영어) |
| **UI** | React Native Vector Icons, react-native-responsive-dimensions | 반응형 UI |

### Backend
| 카테고리 | 기술 | 선정 이유 |
|----------|------|----------|
| **프레임워크** | Spring Boot 3.3.4 (Java 17) | 엔터프라이즈급 웹 프레임워크 |
| **ORM** | MyBatis 3.0.3 | SQL 직접 작성으로 세밀한 쿼리 제어 |
| **DB** | MariaDB | 오픈소스 RDBMS |
| **보안** | Spring Security + BCrypt | 비밀번호 암호화 |
| **실시간** | Spring WebSocket | 채팅 기능 |

---

## 3. 시스템 아키텍처

### 전체 구조
```
[React Native App]  ←→  [Spring Boot Server]  ←→  [MariaDB]
       │                        │
       │ WebSocket              │ HTTP (외부 API)
       └────────────────────────┘
              │
        [Firebase Storage]  [Google Places API]  [한국관광공사 API]
```

### 프론트엔드 디렉토리 구조
```
with_frontend/
├── App.js                          # 앱 진입점 (인증 가드)
├── i18n.js                         # 다국어 설정
├── src/
│   ├── configs/                    # 환경 설정
│   │   ├── IPConfig.json           # 백엔드 API URL
│   │   ├── FirebaseConfig.js       # Firebase 설정
│   │   ├── googleApi.json          # Google API 키
│   │   └── Style.json              # 글로벌 스타일
│   ├── navigations/                # 네비게이션
│   │   ├── MainStackNavigator.js   # 로그인 전 흐름
│   │   ├── BottomTabNavigator.js   # 메인 탭 네비게이션
│   │   └── BottomStackNavigations/ # 각 탭별 스택 네비게이터
│   ├── screens/                    # 화면 컴포넌트
│   │   ├── start/                  # 시작·로그인·회원가입
│   │   ├── home/                   # 홈(게시판) 탭
│   │   ├── heart/                  # 좋아요 탭
│   │   ├── add/                    # 일정 작성 탭
│   │   ├── chat/                   # 채팅 탭
│   │   └── myInfo/                 # 내 정보 탭
│   └── components/                 # 재사용 컴포넌트
│       ├── common/                 # 공통 (탭바, 검색, 버튼)
│       ├── Boards/                 # 게시판 목록
│       ├── BoardDetails/           # 게시글 상세
│       ├── BoardCreate/            # 게시글 작성
│       ├── LoginScreen/            # 로그인 관련
│       ├── chat/                   # 채팅 관련
│       └── user/useStore.js        # Zustand 상태 저장소
```

### 백엔드 계층 구조
```
Controller (HTTP 요청 처리)
    ↓
Service (비즈니스 로직)
    ↓
Mapper (MyBatis SQL 매핑)
    ↓
Entity ←→ DTO (데이터 변환)
```

---

## 4. 프론트엔드 핵심 구현

### 4.1 상태 관리 (Zustand + AsyncStorage)

**파일**: `src/components/user/useStore.js`

```javascript
// Zustand + persist 미들웨어로 영속 상태 관리
const useStore = create(
  persist(
    (set) => ({
      userId: '', name: '', birth: '', profile: '',
      country: '', nickname: '', language: '',
      isLoggedIn: false, rememberMe: false,

      // 로그인 시 사용자 정보 일괄 업데이트
      setLogin: (user) => set({
        userId: user.userId, name: user.name, ...
      }),

      // 로그아웃 시 AsyncStorage 초기화
      logout: async () => {
        await AsyncStorage.removeItem('user-storage');
        set({ isLoggedIn: false, userId: '', ... });
      },
    }),
    { name: 'user-storage', getStorage: () => AsyncStorage }
  )
);
```

**면접 포인트:**
- Redux 대비 Zustand 선택 이유: 보일러플레이트 최소화, 러닝커브 낮음
- `persist` 미들웨어로 AsyncStorage에 자동 영속화 → 앱 재시작 시 로그인 유지
- `rememberMe`와 `isLoggedIn` 분리로 자동 로그인 제어

---

### 4.2 인증 가드 (조건부 렌더링)

**파일**: `App.js`

```javascript
export default function App() {
  const { isLoggedIn, rememberMe, userId } = useStore();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomTabNavigator />    // 로그인 상태 → 메인 화면
      ) : (
        <MainStackNavigator />    // 비로그인 → 로그인/회원가입 플로우
      )}
    </NavigationContainer>
  );
}
```

**면접 포인트:**
- Zustand의 `isLoggedIn` 상태에 따른 **조건부 렌더링**으로 인증 가드 구현
- 별도 Auth Context 없이 전역 상태로 간결하게 처리

---

### 4.3 네비게이션 구조 (Stack + Tab + Drawer 조합)

```
App.js
├── MainStackNavigator (비로그인)
│   ├── StartScreen → LoginScreen → SignUpScreen
│
└── BottomTabNavigator (로그인 후)
    ├── HomeNavigator (홈 탭)
    │   ├── HomeScreen → RouteDetailScreen
    │   ├── BoardSearchScreen
    │   └── AngelSelectMenuScreen → AngelScreen
    ├── HeartNavigator (좋아요 탭)
    │   └── HeartBoardScreen
    ├── RouteCreateNavigator (일정 작성 탭)
    │   ├── MainBoardWriteScreen
    │   ├── SearchPlaceScreen
    │   └── InsertMyPlaceScreen
    ├── ChatNavigator (채팅 탭)
    │   ├── ChatListScreen
    │   └── ChatDetailNavigator (Drawer)
    │       ├── ChatDetailScreen
    │       └── ChatDetailMenuScreen
    └── MyInfoNavigator (내 정보 탭)
        ├── MyInfoScreen
        ├── PublicWifiPlaceScreen
        ├── MyRouteBoardScreen
        ├── MyReview
        └── MyNotification
```

**면접 포인트:**
- **중첩 네비게이션 패턴**: Bottom Tab 안에 각 탭별 Stack Navigator
- **CustomTabBar**: 기본 탭바 대신 커스텀 디자인으로 UX 개선
- **Drawer Navigator**: 채팅 상세 화면에서 슬라이드 메뉴 적용

---

### 4.4 실시간 채팅 (WebSocket)

**파일**: `src/screens/chat/ChatDetailScreen.js`

```javascript
useEffect(() => {
  const socket = new WebSocket(
    `${IPConfig.IP}/users/${userId}/chatting/${chattingId}/ws`
  );

  socket.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);
    setMessageList((prev) => [...prev, newMessage]);
  };

  setWs(socket);
  return () => socket.close();
}, []);

// 메시지 전송
const addMessage = (text) => {
  ws.send(JSON.stringify({
    chattingId, userId, content: text, ...
  }));
};
```

**면접 포인트:**
- Native WebSocket API 사용 (Socket.io 불필요)
- `useEffect` cleanup에서 소켓 연결 해제 → 메모리 누수 방지
- 메시지 수신 시 `setMessageList(prev => [...prev, newMessage])`로 불변 상태 업데이트
- 컴포넌트 분리: `MessageList` → `MessageItem` → `ChatTextInput`

---

### 4.5 여행 일정 작성 (복합 폼)

**파일**: `src/screens/add/MainBoardWriteScreen.js`

**구현 포인트:**
- **복잡한 중첩 상태 관리**: 날짜별(day) → 장소별(place) → 메모까지 3단계 중첩
  ```javascript
  plans = [{
    date: '2024-10-01',
    places: [{
      order: 1,
      placeType: 'restaurant',
      placeName: '경복궁',
      latitude: 37.5796,
      longitude: 126.9770,
      memo: '오전 10시 입장'
    }]
  }]
  ```
- **이미지 업로드**: Expo Image Picker → 품질 0.5 압축 → Firebase Storage 업로드
- **장소 검색**: Google Places Autocomplete → 좌표 획득 → 지도 마커 표시
- **DateRangePicker**: 여행 시작일~종료일 선택 → 자동 날짜 배열 생성
- **Google Maps 연동**: 선택한 장소 좌표를 지도에 실시간 마커 표시

---

### 4.6 지도 연동 (공공 와이파이)

**파일**: `src/screens/myInfo/PublicWifiPlaceScreen.js`

```javascript
// 현재 위치 권한 요청 → GPS 좌표 획득
const { status } = await Location.requestForegroundPermissionsAsync();
const location = await Location.getCurrentPositionAsync({});

// 파란색 마커 = 현재 위치, 빨간색 마커 = 와이파이 지점
<MapView region={{ latitude, longitude, latitudeDelta: 0.01 }}>
  <Marker coordinate={currentLocation} pinColor="blue" />
  {wifiSpots.map(spot => (
    <Marker coordinate={spot} pinColor="red" />
  ))}
</MapView>
```

**면접 포인트:**
- `expo-location`으로 위치 권한 처리 및 GPS 좌표 획득
- Google Places Autocomplete으로 검색 → 좌표 → 지도 이동
- 마커 색상 분리로 현재 위치와 와이파이 지점 시각적 구분

---

### 4.7 커스텀 탭바

**파일**: `src/components/common/CustomTabBar.js`

```javascript
// React Navigation의 descriptors, state를 받아 완전 커스텀 렌더링
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key });
          if (!event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity onPress={onPress} style={[
            styles.tab,
            isFocused && { backgroundColor: '#E8EBF5' }
          ]}>
            <Image source={TAB_ICON_MAP[route.name]}
              style={{ tintColor: isFocused ? '#5775CD' : '#888' }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
```

**면접 포인트:**
- 기본 탭바 제거 후 **완전 커스텀 구현**
- `navigation.emit`으로 React Navigation 이벤트 시스템 유지
- `tintColor` 변경으로 활성 탭 시각적 피드백
- `tabBarStyle.display === "none"` 체크로 조건부 숨김

---

### 4.8 컴포넌트 설계 패턴

| 패턴 | 적용 사례 | 설명 |
|------|----------|------|
| **Container/Presentational** | HomeScreen(로직) → PostList(렌더링) | 데이터 로직과 UI 분리 |
| **Composition** | RouteDetail = PostTop + PostMiddle + PostBottom | 세부 컴포넌트 조합 |
| **Controlled Component** | InputTextField, LoginForm | 부모가 상태 제어 |
| **Config-driven** | IPConfig.json, Style.json, googleApi.json | 설정 외부 분리 |

---

## 5. 백엔드 핵심 구현

### 5.1 계층 구조 (Layered Architecture)

```
@RestController → @Service (interface) → @ServiceImpl → @Mapper (MyBatis) → XML SQL
```

| 계층 | 역할 | 예시 |
|------|------|------|
| **Controller** | HTTP 요청·응답 처리 | `RouteController` - GET /routes |
| **Service (Interface)** | 비즈니스 로직 인터페이스 정의 | `RouteService` |
| **ServiceImpl** | 비즈니스 로직 구현 | `RouteServiceImpl` |
| **Mapper** | SQL 매핑 인터페이스 | `RouteMapper` |
| **Entity/DTO** | 데이터 모델 | `RouteEntity ↔ Route(DTO)` |

---

### 5.2 DTO 변환 패턴 (Convertible 인터페이스)

```java
// 제네릭 인터페이스로 Entity ↔ DTO 변환 규격 통일
public interface Convertible<Entity, DTO> {
    DTO toDTO(Entity entity);
}

// Route DTO에서 구현
public class Route implements Convertible<RouteEntity, Route> {
    @Override
    public Route toDTO(RouteEntity entity) {
        return Route.builder()
            .routeNum(entity.getRouteNum())
            .title(entity.getTitle())
            .state(entity.getState())
            .build();
    }
}
```

**면접 포인트:**
- `Convertible<E, D>` 제네릭 인터페이스로 변환 로직 표준화
- Lombok `@Builder` 패턴으로 가독성 높은 객체 생성

---

### 5.3 WebSocket 채팅 (서버 측)

**설정** (`WebSocketConfig.java`):
```java
// URL에서 userId, chattingId 추출 → 세션 속성에 저장
@Override
public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(handler, "/users/{userId}/chatting/{chattingId}/ws")
            .addInterceptors(new HttpSessionHandshakeInterceptor() {
                // beforeHandshake에서 path variable 파싱
            })
            .setAllowedOrigins("*"); // ⚠️ 개선 필요: 프로덕션에서는 특정 도메인만 허용해야 함
}
```

> ⚠️ **개선점**: `setAllowedOrigins("*")`는 모든 출처의 WebSocket 연결을 허용하여 보안 위험이 있습니다. 프로덕션 환경에서는 허용할 도메인을 명시적으로 지정해야 합니다.

**메시지 핸들링** (`WebSocketMessageHandler.java`):
```java
// Pub-Sub 패턴: 메시지 수신 → 같은 채팅방 모든 세션에 브로드캐스트
@Override
protected void handleTextMessage(WebSocketSession session, TextMessage message) {
    String chattingId = (String) session.getAttributes().get("chattingId");
    ChatRoom room = chatRoomService.getRoom(chattingId);
    room.broadcast(message);  // 모든 연결된 클라이언트에 전달
}
```

---

### 5.4 외부 API 연동 (관광지 데이터)

**파일**: `PlaceServiceImpl.java`

```java
// 한국관광공사 API에서 관광지 데이터 가져와 DB 저장
@Transactional
public void savePlacesFromApi() {
    // 페이지네이션 루프로 전체 데이터 수집
    for (int page = 1; page <= totalPages; page++) {
        URL url = new URL(apiUrl + "&pageNo=" + page);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        // JSON 파싱 → PlaceEntity 변환 → DB 삽입
    }
}
```

---

### 5.5 비밀번호 암호화

```java
// BCryptPasswordEncoder로 단방향 해시
private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

// 회원가입: 평문 → 해시
entity.setPassword(encoder.encode(user.getPassword()));

// 로그인: 해시 비교
if (encoder.matches(inputPassword, storedHash)) { ... }
```

---

## 6. 주요 기능별 동작 흐름

### 6.1 로그인 플로우
```
StartScreen → LoginScreen → POST /users/login
                                    ↓
                             서버: BCrypt 비밀번호 검증
                                    ↓
                             응답: User 정보 반환
                                    ↓
                             Zustand: setLogin(user), login()
                                    ↓
                             App.js: isLoggedIn=true → BottomTabNavigator 렌더링
```

### 6.2 여행 게시글 조회 플로우
```
HomeScreen (탭 전환: 전체/소개/모집)
    ↓
GET /routes?state={0,1,2}&sortType=0
    ↓
서버: RouteMapper → 필터링된 RouteEntity 리스트 → DTO 변환
    ↓
프론트: PostList → PostItem 렌더링
    ↓
PostItem 클릭 → RouteDetailScreen
    ↓
GET /routes/{routeId} → PostTop + PostMiddle + PostBottom 조합
```

### 6.3 실시간 채팅 플로우
```
ChatListScreen → GET /users/{userId}/chatting → 채팅방 목록
    ↓
채팅방 선택 → ChatDetailScreen
    ↓
WebSocket 연결: ws://.../users/{userId}/chatting/{chattingId}/ws
    ↓
서버: WebSocketMessageHandler → ChatRoom에 세션 등록
    ↓
메시지 전송: socket.send(JSON) → 서버 broadcast → 모든 클라이언트 수신
    ↓
수신: onmessage → setMessageList(prev => [...prev, newMsg])
```

### 6.4 여행 일정 작성 플로우
```
MainBoardWriteScreen
    ↓
DateRangePicker → 날짜 범위 선택
    ↓
날짜별 장소 추가 → SearchPlaceScreen (Google Places Autocomplete)
    ↓
좌표 획득 → GoogleMapComponent에 마커 표시
    ↓
이미지 선택 → Expo ImagePicker → Firebase Storage 업로드
    ↓
POST /routes → 서버: Route + RoutePlaces 트랜잭션 저장
```

---

## 7. 설계 패턴 및 기술적 의사결정

### 선택한 기술과 그 이유

| 의사결정 | 선택 | 이유 |
|----------|------|------|
| 상태관리 | Zustand (vs Redux) | 해커톤 기간(2주)에 Redux의 Action/Reducer 보일러플레이트는 과함. Zustand는 단순한 API와 persist 미들웨어 제공 |
| 네비게이션 | React Navigation | React Native 공식 추천 라이브러리, Stack/Tab/Drawer 모두 지원 |
| HTTP | Axios (vs fetch) | 인터셉터, 에러 핸들링, 자동 JSON 변환 등 편의 기능 |
| 실시간 통신 | Native WebSocket (vs Socket.io) | 간단한 텍스트 채팅에 Socket.io의 추가 기능(room, namespace)이 불필요 |
| 지도 | Google Places + React Native Maps | 전 세계 관광지 검색 필요 → Google Places가 가장 넓은 커버리지 |
| ORM | MyBatis (vs JPA) | 복잡한 쿼리를 XML로 직접 작성하여 세밀한 제어 가능 |

### 적용된 디자인 패턴

| 패턴 | 적용 위치 | 설명 |
|------|----------|------|
| **Layered Architecture** | Backend 전체 | Controller → Service → Mapper 계층 분리 |
| **Pub-Sub** | WebSocket 채팅 | ChatRoom이 구독자(세션)에게 메시지 브로드캐스트 |
| **Strategy** | Convertible 인터페이스 | Entity→DTO 변환 전략을 각 DTO 클래스에 위임 |
| **Observer** | React Zustand | 상태 변경 시 구독 컴포넌트 자동 리렌더링 |
| **Composition** | React 컴포넌트 | 작은 컴포넌트를 조합해 복잡한 UI 구성 |
| **Config-driven** | IPConfig, Style, googleApi | 환경 설정을 코드에서 분리 |

---

## 8. 면접 예상 질문과 답변

### Q1. 프로젝트에서 본인의 역할은?
> **Frontend 개발자**로 React Native(Expo) 기반 모바일 앱의 전체 화면 및 컴포넌트를 구현했습니다.
> 주요 담당: 네비게이션 구조 설계, 커스텀 탭바, 실시간 채팅 화면, 여행 일정 작성(지도 연동), 로그인/회원가입 플로우, 공공 와이파이 지도 화면, 상태 관리 설계.

### Q2. 왜 Redux 대신 Zustand를 선택했나요?
> 2주라는 짧은 해커톤 기간에 Redux의 Action, Reducer, Store 보일러플레이트는 개발 속도를 저하시킵니다.
> Zustand는 `create((set) => ({...}))` 한 줄로 스토어를 만들 수 있고, `persist` 미들웨어로 AsyncStorage 영속화까지 간단히 처리할 수 있어 선택했습니다.
> 또한 Provider 없이 어디서든 `useStore()` 훅으로 상태에 접근할 수 있어 컴포넌트 트리가 간결합니다.

### Q3. WebSocket 채팅은 어떻게 구현했나요?
> **프론트엔드**: `useEffect`에서 `new WebSocket(url)` 연결 → `onmessage`로 메시지 수신 시 `setMessageList(prev => [...prev, newMsg])`로 상태 업데이트. cleanup 함수에서 `socket.close()` 호출하여 메모리 누수 방지.
>
> **백엔드**: Spring WebSocket의 `TextWebSocketHandler`를 상속한 핸들러가 연결 시 `ChatRoom`에 세션 등록, 메시지 수신 시 같은 방의 모든 세션에 브로드캐스트하는 **Pub-Sub 패턴** 적용.
>
> **URL 설계**: `/users/{userId}/chatting/{chattingId}/ws`에서 경로 변수로 사용자와 채팅방 식별.

### Q4. 복잡한 여행 일정 작성 폼은 어떻게 관리했나요?
> 3단계 중첩 상태(`plans → date → places → place`)를 React의 `useState`로 관리했습니다.
> - **날짜 추가/삭제**: DateRangePicker로 시작~종료일 선택 → 날짜 배열 자동 생성
> - **장소 추가**: Google Places Autocomplete → 좌표 + 장소명 획득 → 해당 날짜의 places 배열에 추가
> - **불변 업데이트**: `.map()`과 `.filter()`로 중첩 상태를 불변하게 업데이트
> - **메모 편집**: Modal로 특정 장소의 메모를 포커스하여 편집

### Q5. 네비게이션 구조를 어떻게 설계했나요?
> **3단계 중첩 네비게이션**을 구성했습니다:
> 1. 최상위: `isLoggedIn` 상태에 따른 조건부 렌더링 (인증 가드)
> 2. 중간: `BottomTabNavigator`로 5개 탭 구성 + `CustomTabBar`로 디자인 커스텀
> 3. 하위: 각 탭 안에 `Stack.Navigator`로 화면 전환
>
> 채팅 상세 화면에는 `DrawerNavigator`를 추가로 적용하여 슬라이드 메뉴 UX를 구현했습니다.

### Q6. 프로젝트에서 어려웠던 점과 해결 방법은?
> **1. 백엔드 연동 지연**: 프론트엔드가 먼저 완성되었으나 백엔드 연동이 지연되어, `dummy_data/`에 JSON 목 데이터를 만들어 독립적으로 UI 개발을 진행했습니다.
>
> **2. 복잡한 중첩 상태**: 여행 일정의 날짜별 → 장소별 → 메모까지 3단계 중첩 상태를 불변하게 관리하는 것이 까다로웠습니다. `.map()`과 스프레드 연산자(`...`)를 조합하여 특정 날짜의 특정 장소만 업데이트하는 로직을 구현했습니다.
>
> **3. WebSocket 연결 관리**: 화면 이동 시 소켓이 제대로 정리되지 않는 문제를 `useEffect`의 cleanup 함수에서 `socket.close()`를 호출하여 해결했습니다.

### Q7. MyBatis를 선택한 이유는? (백엔드 관련 질문이 나올 경우)
> JPA(Hibernate)는 간단한 CRUD에 편리하지만, 복잡한 조인이나 조건부 쿼리에서는 생성되는 SQL을 예측하기 어렵습니다.
> MyBatis는 SQL을 직접 XML에 작성하므로 쿼리 최적화와 디버깅이 용이하고, 팀원 모두 SQL에 익숙했기 때문에 선택했습니다.

### Q8. 보안적으로 고려한 점은?
> - 비밀번호는 `BCryptPasswordEncoder`로 단방향 해시 처리
> - Spring Security 설정으로 보안 프레임워크 기반 마련
> - 환경 변수(dotenv)로 DB 접속 정보를 코드에서 분리
> - API 설정 파일(IPConfig.json, googleApi.json)로 키 관리

### Q9. 해커톤에서 2주 만에 어떻게 완성했나요?
> - **Expo**: 빌드 설정 없이 바로 개발 시작 가능
> - **Zustand**: 상태 관리 설정에 시간 거의 소요되지 않음
> - **더미 데이터**: 백엔드 완성 전에 프론트엔드 독립 개발
> - **컴포넌트 재사용**: PostItem, LongButton, InputTextField 등 공통 컴포넌트 분리로 개발 효율 극대화
> - **Config 분리**: API URL, 스타일 등을 JSON 설정 파일로 분리하여 변경 시 수정 범위 최소화

### Q10. 이 프로젝트를 개선한다면?
> - **TypeScript 도입**: 현재 JS로 작성되어 타입 안정성이 부족
> - **에러 바운더리**: 전역 에러 핸들링 미흡
> - **API 응답 캐싱**: React Query/SWR 도입으로 네트워크 요청 최적화
> - **테스트**: Jest + React Native Testing Library로 단위/통합 테스트 추가
> - **CI/CD**: GitHub Actions로 자동 빌드/배포 파이프라인 구축
> - **인증 강화**: JWT 토큰 기반 인증 도입 (현재 서버 측 인증 미적용)
