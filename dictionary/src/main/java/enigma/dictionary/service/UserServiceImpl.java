package enigma.dictionary.service;

import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.dto.UserDTO;
import enigma.dictionary.model.Team;
import enigma.dictionary.model.User;
import enigma.dictionary.repository.TeamRepository;
import enigma.dictionary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamService teamService;


    @Override
    public User getById(Long userID) {
        return userRepository.findById(userID).orElseGet(null);
    }

    @Override
    public User getByEmail(String credentials) {
        return userRepository.findByEmail(credentials);
    }

    @Override
    public User getByENumber(String credentials) {

        Team t = userRepository.findByeNumber(credentials).getTeam();
        return userRepository.findByeNumber(credentials);
    }

    @Override
    public UserDTO transformToDTO(User user) {

        TeamDTO teamDTO=teamService.transformToDTO(user.getTeam());
        UserDTO userDTO= new UserDTO(user.getUserID(), user.geteNumber(), user.getEmail(), user.getName(), user.getSurname(), user.isAdmin(), teamDTO);
        return userDTO;
    }

    @Override
    public User transformToModel(UserDTO userDTO) {
        return userRepository.findById(userDTO.getUser_ID()).orElseGet(null);
    }
}
