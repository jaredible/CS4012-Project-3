package net.jaredible.mathbank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.jaredible.mathbank.model.Problem;
import net.jaredible.mathbank.service.ProblemService;

@RestController
@RequestMapping("problems")
public class ProblemController {

	@Autowired
	private ProblemService problemService;

	@GetMapping
	public List<Problem> getAllProblems() {
		return problemService.getProblems();
	}

	@GetMapping("{id}")
	public Problem getProblemById(@PathVariable("id") Integer id) {
		return problemService.getProblem(id);
	}

	@PostMapping
	public Problem createProblem(@RequestBody Problem problem) {
		return problemService.createProblem(problem);
	}

	@PutMapping("{id}")
	public Problem updateProblem(@PathVariable("id") Integer id, @RequestBody Problem problem) {
		System.out.println("id: " + id);
		System.out.println(problem);
		
		Problem _problem = problemService.getProblem(id);

		if (_problem != null) {
			_problem.setContent(problem.getContent());
			return problemService.updateProblem(_problem);
		}

		return problem;
	}

	@DeleteMapping("{id}")
	public void deleteProblem(@PathVariable("id") Integer id) {
		if (problemService.getProblem(id) != null) {
			problemService.deleteProblem(id);
		}
	}

}
