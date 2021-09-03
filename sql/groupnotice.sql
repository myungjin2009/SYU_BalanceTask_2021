CREATE TABLE `groupnotice` (
	`board_number` INT(10) NOT NULL,
	`title` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`image` VARCHAR(8192) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`file` VARCHAR(8192) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`text` VARCHAR(3000) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`info_user` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`info_groupname` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`date` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`board_number`, `info_groupname`) USING BTREE,
	INDEX `FK_groupboard_user` (`info_user`) USING BTREE,
	INDEX `FK_groupboard_groups` (`info_groupname`) USING BTREE,
	CONSTRAINT `groupnotice_ibfk_1` FOREIGN KEY (`info_groupname`) REFERENCES `test`.`groups` (`group_name`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `groupnotice_ibfk_2` FOREIGN KEY (`info_user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC