CREATE TABLE IF NOT EXISTS public.users (
                              id serial NOT NULL,
                              username character varying(50) NOT NULL,
                              email character varying(100) NOT NULL,
                              password character varying(100) NOT NULL,
                              enabled boolean NOT NULL
);
CREATE TABLE IF NOT EXISTS public.authorities (
                                    username character varying(50) NOT NULL,
                                    authority character varying(50) NOT NULL
);
INSERT INTO users
(username, email, password, enabled)
values
('user', 'user@user.com', '$2a$10$1iZ.nxTTUmR4qimSgMCOh.inN7Ng0um9ddhhmnqRRLUOtOtglYsES', true);
insert into authorities
(username, authority)
values
(user, 'USER');