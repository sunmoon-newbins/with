package com.newbins.service;

import com.newbins.dto.Notice;

import java.util.List;

public interface UserNoticeService {
    List<Notice> getMyNotices(String userId);
}
