package enigma.dictionary.controller;

import enigma.dictionary.dto.LoginRequest;
import enigma.dictionary.dto.UserDTO;
import enigma.dictionary.model.User;
import enigma.dictionary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.Context;

@RestController
@RequestMapping("/api/dictionary/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{userID}")
    public ResponseEntity<?> getUserById(@Context HttpServletRequest request, @PathVariable("userID") Long userID) {
        User user = userService.getById(userID);
        UserDTO userDTO = userService.transformToDTO(user);
        return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> logIn(@RequestBody LoginRequest loginRequest, @Context HttpServletRequest request) {

        User user = userService.getByEmail(loginRequest.getCredentials());
        if(user == null){
            user = userService.getByENumber(loginRequest.getCredentials());
        }

        if (user != null) {
            if (loginRequest.getPassword().equals(user.getPassword())) {
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                UserDTO userDTO = userService.transformToDTO(user);
                return new ResponseEntity<UserDTO>(userDTO, HttpStatus.CREATED);
            }
        }

        return new ResponseEntity<String>("User with this credentials does not exist.", HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/session")
    public  ResponseEntity<?> getSession(@Context HttpServletRequest request) {

        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");

        if (user != null) {
            UserDTO userDTO = userService.transformToDTO(user);
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
        }

        return new ResponseEntity<String>("No active session.", HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<?> logOut(@Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();

        return new ResponseEntity<String>("Session invalidated.", HttpStatus.OK);
    }

}
