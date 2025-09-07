package com.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.Message;
import com.project.model.User;
import com.project.repository.FollowRepository;
import com.project.service.MessageService;
import com.project.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowRepository followRepository;

    @GetMapping("/between/{user1Id}/{user2Id}")
    public List<Message> getMessagesBetweenUsers(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return messageService.getMessagesBetweenUsers(user1Id, user2Id);
    }

    @PostMapping("/send")
    public Map<String, Object> sendMessage(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long senderId = Long.valueOf(request.get("senderId").toString());
            Long receiverId = Long.valueOf(request.get("receiverId").toString());
            String content = request.get("content").toString();

            Message message = messageService.sendMessage(senderId, receiverId, content);
            response.put("success", true);
            response.put("message", "Message sent successfully!");
            response.put("messageId", message.getId());
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send message: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("/friends/{userId}")
    public List<User> getFriends(@PathVariable Long userId) {
        List<User> allUsers = userService.getAllUsers();
        allUsers.removeIf(user -> user.getId().equals(userId));
        return allUsers;
    }
}
