create table users (
id serial primary key,
username varchar(80),
email varchar(80),
descrip varchar(500),
auth_id varchar(1000)
)