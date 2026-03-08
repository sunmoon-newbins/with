package com.newbins.service;

import com.newbins.dto.Route;

import java.util.List;

public interface RouteLikeService {
    void likeRoute(String routeId, String userId);
    void unlikeRoute(String routeId, String userId);
    List<Route> getLikedRoutes(String userId);
}
