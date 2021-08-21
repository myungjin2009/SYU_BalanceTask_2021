CREATE TABLE `groupcalendar` (
	`process` INT(10) NOT NULL DEFAULT '1',
	`group_name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`date` DATETIME NULL DEFAULT NULL,
	`do_text` VARCHAR(128) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`writer` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`deadline` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`process`) USING BTREE,
	INDEX `FK_groupcalendar_groups` (`group_name`) USING BTREE,
	INDEX `FK_groupcalendar_user` (`writer`) USING BTREE,
	CONSTRAINT `FK_groupcalendar_groups` FOREIGN KEY (`group_name`) REFERENCES `test`.`groups` (`group_name`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_groupcalendar_user` FOREIGN KEY (`writer`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
