package enigma.dictionary.service;

import enigma.dictionary.dto.TeamDTO;
import enigma.dictionary.dto.UserDTO;
import enigma.dictionary.model.Team;
import enigma.dictionary.model.User;

public interface UserService {
    User getById(Long userID);
    User getByEmail(String credentials);
    User getByENumber(String credentials);
    UserDTO transformToDTO(User user);
    User transformToModel(UserDTO userDTO);
}
