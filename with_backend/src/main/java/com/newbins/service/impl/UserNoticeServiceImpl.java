package com.newbins.service.impl;

import com.newbins.dto.Notice;
import com.newbins.entity.NoticeEntity;
import com.newbins.mapper.NoticeMapper;
import com.newbins.service.UserNoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserNoticeServiceImpl implements UserNoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public List<Notice> getMyNotices(String userId) {
        List<Notice> noticeList = new ArrayList<>();
        try{
            List<NoticeEntity> noticeEntities = noticeMapper.getNoticesByUserId(userId);
            log.info("[getMyNotice] successful get my notices");
            for(NoticeEntity noticeEntity : noticeEntities){
                noticeList.add(new Notice().toDTO(noticeEntity));
            }
        }catch(Exception e){
            log.info("[getMyNotice] failed get my notices");
        }
        return noticeList;
    }
}
