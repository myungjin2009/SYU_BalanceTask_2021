CREATE TABLE `user` (
	`id` VARCHAR(50) NOT NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8_general_ci',
	`password` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`phone` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`evaluation_score` INT(10) NULL DEFAULT NULL,
	`agreement` BLOB NOT NULL,
	`evaluation_text` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`clear_group` INT(10) NULL DEFAULT NULL,
	`user_image` VARCHAR(750) NULL DEFAULT '11' COLLATE 'utf8_general_ci',
	`introduce` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`user_category` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `introduce` (`introduce`) USING BTREE,
	UNIQUE INDEX `user_image` (`user_image`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
