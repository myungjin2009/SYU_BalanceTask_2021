CREATE TABLE `vote` (
	`board_number` INT(10) NOT NULL,
	`discuss` INT(10) NULL DEFAULT NULL,
	`user` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`group` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`board_number`, `user`) USING BTREE,
	INDEX `FK__groupboard_2` (`group`) USING BTREE,
	INDEX `FK_vote_user` (`user`) USING BTREE,
	CONSTRAINT `FK_vote_user` FOREIGN KEY (`user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__groupboard` FOREIGN KEY (`board_number`) REFERENCES `test`.`groupboard` (`board_number`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__groupboard_2` FOREIGN KEY (`group`) REFERENCES `test`.`groupboard` (`info_groupname`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
