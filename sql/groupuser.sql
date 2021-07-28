CREATE TABLE `groupuser` (
	`group_name` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	` user` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`group_name`, ` user`) USING BTREE,
	INDEX `FK_groupuser_user` (` user`) USING BTREE,
	CONSTRAINT `FK_groupuser_groups` FOREIGN KEY (`group_name`) REFERENCES `test`.`groups` (`group_name`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_groupuser_user` FOREIGN KEY (` user`) REFERENCES `test`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='armscii8_bin'
ENGINE=InnoDB
;
