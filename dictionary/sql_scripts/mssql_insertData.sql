USE [dictionary]
GO

INSERT INTO team(name) VALUES ('General'),('APT'), 
('Front Arena'), ('XSP'), ('Quantum'), ('Sierra'), 
('Insurance'), ('Adaptiv'), ('Apex Collateral'), 
('PTDS '), ('ITDS')

INSERT INTO tag(name) VALUES ('finance'), ('technical'), 
('procedural'), ('product'), ('clients')

INSERT INTO users(name, surname, e_number, email, password, is_admin, team_team_id ) VALUES 
('Ana', 'Stakic', 'e5637521', 'ana.stakic@fisglobal.com', 'dictionary123*', 1, 3 ),
('Aleksandra', 'Maksimovic', 'e5638600', 'aleksandra.maksimovic@fisglobal.com', 'dictionary123*', 1, 2 ),
('Nikola', 'Vitorovic', 'e5598277', 'nikola.vitorovic@fisglobal.com', 'dictionary123*', 1, 2 ),
('Nina', 'Milanovic', 'e5638799', 'nina.milanovic@fisglobal.com', 'dictionary123*', 1, 2 )

GO