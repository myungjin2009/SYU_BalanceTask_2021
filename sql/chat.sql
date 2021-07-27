CREATE TABLE `chat` (
	`chat_date` DATETIME NOT NULL,
	`chat_id` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`profile` VARCHAR(750) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`group_name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`chat_content` VARCHAR(750) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`chat_date`, `chat_id`) USING BTREE,
	INDEX `FK_chat_user` (`chat_id`) USING BTREE,
	INDEX `FK_chat_user_2` (`profile`) USING BTREE,
	INDEX `FK_chat_groups` (`group_name`) USING BTREE,
	CONSTRAINT `FK_chat_user` FOREIGN KEY (`chat_id`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_chat_user_2` FOREIGN KEY (`profile`) REFERENCES `test`.`user` (`user_image`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_chat_groups` FOREIGN KEY (`group_name`) REFERENCES `test`.`groups` (`group_name`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
