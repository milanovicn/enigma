--	PRE PRVOG POKRETANJA:
--
CREATE DATABASE dictionary;

-- Creates the login enigma with password 'dictionary123*'.  
CREATE LOGIN enigma   
    WITH PASSWORD = 'dictionary123*';  
GO  

-- Creates a database user for the login created above.  
CREATE USER enigma FOR LOGIN enigma;  
GO  

-- mora se dodati user za ovu bazu na:
-- dictionary -> security -> users (desni klik) -> new user.. i u prozoru:
-- u general login i user names upisati: enigma
-- u owned schemas i membership checkirati db_owner