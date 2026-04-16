package com.akezhan.some_project.repository;

import com.akezhan.some_project.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
