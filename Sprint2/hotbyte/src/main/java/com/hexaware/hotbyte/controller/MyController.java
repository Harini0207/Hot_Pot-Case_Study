package com.hexaware.hotbyte.controller;

import com.hexaware.hotbyte.entity.Users;
import com.hexaware.hotbyte.repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MyController {

    @Autowired
    private UsersRepository usersRepository;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/registerPage")
    public String registerPage() {
        return "register";
    }

    @RequestMapping("/loginPage")
    public String loginPage(@ModelAttribute("msg") String msg, Model model) {
        model.addAttribute("msg", msg);
        return "login";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute Users user, RedirectAttributes attributes) {
        if (usersRepository.existsById(user.getEmail())) {
            attributes.addFlashAttribute("msg", "Email already registered.");
            return "redirect:/registerPage";
        }
        usersRepository.save(user);
        attributes.addFlashAttribute("msg", "Registration successful! Please log in.");
        return "redirect:/loginPage";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute Users users,
                        HttpSession session,
                        RedirectAttributes attributes) {
        try {
            Users user = usersRepository.getReferenceById(users.getEmail());
            if (user.getPassword().equals(users.getPassword())) {
                session.setAttribute("currentUser", user);
                return user.getRole().equalsIgnoreCase("admin") ? "redirect:/adminhome" : "redirect:/userhome";
            } else {
                attributes.addFlashAttribute("msg", "Invalid password.");
                return "redirect:/loginPage";
            }
        } catch (EntityNotFoundException e) {
            attributes.addFlashAttribute("msg", "Invalid email or user does not exist.");
            return "redirect:/loginPage";
        }
    }

    @GetMapping("/userhome")
    public String userHome(HttpSession session) {
        return session.getAttribute("currentUser") != null ? "userhome" : "redirect:/loginPage";
    }

    @GetMapping("/adminhome")
    public String adminHome(HttpSession session) {
        return session.getAttribute("currentUser") != null ? "adminhome" : "redirect:/loginPage";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session, RedirectAttributes attributes) {
        session.invalidate();
        attributes.addFlashAttribute("msg", "Logged out successfully.");
        return "redirect:/loginPage";
    }
}
