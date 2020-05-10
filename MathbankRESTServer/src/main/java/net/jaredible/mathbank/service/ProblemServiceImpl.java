package net.jaredible.mathbank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.jaredible.mathbank.dao.ProblemDAO;
import net.jaredible.mathbank.model.Problem;

@Service
public class ProblemServiceImpl implements ProblemService {

	@Autowired
	private ProblemDAO problemDAO;

	@Override
	public List<Problem> getProblems() {
		return problemDAO.get();
	}

	@Override
	public Problem getProblem(int id) {
		return problemDAO.get(id);
	}

	@Override
	public Problem createProblem(Problem problem) {
		return problemDAO.insert(problem);
	}

	@Override
	public Problem updateProblem(Problem problem) {
		return problemDAO.update(problem);
	}

	@Override
	public void deleteProblem(int id) {
		problemDAO.delete(id);
	}

}
