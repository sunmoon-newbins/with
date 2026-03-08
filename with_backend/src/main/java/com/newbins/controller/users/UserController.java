package com.newbins.controller.users;

import com.newbins.dto.*;
import com.newbins.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RouteService routeService;

    @Autowired
    private RouteLikeService routeLikeService;

    @Autowired
    private UserChattingService userChattingService;

    @Autowired
    private UserNoticeService userNoticeService;

    @Autowired
    private UserPlaceService userPlaceService;

    @Autowired
    private UserReviewService userReviewService;

    // ── 인증 ──────────────────────────────────────────────────────────────────

    // 로그인
    @PostMapping("/login")
    public User login(@RequestBody User userRequest) {
        log.info("[login] : id = {}", userRequest.getId());
        User userResponse = userService.login(userRequest);
        log.info("[login] : user = {}", userResponse);
        return userResponse;
    }

    // 회원가입
    @PostMapping("/signup")
    public boolean signup(@RequestBody User user) {
        return userService.signup(user);
    }

    // ── 프로필 ─────────────────────────────────────────────────────────────────

    // 프로필 보기
    @GetMapping("/{userId}")
    public User getUser(@PathVariable String userId) {
        return userService.getUser(userId);
    }

    // 프로필 사진 변경
    @PatchMapping("/{userId}")
    public User changeProfile(@PathVariable String userId,
                              @RequestBody User user) {
        user.setUserId(userId);
        return userService.changeProfile(user);
    }

    // ── 루트 ──────────────────────────────────────────────────────────────────

    // 게시한 루트 목록
    @GetMapping("/{userId}/routes")
    public List<Route> getMyRoutes(@PathVariable String userId) {
        return routeService.getRoutes(userId);
    }

    // 루트 게시판 작성
    @PostMapping("/{userId}/routes")
    public void createRoute(@PathVariable String userId,
                            @RequestBody WriteRoute writeRoute) {
        log.info("[createRoute] : route = {}", writeRoute);
        routeService.createRoute(userId, writeRoute);
    }

    // 좋아요 누른 루트 목록
    @GetMapping("/{userId}/routes/liked")
    public List<Route> getLikedRoutes(@PathVariable String userId) {
        log.info("[getLikedRoutes] : userId = {}", userId);
        return routeLikeService.getLikedRoutes(userId);
    }

    // ── 채팅 ──────────────────────────────────────────────────────────────────

    // 내 채팅방 목록
    @GetMapping("/{userId}/chatting")
    public List<ChattingRoom> getChattings(@PathVariable String userId) {
        log.info("[getChattings] : userId = {}", userId);
        List<ChattingRoom> chattingRoomList = userChattingService.getChattingRooms(userId);
        log.info("[getChattings] : chattingRoomList = {}", chattingRoomList);
        return chattingRoomList;
    }

    // 채팅방 상세
    @GetMapping("/{userId}/chatting/{chattingId}")
    public Chatting getChatting(@PathVariable String userId,
                                @PathVariable String chattingId) {
        log.info("[getChatting] : userId = {}, chattingId = {}", userId, chattingId);
        Chatting chatting = userChattingService.getChattingRoomInfo(chattingId, userId);
        log.info("[getChatting] : chatting = {}", chatting);
        return chatting;
    }

    // 채팅방 나가기
    @DeleteMapping("/{userId}/chatting/{chattingId}")
    public void exitChatting(@PathVariable String userId,
                             @PathVariable String chattingId) {
        log.info("[exitChatting] : userId = {}, chattingId = {}", userId, chattingId);
        userChattingService.leaveTheChatting(chattingId, userId);
    }

    // ── 알림 ──────────────────────────────────────────────────────────────────

    // 알림 목록
    @GetMapping("/{userId}/notices")
    public List<Notice> getMyNotices(@PathVariable String userId) {
        return userNoticeService.getMyNotices(userId);
    }

    // ── 나만의 장소 ────────────────────────────────────────────────────────────

    // 나만의 장소 목록
    @GetMapping("/{userId}/places")
    public List<Place> getMyPlaces(@PathVariable String userId) {
        log.info("[getMyPlaces] : userId = {}", userId);
        return userPlaceService.getMyPlaces(userId);
    }

    // 나만의 장소 추가
    @PostMapping("/{userId}/places")
    public MyPlace addMyPlace(@PathVariable String userId,
                              @RequestBody Place place) {
        log.info("[addMyPlace] : userId = {}", userId);
        MyPlace myAddedPlace = userPlaceService.addMyPlace(userId, place);
        log.info("[addMyPlace] : myAddedPlace = {}", myAddedPlace);
        return myAddedPlace;
    }

    // 나만의 장소 삭제
    @DeleteMapping("/{userId}/places/{placeId}")
    public void deleteMyPlace(@PathVariable String userId,
                              @PathVariable long placeId) {
        log.info("[deleteMyPlace] : userId = {}, placeId = {}", userId, placeId);
        userPlaceService.deleteMyPlace(userId, placeId);
    }

    // ── 후기 ──────────────────────────────────────────────────────────────────

    // 받은 후기 목록
    @GetMapping("/{userId}/reviews")
    public List<Review> getMyReviews(@PathVariable String userId) {
        return userReviewService.getMyReviews(userId);
    }

    // 후기 작성
    @PostMapping("/{userId}/reviews")
    public void writeReview(@PathVariable String userId,
                            @RequestBody Review review) {
        log.info("[writeReview] : userId = {}, review = {}", userId, review);
        userReviewService.writeReview(userId, review);
    }
}
