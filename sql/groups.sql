CREATE TABLE `groups` (
	`group_name` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`group_images` VARCHAR(8192) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`startdate` DATETIME NULL DEFAULT NULL,
	`percentage` FLOAT(4,3) NULL DEFAULT NULL,
	`group_chatting` VARCHAR(256) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`group_calendar` VARCHAR(256) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`user` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`enjoy` BLOB NULL DEFAULT NULL,
	`host` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`manager` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`complete` BLOB NULL DEFAULT NULL,
	`category` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`content` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`host_images` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`deadline` DATETIME NULL DEFAULT NULL,
	`makedate` DATETIME NULL DEFAULT NULL,
	`group_no` INT(10) NOT NULL DEFAULT '0',
	PRIMARY KEY (`group_name`, `user`, `group_no`) USING BTREE,
	INDEX `FK_groups_user` (`user`) USING BTREE,
	CONSTRAINT `FK_groups_user` FOREIGN KEY (`user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
