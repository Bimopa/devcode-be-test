-- CreateTable
CREATE TABLE Activity (
    id INT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL DEFAULT "",
    title VARCHAR(255) NOT NULL DEFAULT "",
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    PRIMARY KEY (id)
);
-- CreateTable
CREATE TABLE Todo (
    id INT UNSIGNED AUTO_INCREMENT,
    activity_group_id INT UNSIGNED ,
    title VARCHAR(255) NOT NULL DEFAULT "",
    is_active BOOLEAN,
    priority ENUM('low', 'high', 'very-high'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    PRIMARY KEY (id)
);

-- CreateIndex
CREATE INDEX Todo_activityGroupId_foreign ON Todo(activity_group_id);

-- AddForeignKey
ALTER TABLE Todo
ADD FOREIGN KEY(activity_group_id) REFERENCES Activity(id) ON DELETE CASCADE ON UPDATE CASCADE;