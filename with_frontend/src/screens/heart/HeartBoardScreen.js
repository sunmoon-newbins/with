import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import PostList from "../../components/Boards/PostList";

function HeartBoardScreen() {
  const [likedPosts, setLikedPosts] = useState([]); // 좋아요 누른 게시글 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 백엔드에서 좋아요 누른 게시글을 가져오는 함수
  const fetchLikedPosts = async () => {
    try {
      // 백엔드 API 호출
      // const response = await fetch('https://your-api.com/user/liked-posts', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer ' + token, // 필요한 경우 인증 토큰 추가
      //   },
      // });
      // const data = await response.json();
      // setLikedPosts(data.likedPosts);

      // 여기서는 더미 데이터를 사용합니다.
      const dummyLikedPosts = [
        {
          id: "10",
          title: "나만 아는 부산 핫플레이스",
          author: "김정동",
          userProfile: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUPEA8VFRUVFRUVFRUVFRUVFRUVFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFw8PFS0dFR0tKysrLS0tLS0tKysrKysrLS0rLSstNy0tKysrKy0rLSstKy0tLS0rKy0tLTItMS0rK//AABEIALUBFwMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQIFAwQGB//EADYQAAIBAgQEBAQFBAIDAAAAAAABAgMRBBIhMQVBUWEGcYGRIqGx8BMjMsHRQlLh8XKSFIKy/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAAICAgIDAAAAAAAAAAAAAQIRAzEhURJBE2Fx/9oADAMBAAIRAxEAPwD5q2LhgoXKQoC5SFAFIUAmUhSilIY1Kqj+p2vtfQg5CZu515Yuz/Q/Nao1mIxrb0evbS3a4GxxWPUV8LzPs9F5mrq4iUnezl53svKK0XzOKnBvXvv39TlVdpWsvNWun5rcg4PxH9o7WGxb0u30um7q/Oz0ZKsVNKaVm9GuV1p+3zOOpSsvvTkwrdUq7teT06/6OdSvzNDhsS8+uz5emh2HjXT+BpO3768tio29wcFDEKSv8znAAACC5SALgACXFwAJcXAAjZCkALcCO4AxZCsACkKAACAoKgAAKUU48RbK81rd0n9TkOjxWF4NvZLRdW2kvYg01RpttJW8rCKMQRWz4fl3tt96ep0sTJuWunRdEdrh+Hk9UrvaK5X6v+DcYXwlVq3lKSv35slyk7axwt6edVW0bLs/nf8AgyqV7p91+9z09PwZWUrON11ir+5s5+AZ5f2/byM/kx9tfiy9PF4Sml8TV2vRR7t9exJqMm25WfLdpo7/ABXgVWh+uMsq520vzf0OvRpK+10+j2b2NSy9MXGzt1MPVlB5krrZrW3r0N3harlFPS3nd+uisabGYbK9/K639Ts8FqO7h2v8/wCf/o0jbgFCIAABCkAgKAMQUgEIZEKJEoiCDBgrAAIFAhUCgCkAFAAFOvxFXpS8r+2p2DDEfoldX+F/QDzJnSg21Fbsk4NNxe6dvY3XAMKs12tTNuo1jN3Tf8C4dlirrU9tw7D6I0nDoLQ9Vw+i7Hkyu3txmo7mEw53Z4bsShCx3syaEha8/jsDGScZK6Z8m8W8GeFrKUV+XJ6La3VH2rEpHk/G3DvxsLNJXlFZo+a5FwuqznPlHzDG1YuF3z+vX1OnwZfmPyd/X/R1q03t9/eps+CUrRlN83ZeS/y37HreNsQUFQIUgAAAQFIAIABCFAEiUR3AGAAAoAAFAAoBQAAAoB18dUcYNx3A1XEo5azfWz+Vn9Gd/h2MUI5m/wDJqK9WUrZne17N768mzd8M4e508yV8tmc8+nTCXbccN4/la/Lb+vzPXcG8YUcyhKE4+auvdHl8HxyNODlLCyqRjpJ2ja90rXfPU9BgJYPFwz0qMqcuV42UpRjGU1F7NxzK9u/LU5Wfp3m+tvoFKtGaTi9GdPiXGKVBfGpS7RSb9DTeHM7cqf8AaTiaipOdZu3Jc32XVmNunx/biq+MaMtI0qi87L21GD4lGtmitGlfK+a2v3NdgvEGAqL4KMnZSbkoKVoxcVKUo3zRXxR1cefZm2w1DD1LVKUI9VKGm/l9C5a9M4/3b4txnDqGIqU1ym429dDd0oWio9Ekdri3BZ1+KzpUkruUZybdlGKhFuUnyV7L1M+I4F0nbPGau1eN1aUbXi09U9U+6aZ6Mcp4n28uWN836dQAG2EBQAIUAQhQBCFAEIUgCO4LEAcTKgwBQABSkKgBQgBQABTixMbxt1svd2OUxqRurEvSy6rz+OjabXR29j2ngWaays8dj18bl1evnzNz4TxmSpY5ZTeLvh4yfS4cBjduDspfqVtH7HceDjSpqTt+V8VNKK+B66w/t3e3VnPwrEKUUdbxPiMtLKmk5tRXru/a5x276Z+FHecprnf5m6q4BVYuP9UdU07aXT/ZGm8G0dGrrS/Pob/BVLTZJ2VpsB4YhSz/AIdOMXPSTWja3t2XZHZeDjRg1GKXU3rrpHnuN4xaouSRpPDVKn/5uJnUUrz/AA4x2ytxit/Jy28uhqPG8YrL/c57doRs37yj7Hp+EYeKhGbWrk5vTk3ol/c/0rQ8L4rxqq4l2d1BZL8m025v/tJq/PKjfHN5/wAY5L8cNe2nAB6XkAAAIUAQAAQAAQhQBFuUkdygcbAYApSAClRCgVAIAUpCgAABw1MHCUs0l6cn5mv4dHLVa6Nr2Zt0a3FrJWU+Ul81o/2M5Tw3hfL6F4exzSSbO7x7BLEKDzuLg8yt1tbX3PMcExF9mbTimMrQy/h03KLveStpblY8uvL2Ty2Phfw/VpNyeJk4Tm1a15JtX0k79uTPU8IwTopp1p1Ojna6XS63PEcO4zi4pr8CpblpTdn1XxaaJm/4Xx2pKShUozV9nlfz5Ct3jsjfYurZHmOL1rRc3sk37G9xM9DyHi7EpU8i3k7ei1f8eoxm7pzyupa4OIeMM1L8OjTdOTTTd18Ce+VrVvu9jyqKD144zHp48srl2AA0ygKQgAEApAABGABGQpAKgEAOMEZUARSFApSFAFQKAKQoAAAVGr43WXwx5rX0f+jaGq47SVoz53y+lm19PmFd3w/jbSSue3o0fxUtWn1R8npVXF3T2PY8A8VxjaNR5e/L3OGeF7j0cfJPt9AwXCMQl8NWOXo46/U2EMO4b7mswHi2jl0qR90dLjPjihBfrUpcox1fy2OWrXe8nu+G2xuKUU3Jnz3xHjM+KhBPWCk5dsyXw+asv+x1OJ+LpzbcE1Lk3/T/AMV17v2NNw/E5ZOUtb7vd73v3O3Hx2ea83LySzUbkhkyWOzgAAoEKCCEKAIQoAhCkAEAAR3KSO4KONgMEFKQIDIBFAFIZACohQKAABqONYlP8pLZpt+miXubg1nHYrInZXzJX52s+fsBpQCoiigZxh3IjJeQGaSQuRAo9NCSaTi00VmhwuLlDbVPdM2NLicHpL4X7r3KjuAlOakrxafk7mQEIUEAhSAQMpAIAQAQrIAW4EdwUcTAYIKVEKBUUiKBkUxRUBkCFApSHBisZGnu9eUVv/gDlq1FFOUnZI8/jsY6j2slsv3fcmLxMqjvLbkuS/z3OHKFYmRLFSIKjJGKRkiiooDKLcxYFiCJ2d1dd1odqnxGpH+q/wDyV/nudawA2MOMPnBejsc9PisHupR89V8jTAI9NGSaunddVqU81TqSi7xbXkbHC8Td1Ga/9lp7oDZgMgEZLGRAMQUlgC3AW4A4mAAKCFAqMjFGSApSIlSooq8nZAZnFXxMYfql6c/Y1uJ4m3pDRdXu/LodBu+r1YHfxHE5PSCyrru/4R0Xrq9WAFCkKgASKABSFACwsUAgCFAhSEAtgigSxbBC5RtuG17rI91t5HcNFQq5ZKXT5rmjep31XMIEZSEEIUgCJQgBwsBgAUiKBUUiKgODGYxU11b2X7vsaWpUcnmk7v726GWLq55uXLZeS+7+pggoigEABFKAAAFIUAVAgFRSIpRACkEAMkULEZTGQAi39CkW5Bmjb8NqXhbo7em6++xp0d7hVT4nHqvp9sqNoQrIQDEyMQKgSJQONxGUABlKogAXKYYjSEmuUX9CADQRgZZO4BFVQGQoKGQuTuABMhXAAC5BkAAZRkIAK4dxk7gAXIMgBQyFygAMpjKAAQcDGMdygirlOfBq1SPnb30AKN5lJlAIiZSZQAEY6kAKP//Z`, // 유저 프로필 이미지
          state: "active", // 상태 필드
          currentMember: 3, // 현재 참여 인원
          participantCount: 5, // 최대 참여 인원
          createDate: "2024-10-01T10:00:00Z", // 게시글 생성 날짜
          routeNum: 301, // 게시글의 경로 ID
          picture:
            "https://images.unsplash.com/photo-1723942699823-956bb643857d?fm=jpg&q=60&w=3000", // 게시글 섬네일 이미지
          content:
            "부산 하면 바다, 바다하면 해운대와 서면 같이 서핑해요 제가 가르쳐",
        },
        {
          id: "11",
          title: "4일 동안 부산배를 타고 떠나는 여행",
          author: "로라",
          userProfile:
            "https://i.namu.wiki/i/CIQNEQ9NikGn-ykbDGORLJnExZFn5IJGmx8u4-9VgmVKQXLxbRR-NM3ZGRO5J8lvF1quvM4ZO_9AVqF0gf_MTA.webp", // 유저 프로필 이미지
          state: "completed", // 상태 필드
          currentMember: 5, // 현재 참여 인원
          participantCount: 5, // 최대 참여 인원
          createDate: "2024-10-02T12:00:00Z", // 게시글 생성 날짜
          routeNum: 302, // 게시글의 경로 ID
          picture:
            "http://blogfiles.naver.net/MjAyNDAzMTlfMjgw/MDAxNzEwNzkxMTIxNjQ1.KCXGHo1y0il0ejAm8MAyyiCtddwrr2LMlzzYleZuQAUg.TKp9cdARlt91ySzxxLhxaxQxaUGWZ4LHoPN3ME03HlEg.JPEG/IMG_4430.JPG", // 게시글 섬네일 이미지
          content:
            "나는 멋진 부산에서 15년 동안 살았습니다. 배를 타고 부산을 즐겨보자...",
        },
        {
          id: "12",
          title: "뉴진스코드 in 부산 여행 코스",
          author: "킴민지",
          userProfile:
            "https://i.namu.wiki/i/8BAuDmjlFbHoGpGTyTUJyeIsrWw7vrGKTvbOBS1DbaLNHHFL6D05TSZEyVGGffn_RIs6zrf4jCb5Xq5Lnbs8QQ.webp", // 유저 프로필 이미지
          state: "active", // 상태 필드
          currentMember: 4, // 현재 참여 인원
          participantCount: 6, // 최대 참여 인원
          createDate: "2024-10-03T14:30:00Z", // 게시글 생성 날짜
          routeNum: 303, // 게시글의 경로 ID
          picture:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMzExMDNfMjg5%2FMDAxNjk4OTkyNjE1ODcx.vJGNyyErGwt9FWwmrMXP1lSNfiM-X92_M8-GkC8d7wIg.Zs0ilSHgV3AK5BHIN6dkifFfrKhN-LaGgk4YMqMPr28g.PNG%2FIGC8czNmthjFAOvtGO1dmSZB4CfM.jpg&type=a340", // 게시글 섬네일 이미지
          content:
            "뉴진스가 갔던곳 가보고 싶으신분 컴컴 부산 성지순례 같이 가요 ",
        },
      ];

      setLikedPosts(dummyLikedPosts); // 더미 데이터를 상태에 저장
    } catch (error) {
      console.error("Failed to fetch liked posts", error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  useEffect(() => {
    fetchLikedPosts(); // 컴포넌트가 마운트될 때 좋아요 누른 게시글을 가져옴
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabBarWrapper}></View>

      {/* 로딩 중일 때 로딩 인디케이터 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PostList data={likedPosts} /> // 좋아요 누른 게시글만 PostList에 전달
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 18,
  },
  tabBarWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12, // 아래 여백 추가
  },
});

export default HeartBoardScreen;
