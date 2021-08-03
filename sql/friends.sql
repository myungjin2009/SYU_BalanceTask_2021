CREATE TABLE `friends` (
	`user` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`friends` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`friends_introduce` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`user`, `friends`) USING BTREE,
	INDEX `FK_friends_user_2` (`friends`) USING BTREE,
	INDEX `FK_friends_user_3` (`friends_introduce`) USING BTREE,
	CONSTRAINT `FK_friends_user` FOREIGN KEY (`user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_friends_user_2` FOREIGN KEY (`friends`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_friends_user_3` FOREIGN KEY (`friends_introduce`) REFERENCES `test`.`user` (`introduce`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
