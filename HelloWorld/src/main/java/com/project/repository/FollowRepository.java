package com.project.repository;

import com.project.model.Follow;
import com.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    // Check if user A follows user B
    boolean existsByFollowerAndFollowing(User follower, User following);

    // Get all users that a user is following
    @Query("SELECT f.following FROM Follow f WHERE f.follower = :user")
    List<User> findFollowingByUser(@Param("user") User user);

    // Get all users that are following a user
    @Query("SELECT f.follower FROM Follow f WHERE f.following = :user")
    List<User> findFollowersByUser(@Param("user") User user);

    // Count followers for a user
    @Query("SELECT COUNT(f) FROM Follow f WHERE f.following = :user")
    long countFollowersByUser(@Param("user") User user);

    // Count following for a user
    @Query("SELECT COUNT(f) FROM Follow f WHERE f.follower = :user")
    long countFollowingByUser(@Param("user") User user);

    // Remove follow relationship
    void deleteByFollowerAndFollowing(User follower, User following);
}
