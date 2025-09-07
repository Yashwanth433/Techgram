package com.project.service;

import com.project.model.Message;
import com.project.model.User;
import com.project.repository.MessageRepository;
import com.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Message> getMessagesBetweenUsers(Long user1Id, Long user2Id) {
        Optional<User> user1Opt = userRepository.findById(user1Id);
        Optional<User> user2Opt = userRepository.findById(user2Id);

        if (user1Opt.isPresent() && user2Opt.isPresent()) {
            return messageRepository.findMessagesBetweenUsers(user1Opt.get(), user2Opt.get());
        } else {
            throw new RuntimeException("One or both users not found");
        }
    }

    public Message sendMessage(Long senderId, Long receiverId, String content) {
        Optional<User> senderOpt = userRepository.findById(senderId);
        Optional<User> receiverOpt = userRepository.findById(receiverId);

        if (senderOpt.isPresent() && receiverOpt.isPresent()) {
            Message message = new Message(senderOpt.get(), receiverOpt.get(), content);
            return messageRepository.save(message);
        } else {
            throw new RuntimeException("Sender or receiver not found");
        }
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }
}
