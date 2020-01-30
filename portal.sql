CREATE TABLE `portal`.`candidates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `surname` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `personalIdentificationNumber` VARCHAR(45) NULL,
  `birhtPlace` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `town` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `buildingNumber` VARCHAR(45) NULL,
  `flatNumber` VARCHAR(45) NULL,
  `mobileNumber` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `theoryStartDate` DATETIME NULL,
  `practiceStartDate` DATETIME NULL,
  `placeOfTraining` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `portal`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `startDate` DATE NULL,
  `description` VARCHAR(45) NULL,
  `categoriesId` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `portal`.`instructors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nick` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `mobileNumber` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `instructorIdentifier` VARCHAR(45) NOT NULL,
  `courseId` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `portal`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `startDateTime` DATETIME NOT NULL,
  `endDateTime` DATETIME NOT NULL,
  `duration` INT NULL,
  `instructorsId` INT NULL,
  `studentsId` INT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `portal`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `amount` DECIMAL NOT NULL,
  `description` VARCHAR(45) NULL,
  `paidBy` VARCHAR(45) NOT NULL,
  `painTo` VARCHAR(45) NOT NULL,
  `studentsId` INT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `portal`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `surname` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `personalIdentificationNumber` VARCHAR(45) NULL,
  `birthPlace` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `town` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `buildingNumber` VARCHAR(45) NULL,
  `flatNumber` VARCHAR(45) NULL,
  `mobileNumber` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `courseCategory` VARCHAR(45) NULL,
  `theoryStartDate` DATETIME NULL,
  `practiceStartDate` DATETIME NULL,
  `internalExamDate` DATE NULL,
  `placeOfTraining` VARCHAR(45) NULL,
  `archived` INT NULL,
  `stateRegulator` VARCHAR(45) NULL,
  `instructorsId` INT NULL,
  `coursesId` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `instructorsId`
    FOREIGN KEY (`id`)
    REFERENCES `portal`.`instructors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `coursesId`
    FOREIGN KEY (`id`)
    REFERENCES `portal`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
