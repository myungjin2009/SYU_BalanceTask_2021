CREATE TABLE `vote2` (
	`board_number` INT(10) NOT NULL,
	`discuss` INT(10) NULL DEFAULT NULL,
	`user` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`group` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`board_number`, `user`) USING BTREE,
	INDEX `FK__user` (`user`) USING BTREE,
	INDEX `FK__groupnotice_2` (`group`) USING BTREE,
	CONSTRAINT `FK__groupnotice` FOREIGN KEY (`board_number`) REFERENCES `test`.`groupnotice` (`board_number`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__groupnotice_2` FOREIGN KEY (`group`) REFERENCES `test`.`groupnotice` (`info_groupname`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__user` FOREIGN KEY (`user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;