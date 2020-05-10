package net.jaredible.mathbank.service;

import java.util.List;

import net.jaredible.mathbank.model.Problem;

public interface ProblemService {

	public List<Problem> getProblems();

	public Problem getProblem(int id);

	public Problem createProblem(Problem problem);

	public Problem updateProblem(Problem problem);

	public void deleteProblem(int id);

}
