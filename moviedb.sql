create database `movie-db`;
use `movie-db`;
create table `Movies`(
`id` int(11) not null auto_increment,
`title` varchar(255) default null,
`year` int(11) default null,
primary key (`id`) 
) engine=innodb default charset=utf8;

insert into `Movies` (`title`, `year`) values
('Iron Man', 2008),
('The Matrix', 1999),
('Thor', 2011),
('Captain America', 2011),
('Black Panther', 2018);

ALTER TABLE movies MODIFY COLUMN title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;