CREATE TABLE `vote` (
	`board_number` INT(10) NOT NULL DEFAULT '1',
	`discuss` INT(10) NOT NULL,
	`user` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8_general_ci',
	`group` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`board_number`) USING BTREE,
	INDEX `FK_vote_user` (`user`) USING BTREE,
	INDEX `FK_vote_groups_2` (`group`) USING BTREE,
	CONSTRAINT `FK_vote_groupboard` FOREIGN KEY (`board_number`) REFERENCES `test`.`groupboard` (`board_number`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_vote_groups_2` FOREIGN KEY (`group`) REFERENCES `test`.`groups` (`group_name`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_vote_user` FOREIGN KEY (`user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
