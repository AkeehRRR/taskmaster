package com.akezhan.some_project.controller;

import com.akezhan.some_project.entity.Project;
import com.akezhan.some_project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(){
        List<Project> projects = projectService.getAllProjects();
        if(projects.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id){
        Optional<Project> optionalProject = projectService.getProjectById(id);
        return optionalProject.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project saved = projectService.saveProject(project);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();

        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project){
        Optional<Project> optionalProject = projectService.getProjectById(id);
        if(optionalProject.isPresent()){
            Project updatedProject = optionalProject.get();
            updatedProject.setName(project.getName());
            updatedProject.setDescription(project.getDescription());

            updatedProject.getTasks().clear();
            updatedProject.getTasks().addAll(project.getTasks());


            return ResponseEntity.ok(projectService.saveProject(updatedProject));

        } else return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id){
        projectService.getProjectById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
        projectService.deleteProject(id);
        return ResponseEntity.notFound().build();
    }
}
